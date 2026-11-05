#!/usr/bin/env node
/**
 * check_syntax.js
 *
 * Authoritative V8 JavaScript syntax and parsing check across all project files.
 * Verifies that all JS code passes V8 compilation without syntax or lexical errors.
 *
 * Usage:
 *   node tests/check_syntax.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');

const SCAN_DIRS = ['js', 'tests', 'node_editor', '.agents'];
const EXCLUDE_PATHS = [
    path.join('js', 'vendor'),
    'node_modules',
    '.git'
];

function getJsFiles(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(ROOT_DIR, fullPath);

        if (EXCLUDE_PATHS.some(ex => relPath.startsWith(ex) || relPath === ex)) {
            continue;
        }

        if (entry.isDirectory()) {
            files = files.concat(getJsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            files.push(fullPath);
        }
    }
    return files;
}

let allFiles = [];
for (const dirName of SCAN_DIRS) {
    allFiles = allFiles.concat(getJsFiles(path.join(ROOT_DIR, dirName)));
}

console.log(`Checking JavaScript syntax across ${allFiles.length} files...`);

let hasError = false;
let passedCount = 0;

for (const filePath of allFiles) {
    const relPath = path.relative(ROOT_DIR, filePath);
    try {
        const code = fs.readFileSync(filePath, 'utf8');
        // V8 script compilation test
        new vm.Script(code, { filename: relPath });
        passedCount++;
    } catch (err) {
        console.error(`\x1b[31m[SYNTAX ERROR]\x1b[0m ${relPath}`);
        console.error(`  ${err.message}`);
        if (err.stack) {
            console.error(`  ${err.stack.split('\n').slice(0, 3).join('\n  ')}`);
        }
        hasError = true;
    }
}

if (hasError) {
    console.error(`\n\x1b[31mFAILED: Syntax errors encountered in one or more files.\x1b[0m`);
    process.exit(1);
} else {
    console.log(`\x1b[32mPASSED: All ${passedCount} JS files parsed successfully with V8.\x1b[0m`);
    process.exit(0);
}
