// ==========================================
// ОБРАБОТКА ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА (UI)
// ИНТЕРАКТИВНАЯ КАРТА КОЛЛЕДЖА (2D / 3D)
// ==========================================

const SETTINGS_KEY = 'college_3d_map_settings_v3';

function setTheme(themeName, shouldSave = true) {
    if (themeName !== 'dark' && themeName !== 'light') {
        themeName = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    STATE.theme = themeName;
    document.body.setAttribute('data-theme', themeName);

    const isDark = (themeName === 'dark');

    // 3D Three.js сцена (приятный картографический фон)
    if (typeof scene !== 'undefined' && scene) {
        scene.background = new THREE.Color(isDark ? 0x0b0f17 : 0xeef2f6);
    }

    // 3D Three.js материалы (сбалансированная палитра для светлого и тёмного режима)
    if (typeof MATERIALS !== 'undefined') {
        if (isDark) {
            // ТЁМНАЯ ТЕМА:
            if (MATERIALS.slab) MATERIALS.slab.color.setHex(0x161f2e);
            if (MATERIALS.coreSlab) MATERIALS.coreSlab.color.setHex(0x121a26);
            if (MATERIALS.wall) MATERIALS.wall.color.setHex(0x283548);
            if (MATERIALS.stair) MATERIALS.stair.color.setHex(0x222e40);
            if (MATERIALS.elevatorCar) MATERIALS.elevatorCar.color.setHex(0x1e293b);
            if (MATERIALS.doorThin) MATERIALS.doorThin.color.setHex(0x3b4d66);
            if (MATERIALS.edgeMain) MATERIALS.edgeMain.color.setHex(0x475569);
            if (MATERIALS.edgeDoor) MATERIALS.edgeDoor.color.setHex(0x475569);
            if (MATERIALS.roof) MATERIALS.roof.color.setHex(0x1e293b);
            if (MATERIALS.edgeRoof) MATERIALS.edgeRoof.color.setHex(0x475569);
            if (MATERIALS.guideLine) MATERIALS.guideLine.color.setHex(0x475569);
            if (MATERIALS.minimalRoadSurface) MATERIALS.minimalRoadSurface.color.setHex(0x131b26);
            if (MATERIALS.roadContourLine) MATERIALS.roadContourLine.color.setHex(0x475569);
            if (MATERIALS.roadCenterLine) MATERIALS.roadCenterLine.color.setHex(0x334155);
            // Прилегающая территория в тёмной теме
            if (MATERIALS.asphaltRoad) MATERIALS.asphaltRoad.color.setHex(0x1c222d);
            if (MATERIALS.asphaltDriveway) MATERIALS.asphaltDriveway.color.setHex(0x232a36);
            if (MATERIALS.curb) MATERIALS.curb.color.setHex(0x333d4d);
            if (MATERIALS.sidewalk) MATERIALS.sidewalk.color.setHex(0x2c3545);
            if (MATERIALS.lawn) MATERIALS.lawn.color.setHex(0x142817);
            if (MATERIALS.treeFoliage) MATERIALS.treeFoliage.color.setHex(0x1e4620);
            if (MATERIALS.treeFoliageLight) MATERIALS.treeFoliageLight.color.setHex(0x2d5a27);
            if (MATERIALS.birchFoliage) MATERIALS.birchFoliage.color.setHex(0x2e541b);
            if (MATERIALS.lindenFoliage) MATERIALS.lindenFoliage.color.setHex(0x224a1f);
            if (MATERIALS.spruceNeedle) MATERIALS.spruceNeedle.color.setHex(0x183a1d);
            if (MATERIALS.hedgeFoliage) MATERIALS.hedgeFoliage.color.setHex(0x1e3a24);
            if (MATERIALS.soilMulch) MATERIALS.soilMulch.color.setHex(0x1f140e);
            if (MATERIALS.steleGranite) MATERIALS.steleGranite.color.setHex(0x1f2937);
            if (MATERIALS.forecourtPaverLight) MATERIALS.forecourtPaverLight.color.setHex(0x222d3d);
            if (MATERIALS.forecourtPaverDark) MATERIALS.forecourtPaverDark.color.setHex(0x161e2a);
            if (MATERIALS.campusBenchWood) MATERIALS.campusBenchWood.color.setHex(0x9a3412);
        } else {
            // СВЕТЛАЯ ТЕМА:
            if (MATERIALS.slab) MATERIALS.slab.color.setHex(0xf8fafc);
            if (MATERIALS.coreSlab) MATERIALS.coreSlab.color.setHex(0xeef2f6);
            if (MATERIALS.wall) MATERIALS.wall.color.setHex(0xffffff);
            if (MATERIALS.stair) MATERIALS.stair.color.setHex(0xcbd5e1);
            if (MATERIALS.elevatorCar) MATERIALS.elevatorCar.color.setHex(0xcbd5e1);
            if (MATERIALS.doorThin) MATERIALS.doorThin.color.setHex(0x94a3b8);
            if (MATERIALS.edgeMain) MATERIALS.edgeMain.color.setHex(0x475569);
            if (MATERIALS.edgeDoor) MATERIALS.edgeDoor.color.setHex(0x64748b);
            if (MATERIALS.roof) MATERIALS.roof.color.setHex(0x94a3b8);
            if (MATERIALS.edgeRoof) MATERIALS.edgeRoof.color.setHex(0x475569);
            if (MATERIALS.guideLine) MATERIALS.guideLine.color.setHex(0x94a3b8);
            if (MATERIALS.minimalRoadSurface) MATERIALS.minimalRoadSurface.color.setHex(0xdce4ee);
            if (MATERIALS.roadContourLine) MATERIALS.roadContourLine.color.setHex(0x64748b);
            if (MATERIALS.roadCenterLine) MATERIALS.roadCenterLine.color.setHex(0x94a3b8);
            // Прилегающая территория в светлой теме
            if (MATERIALS.asphaltRoad) MATERIALS.asphaltRoad.color.setHex(0x475569);
            if (MATERIALS.asphaltDriveway) MATERIALS.asphaltDriveway.color.setHex(0x64748b);
            if (MATERIALS.curb) MATERIALS.curb.color.setHex(0x94a3b8);
            if (MATERIALS.sidewalk) MATERIALS.sidewalk.color.setHex(0xcbd5e1);
            if (MATERIALS.lawn) MATERIALS.lawn.color.setHex(0x27532b);
            if (MATERIALS.treeFoliage) MATERIALS.treeFoliage.color.setHex(0x22c55e);
            if (MATERIALS.treeFoliageLight) MATERIALS.treeFoliageLight.color.setHex(0x4ade80);
            if (MATERIALS.birchFoliage) MATERIALS.birchFoliage.color.setHex(0x529432);
            if (MATERIALS.lindenFoliage) MATERIALS.lindenFoliage.color.setHex(0x2e6f2b);
            if (MATERIALS.spruceNeedle) MATERIALS.spruceNeedle.color.setHex(0x184223);
            if (MATERIALS.hedgeFoliage) MATERIALS.hedgeFoliage.color.setHex(0x275e2c);
            if (MATERIALS.soilMulch) MATERIALS.soilMulch.color.setHex(0x2a1d17);
            if (MATERIALS.steleGranite) MATERIALS.steleGranite.color.setHex(0x475569);
            if (MATERIALS.forecourtPaverLight) MATERIALS.forecourtPaverLight.color.setHex(0xf1f5f9);
            if (MATERIALS.forecourtPaverDark) MATERIALS.forecourtPaverDark.color.setHex(0x64748b);
            if (MATERIALS.campusBenchWood) MATERIALS.campusBenchWood.color.setHex(0xb45309);
        }
    }

    // Иконка переключателя темы в шапке (солнце / луна)
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (sunIcon && moonIcon) {
        sunIcon.classList.toggle('hidden', !isDark);
        moonIcon.classList.toggle('hidden', isDark);
    }

    if (shouldSave) {
        localStorage.setItem('mgkct_theme', themeName);
    }

    if (typeof requestRender === 'function') {
        requestRender(30);
    }
}

const BUILDING_MAX_FLOORS = {
    'both': 7,
    '1': 7,
    '2': 3,
    '3': 2,
    '4': 3
};

const BUILDING_NAMES = {
    'both': 'Все корпуса',
    '1': 'Корпус 1',
    '2': 'Корпус 2',
    '3': 'Корпус 3',
    '4': 'Корпус 4'
};

function updateTopFloorBadge() {
    const badge = document.getElementById('top-floor-badge');
    if (!badge) return;

    if (STATE.mode === 'all') {
        badge.textContent = 'Все этажи (3D)';
    } else if (STATE.mode === 'sideBySide') {
        badge.textContent = 'Сравнение рядом';
    } else if (STATE.mode === 'slice') {
        badge.textContent = `Срез 1–${STATE.sliceMaxFloor} эт.`;
    } else {
        badge.textContent = `${STATE.mode} этаж`;
    }
}

function updateInfoCard(title, desc) {
    const titleEl = document.getElementById('info-card-title');
    const descEl = document.getElementById('info-card-desc');
    if (titleEl && title) titleEl.textContent = title;
    if (descEl && desc) descEl.textContent = desc;
}

function updateFloorButtonsAvailability() {
    const maxF = BUILDING_MAX_FLOORS[STATE.buildingFilter] || 7;
    for (let f = 1; f <= 7; f++) {
        const btn = document.getElementById(`floor-btn-${f}`);
        if (btn) {
            if (f <= maxF) {
                btn.classList.remove('disabled');
            } else {
                btn.classList.add('disabled');
            }
        }
    }
}

function setBuildingFilter(bFilter, shouldAnimateCam = true) {
    if (STATE.buildingFilter === bFilter && bFilter !== 'both') {
        bFilter = 'both';
    }

    STATE.buildingFilter = bFilter;

    document.querySelectorAll('.bldg-chip').forEach(b => {
        b.classList.toggle('active', b.dataset.bldg === bFilter);
    });

    updateFloorButtonsAvailability();
    const maxAllowed = BUILDING_MAX_FLOORS[bFilter] || 7;
    if (STATE.mode !== 'all' && STATE.mode !== 'sideBySide' && STATE.mode !== 'slice') {
        const currF = parseInt(STATE.mode, 10);
        if (currF > maxAllowed) {
            setMode(String(maxAllowed), false);
        }
    }

    if (shouldAnimateCam && camera && controls) {
        if (typeof resetControlsMomentum === 'function') resetControlsMomentum();
        const cx = getActiveCenterX();
        const cz = getActiveCenterZ();
        const isMobile = window.innerWidth < 768;
        const distY = isMobile
            ? (bFilter === 'both' ? 68 : 46)
            : (bFilter === 'both' ? 75 : 48);
        const offsetZ = isMobile ? (bFilter === 'both' ? 22 : 16) : 24;

        STATE.targetControlsCenter = new THREE.Vector3(cx, 0, cz);
        if (STATE.is2D) {
            STATE.targetCamPos = new THREE.Vector3(cx, distY, cz + offsetZ);
        } else {
            STATE.targetCamPos = new THREE.Vector3(cx - 24, distY * 0.75, cz + 52);
        }
    }

    recalcTargetPositions();
    updateAlignmentGuides();
    updateStairValidationAxes();
    updateFloorInfo();
    saveSettings();
}

function updateFloorInfo() {
    if (STATE.mode === 'all') {
        updateInfoCard('Все этажи комплекса', '3D модель: Корпус 1 (1–7 эт.), К-2 (1–3 эт.), К-3 (1–2 эт.), К-4 (1–3 эт.)');
    } else if (STATE.mode === 'sideBySide') {
        updateInfoCard('Сравнение рядом', 'Все этажи разложены на одной горизонтальной плоскости');
    } else if (STATE.mode === 'slice') {
        updateInfoCard(`Срез: этажи 1–${STATE.sliceMaxFloor}`, 'Сверху срезаны верхние этажи');
    } else {
        const fDesc = FLOOR_DESCRIPTIONS[STATE.mode] || `Этаж ${STATE.mode}`;
        const bName = BUILDING_NAMES[STATE.buildingFilter] || 'Все корпуса';
        updateInfoCard(`Этаж ${STATE.mode} (${bName})`, fDesc);
    }
    updateTopFloorBadge();
}

function setMode(newMode, shouldSave = true) {
    STATE.mode = newMode;

    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.floor === newMode);
    });

    // Скрываем контекстный попап кабинета, если переключили на другой этаж
    if (currentPopupRoom && String(currentPopupRoom.floor) !== String(newMode)) {
        hideRoomContextPopup();
    }

    updateFloorInfo();
    recalcTargetPositions();
    updateAlignmentGuides();
    updateStairValidationAxes();
    updateExplodeButtonStyle();

    if (typeof updateRouteVisibilityForCurrentMode === 'function') {
        updateRouteVisibilityForCurrentMode();
    }
    window.dispatchEvent(new CustomEvent('floorChanged', { detail: { floor: newMode } }));

    if (shouldSave) saveSettings();
}

