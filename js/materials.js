// ==========================================
// МАТЕРИАЛЫ СЦЕНЫ THREE.JS (МИНИМАЛИСТИЧНЫЙ ДИЗАЙН)
// ==========================================

const isInitialDark = (typeof STATE !== 'undefined' && STATE.theme === 'dark');

// Вспомогательный быстрый генератор минималистичных текстур (power-of-two 256x256, чистый цвет)
function createMinimalTexture(colorHex = '#ffffff', w = 256, h = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = colorHex;
    ctx.fillRect(0, 0, w, h);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.encoding = THREE.sRGBEncoding;
    return tex;
}

// Генераторы текстур для совместимости со сторонними интерфейсами и тестами
function createGlassFritTexture() { return createMinimalTexture('#d8e8f0', 256, 256); }
function createBusTimetableTexture() { return createMinimalTexture('#f1f5f9', 256, 256); }
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
function createLawnTexture() { return createMinimalTexture('#27532b', 256, 256); }
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

const MATERIALS = {
    // 1. Конструктивные элементы зданий
    slab: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x161f2e : 0xf8fafc,
        roughness: 0.90,
        metalness: 0.02,
        transparent: false,
        opacity: 1.0
    }),
    coreSlab: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x121a26 : 0xeef2f6,
        roughness: 0.90,
        metalness: 0.02,
        transparent: false,
        opacity: 1.0,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    }),
    wall: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x283548 : 0xffffff,
        roughness: 0.65,
        metalness: 0.03
    }),
    doorThin: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x3b4d66 : 0x94a3b8,
        roughness: 0.55,
        metalness: 0.08,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    }),
    stair: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x222e40 : 0xcbd5e1,
        roughness: 0.72,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    }),
    elevatorCar: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1e293b : 0xcbd5e1,
        roughness: 0.75
    }),
    edgeMain: new THREE.LineBasicMaterial({ color: isInitialDark ? 0x475569 : 0x475569, linewidth: 1 }),
    edgeDoor: new THREE.LineBasicMaterial({ color: isInitialDark ? 0x475569 : 0x64748b, linewidth: 1 }),
    guideLine: new THREE.LineDashedMaterial({
        color: 0x94a3b8,
        dashSize: 0.45,
        gapSize: 0.3,
        transparent: true,
        opacity: 0.6
    }),
    stairAxisLine: new THREE.LineDashedMaterial({
        color: 0x10b981,
        dashSize: 0.5,
        gapSize: 0.25,
        transparent: true,
        opacity: 0.9
    }),
    stairBoxEdge: new THREE.LineBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.65
    }),
    roof: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1e293b : 0x94a3b8,
        roughness: 0.85,
        metalness: 0.08,
        transparent: false,
        opacity: 1.0
    }),
    edgeRoof: new THREE.LineBasicMaterial({
        color: 0x475569,
        linewidth: 1
    }),

    // 2. Дороги и территория (минималистичные и 3D)
    minimalRoadSurface: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x131b26 : 0xdce4ee,
        roughness: 0.95,
        metalness: 0.02,
        polygonOffset: true,
        polygonOffsetFactor: 2,
        polygonOffsetUnits: 2
    }),
    roadContourLine: new THREE.LineBasicMaterial({
        color: isInitialDark ? 0x475569 : 0x64748b,
        linewidth: 1
    }),
    roadCenterLine: new THREE.LineBasicMaterial({
        color: isInitialDark ? 0x334155 : 0x94a3b8,
        linewidth: 1
    }),
    asphaltRoad: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1c222d : 0x475569,
        roughness: 0.92,
        metalness: 0.04
    }),
    asphaltDriveway: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x232a36 : 0x64748b,
        roughness: 0.90,
        metalness: 0.05
    }),
    curb: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x333d4d : 0x94a3b8,
        roughness: 0.85,
        metalness: 0.05
    }),
    sidewalk: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x2c3545 : 0xcbd5e1,
        roughness: 0.90,
        metalness: 0.04
    }),
    lawn: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x142817 : 0x27532b,
        roughness: 0.95,
        metalness: 0.0
    }),
    roadMarkingWhite: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.5,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2
    }),
    roadMarkingYellow: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.5,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2
    }),

    // 3. Остановочный павильон и навесы
    shelterFrame: new THREE.MeshStandardMaterial({
        color: 0xd4dce4,
        roughness: 0.25,
        metalness: 0.88
    }),
    shelterFrameStainless: new THREE.MeshStandardMaterial({
        color: 0xd4dce4,
        roughness: 0.25,
        metalness: 0.88
    }),
    shelterGlass: new THREE.MeshStandardMaterial({
        color: 0xd8e8f0,
        transparent: true,
        opacity: 0.35,
        roughness: 0.10,
        metalness: 0.15
    }),
    shelterRoof: new THREE.MeshStandardMaterial({
        color: 0xd4e2ec,
        transparent: true,
        opacity: 0.65,
        roughness: 0.15,
        metalness: 0.10,
        side: THREE.DoubleSide
    }),
    shelterRoofGlass: new THREE.MeshStandardMaterial({
        color: 0xd4e2ec,
        transparent: true,
        opacity: 0.65,
        roughness: 0.15,
        metalness: 0.10,
        side: THREE.DoubleSide
    }),
    shelterBench: new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.42,
        metalness: 0.02
    }),
    shelterBenchWood: new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.42,
        metalness: 0.02
    }),
    shelterBenchLegs: new THREE.MeshStandardMaterial({
        color: 0x242d38,
        roughness: 0.40,
        metalness: 0.60
    }),
    busTimetable: new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.25,
        metalness: 0.05,
        emissive: 0xffffff,
        emissiveIntensity: 0.15
    }),
    stainlessSteel: new THREE.MeshStandardMaterial({
        color: 0xdde4ec,
        roughness: 0.28,
        metalness: 0.88
    }),
    busStopSign: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.35,
        metalness: 0.05
    }),
    pedestrianSign: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.35,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    }),
    pedestrianSignRight: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.35,
        metalness: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
    }),

    // 4. Ботанические элементы (деревья, кустарники, живая изгородь)
    birchBark: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0xe2e8f0 : 0xf8fafc,
        roughness: 0.75,
        metalness: 0.04
    }),
    birchFoliage: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x2e541b : 0x529432,
        roughness: 0.82,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    birchFoliageLight: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x487928 : 0x72b036,
        roughness: 0.78,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    lindenTrunk: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x2c221a : 0x473322,
        roughness: 0.90,
        metalness: 0.02
    }),
    lindenFoliage: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x224a1f : 0x2e6f2b,
        roughness: 0.80,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    lindenFoliageDark: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x163415 : 0x21521f,
        roughness: 0.86,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    spruceTrunk: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x2c1a12 : 0x382419,
        roughness: 0.88,
        metalness: 0.02
    }),
    spruceNeedle: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x183a1d : 0x184223,
        roughness: 0.82,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    spruceNeedleDark: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x0f2613 : 0x102e18,
        roughness: 0.86,
        metalness: 0.0,
        side: THREE.DoubleSide
    }),
    hedgeFoliage: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1e3a24 : 0x275e2c,
        roughness: 0.65,
        metalness: 0.02,
        side: THREE.DoubleSide
    }),
    soilMulch: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1f140e : 0x2a1d17,
        roughness: 0.95,
        metalness: 0.0
    }),
    shrubFoliageDeciduous: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1b4022 : 0x2d5a27,
        roughness: 0.75,
        metalness: 0.02,
        side: THREE.DoubleSide
    }),
    shrubFoliageConifer: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x132e22 : 0x234e3f,
        roughness: 0.85,
        metalness: 0.01,
        side: THREE.DoubleSide
    }),
    flowerBlossomWhite: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.5,
        emissive: 0xffffff,
        emissiveIntensity: 0.12
    }),
    flowerBlossomGold: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.5,
        emissive: 0xd97706,
        emissiveIntensity: 0.15
    }),
    treeTrunk: new THREE.MeshStandardMaterial({
        color: 0x5b3a29,
        roughness: 0.9
    }),
    treeFoliage: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1e4620 : 0x22c55e,
        roughness: 0.85,
        metalness: 0.0
    }),
    treeFoliageLight: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x2d5a27 : 0x4ade80,
        roughness: 0.85,
        metalness: 0.0
    }),
    poleMetal: new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.4,
        metalness: 0.7
    }),
    signBlue: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.4
    }),
    signRed: new THREE.MeshStandardMaterial({
        color: 0xe11d48,
        roughness: 0.4
    }),
    signWhite: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.4
    }),

    // 5. Благоустройство (скамейки, урны, велопарковки, стела, плитка)
    campusBenchWood: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x9a3412 : 0xb45309,
        roughness: 0.44,
        metalness: 0.02,
        side: THREE.FrontSide
    }),
    campusBenchMetal: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.38,
        metalness: 0.72
    }),
    campusWasteBinBody: new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.34,
        metalness: 0.78
    }),
    bikeRackGalvanized: new THREE.MeshStandardMaterial({
        color: 0xdde4ec,
        roughness: 0.22,
        metalness: 0.88
    }),
    steleGranite: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x1f2937 : 0x475569,
        roughness: 0.82,
        metalness: 0.06
    }),
    steleLogoPlaque: new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.28,
        metalness: 0.18,
        emissive: 0x0369a1,
        emissiveIntensity: 0.30
    }),
    forecourtPaverLight: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x222d3d : 0xf1f5f9,
        roughness: 0.88,
        metalness: 0.03
    }),
    forecourtPaverDark: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x161e2a : 0x64748b,
        roughness: 0.84,
        metalness: 0.05
    }),
    castIronDark: new THREE.MeshStandardMaterial({
        color: 0x1a202c,
        roughness: 0.58,
        metalness: 0.65
    }),
    reflectiveWhite: new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.15,
        metalness: 0.08,
        emissive: 0xf8fafc,
        emissiveIntensity: 0.22
    }),

    // 6. Светофоры и ограждение
    trafficHousing: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.5,
        metalness: 0.15
    }),
    trafficRed: new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 1.2,
        roughness: 0.2
    }),
    trafficYellow: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 1.2,
        roughness: 0.2
    }),
    trafficGreen: new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 1.2,
        roughness: 0.2
    }),
    trafficButtonYellow: new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.35,
        metalness: 0.05
    }),
    trafficButtonFace: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5
    }),
    trafficButtonChrome: new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.85,
        roughness: 0.2
    }),
    trafficBackplate: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5,
        metalness: 0.1
    }),
    trafficPedRedMan: new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 0.9,
        roughness: 0.2
    }),
    trafficPedGreenMan: new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.9,
        roughness: 0.2
    }),
    trafficButtonPlate: new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.35,
        metalness: 0.05
    }),
    perimeterFence: new THREE.MeshStandardMaterial({
        color: isInitialDark ? 0x0f172a : 0x1e293b,
        metalness: 0.75,
        roughness: 0.35
    })
};

