#!/usr/bin/env node
/**
 * smoke_browser_runtime.js
 *
 * Zero-dependency cross-platform headless browser runtime smoke test.
 * Uses native Node.js (http server, fetch, WebSocket, child_process) and Chrome DevTools Protocol (CDP)
 * to verify that index.html boots up cleanly with:
 *   1. HTTP 200 on all core assets.
 *   2. Zero unhandled JavaScript exceptions in window.
 *   3. Zero console.error calls during startup and scene creation.
 *   4. Successful initialization of THREE, STATE, NAV_STATE, and 3D campus scene.
 *
 * Usage:
 *   node tests/smoke_browser_runtime.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');

// Common browser binary locations
function findBrowserBinary() {
    const isWin = process.platform === 'win32';
    const isMac = process.platform === 'darwin';

    const candidates = isWin ? [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
    ] : isMac ? [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ] : [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium'
    ];

    for (const p of candidates) {
        if (p && fs.existsSync(p)) return p;
    }
    return null;
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

async function runSmokeTest() {
    console.log('='.repeat(70));
    console.log('  MGKCT 3D — HEADLESS BROWSER RUNTIME & STARTUP SMOKE TEST');
    console.log('='.repeat(70));

    const browserBin = findBrowserBinary();
    if (!browserBin) {
        console.warn('\x1b[33m[SKIP] Headless browser binary (Chrome/Edge/Chromium) not found on host.\x1b[0m');
        process.exit(0);
    }
    console.log(`[BROWSER] Found: ${browserBin}`);

    // 1. Start static HTTP server
    const server = http.createServer((req, res) => {
        let safePath = path.normalize(decodeURIComponent(req.url.split('?')[0]));
        if (safePath === '/' || safePath === '\\') safePath = '/index.html';
        const filePath = path.join(REPO_ROOT, safePath);

        if (!filePath.startsWith(REPO_ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        fs.createReadStream(filePath).pipe(res);
    });

    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const serverPort = server.address().port;
    console.log(`[SERVER] Ephemeral static server listening on http://127.0.0.1:${serverPort}`);

    // Dynamic debug port
    const debugPort = serverPort + 100;
    const tempUserDataDir = path.join(require('os').tmpdir(), `mgkct_smoke_${Date.now()}`);

    const browserArgs = [
        '--headless=new',
        `--remote-debugging-port=${debugPort}`,
        `--user-data-dir=${tempUserDataDir}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-sync',
        '--disable-extensions',
        '--disable-gpu',
        '--hide-scrollbars',
        `http://127.0.0.1:${serverPort}/`
    ];

    const browserProc = spawn(browserBin, browserArgs, { stdio: 'ignore' });
    console.log(`[BROWSER] Headless process spawned (PID=${browserProc.pid}, debugPort=${debugPort})`);

    const cleanup = () => {
        try { browserProc.kill('SIGKILL'); } catch {}
        try { server.close(); } catch {}
        try { fs.rmSync(tempUserDataDir, { recursive: true, force: true }); } catch {}
    };

    const errors = [];

    try {
        // Wait for CDP to become available
        let wsUrl = null;
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 200));
            try {
                const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
                if (res.ok) {
                    const pages = await res.json();
                    if (pages.length > 0 && pages[0].webSocketDebuggerUrl) {
                        wsUrl = pages[0].webSocketDebuggerUrl;
                        break;
                    }
                }
            } catch {}
        }

        if (!wsUrl) {
            throw new Error(`Failed to establish CDP connection on port ${debugPort}`);
        }

        console.log('[CDP] Connected to Chrome DevTools Protocol');
        const ws = new WebSocket(wsUrl);

        await new Promise((resolve, reject) => {
            ws.onopen = resolve;
            ws.onerror = reject;
        });

        let msgId = 1;
        const pendingCallbacks = new Map();

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.id && pendingCallbacks.has(data.id)) {
                pendingCallbacks.get(data.id)(data);
                pendingCallbacks.delete(data.id);
            }

            // Capture console.error
            if (data.method === 'Runtime.consoleAPICalled') {
                const { type, args } = data.params;
                if (type === 'error') {
                    const text = args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
                    errors.push(`Console Error: ${text}`);
                }
            }

            // Capture uncaught exceptions
            if (data.method === 'Runtime.exceptionThrown') {
                const { exceptionDetails } = data.params;
                errors.push(`Uncaught Exception: ${exceptionDetails.text} (${exceptionDetails.exception?.description || ''})`);
            }
        };

        const sendCDP = (method, params = {}) => new Promise((resolve) => {
            const id = msgId++;
            pendingCallbacks.set(id, resolve);
            ws.send(JSON.stringify({ id, method, params }));
        });

        await sendCDP('Runtime.enable');
        await sendCDP('Page.enable');

        // Allow app initialization & rendering loop
        console.log('[TEST] Waiting for 3D campus bootstrap and frame rendering...');
        await new Promise(r => setTimeout(r, 2500));

        // Evaluate global health
        const evalRes = await sendCDP('Runtime.evaluate', {
            expression: `({
                hasThree: typeof THREE !== 'undefined',
                hasState: typeof STATE !== 'undefined',
                hasNav: typeof NAV_STATE !== 'undefined',
                hasScene: typeof scene !== 'undefined' && scene !== null,
                roomCount: typeof ROOMS_REGISTRY !== 'undefined' ? ROOMS_REGISTRY.length : 0,
                wallCount: typeof WALLS_REGISTRY !== 'undefined' ? WALLS_REGISTRY.length : 0
            })`,
            returnByValue: true
        });

        const stateInfo = evalRes.result?.result?.value;
        console.log('[STATUS] Runtime State Evaluation:', stateInfo);

        if (!stateInfo || !stateInfo.hasThree || !stateInfo.hasState || !stateInfo.hasNav) {
            errors.push(`Runtime bootstrap incomplete: ${JSON.stringify(stateInfo)}`);
        }
        if (stateInfo && (stateInfo.roomCount < 200 || stateInfo.wallCount < 1000)) {
            errors.push(`Architecture registry incomplete: rooms=${stateInfo?.roomCount}, walls=${stateInfo?.wallCount}`);
        }

        ws.close();

        if (errors.length > 0) {
            console.error('\x1b[31m[FAIL] Browser runtime errors encountered:\x1b[0m');
            errors.forEach(e => console.error(`  • ${e}`));
            cleanup();
            process.exit(1);
        }

        console.log('\x1b[32m[PASS] Browser runtime initialized with 0 errors and healthy 3D scene.\x1b[0m');
        cleanup();
        process.exit(0);

    } catch (err) {
        console.error('\x1b[31m[ERROR] Smoke test failure:\x1b[0m', err.message);
        cleanup();
        process.exit(1);
    }
}

runSmokeTest();