function setSliceFloor(newFloor) {
    newFloor = Math.max(1, Math.min(7, Math.round(newFloor)));
    STATE.sliceMaxFloor = newFloor;

    const sliderSlice = document.getElementById('slider-slice');
    const valSlice = document.getElementById('slice-val');
    if (sliderSlice) sliderSlice.value = newFloor;
    if (valSlice) valSlice.textContent = newFloor === 1 ? '1 эт.' : `1–${newFloor} эт.`;

    if (newFloor === 7) {
        setMode('all');
    } else {
        STATE.mode = 'slice';
        document.querySelectorAll('.floor-btn').forEach(btn => btn.classList.remove('active'));
        updateFloorInfo();
        recalcTargetPositions();
        updateAlignmentGuides();
        updateStairValidationAxes();
        saveSettings();
    }
}

function updateExplodeButtonStyle() {
    const btnExplode = document.getElementById('btn-explode');
    if (!btnExplode) return;

    if (STATE.exploded && (STATE.mode === 'all' || STATE.mode === 'slice') && STATE.explodeGap > 0.2) {
        btnExplode.classList.add('explode-btn-active');
    } else {
        btnExplode.classList.remove('explode-btn-active');
    }
}

function toggle2DView() {
    setViewMode(!STATE.is2D);
}

