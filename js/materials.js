// ==========================================
// МАТЕРИАЛЫ СЦЕНЫ THREE.JS
// ==========================================

const isInitialDark = (typeof STATE !== 'undefined' && STATE.theme === 'dark');

const MATERIALS = {
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

    // Минималистичная дорога по умолчанию (заливка полотна, контрастный контур, осевая линия)
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

    // Материалы прилегающей территории и благоустройства (адаптируются под светлую и тёмную тему)
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
        color: isInitialDark ? 0x1d3528 : 0x86efac,
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
    shelterFrame: new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.8
    }),
    shelterGlass: new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
        metalness: 0.1
    }),
    shelterRoof: new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5,
        metalness: 0.2
    }),
    shelterBench: new THREE.MeshStandardMaterial({
        color: 0x92400e,
        roughness: 0.75
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
    })
};

window.MATERIALS = MATERIALS;