// Экспорт в глобальный scope window
window.MATERIALS = MATERIALS;
window.createMinimalTexture = createMinimalTexture;
window.createGlassFritTexture = createGlassFritTexture;
window.createBusTimetableTexture = createBusTimetableTexture;
window.createBusStopSignTexture = createBusStopSignTexture;
window.createPedestrianSignTexture = createPedestrianSignTexture;
window.createBirchBarkTexture = createBirchBarkTexture;
window.createBirchBarkBumpMap = createBirchBarkBumpMap;
window.createLindenBarkTexture = createLindenBarkTexture;
window.createLindenFoliageTexture = createLindenFoliageTexture;
window.createSpruceBarkTexture = createSpruceBarkTexture;
window.createSpruceNeedleTexture = createSpruceNeedleTexture;
window.createHedgeFoliageTexture = createHedgeFoliageTexture;
window.createHedgeBumpTexture = createHedgeBumpTexture;
window.createSoilMulchTexture = createSoilMulchTexture;
window.createLawnTexture = createLawnTexture;
window.createCollegeSteleLogoTexture = createCollegeSteleLogoTexture;
window.createWoodPlankTexture = createWoodPlankTexture;
window.createWoodPlankBumpMap = createWoodPlankBumpMap;
window.createBrushedDarkMetalTexture = createBrushedDarkMetalTexture;
window.createBrushedMetalBumpMap = createBrushedMetalBumpMap;
window.createPaverTileTexture = createPaverTileTexture;
window.createPaverTileBumpMap = createPaverTileBumpMap;
window.createTrafficBackplateTexture = createTrafficBackplateTexture;
window.createPedestrianTrafficLensTexture = createPedestrianTrafficLensTexture;
window.createPedestrianButtonPlateTexture = createPedestrianButtonPlateTexture;
