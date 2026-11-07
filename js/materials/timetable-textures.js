// ----------------------------------------------------
// 2. НИЖНЯЯ ОТДЕЛЬНАЯ ПЛАНКА (USSD, КОРОТКИЙ НОМЕР 488, QR)
// ----------------------------------------------------
function drawMinsktransFooterPlaque(ctx, CW, code) {
    const sx0 = 16, sy0 = 508, sx1 = CW - 16, sy1 = 628;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sx0, sy0, sx1 - sx0, sy1 - sy0);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.strokeRect(sx0, sy0, sx1 - sx0, sy1 - sy0);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx0 + 2, sy0 + 2, sx1 - sx0 - 4, sy1 - sy0 - 4);

    drawScrew(ctx, sx0 + 8, sy0 + (sy1 - sy0) / 2);
    drawScrew(ctx, sx1 - 8, sy0 + (sy1 - sy0) / 2);

    // QR-код слева
    const qx = sx0 + 24, qy = sy0 + 14, qs = 90;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(qx, qy, qs, qs);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(qx + 5, qy + 5, qs - 10, qs - 10);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(qx + 12, qy + 12, 24, 24);
    ctx.fillRect(qx + qs - 36, qy + 12, 24, 24);
    ctx.fillRect(qx + 12, qy + qs - 36, 24, 24);
    ctx.fillRect(qx + 40, qy + 40, 20, 20);

    // USSD блок
    ctx.beginPath();
    ctx.moveTo(sx0 + 130, sy0 + 10); ctx.lineTo(sx0 + 130, sy1 - 10);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 11.5px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('USSD-запыт пра прыбыццё', sx0 + 144, sy0 + 16);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 20px "Inter", monospace, sans-serif';
    ctx.fillText(`*960*${code}#`, sx0 + 144, sy0 + 38);

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 12.5px "Inter", sans-serif';
    ctx.fillText('ПАСЛУГА ПЛАТНАЯ', sx0 + 144, sy0 + 68);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText('A1   life:)   МТС', sx0 + 144, sy0 + 88);

    // Блок 488 (как на фото)
    ctx.beginPath();
    ctx.moveTo(sx0 + 430, sy0 + 10); ctx.lineTo(sx0 + 430, sy1 - 10);
    ctx.stroke();

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.fillText('КАРОТКІ НУМАР 488 (ПАСЛУГА БЯСПЛАТНАЯ)', sx0 + 448, sy0 + 16);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px "Inter", sans-serif';
    ctx.fillText('Патэлефануй па нумары 488  •  Паведамі код прыпынку ' + code, sx0 + 448, sy0 + 46);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillText('Атрымай галасавую інфармацыю пра час да прыбыцця транспарту', sx0 + 448, sy0 + 76);
}

// 1. Табличка троллейбусов №1 (Маршруты 19 и 19п)
function createTrolleybusTimetable1Texture() {
    if (typeof document === 'undefined') return createMinimalTexture('#ffffff', 256, 256);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const routes = [
        {
            num: '19',
            dest: 'ДС «КУРАСОЎШЧЫНА» — ст.м. «АЎТАЗАВОДСКАЯ»',
            wheelchair: false,
            date: 'з 20.11.2024',
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['19'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['19'][1] }
            ]
        },
        {
            num: '19п',
            dest: 'ДС «КУРАСОЎШЧЫНА» — ТРАНСПАРТНЫ ПАРК №2 (у парк)',
            wheelchair: false,
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['19p'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['19p'][1] }
            ]
        }
    ];
    drawMinsktransBoardCanvas(canvas, 'trolley', 'Каледж лічбавых тэхналогій', '57991', routes, false);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
}

// 2. Табличка троллейбусов №2 (Маршруты 27, 27п, 82, 82п)
function createTrolleybusTimetable2Texture() {
    if (typeof document === 'undefined') return createMinimalTexture('#ffffff', 256, 256);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const routes = [
        {
            num: '27',
            dest: 'ДС «КУРАСОЎШЧЫНА» — ДС «ДРУЖНАЯ»',
            wheelchair: false,
            date: 'з 20.11.2024',
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['27'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['27'][1] }
            ]
        },
        {
            num: '27п',
            dest: 'ДС «КУРАСОЎШЧЫНА» — ТРАНСПАРТНЫ ПАРК №2 (у парк)',
            wheelchair: false,
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['27p'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['27p'][1] }
            ]
        },
        {
            num: '82',
            dest: 'КАРЖАНЕЎСКАГА — ДС «СЕРАБРАНКА»',
            wheelchair: false,
            date: 'з 20.11.2024',
            days: [
                { label: 'штодз.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['82'][0] }
            ]
        },
        {
            num: '82п',
            dest: 'КАРЖАНЕЎСКАГА — ТРАНСПАРТНЫ ПАРК №2 (у парк)',
            wheelchair: false,
            days: [
                { label: 'штодз.', hours: MINSKTRANS_STOP_SCHEDULES.trolleys['82p'][0] }
            ]
        }
    ];
    drawMinsktransBoardCanvas(canvas, 'trolley', 'Каледж лічбавых тэхналогій', '57991', routes, false);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
}

/**
 * Алиас для обратной совместимости: возвращает текстуру основного
 * расписания троллейбусов (маршруты 19 и 27) для остановки «Колледж технологии и дизайна».
 */
function createTrolleybusTimetableTexture() {
    return createTrolleybusTimetable1Texture();
}