function setTerritoryMode(enabled, shouldSave = true) {
    STATE.showTerritory = !!enabled;
    const btnTerritory = document.getElementById('btn-toggle-territory');
    if (btnTerritory) {
        btnTerritory.classList.toggle('mode-active', STATE.showTerritory);
        btnTerritory.title = STATE.showTerritory
            ? 'Прилегающая территория: включена (нажмите, чтобы скрыть)'
            : 'Прилегающая территория: выключена (нажмите, чтобы показать)';
    }
    const tTerritory = document.getElementById('toggle-territory');
    if (tTerritory) {
        tTerritory.checked = STATE.showTerritory;
    }
    if (typeof updateTerritoryVisibility === 'function') {
        updateTerritoryVisibility();
    }
    if (shouldSave) saveSettings();
}

function toggleTerritoryView() {
    setTerritoryMode(!STATE.showTerritory, true);
}

function updateCameraViewButtons(activeId) {
    ['btn-view-top', 'btn-view-3d', 'btn-view-305', 'btn-view-side'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.toggle('active', id === activeId);
        }
    });
}

function updateWallHeightButtons(height) {
    const h = parseFloat(height);
    document.getElementById('btn-wall-min')?.classList.toggle('active', Math.abs(h - 0.35) < 0.08);
    document.getElementById('btn-wall-mid')?.classList.toggle('active', Math.abs(h - 1.20) < 0.08);
    document.getElementById('btn-wall-max')?.classList.toggle('active', Math.abs(h - 2.40) < 0.08);
}

function setViewMode(is2D, shouldAnimateCam = true) {
    STATE.is2D = is2D;
    const btn2D = document.getElementById('btn-toggle-2d');
    if (btn2D) {
        btn2D.textContent = is2D ? '2D' : '3D';
        btn2D.classList.toggle('mode-active', !is2D);
        btn2D.title = is2D ? 'Режим: 2D карта (нажмите для 3D)' : 'Режим: 3D изометрия (нажмите для 2D)';
    }

    updateCameraViewButtons(is2D ? 'btn-view-top' : 'btn-view-3d');

    // Автоматическая адаптация высоты стен под режим 2D (0.35 м для чтения карты) и 3D (1.50 м для объёма)
    const targetWallH = is2D ? BASE_WALL_HEIGHT : 1.50;
    if (Math.abs(STATE.wallHeight - targetWallH) > 0.02) {
        setWallHeight(targetWallH, false);
    }

    if (typeof apply2DControls === 'function') {
        apply2DControls(is2D);
    }

    if (shouldAnimateCam && camera && controls) {
        if (typeof resetControlsMomentum === 'function') resetControlsMomentum();
        const cx = controls ? controls.target.x : getActiveCenterX();
        const cz = controls ? controls.target.z : getActiveCenterZ();
        const isMobile = window.innerWidth < 768;
        const isBoth = STATE.buildingFilter === 'both';
        const distY = isMobile ? (isBoth ? 54 : 42) : (isBoth ? 68 : 46);
        const offsetZ = isMobile ? (isBoth ? 18 : 14) : 22;

        STATE.targetControlsCenter = new THREE.Vector3(cx, 0, cz);
        if (is2D) {
            STATE.targetCamPos = new THREE.Vector3(cx, distY, cz + offsetZ);
        } else {
            const maxF = STATE.mode === 'slice' ? STATE.sliceMaxFloor : (STATE.mode === 'all' ? 7 : 1);
            const midY = ((STATE.mode === 'all' || STATE.mode === 'slice') && STATE.exploded)
                ? (STATE.wallHeight + STATE.explodeGap) * (maxF / 2)
                : (STATE.wallHeight * 0.45 * maxF);
            STATE.targetCamPos = new THREE.Vector3(cx - 24, 52 + midY, cz + 52);
        }
    }

    if (typeof updateFloorsInteriorVisibility === 'function') {
        updateFloorsInteriorVisibility();
    }
    if (typeof updateEdgesVisibility === 'function') {
        updateEdgesVisibility();
    }

    if (typeof requestRender === 'function') requestRender(45);
    saveSettings();
}

function resetToNorth() {
    if (typeof resetControlsMomentum === 'function') resetControlsMomentum();
    const cx = getActiveCenterX();
    const cz = getActiveCenterZ();
    const isMobile = window.innerWidth < 768;
    const isBoth = STATE.buildingFilter === 'both';
    const distY = isMobile ? (isBoth ? 54 : 42) : 68;
    const offsetZ = isMobile ? (isBoth ? 18 : 14) : 22;

    STATE.targetControlsCenter = new THREE.Vector3(cx, 0, cz);
    if (STATE.is2D) {
        STATE.targetCamPos = new THREE.Vector3(cx, distY, cz + offsetZ);
    } else {
        STATE.targetCamPos = new THREE.Vector3(cx - 24, 56, cz + 54);
    }

    if (typeof requestRender === 'function') requestRender(45);
}

function setWallHeight(newHeight, shouldSave = true) {
    newHeight = Math.max(0.15, Math.min(3.5, parseFloat(newHeight)));
    STATE.wallHeight = newHeight;

    const slider = document.getElementById('slider-wall-height');
    const val = document.getElementById('wall-height-val');
    if (slider) slider.value = newHeight;
    if (val) val.textContent = newHeight.toFixed(2) + ' м';

    updateWallHeightButtons(newHeight);

    if (typeof updateWallHeights === 'function') {
        updateWallHeights();
    }
    if (shouldSave) saveSettings();
}

function setLabelScale(scale) {
    STATE.labelScale = scale;

    let btnId = 'btn-labelsize-large';
    if (scale <= 0.85) btnId = 'btn-labelsize-normal';
    else if (scale >= 1.25) btnId = 'btn-labelsize-xl';

    ['btn-labelsize-normal', 'btn-labelsize-large', 'btn-labelsize-xl'].forEach(id => {
        document.getElementById(id)?.classList.toggle('active', id === btnId);
    });

    if (typeof updateRoomLabelsScale === 'function') {
        updateRoomLabelsScale();
    }
    if (typeof requestRender === 'function') requestRender(20);
    saveSettings();
}

// Выбор кабинета (при клике на карте или в поиске)
function selectRoom(roomInfo, shouldFly = true) {
    if (!roomInfo) return;

    // Включаем нужный этаж
    if (String(roomInfo.floor) !== String(STATE.mode)) {
        setMode(String(roomInfo.floor));
    }

    // Сохраняем в недавние поиски
    if (typeof saveRecentSearch === 'function') {
        saveRecentSearch(roomInfo);
    }

    // Обновляем текст в поисковом виджете шапки
    const cleanName = roomInfo.text ? roomInfo.text.replace(/\n/g, ' ').trim() : 'Кабинет';
    const isNum = /^\d/.test(cleanName) || /^[2-4]-\d/.test(cleanName);
    const title = isNum ? `Кабинет ${cleanName}` : cleanName;
    const widgetText = document.getElementById('search-widget-text');
    if (widgetText) {
        widgetText.textContent = `${title} (${roomInfo.floor} эт.)`;
    }
    updateInfoCard(title, `Корпус ${roomInfo.building} • ${roomInfo.floor} этаж`);

    if (shouldFly && camera && controls) {
        if (typeof resetControlsMomentum === 'function') resetControlsMomentum();
        const targetY = STATE.is2D ? 38 : 28;
        const camZOffset = STATE.is2D ? 14 : 30;
        const camXOffset = STATE.is2D ? 0 : -14;

        STATE.targetControlsCenter = new THREE.Vector3(roomInfo.x, 0, roomInfo.z);
        STATE.targetCamPos = new THREE.Vector3(roomInfo.x + camXOffset, targetY, roomInfo.z + camZOffset);
    }

    if (navigator.vibrate) {
        navigator.vibrate(12);
    }

    if (typeof requestRender === 'function') requestRender(60);
}

// Форматирование короткого бейджа и заголовка кабинета для поиска (без переполнения)
function formatSearchRoomBadgeAndTitle(item) {
    const rawOrig = (item.rawText || item.text || '').trim();
    const lines = rawOrig.split('\n').map(s => s.trim()).filter(Boolean);
    const firstLine = lines[0] || '';
    const secondLine = lines.slice(1).join(' ');
    const b = item.building;
    const f = item.floor;

    let codeNum = firstLine;
    let subtitle = secondLine;

    // Специальные залы и помещения
    if (b === 4 && f === 1 && /столов/i.test(rawOrig)) {
        codeNum = '102';
        subtitle = 'Столовая';
    } else if (b === 1 && f === 1 && /гардероб/i.test(rawOrig)) {
        codeNum = '102';
        subtitle = 'Гардероб';
    } else if (b === 2 && f === 1 && /библиот/i.test(rawOrig)) {
        codeNum = '104';
        subtitle = 'Библиотека';
    } else if (b === 4 && f === 2 && /актов/i.test(rawOrig)) {
        codeNum = '204';
        subtitle = 'Актовый зал';
    } else if (b === 4 && f === 2 && /спорт/i.test(rawOrig)) {
        codeNum = '206';
        subtitle = 'Спортивный зал';
    } else if (b === 2 && f === 3 && /спорт/i.test(rawOrig)) {
        codeNum = '308';
        subtitle = 'Спортивный зал';
    } else if (b === 2 && f === 3 && /конференц/i.test(rawOrig)) {
        codeNum = '312';
        subtitle = 'Конференц-зал';
    }

    // Если код начинается с цифры (или 2-105)
    const strippedCode = codeNum.replace(/^[2-4]-/, '');
    if (/^\d+[а-яa-z]?$/i.test(strippedCode)) {
        const fullCode = b === 1 ? strippedCode : `${b}-${strippedCode}`;
        const displayTitle = subtitle ? `Кабинет ${fullCode} — ${subtitle}` : `Кабинет ${fullCode}`;
        return { codeLabel: fullCode, displayTitle };
    }

    // Иначе это текстовое помещение (С/У, ЛК№1, Лифтовой холл, Служеб. пом. и т.д.)
    const fullText = rawOrig.replace(/\n/g, ' ').trim();
    if (/^с\/у$/i.test(fullText)) {
        return { codeLabel: 'С/У', displayTitle: 'Санузел (туалет)' };
    }
    if (/^лк\s*№?\s*(\d+)/i.test(fullText)) {
        const m = fullText.match(/^лк\s*№?\s*(\d+)/i);
        const lkCode = `ЛК№${m[1]}`;
        return { codeLabel: lkCode, displayTitle: `Лестница ${lkCode}` };
    }
    if (/лифт/i.test(fullText)) {
        return { codeLabel: 'Лифт', displayTitle: 'Лифтовой холл' };
    }
    if (/служеб/i.test(fullText)) {
        return { codeLabel: 'Служ.', displayTitle: 'Служебное помещение' };
    }
    if (/переход/i.test(fullText)) {
        return { codeLabel: 'Перех.', displayTitle: fullText };
    }

    const shortBadge = fullText.length > 6 ? fullText.slice(0, 5) + '…' : fullText;
    return { codeLabel: shortBadge, displayTitle: fullText };
}

// --- НЕДАВНИЕ ПОИСКИ (RECENT SEARCHES STORAGE) ---
const RECENT_SEARCHES_STORAGE_KEY = 'mgkct_recent_searches';
const MAX_RECENT_SEARCHES_COUNT = 8;