// 3. Табличка автобусов (Маршруты 40 и 107)
function createBusTimetableTexture() {
    if (typeof document === 'undefined') return createMinimalTexture('#ffffff', 256, 256);
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const routes = [
        {
            num: '40',
            dest: 'ЛАНДЭРА — ДС «КУНЦАЎШЧЫНА»',
            wheelchair: true,
            date: 'з 20.11.2024',
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.buses['40'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.buses['40'][1] }
            ]
        },
        {
            num: '107',
            dest: 'КАРЖАНЕЎСКАГА — ДС «КУНЦАЎШЧЫНА»',
            wheelchair: true,
            date: 'з 01.12.2024',
            days: [
                { label: 'буд.', hours: MINSKTRANS_STOP_SCHEDULES.buses['107'][0] },
                { label: 'вых.', hours: MINSKTRANS_STOP_SCHEDULES.buses['107'][1] }
            ]
        }
    ];
    drawMinsktransBoardCanvas(canvas, 'bus', 'Каледж лічбавых тэхналогій', '57991', routes, true);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
}
function createBusStopSignTexture() { return createMinimalTexture('#0284c7', 256, 256); }
function createPedestrianSignTexture(flip = false) { return createMinimalTexture('#0284c7', 256, 256); }
function createBirchBarkTexture() { return createMinimalTexture('#f8fafc', 256, 256); }
function createBirchBarkBumpMap() { return createMinimalTexture('#808080', 256, 256); }
function createLindenBarkTexture() { return createMinimalTexture('#473322', 256, 256); }
function createLindenFoliageTexture() { return createMinimalTexture('#2e6f2b', 256, 256); }
function createSpruceBarkTexture() { return createMinimalTexture('#382419', 256, 256); }
function createSpruceNeedleTexture() { return createMinimalTexture('#184223', 256, 256); }
function createHedgeFoliageTexture() { return createMinimalTexture('#275e2c', 256, 256); }
function createHedgeBumpTexture() { return createMinimalTexture('#808080', 256, 256); }
function createSoilMulchTexture() { return createMinimalTexture('#2a1d17', 256, 256); }
function createLawnTexture() { return createMinimalTexture('#387a3e', 256, 256); }
function createCollegeSteleLogoTexture() { return createMinimalTexture('#0284c7', 256, 256); }
function createWoodPlankTexture() { return createMinimalTexture('#b45309', 256, 256); }
function createWoodPlankBumpMap() { return createMinimalTexture('#808080', 256, 256); }
function createBrushedDarkMetalTexture() { return createMinimalTexture('#1e293b', 256, 256); }
function createBrushedMetalBumpMap() { return createMinimalTexture('#808080', 256, 256); }
function createPaverTileTexture() { return createMinimalTexture('#f1f5f9', 256, 256); }
function createPaverTileBumpMap() { return createMinimalTexture('#808080', 256, 256); }
function createTrafficBackplateTexture() { return createMinimalTexture('#0f172a', 256, 256); }
function createPedestrianTrafficLensTexture(color = 'red') { return createMinimalTexture(color === 'red' ? '#ef4444' : '#10b981', 256, 256); }
function createPedestrianButtonPlateTexture() { return createMinimalTexture('#facc15', 256, 256); }


// ============================================================================
// АСИНХРОННЫЙ ОТЛОЖЕННЫЙ ЗАГРУЗЧИК ВЫСОКОДЕТАЛИЗИРОВАННЫХ ТАБЛИЧЕК РАСПИСАНИЙ
// Оптимизация: генерация тяжелых Canvas 2D вынесена в requestIdleCallback / таймер,
// исключая блокировку главного потока при начальном парсинге и рендеринге 3D-сцены.
// ============================================================================
let _timetablesLoaded = false;
function loadTimetableTexturesAsync() {
    if (_timetablesLoaded) return;
    _timetablesLoaded = true;

    const doLoad = () => {
        try {
            const texBus = createBusTimetableTexture();
            const texTrolley1 = createTrolleybusTimetable1Texture();
            const texTrolley2 = createTrolleybusTimetable2Texture();

            if (MATERIALS.busTimetable) {
                MATERIALS.busTimetable.map = texBus;
                MATERIALS.busTimetable.needsUpdate = true;
            }
            if (MATERIALS.trolleybusTimetable1) {
                MATERIALS.trolleybusTimetable1.map = texTrolley1;
                MATERIALS.trolleybusTimetable1.needsUpdate = true;
            }
            if (MATERIALS.trolleybusTimetable2) {
                MATERIALS.trolleybusTimetable2.map = texTrolley2;
                MATERIALS.trolleybusTimetable2.needsUpdate = true;
            }
            if (typeof requestRender === 'function') {
                requestRender(15);
            }
        } catch (e) {
            console.warn('Async timetable texture generation:', e);
        }
    };

    if (typeof window !== 'undefined') {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(doLoad, { timeout: 2000 });
        } else if ('requestAnimationFrame' in window) {
            window.requestAnimationFrame(() => doLoad());
        } else {
            doLoad();
        }
    } else {
        doLoad();
    }
}

window.loadTimetableTexturesAsync = loadTimetableTexturesAsync;

// Централизованное освобождение WebGL материалов и текстур для предотвращения утечек GPU
function disposeAllMaterials() {
    if (typeof MATERIALS === 'undefined' || !MATERIALS) return;
    for (const key of Object.keys(MATERIALS)) {
        const mat = MATERIALS[key];
        if (!mat) continue;
        if (mat.map && typeof mat.map.dispose === 'function') {
            mat.map.dispose();
        }
        if (mat.lightMap && typeof mat.lightMap.dispose === 'function') {
            mat.lightMap.dispose();
        }
        if (typeof mat.dispose === 'function') {
            mat.dispose();
        }
    }
}
window.disposeAllMaterials = disposeAllMaterials;