function getRecentSearches() {
    try {
        const raw = localStorage.getItem(RECENT_SEARCHES_STORAGE_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}

function saveRecentSearch(roomInfo) {
    if (!roomInfo || !roomInfo.text) return;
    try {
        const { codeLabel, displayTitle } = formatSearchRoomBadgeAndTitle(roomInfo);
        const item = {
            floor: roomInfo.floor,
            building: roomInfo.building,
            x: roomInfo.x,
            z: roomInfo.z,
            text: roomInfo.text,
            codeLabel,
            displayTitle,
            timestamp: Date.now()
        };
        const current = getRecentSearches();
        const filtered = current.filter(r => !(r.building === item.building && r.floor === item.floor && r.codeLabel === item.codeLabel));
        filtered.unshift(item);
        if (filtered.length > MAX_RECENT_SEARCHES_COUNT) {
            filtered.length = MAX_RECENT_SEARCHES_COUNT;
        }
        localStorage.setItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(filtered));
    } catch (e) {}
}

function clearRecentSearches() {
    try {
        localStorage.removeItem(RECENT_SEARCHES_STORAGE_KEY);
    } catch (e) {}
}

// Поиск кабинетов
function setupSearch() {
    const searchModal = document.getElementById('search-modal');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const btnOpenSearch = document.getElementById('btn-open-search');
    const btnCloseSearch = document.getElementById('btn-close-search');

    function openSearch() {
        hideRoomContextPopup();
        searchModal?.classList.add('active');
        searchBackdrop?.classList.add('active');
        renderSearchResults(searchInput ? searchInput.value : '');
        setTimeout(() => {
            searchInput?.focus({ preventScroll: true });
            if (typeof updateVisualViewportVars === 'function') updateVisualViewportVars();
        }, 80);
    }

    function closeSearch() {
        searchInput?.blur();
        searchModal?.classList.remove('active');
        searchBackdrop?.classList.remove('active');
    }

    btnOpenSearch?.addEventListener('click', openSearch);
    btnCloseSearch?.addEventListener('click', closeSearch);
    searchBackdrop?.addEventListener('click', closeSearch);

    searchInput?.addEventListener('input', (e) => {
        renderSearchResults(e.target.value);
    });

    document.querySelectorAll('.search-tag-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const q = chip.dataset.query || '';
            if (searchInput) searchInput.value = q;
            renderSearchResults(q);
        });
    });

    function renderSearchResults(query) {
        if (!searchResults) return;
        query = (query || '').trim().toLowerCase();

        function attachItemClickListeners() {
            searchResults.querySelectorAll('.room-search-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const f = parseInt(btn.dataset.floor, 10);
                    const b = parseInt(btn.dataset.bldg, 10);
                    const x = parseFloat(btn.dataset.x);
                    const z = parseFloat(btn.dataset.z);
                    const t = btn.dataset.text;
                    closeSearch();
                    // Все корпуса остаются видимыми в общем контексте кампуса (не скрываем остальные корпуса)
                    if (STATE.buildingFilter !== 'both' && typeof setBuildingFilter === 'function') {
                        setBuildingFilter('both', false);
                    }
                    const roomInfo = { floor: f, building: b, x: x, z: z, text: t };
                    saveRecentSearch(roomInfo);
                    selectRoom(roomInfo, true);
                    if (typeof showRoomContextPopup === 'function') {
                        showRoomContextPopup(roomInfo, window.innerWidth / 2, window.innerHeight * 0.42, false);
                    }
                });
            });
        }

        // 1) Пустой поисковый запрос: показываем историю недавних поисков
        if (!query) {
            const recent = getRecentSearches();
            if (recent.length > 0) {
                let html = `
                    <div class="flex items-center justify-between px-1 py-1.5 text-slate-400 text-[11px] font-semibold flex-shrink-0 border-b border-slate-700/40 mb-1">
                        <span class="flex items-center gap-1.5 text-slate-300">
                            <svg class="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Недавние поиски
                        </span>
                        <button id="btn-clear-recent" class="text-slate-400 hover:text-sky-400 transition text-[11px] font-medium hover:underline p-0.5">
                            Очистить историю
                        </button>
                    </div>
                `;
                recent.forEach(item => {
                    const bldgLabel = `Корпус ${item.building}`;
                    const floorLabel = `${item.floor} этаж`;
                    const dataText = (item.text || '').replace(/\n/g, ' ');
                    html += `
                        <button class="room-search-item flex items-center justify-between gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition text-left w-full group overflow-hidden flex-shrink-0"
                                data-floor="${item.floor}" data-bldg="${item.building}" data-x="${item.x}" data-z="${item.z}" data-text="${dataText}">
                            <div class="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                                <div class="room-search-badge min-w-[3.25rem] max-w-[4.75rem] px-2 h-8 rounded-lg border flex items-center justify-center font-extrabold text-xs tracking-tight flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
                                    ${item.codeLabel}
                                </div>
                                <div class="min-w-0 flex-1 flex flex-col justify-center overflow-hidden py-0.5">
                                    <div class="room-search-title font-bold text-slate-200 text-xs truncate group-hover:text-sky-400 transition leading-snug py-0.5">${item.displayTitle}</div>
                                    <div class="room-search-sub text-[10px] text-slate-400 truncate leading-none mt-0.5">${bldgLabel} • ${floorLabel}</div>
                                </div>
                            </div>
                            <svg class="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    `;
                });
                searchResults.innerHTML = html;

                document.getElementById('btn-clear-recent')?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    clearRecentSearches();
                    renderSearchResults('');
                });

                attachItemClickListeners();
                return;
            } else {
                searchResults.innerHTML = `
                    <div class="text-center py-8 px-4 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <div class="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500 mb-1">
                            <svg class="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <div class="text-xs font-semibold text-slate-200">Быстрый поиск аудиторий</div>
                        <div class="text-[11px] text-slate-400 max-w-[260px] leading-relaxed">
                            Выберите категорию из кнопок выше или начните ввод номера кабинета
                        </div>
                    </div>
                `;
                return;
            }
        }

        // 2) Активный поиск по запросу
        if (typeof ROOMS_REGISTRY === 'undefined' || ROOMS_REGISTRY.length === 0) {
            searchResults.innerHTML = '<div class="text-center py-4 text-xs text-slate-500">Загрузка базы кабинетов...</div>';
            return;
        }

        let targetBldg = null;
        let targetRoomQuery = query;

        const dashMatch = query.match(/^([1-4])\s*[-/:.]\s*([а-яa-z0-9№\s]*)$/i);
        const kMatch = query.match(/^(?:к|корп|корпус)\s*([1-4])\s*[-/:.\s]?\s*([а-яa-z0-9№\s]*)$/i);
        const postKMatch = query.match(/^([1-4])\s*(?:к|корп|корпус)\s*[-/:.\s]?\s*([а-яa-z0-9№\s]*)$/i);

        if (dashMatch) {
            targetBldg = parseInt(dashMatch[1], 10);
            targetRoomQuery = (dashMatch[2] || '').trim();
        } else if (kMatch) {
            targetBldg = parseInt(kMatch[1], 10);
            targetRoomQuery = (kMatch[2] || '').trim();
        } else if (postKMatch) {
            targetBldg = parseInt(postKMatch[1], 10);
            targetRoomQuery = (postKMatch[2] || '').trim();
        }

        const filtered = ROOMS_REGISTRY.filter(r => {
            const rawOrig = (r.rawText || r.text || '').toLowerCase();
            const roomText = r.text.toLowerCase();
            const cleanText = rawOrig.replace(/\n/g, ' ').toLowerCase();
            const bldg = r.building;
            let alias = '';
            if (bldg === 4 && r.floor === 1 && (cleanText.includes('102') || cleanText.includes('столов'))) alias = 'столовая буфет обед еда 102';
            if (bldg === 4 && r.floor === 2 && (cleanText.includes('206') || cleanText.includes('спорт'))) alias = 'спортзал спортивный зал спорт 206';
            if (bldg === 4 && r.floor === 2 && (cleanText.includes('204') || cleanText.includes('актов'))) alias = 'актовый зал актовый сцена 204';
            if (bldg === 1 && r.floor === 1 && (cleanText.includes('102') || cleanText.includes('гардероб'))) alias = 'гардероб раздевалка одежда 102';
            if (bldg === 2 && r.floor === 1 && (cleanText.includes('104') || cleanText.includes('библиот'))) alias = 'библиотека книги читальный зал 104';
            if (bldg === 2 && r.floor === 3 && (cleanText.includes('308') || cleanText.includes('спорт'))) alias = 'спортзал спортивный зал спорт 308';
            if (bldg === 2 && r.floor === 3 && (cleanText.includes('312') || cleanText.includes('конференц'))) alias = 'конференц-зал конференц зал собрания 312';
            if (/^с\/у$/i.test(cleanText)) alias = 'туалет санузел уборная wc с/у';

            if (targetBldg !== null) {
                if (bldg !== targetBldg) return false;
                if (!targetRoomQuery) return true;
                return cleanText.includes(targetRoomQuery) || roomText.includes(targetRoomQuery) || alias.includes(targetRoomQuery);
            }

            const bldgCombos = [
                `${bldg}-${roomText}`,
                `${bldg} - ${roomText}`,
                `${bldg}/${roomText}`,
                `${bldg}:${roomText}`,
                `к${bldg}-${roomText}`,
                `к${bldg} ${roomText}`,
                `${bldg}к ${roomText}`,
                `${bldg}к-${roomText}`,
                `корпус ${bldg} ${roomText}`
            ];

            return cleanText.includes(query) ||
                   roomText.includes(query) ||
                   alias.includes(query) ||
                   bldgCombos.some(c => c.includes(query)) ||
                   `корпус ${bldg}`.includes(query) ||
                   `этаж ${r.floor}`.includes(query);
        });

        filtered.sort((a, b) => {
            const aText = a.text.toLowerCase();
            const bText = b.text.toLowerCase();
            const q = targetBldg !== null ? targetRoomQuery : query;

            if (q) {
                if (aText === q && bText !== q) return -1;
                if (bText === q && aText !== q) return 1;
                if (aText.startsWith(q) && !bText.startsWith(q)) return -1;
                if (bText.startsWith(q) && !aText.startsWith(q)) return 1;
            }
            if (a.building !== b.building) return a.building - b.building;
            return a.floor - b.floor;
        });

        const displayItems = filtered.slice(0, 30);

        if (displayItems.length === 0) {
            searchResults.innerHTML = `<div class="text-center py-6 text-xs text-slate-500">По запросу «${query}» ничего не найдено</div>`;
            return;
        }

        let html = '';
        displayItems.forEach(item => {
            const bldgLabel = `Корпус ${item.building}`;
            const floorLabel = `${item.floor} этаж`;
            const { codeLabel, displayTitle } = formatSearchRoomBadgeAndTitle(item);
            const dataText = (item.text || '').replace(/\n/g, ' ');
            html += `
                <button class="room-search-item flex items-center justify-between gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition text-left w-full group overflow-hidden flex-shrink-0"
                        data-floor="${item.floor}" data-bldg="${item.building}" data-x="${item.x}" data-z="${item.z}" data-text="${dataText}">
                    <div class="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                        <div class="room-search-badge min-w-[3.25rem] max-w-[4.75rem] px-2 h-8 rounded-lg border flex items-center justify-center font-extrabold text-xs tracking-tight flex-shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
                            ${codeLabel}
                        </div>
                        <div class="min-w-0 flex-1 flex flex-col justify-center overflow-hidden py-0.5">
                            <div class="room-search-title font-bold text-slate-200 text-xs truncate group-hover:text-sky-400 transition leading-snug py-0.5">${displayTitle}</div>
                            <div class="room-search-sub text-[10px] text-slate-400 truncate leading-none mt-0.5">${bldgLabel} • ${floorLabel}</div>
                        </div>
                    </div>
                    <svg class="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            `;
        });
        searchResults.innerHTML = html;
        attachItemClickListeners();
    }
}

// Адаптация модальных окон под экранную клавиатуру мобильных устройств (VisualViewport API)
function updateVisualViewportVars() {
    if (typeof window === 'undefined') return;
    const vv = window.visualViewport;
    const vvh = vv ? vv.height : window.innerHeight;
    const vvo = vv ? vv.offsetTop : 0;
    document.documentElement.style.setProperty('--vvh', `${Math.round(vvh)}px`);
    document.documentElement.style.setProperty('--vvo', `${Math.round(vvo)}px`);
    if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
    }
}
window.updateVisualViewportVars = updateVisualViewportVars;

function setupVisualViewportHandler() {
    updateVisualViewportVars();
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateVisualViewportVars, { passive: true });
        window.visualViewport.addEventListener('scroll', updateVisualViewportVars, { passive: true });
    }
    window.addEventListener('resize', updateVisualViewportVars, { passive: true });
}

function setupSettingsDrawer() {
    // Шторка настроек убрана из основного UI; оставляем безопасную заглушку
}

function saveSettings() {
    try {
        const payload = {
            preset: STATE.preset || 'balance',
            showShadows: STATE.showShadows ?? false,
            wallHeight: STATE.wallHeight,
            labelScale: STATE.labelScale || 1.0,
            slabOpacity: STATE.slabOpacity,
            showDoors: STATE.showDoors,
            showLabels: STATE.showLabels,
            smartLabelOcclusion: STATE.smartLabelOcclusion,
            showRoof: STATE.showRoof,
            showTerritory: STATE.showTerritory,
            showStairAxes: STATE.showStairAxes,
            showGuides: STATE.showGuides,
            showEdges: STATE.showEdges,
            buildingFilter: STATE.buildingFilter,
            mode: STATE.mode,
            is2D: STATE.is2D,
            sliceMaxFloor: STATE.sliceMaxFloor,
            explodeGap: STATE.explodeGap,
            exploded: STATE.exploded,
            theme: STATE.theme
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
    } catch (e) {
        console.warn('LocalStorage save error:', e);
    }
}

function restoreSavedSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) return;
        const s = JSON.parse(raw);
        if (typeof s.is2D === 'boolean') STATE.is2D = s.is2D;
        STATE.wallHeight = STATE.is2D ? BASE_WALL_HEIGHT : 1.50;
        STATE.showDoors = true;
        STATE.showLabels = true;
        STATE.showEdges = true;
        STATE.showRoof = false;
        if (typeof s.showTerritory === 'boolean') STATE.showTerritory = s.showTerritory;
        if (typeof s.buildingFilter === 'string') STATE.buildingFilter = s.buildingFilter;
        if (typeof s.mode === 'string' && /^[1-7]$/.test(s.mode)) STATE.mode = s.mode;
        if (s.theme === 'dark' || s.theme === 'light') STATE.theme = s.theme;
    } catch (e) {
        console.warn('LocalStorage load error:', e);
    }
}

function resetSettingsToDefault() {
    try {
        localStorage.removeItem(SETTINGS_KEY);
    } catch (e) {}

    STATE.preset = 'balance';
    STATE.showShadows = false;
    STATE.is2D = true;
    STATE.wallHeight = BASE_WALL_HEIGHT;
    STATE.labelScale = 1.0;
    STATE.slabOpacity = 1.0;
    STATE.showDoors = true;
    STATE.showLabels = true;
    STATE.smartLabelOcclusion = true;
    STATE.showRoof = false;
    STATE.showTerritory = (typeof ROAD_3D_MINIMALISM !== 'undefined' ? ROAD_3D_MINIMALISM === 0 : false);
    STATE.showStairAxes = false;
    STATE.showGuides = false;
    STATE.showEdges = true;
    STATE.buildingFilter = 'both';
    STATE.mode = '1';
    STATE.sliceMaxFloor = 7;
    STATE.explodeGap = 0.0;
    STATE.exploded = false;

    setBuildingFilter('both', false);
    setMode('1', false);
    setViewMode(true, false);
    setTerritoryMode(STATE.showTerritory, false);
    setLabelScale(1.0);

    if (typeof updateWallHeights === 'function') updateWallHeights();
    if (typeof updateEdgesVisibility === 'function') updateEdgesVisibility();
    if (typeof updateLabelsVisibility === 'function') updateLabelsVisibility();
    if (typeof updateRoofsVisibility === 'function') updateRoofsVisibility();
    if (typeof updateTerritoryVisibility === 'function') updateTerritoryVisibility();

    resetToNorth();
    saveSettings();
}

function setupUI() {
    setupVisualViewportHandler();
    setupSearch();
    setupSettingsDrawer();
    setupRoomContextPopup();

    // Селектор этажей (кнопки 1–7)
    document.querySelectorAll('.floor-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const f = btn.dataset.floor;
            if (f) setMode(f);
        });
    });

    // Выбор корпуса (чипсы в шапке)
    document.querySelectorAll('.bldg-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const b = chip.dataset.bldg;
            if (b) setBuildingFilter(b);
        });
    });

    // Плавающие кнопки карты: Территория, 2D/3D, Зум
    document.getElementById('btn-toggle-territory')?.addEventListener('click', toggleTerritoryView);
    document.getElementById('btn-toggle-2d')?.addEventListener('click', toggle2DView);
    document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
        if (typeof zoomIn === 'function') zoomIn();
    });
    document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
        if (typeof zoomOut === 'function') zoomOut();
    });
    document.getElementById('btn-center-view')?.addEventListener('click', resetToNorth);

    // Горячая клавиша H — скрыть интерфейс
    window.addEventListener('keydown', e => {
        if (e.target && (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT')) {
            return;
        }
        if (e.code === 'KeyH' || e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') {
            document.body.classList.toggle('ui-hidden');
        }
    });

    // Переключатель темы (Светлая / Тёмная) в верхней панели
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    btnToggleTheme?.addEventListener('click', () => {
        const nextTheme = STATE.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme, true);
    });

    // Инициализация активных состояний без лишнего перелёта камеры при старте
    setBuildingFilter(STATE.buildingFilter || 'both', false);
    setMode(STATE.mode || '1', false);
    setViewMode(STATE.is2D, false);
    setTerritoryMode(STATE.showTerritory, false);
    setLabelScale(STATE.labelScale || 1.0);
    setTheme(STATE.theme || 'light', false);
}


// ==========================================
// КОНТЕКСТНЫЙ ПОПАП КАБИНЕТА (ОТСЮДА / СЮДА)
// С ПРИВЯЗКОЙ К 3D-КООРДИНАТАМ КАБИНЕТА
// ==========================================
let currentPopupRoom = null;
const _popupProjVec = new THREE.Vector3();

function updateRoomContextPopupScreenPos(viewW, viewH) {
    if (!currentPopupRoom || !camera) return;
    const popup = document.getElementById('room-context-popup');
    if (!popup || popup.classList.contains('hidden')) return;

    const w = viewW || window.innerWidth;
    const h = viewH || window.innerHeight;
    const fg = (typeof floorGroups !== 'undefined' && floorGroups[currentPopupRoom.floor])
        ? floorGroups[currentPopupRoom.floor]
        : null;
    if (fg && !fg.visible) {
        hideRoomContextPopup();
        return;
    }

    const wx = (fg ? fg.position.x : 0) + currentPopupRoom.x;
    const wy = (fg ? fg.position.y : 0) + 0.15;
    const wz = (fg ? fg.position.z : 0) + currentPopupRoom.z;

    _popupProjVec.set(wx, wy, wz).project(camera);
    if (_popupProjVec.z > 1.0) return;

    const sx = (_popupProjVec.x * 0.5 + 0.5) * w;
    const sy = (-_popupProjVec.y * 0.5 + 0.5) * h;

    const pad = 12;
    const popW = popup.offsetWidth || 206;
    const popH = popup.offsetHeight || 78;
    let left = Math.round(sx - popW / 2);
    let top = Math.round(sy - popH - 18);

    if (left < pad) left = pad;
    if (left + popW > w - pad) left = w - pad - popW;
    if (top < 62) top = Math.round(sy + 20);
    if (top + popH > h - pad) top = h - pad - popH;

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
}
window.updateRoomContextPopupScreenPos = updateRoomContextPopupScreenPos;

function showRoomContextPopup(roomInfo, clientX, clientY, shouldSelectAndFly = true) {
    if (!roomInfo) return;
    currentPopupRoom = roomInfo;

    const popup = document.getElementById('room-context-popup');
    const nameEl = document.getElementById('popup-room-name');
    if (!popup) return;

    if (nameEl) {
        const cleanName = roomInfo.text ? roomInfo.text.replace(/\n/g, ' ').trim() : 'Кабинет';
        const isNum = /^\d/.test(cleanName) || /^[2-4]-\d/.test(cleanName);
        const title = isNum ? `Кабинет ${cleanName}` : cleanName;
        nameEl.textContent = `${title} (${roomInfo.floor} эт.)`;
    }

    popup.classList.remove('hidden');

    if (shouldSelectAndFly && typeof selectRoom === 'function') {
        selectRoom(roomInfo, true);
    }

    updateRoomContextPopupScreenPos(window.innerWidth, window.innerHeight);
}

function hideRoomContextPopup() {
    const popup = document.getElementById('room-context-popup');
    if (popup) popup.classList.add('hidden');
    currentPopupRoom = null;
}

function setupRoomContextPopup() {
    const btnClose = document.getElementById('btn-close-room-popup');
    if (btnClose) btnClose.addEventListener('click', hideRoomContextPopup);

    function getRoomNavPoint(r) {
        if (!r) return null;
        if (typeof NAV_STATE === 'undefined') return null;
        if (!NAV_STATE.graph && typeof buildCollegeNavGraph === 'function') {
            NAV_STATE.graph = buildCollegeNavGraph();
        }
        const g = NAV_STATE.graph;
        if (!g) return null;

        const f = parseInt(r.floor, 10);
        const b = parseInt(r.building, 10);
        const clean = r.text ? r.text.replace(/\n/g, ' ').trim() : 'Кабинет';

        for (const [, node] of g.nodes.entries()) {
            if (node.floor === f && node.bldg === b && node.type === 'room') {
                if (Math.hypot(node.x - r.x, node.z - r.z) < 0.25) {
                    return node;
                }
            }
        }
        for (const [, node] of g.nodes.entries()) {
            if (node.floor === f && node.bldg === b && node.type === 'room') {
                if (node.label === clean) return node;
            }
        }
        const closest = g.findClosestNode(f, b, r.x, r.z, ['room', 'door', 'corridor']);
        return closest || { id: `room_${b}_${f}`, label: clean, floor: f, bldg: b, x: r.x, z: r.z };
    }

    const btnFrom = document.getElementById('btn-popup-from');
    if (btnFrom) {
        btnFrom.addEventListener('click', () => {
            if (!currentPopupRoom) return;
            const r = currentPopupRoom;
            hideRoomContextPopup();

            if (typeof NAV_STATE !== 'undefined') {
                const roomNode = getRoomNavPoint(r);
                if (roomNode) {
                    NAV_STATE.startPoint = roomNode;
                    const inputA = document.getElementById('nav-input-start');
                    if (inputA) {
                        inputA.value = `${roomNode.label || r.text.replace(/\n/g, ' ')} (К-${r.building}, ${r.floor} эт.)`;
                        inputA.removeAttribute('data-is-default');
                        const btnClearA = document.getElementById('btn-clear-start');
                        if (btnClearA) btnClearA.classList.remove('hidden');
                    }

                    if (typeof openNavigatorModal === 'function') {
                        openNavigatorModal();
                    }
                }
            }
        });
    }

    const btnTo = document.getElementById('btn-popup-to');
    if (btnTo) {
        btnTo.addEventListener('click', () => {
            if (!currentPopupRoom) return;
            const r = currentPopupRoom;
            hideRoomContextPopup();

            if (typeof NAV_STATE !== 'undefined') {
                const roomNode = getRoomNavPoint(r);
                if (roomNode) {
                    NAV_STATE.destPoint = roomNode;
                    const inputB = document.getElementById('nav-input-dest');
                    if (inputB) {
                        inputB.value = `${roomNode.label || r.text.replace(/\n/g, ' ')} (К-${r.building}, ${r.floor} эт.)`;
                        const btnClearB = document.getElementById('btn-clear-dest');
                        if (btnClearB) btnClearB.classList.remove('hidden');
                    }

                    const g = NAV_STATE.graph;
                    if (!NAV_STATE.startPoint && g) {
                        const entrance = g.getNode('b3_f1_entrance_west') || g.getNode('b1_f1_entrance_main');
                        if (entrance) {
                            NAV_STATE.startPoint = entrance;
                            const inputA = document.getElementById('nav-input-start');
                            if (inputA) {
                                inputA.value = 'Главный вход (Корпус 3)';
                                inputA.setAttribute('data-is-default', 'true');
                            }
                        }
                    }

                    if (NAV_STATE.startPoint && NAV_STATE.destPoint && typeof buildRoute === 'function') {
                        buildRoute(NAV_STATE.startPoint, NAV_STATE.destPoint);
                    } else if (typeof openNavigatorModal === 'function') {
                        openNavigatorModal();
                    }
                }
            }
        });
    }
}

window.showRoomContextPopup = showRoomContextPopup;
window.hideRoomContextPopup = hideRoomContextPopup;
window.setTerritoryMode = setTerritoryMode;
window.toggleTerritoryView = toggleTerritoryView;
