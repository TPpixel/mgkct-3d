// ==========================================
// ПРИЛЕГАЮЩАЯ ТЕРРИТОРИЯ КОЛЛЕДЖА (ДОРОГИ, ОСТАНОВКА, ПОДЪЕЗДЫ)
// ==========================================

function buildTerritory() {
    const tGroup = window.territoryGroup || (typeof territoryGroup !== 'undefined' ? territoryGroup : null);
    if (!tGroup) return;

    // Очищаем группу перед повторным построением
    while (tGroup.children.length > 0) {
        tGroup.remove(tGroup.children[0]);
    }

    const t = tGroup;

    // 1. БАЗОВАЯ ЗЕМЛЯ (ГАЗОННАЯ ПОДЛОЖКА ПОД ВСЕМ РАЙОНОМ)
    buildGroundBase(t);

    // 2. ГЛАВНАЯ АВТОДОРОГА (4 ПОЛОСЫ ДВИЖЕНИЯ)
    buildMainRoad(t);

    // 3. АВТОБУСНАЯ ОСТАНОВКА (БОЛЬШОЙ ПАРАПЕТ, КАРМАН И БОЛЬШОЙ ПАВИЛЬОН)
    buildBusStop(t);

    // 4. СЕТЬ ПОДЪЕЗДНЫХ ДОРОГ (ВОСТОЧНЫЙ ВЪЕЗД + ВНУТРЕННИЙ ПРОЕЗД ПОД ПЕРЕХОДАМИ)
    buildDrivewaysAndInnerRoads(t);

    // 5. ПЕШЕХОДНАЯ ПЛОЩАДЬ И БЛАГОУСТРОЙСТВО ПЕРЕД КОРПУСАМИ (СЕРЫЙ ТРОТУАР)
    buildForecourtAndPlaza(t);

    // 6. ОЗЕЛЕНЕНИЕ (ГАЗОН КОРПУСА 2 С ДЕРЕВЬЯМИ, ДЕРЕВЬЯ ВДОЛЬ ДОРОГ)
    buildLandscaping(t);

    // 7. СВЕТИЛЬНИКИ, ШЛАГБАУМЫ И ДОРОЖНЫЕ ЗНАКИ
    buildStreetFurniture(t);
}

// ----------------------------------------------------
// 1. БАЗОВАЯ ПОДЛОЖКА
// ----------------------------------------------------
function buildGroundBase(group) {
    const geom = new THREE.BoxGeometry(175, 0.12, 145);
    const mesh = new THREE.Mesh(geom, MATERIALS.lawn);
    mesh.position.set(28, -0.12, -24);
    mesh.receiveShadow = true;
    mesh.userData.isExterior = true;
    group.add(mesh);
}

// ----------------------------------------------------
// 2. ГЛАВНАЯ АВТОДОРОГА (4 ПОЛОСЫ: 2 В КАЖДУЮ СТОРОНУ)
// ----------------------------------------------------
function buildMainRoad(group) {
    const xStart = -45;
    const xEnd = 92;
    const roadLen = xEnd - xStart;

    // 4 полосы движения по 3.5 м = 14.0 м + краевые зоны = 14.6 м
    const roadWidth = 14.6;
    const zCenter = 35.5;
    const zNorth = zCenter - roadWidth / 2; // 28.2
    const zSouth = zCenter + roadWidth / 2; // 42.8

    // Асфальтовое полотно главной дороги
    const roadGeom = new THREE.BoxGeometry(roadLen, 0.14, roadWidth);
    const roadMesh = new THREE.Mesh(roadGeom, MATERIALS.asphaltRoad);
    roadMesh.position.set((xStart + xEnd) / 2, -0.05, zCenter);
    roadMesh.receiveShadow = true;
    group.add(roadMesh);

    // Южный бордюр и широкий южный тротуар (вся южная сторона — мощение тротуара, без зелени)
    addCurbSegment(group, xStart, zSouth, xEnd, zSouth);
    const southWalkGeom = new THREE.BoxGeometry(roadLen, 0.16, 12.0);
    const southWalkMesh = new THREE.Mesh(southWalkGeom, MATERIALS.sidewalk);
    southWalkMesh.position.set((xStart + xEnd) / 2, -0.02, zSouth + 6.0);
    southWalkMesh.receiveShadow = true;
    group.add(southWalkMesh);

    // Местоположение пешеходного перехода «Зебра» (сдвинут ещё правее/восточнее: X: 54.0..58.0)
    const zX1 = 54.0;
    const zX2 = 58.0;

    // --- ДОРОЖНАЯ РАЗМЕТКА 4-ПОЛОСНОЙ ДОРОГИ ---

    // 1) Осевая двойная сплошная линия (разметка 1.3) по центру Z = 35.5
    // С разрывом ровно на пешеходном переходе X: 54.0..58.0
    addRoadStripe(group, xStart, zCenter - 0.10, zX1, zCenter - 0.10, 0.12, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, xStart, zCenter + 0.10, zX1, zCenter + 0.10, 0.12, MATERIALS.roadMarkingWhite);

    addRoadStripe(group, zX2, zCenter - 0.10, xEnd, zCenter - 0.10, 0.12, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, zX2, zCenter + 0.10, xEnd, zCenter + 0.10, 0.12, MATERIALS.roadMarkingWhite);

    // 2) Прерывистые полосы между 1-й и 2-й полосами (разметка 1.5)
    // Северное направление (Z = 31.85)
    addDashedLine(group, xStart, zX1, 31.85, 3.0, 3.0, 0.15, MATERIALS.roadMarkingWhite);
    addDashedLine(group, zX2, xEnd, 31.85, 3.0, 3.0, 0.15, MATERIALS.roadMarkingWhite);

    // Южное направление (Z = 39.15)
    addDashedLine(group, xStart, zX1, 39.15, 3.0, 3.0, 0.15, MATERIALS.roadMarkingWhite);
    addDashedLine(group, zX2, xEnd, 39.15, 3.0, 3.0, 0.15, MATERIALS.roadMarkingWhite);

    // 3) Краевые сплошные линии (разметка 1.1)
    // Южный край
    addRoadStripe(group, xStart, zSouth - 0.45, zX1, zSouth - 0.45, 0.15, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, zX2, zSouth - 0.45, xEnd, zSouth - 0.45, 0.15, MATERIALS.roadMarkingWhite);

    // Северный край дороги:
    addRoadStripe(group, xStart, zNorth + 0.45, -10.0, zNorth + 0.45, 0.15, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, 40.5, zNorth + 0.45, zX1, zNorth + 0.45, 0.15, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, zX2, zNorth + 0.45, 71.0, zNorth + 0.45, 0.15, MATERIALS.roadMarkingWhite);
    addRoadStripe(group, 79.0, zNorth + 0.45, xEnd, zNorth + 0.45, 0.15, MATERIALS.roadMarkingWhite);

    // --- ПЕШЕХОДНЫЙ ПЕРЕХОД («ЗЕБРА» 1.14.1) ---
    // Полосы ориентированы ВДОЛЬ направления движения (по оси X)!
    addZebraCrossingCorrect(group, zX1, zX2, zNorth + 0.2, zSouth - 0.2);

    // Знаки «Пешеходный переход» 5.19.1 и 5.19.2
    addPedestrianCrossingSign(group, zX1 - 0.5, zNorth - 0.5, 0);
    addPedestrianCrossingSign(group, zX2 + 0.5, zSouth + 0.6, Math.PI);
}

// ----------------------------------------------------
// 3. АВТОБУСНАЯ ОСТАНОВКА (БОЛЬШОЙ КАРМАН, ПАРАПЕТ, ПАВИЛЬОН)
// ----------------------------------------------------
function buildBusStop(group) {
    const zRoadNorth = 28.2;
    const pocketDepth = 2.8;
    const zPocketEdge = zRoadNorth - pocketDepth; // 25.4

    // Заездной карман для автобусов (продолговатый, от X: -6.0 до 38.0, длина 44 м)
    const xBayStart = -6.0;
    const xBayEnd = 38.0;
    const bayLen = xBayEnd - xBayStart;

    // Асфальт кармана (ровно встык с дорогой)
    const bayGeom = new THREE.BoxGeometry(bayLen, 0.14, pocketDepth);
    const bayMesh = new THREE.Mesh(bayGeom, MATERIALS.asphaltRoad);
    bayMesh.position.set((xBayStart + xBayEnd) / 2, -0.05, (zRoadNorth + zPocketEdge) / 2);
    bayMesh.receiveShadow = true;
    group.add(bayMesh);

    // Плавные скошенные заезды в карман (tapers) с заполнением асфальтом без дыр в газоне
    addAsphaltTriangle(group, [
        [-10.0, zRoadNorth],
        [xBayStart, zPocketEdge],
        [xBayStart, zRoadNorth]
    ], MATERIALS.asphaltRoad);
    addCurbSegment(group, -10.0, zRoadNorth, xBayStart, zPocketEdge);

    addAsphaltTriangle(group, [
        [xBayEnd, zPocketEdge],
        [40.5, zRoadNorth],
        [xBayEnd, zRoadNorth]
    ], MATERIALS.asphaltRoad);
    addCurbSegment(group, xBayEnd, zPocketEdge, 40.5, zRoadNorth);

    // Желтая зигзагообразная разметка 1.17 строго внутри кармана
    addBusStopYellowZigzag(group, xBayStart + 1.0, xBayEnd - 1.0, zRoadNorth - 0.4, zPocketEdge + 0.4);

    // БОЛЬШОЙ АВТОБУСНЫЙ ПАРАПЕТ (ПРИПОДНЯТАЯ ПОСАДОЧНАЯ ПЛОЩАДКА)
    // Тянется вдоль кармана (X: -8.0..40.5, глубина 3.8 м, Z: 21.6..25.4)
    const platX1 = -8.0;
    const platX2 = 40.5;
    const platLen = platX2 - platX1;
    const platDepth = 3.8;
    const platGeom = new THREE.BoxGeometry(platLen, 0.16, platDepth);
    const platMesh = new THREE.Mesh(platGeom, MATERIALS.sidewalk);
    platMesh.position.set((platX1 + platX2) / 2, -0.02, zPocketEdge - platDepth / 2);
    platMesh.receiveShadow = true;
    group.add(platMesh);

    // Бордюрный камень вдоль кармана
    addCurbSegment(group, xBayStart, zPocketEdge, xBayEnd, zPocketEdge);

    // БОЛЬШОЙ СОВРЕМЕННЫЙ ПАВИЛЬОН ОЖИДАНИЯ
    // Размещен по центру посадочной площадки
    buildLargeShelter(group, 12.0, zPocketEdge - 2.0);

    // Дорожные знаки «Место остановки автобуса» (5.16)
    addBusStopSign(group, 32.0, zPocketEdge - 0.4);
    addBusStopSign(group, 2.0, zPocketEdge - 0.4);
}

function buildLargeShelter(group, cx, cz) {
    // Большой павильон: ширина 7.6 м, глубина 2.1 м, высота 2.65 м
    const w = 7.6;
    const d = 2.1;
    const h = 2.65;

    const shelterGroup = new THREE.Group();
    shelterGroup.position.set(cx, 0, cz);

    // 6 опорных вертикальных стоек
    const colGeom = new THREE.BoxGeometry(0.09, h, 0.09);
    const colXs = [-w / 2 + 0.1, 0, w / 2 - 0.1];
    const colZs = [-d / 2 + 0.1, d / 2 - 0.1];

    for (const xo of colXs) {
        for (const zo of colZs) {
            const col = new THREE.Mesh(colGeom, MATERIALS.shelterFrame);
            col.position.set(xo, h / 2, zo);
            col.castShadow = true;
            shelterGroup.add(col);
        }
    }

    // Верхние горизонтальные балки
    const beamLong = new THREE.BoxGeometry(w, 0.09, 0.09);
    const bFront = new THREE.Mesh(beamLong, MATERIALS.shelterFrame);
    bFront.position.set(0, h - 0.05, d / 2 - 0.1);
    shelterGroup.add(bFront);

    const bBack = new THREE.Mesh(beamLong, MATERIALS.shelterFrame);
    bBack.position.set(0, h - 0.05, -d / 2 + 0.1);
    shelterGroup.add(bBack);

    // Широкая крыша-козырек
    const roofGeom = new THREE.BoxGeometry(w + 0.6, 0.09, d + 0.6);
    const roofMesh = new THREE.Mesh(roofGeom, MATERIALS.shelterRoof);
    roofMesh.position.set(0, h + 0.05, 0.15);
    roofMesh.rotation.x = 0.02;
    roofMesh.castShadow = true;
    shelterGroup.add(roofMesh);

    // Заднее панорамное остекление
    const glassW = (w - 0.4) / 2;
    const glassGeom = new THREE.BoxGeometry(glassW - 0.05, h - 0.35, 0.03);
    const glass1 = new THREE.Mesh(glassGeom, MATERIALS.shelterGlass);
    glass1.position.set(-glassW / 2 - 0.05, (h - 0.35) / 2 + 0.15, -d / 2 + 0.1);
    shelterGroup.add(glass1);

    const glass2 = new THREE.Mesh(glassGeom, MATERIALS.shelterGlass);
    glass2.position.set(glassW / 2 + 0.05, (h - 0.35) / 2 + 0.15, -d / 2 + 0.1);
    shelterGroup.add(glass2);

    // Боковые ветрозащитные стекла
    const glassSideGeom = new THREE.BoxGeometry(0.03, h - 0.35, d - 0.25);
    const glassLeft = new THREE.Mesh(glassSideGeom, MATERIALS.shelterGlass);
    glassLeft.position.set(-w / 2 + 0.1, (h - 0.35) / 2 + 0.15, 0);
    shelterGroup.add(glassLeft);

    const glassRight = new THREE.Mesh(glassSideGeom, MATERIALS.shelterGlass);
    glassRight.position.set(w / 2 - 0.1, (h - 0.35) / 2 + 0.15, 0);
    shelterGroup.add(glassRight);

    // Две скамьи внутри
    const benchW = glassW - 0.4;
    const seatGeom = new THREE.BoxGeometry(benchW, 0.06, 0.42);
    const bench1 = new THREE.Mesh(seatGeom, MATERIALS.shelterBench);
    bench1.position.set(-glassW / 2 - 0.05, 0.46, -d / 2 + 0.38);
    bench1.castShadow = true;
    shelterGroup.add(bench1);

    const bench2 = new THREE.Mesh(seatGeom, MATERIALS.shelterBench);
    bench2.position.set(glassW / 2 + 0.05, 0.46, -d / 2 + 0.38);
    bench2.castShadow = true;
    shelterGroup.add(bench2);

    // Урны с двух сторон
    const binGeom = new THREE.CylinderGeometry(0.2, 0.17, 0.65, 12);
    const bin1 = new THREE.Mesh(binGeom, MATERIALS.shelterFrame);
    bin1.position.set(-w / 2 - 0.4, 0.33, d / 2 - 0.3);
    shelterGroup.add(bin1);

    const bin2 = new THREE.Mesh(binGeom, MATERIALS.shelterFrame);
    bin2.position.set(w / 2 + 0.4, 0.33, d / 2 - 0.3);
    shelterGroup.add(bin2);

    group.add(shelterGroup);
}

// ----------------------------------------------------
// 4. СЕТЬ ПОДЪЕЗДНЫХ ДОРОГ (ТОЧНО ПОДОГНАНА ПОД КООРДИНАТЫ СХЕМЫ КОЛЬЦЕВОЙ ДОРОГИ)
// ----------------------------------------------------
function buildDrivewaysAndInnerRoads(group) {
    // Координаты восточного проезда подогнаны 1-в-1 под схему buildRingRoadAroundCollege:
    const roadX1 = 72.0;
    const roadX2 = 77.0;
    const roadW = roadX2 - roadX1; // 5.0 м
    const roadMidX = (roadX1 + roadX2) / 2; // 74.5

    // 1) ВЪЕЗД С ГЛАВНОЙ ДОРОГИ (Z: 28.2..24.5) С АСФАЛЬТОВЫМИ РАСШИРЕНИЯМИ (FLARES) И БОРДЮРАМИ
    const entryZStart = 24.5;
    const entryZEnd = 28.2;
    const entryLen = entryZEnd - entryZStart; // 3.7 м
    const entryGeom = new THREE.BoxGeometry(roadW, 0.14, entryLen);
    const entryMesh = new THREE.Mesh(entryGeom, MATERIALS.asphaltDriveway);
    entryMesh.position.set(roadMidX, -0.05, (entryZStart + entryZEnd) / 2);
    entryMesh.receiveShadow = true;
    group.add(entryMesh);

    // Закругления бордюров и клинья асфальта под ними
    addAsphaltTriangle(group, [
        [70.0, 28.2],
        [roadX1, 24.5],
        [roadX1, 28.2]
    ], MATERIALS.asphaltDriveway);
    addCurbSegment(group, 70.0, 28.2, roadX1, 24.5);

    addAsphaltTriangle(group, [
        [roadX2, 24.5],
        [80.0, 28.2],
        [roadX2, 28.2]
    ], MATERIALS.asphaltDriveway);
    addCurbSegment(group, roadX2, 24.5, 80.0, 28.2);

    // 2) ВОСТОЧНЫЙ ПРОЕЗД (Вдоль Корпуса 2 и Корпуса 4)
    // Северная дорога на Z: -71.5..-66.5 (центр -69.0)
    const northRoadZ1 = -71.5;
    const northRoadZ2 = -66.5;
    const northRoadW = 5.0;
    const northRoadZMid = -69.0;

    // Внутренний проезд между К2 и К4 по схеме: Z: -23.2..-18.2 (центр -20.7)
    const innerZSouth = -18.2;
    const innerZNorth = -23.2;
    const innerRoadW = 5.0;
    const innerXWest = 17.5;
    const innerXEast = 22.5;

    const eastLen = entryZStart - northRoadZ1; // от 24.5 до -71.5 (96.0 м)
    const eastZMid = (entryZStart + northRoadZ1) / 2;
    const eastGeom = new THREE.BoxGeometry(roadW, 0.14, eastLen);
    const eastMesh = new THREE.Mesh(entryGeom ? eastGeom : null, MATERIALS.asphaltDriveway);
    eastMesh.position.set(roadMidX, -0.05, eastZMid);
    eastMesh.receiveShadow = true;
    group.add(eastMesh);

    // Внешний восточный бордюр
    addCurbSegment(group, roadX2, entryZStart, roadX2, northRoadZ1);

    // Внутренний западный бордюр восточного проезда (с разрывом на въезд между К2 и К4)
    addCurbSegment(group, roadX1, entryZStart, roadX1, innerZSouth);
    addCurbSegment(group, roadX1, innerZNorth, roadX1, northRoadZ2);

    // 3) ВНУТРЕННИЙ ПРОЕЗД МЕЖДУ КОРПУСОМ 2 И КОРПУСОМ 4 (СТРОГО ПО КООРДИНАТАМ СХЕМЫ)
    // Разрыв под надземным переходом 2-го этажа К4 ↔ К2 (X [36.0..38.8], Z [-27.4..-13.8])
    const midZMid = (innerZNorth + innerZSouth) / 2; // -20.7
    const midLen1 = 36.0 - innerXEast; // от 22.5 до 36.0 (13.5 м)
    const midGeom1 = new THREE.BoxGeometry(midLen1, 0.14, innerRoadW);
    const midMesh1 = new THREE.Mesh(midGeom1, MATERIALS.asphaltDriveway);
    midMesh1.position.set((innerXEast + 36.0) / 2, -0.05, midZMid);
    midMesh1.receiveShadow = true;
    group.add(midMesh1);

    const midLen2 = roadX1 - 38.8; // от 38.8 до 72.0 (33.2 м)
    const midGeom2 = new THREE.BoxGeometry(midLen2, 0.14, innerRoadW);
    const midMesh2 = new THREE.Mesh(midGeom2, MATERIALS.asphaltDriveway);
    midMesh2.position.set((38.8 + roadX1) / 2, -0.05, midZMid);
    midMesh2.receiveShadow = true;
    group.add(midMesh2);

    // Полотно проезда под переходом К4 ↔ К2 (утоплено на грунте, чтобы плита перехода 2-го этажа не пересекалась)
    const midUnderGeom = new THREE.BoxGeometry(38.8 - 36.0, 0.10, innerRoadW);
    const midUnderMesh = new THREE.Mesh(midUnderGeom, MATERIALS.asphaltDriveway);
    midUnderMesh.position.set((36.0 + 38.8) / 2, -0.14, midZMid);
    midUnderMesh.receiveShadow = true;
    group.add(midUnderMesh);

    // Бордюры горизонтального проезда с разрывом под переходом К4 ↔ К2
    addCurbSegment(group, innerXEast, innerZSouth, 36.0, innerZSouth);
    addCurbSegment(group, innerXEast, innerZNorth, 36.0, innerZNorth);
    addCurbSegment(group, 38.8, innerZSouth, roadX1, innerZSouth);
    addCurbSegment(group, 38.8, innerZNorth, roadX1, innerZNorth);

    // 4) ВНУТРЕННИЙ ПРОЕЗД МЕЖДУ КОРПУСОМ 3 И КОРПУСОМ 4 (СТРОГО ПО КООРДИНАТАМ СХЕМЫ)
    // Разрыв под надземным переходом 2-го этажа К3 ↔ К4 (X [15.6..32.4], Z [-46.8..-44.0])
    const vertXMid = (innerXWest + innerXEast) / 2; // 20.0
    // Северный участок (от северной дороги до перехода Z = -46.8)
    const vertLen1 = Math.abs(-46.8 - northRoadZ2); // от -66.5 до -46.8 (19.7 м)
    const vertGeom1 = new THREE.BoxGeometry(innerRoadW, 0.14, vertLen1);
    const vertMesh1 = new THREE.Mesh(vertGeom1, MATERIALS.asphaltDriveway);
    vertMesh1.position.set(vertXMid, -0.05, (northRoadZ2 + -46.8) / 2);
    vertMesh1.receiveShadow = true;
    group.add(vertMesh1);

    // Южный участок (от перехода Z = -44.0 до внутреннего проезда Z = -18.2)
    const vertLen2 = Math.abs(innerZSouth - -44.0); // от -44.0 до -18.2 (25.8 м)
    const vertGeom2 = new THREE.BoxGeometry(innerRoadW, 0.14, vertLen2);
    const vertMesh2 = new THREE.Mesh(vertGeom2, MATERIALS.asphaltDriveway);
    vertMesh2.position.set(vertXMid, -0.05, (-44.0 + innerZSouth) / 2);
    vertMesh2.receiveShadow = true;
    group.add(vertMesh2);

    // Полотно проезда под переходом К3 ↔ К4 (утоплено на грунте, чтобы плита перехода 2-го этажа не пересекалась)
    const vertUnderGeom = new THREE.BoxGeometry(innerRoadW, 0.10, Math.abs(-44.0 - -46.8));
    const vertUnderMesh = new THREE.Mesh(vertUnderGeom, MATERIALS.asphaltDriveway);
    vertUnderMesh.position.set(vertXMid, -0.14, (-46.8 + -44.0) / 2);
    vertUnderMesh.receiveShadow = true;
    group.add(vertUnderMesh);

    // Бордюры вертикального проезда с разрывом под переходом К3 ↔ К4
    addCurbSegment(group, innerXWest, northRoadZ2, innerXWest, -46.8);
    addCurbSegment(group, innerXEast, northRoadZ2, innerXEast, -46.8);
    addCurbSegment(group, innerXWest, -44.0, innerXWest, innerZSouth);
    addCurbSegment(group, innerXEast, -44.0, innerXEast, innerZNorth);
    // Южный тупиковый поворот между К2 и К3
    addCurbSegment(group, innerXWest, innerZSouth, innerXEast, innerZSouth);

    // 5) СЕВЕРНЫЙ ПРОЕЗД (СТРОГО ПО КООРДИНАТАМ СХЕМЫ)
    // X: от northWestEnd (-18.0) до roadX2 (77.0), Z: от northRoadZ1 (-71.5) до northRoadZ2 (-66.5)
    const northWestEnd = -18.0;
    const northLen = roadX2 - northWestEnd; // 95.0 м
    const northXMid = (northWestEnd + roadX2) / 2; // 29.5

    const northGeom = new THREE.BoxGeometry(northLen, 0.14, northRoadW);
    const northMesh = new THREE.Mesh(northGeom, MATERIALS.asphaltDriveway);
    northMesh.position.set(northXMid, -0.05, northRoadZMid);
    northMesh.receiveShadow = true;
    group.add(northMesh);

    // Северный бордюр (внешний)
    addCurbSegment(group, northWestEnd, northRoadZ1, roadX2, northRoadZ1);
    // Южный бордюр с разрывом на выезд из внутреннего двора
    addCurbSegment(group, northWestEnd, northRoadZ2, innerXWest, northRoadZ2);
    addCurbSegment(group, innerXEast, northRoadZ2, roadX1, northRoadZ2);
    // Западный торцевой бордюр
    addCurbSegment(group, northWestEnd, northRoadZ1, northWestEnd, northRoadZ2);
}

// ----------------------------------------------------
// 5. ПЕШЕХОДНАЯ ПЛОЩАДЬ (СЕРЫЙ ПРИЯТНЫЙ ТРОТУАР ВМЕСТО БЕЛОГО)
// ----------------------------------------------------
function buildForecourtAndPlaza(group) {
    // Вся передняя зона покрыта серым архитектурным тротуарным покрытием
    // 1) Площадь перед Корпусом 1:
    // X: от -24.0 до 20.4, Z: от 14.0 до 25.4 (встык с автобусным парапетом)
    const plaza1Geom = new THREE.BoxGeometry(44.4, 0.16, 11.4);
    const plaza1Mesh = new THREE.Mesh(plaza1Geom, MATERIALS.sidewalk);
    plaza1Mesh.position.set((-24.0 + 20.4) / 2, -0.02, (14.0 + 25.4) / 2);
    plaza1Mesh.receiveShadow = true;
    group.add(plaza1Mesh);

    // 2) Широкий пешеходный променад перед Корпусом 2 (южнее газона К2):
    // X: 20.4..72.0, Z: 17.0..24.5 (точно стыкуется с бордюром въезда Z=24.5 без выступающих углов!)
    const promLen = 72.0 - 20.4;
    const promDepth = 24.5 - 17.0; // 7.5 м
    const promGeom = new THREE.BoxGeometry(promLen, 0.16, promDepth);
    const promMesh = new THREE.Mesh(promGeom, MATERIALS.sidewalk);
    promMesh.position.set((20.4 + 72.0) / 2, -0.02, (17.0 + 24.5) / 2);
    promMesh.receiveShadow = true;
    group.add(promMesh);

    // 3) Тротуар к западному входу Корпуса 2 (в стыке между К1 и К2):
    const b2WalkGeom = new THREE.BoxGeometry(5.0, 0.16, 13.5);
    const b2WalkMesh = new THREE.Mesh(b2WalkGeom, MATERIALS.sidewalk);
    b2WalkMesh.position.set(18.0, -0.02, (3.5 + 17.0) / 2);
    b2WalkMesh.receiveShadow = true;
    group.add(b2WalkMesh);

    // Внешние бордюры пешеходной площади
    addCurbSegment(group, -24.0, 14.0, -24.0, 28.2);
    addCurbSegment(group, 72.0, 17.0, 72.0, 24.5);
}

// ----------------------------------------------------
// 6. ОЗЕЛЕНЕНИЕ (ГАЗОН КОРПУСА 2 С ДЕРЕВЬЯМИ И ДЕРЕВЬЯ ВДОЛЬ ВОСТОЧНОЙ ГРАНИЦЫ)
// ----------------------------------------------------
function buildLandscaping(group) {
    // 1. ВЫДЕЛЕННЫЙ ГАЗОН ПЕРЕД КОРПУСОМ 2 (КРАСНАЯ РАМКА НА СНИМКЕ ПОЛЬЗОВАТЕЛЯ!)
    // X: 20.4..68.0, Z: 3.5..17.0
    const lawnW = 68.0 - 20.4; // 47.6 м
    const lawnD = 17.0 - 3.5;  // 13.5 м
    const lawnGeom = new THREE.BoxGeometry(lawnW, 0.18, lawnD);
    const lawnMesh = new THREE.Mesh(lawnGeom, MATERIALS.lawn);
    lawnMesh.position.set((20.4 + 68.0) / 2, -0.01, (3.5 + 17.0) / 2);
    lawnMesh.receiveShadow = true;
    group.add(lawnMesh);

    // Замкнутый бордюр вокруг газона перед Корпусом 2
    addCurbSegment(group, 20.4, 3.5, 68.0, 3.5);
    addCurbSegment(group, 68.0, 3.5, 68.0, 17.0);
    addCurbSegment(group, 68.0, 17.0, 20.4, 17.0);
    addCurbSegment(group, 20.4, 17.0, 20.4, 3.5);

    // 5 деревьев на газоне перед Корпусом 2
    const b2TreeXs = [26.0, 36.0, 46.0, 56.0, 64.0];
    b2TreeXs.forEach((tx, idx) => {
        addArchitecturalTree(group, tx, 10.2, 1.15 + (idx % 2) * 0.1, false);
    });

    // 2. Деревья вдоль восточного подъезда колледжа (вдоль внешней границы)
    const drivewayTrees = [
        { x: 80.8, z: 22.0 },
        { x: 80.8, z: 12.0 },
        { x: 80.8, z: 2.0 },
        { x: 80.8, z: -8.0 },
        { x: 80.8, z: -18.0 },
        { x: 80.8, z: -30.0 },
        { x: 80.8, z: -42.0 },
        { x: 80.8, z: -54.0 }
    ];
    drivewayTrees.forEach((tPos, idx) => {
        addArchitecturalTree(group, tPos.x, tPos.z, 1.15 + (idx % 3) * 0.08, idx % 2 === 1);
    });
}

// ----------------------------------------------------
// 7. УЛИЧНАЯ ИНФРАСТРУКТУРА, СВЕТИЛЬНИКИ, ШЛАГБАУМЫ
// ----------------------------------------------------
function buildStreetFurniture(group) {
    // Опоры освещения размещены СТРОГО на тротуарах и газонах за бордюрами (ноль столбов на проезжей части!)
    // 1) Фонари на тротуаре вдоль дороги (вне кармана остановки: бордюр на Z=28.2, фонарь на Z=27.0)
    addStreetLamp(group, -35.0, 27.0, Math.PI / 2);
    addStreetLamp(group, 52.0, 27.0, Math.PI / 2);
    addStreetLamp(group, 66.0, 27.0, Math.PI / 2);

    // 2) Фонари посадочной платформы остановки (бордюр кармана на Z=25.4, фонари на задней кромке платформы Z=22.0)
    addStreetLamp(group, 0.0, 22.0, Math.PI / 2);
    addStreetLamp(group, 24.0, 22.0, Math.PI / 2);
}

// ----------------------------------------------------
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ГЕОМЕТРИИ
// ----------------------------------------------------

function addAsphaltTriangle(group, points, material = MATERIALS.asphaltRoad, yTop = 0.02, depth = 0.14) {
    if (!points || points.length < 3) return null;
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, {
        depth: depth,
        bevelEnabled: false
    });
    geom.rotateX(Math.PI / 2);

    const mesh = new THREE.Mesh(geom, material);
    mesh.position.set(0, yTop, 0);
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
}

function addCurbSegment(group, x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.05) return;

    const angle = Math.atan2(dz, dx);
    const curbGeom = new THREE.BoxGeometry(len, 0.18, 0.18);
    const curbMesh = new THREE.Mesh(curbGeom, MATERIALS.curb);
    curbMesh.position.set((x1 + x2) / 2, 0.04, (z1 + z2) / 2);
    curbMesh.rotation.y = -angle;
    group.add(curbMesh);
}

function addRoadStripe(group, x1, z1, x2, z2, width = 0.15, material = MATERIALS.roadMarkingWhite) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    if (len < 0.05) return;

    const angle = Math.atan2(dz, dx);
    const geom = new THREE.PlaneGeometry(len, width);
    const mesh = new THREE.Mesh(geom, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = angle;
    mesh.position.set((x1 + x2) / 2, 0.025, (z1 + z2) / 2);
    group.add(mesh);
}

function addDashedLine(group, xStart, xEnd, z, dashLen = 3.0, gapLen = 3.0, width = 0.15, material = MATERIALS.roadMarkingWhite) {
    let curX = Math.min(xStart, xEnd);
    const maxVal = Math.max(xStart, xEnd);

    while (curX < maxVal) {
        const nextX = Math.min(curX + dashLen, maxVal);
        addRoadStripe(group, curX, z, nextX, z, width, material);
        curX += dashLen + gapLen;
    }
}

// ПРАВИЛЬНАЯ ЗЕБРА (1.14.1): Полосы идут ВДОЛЬ направления движения (по оси X)
function addZebraCrossingCorrect(group, x1, x2, z1, z2) {
    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const stripeLengthX = xMax - xMin; // длина перехода (ширина пешеходной зоны 4.0 м)

    const stripeThicknessZ = 0.45; // ширина белой полосы
    const stripeGapZ = 0.45; // зазор между полосами
    const stepZ = stripeThicknessZ + stripeGapZ;

    const zMin = Math.min(z1, z2);
    const zMax = Math.max(z1, z2);

    let curZ = zMin + stripeThicknessZ / 2;
    while (curZ <= zMax - stripeThicknessZ / 2) {
        const geom = new THREE.PlaneGeometry(stripeLengthX, stripeThicknessZ);
        const mesh = new THREE.Mesh(geom, MATERIALS.roadMarkingWhite);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set((xMin + xMax) / 2, 0.028, curZ);
        group.add(mesh);

        curZ += stepZ;
    }
}

function addBusStopYellowZigzag(group, x1, x2, z1, z2) {
    // Желтая зигзагообразная разметка 1.17 строго в границах кармана
    const zMid = (z1 + z2) / 2;
    const step = 1.3;
    const halfAmp = Math.abs(z2 - z1) * 0.40;

    let curX = x1;
    let up = true;

    while (curX + step <= x2) {
        const startZ = up ? zMid - halfAmp : zMid + halfAmp;
        const endZ = up ? zMid + halfAmp : zMid - halfAmp;
        addRoadStripe(group, curX, startZ, curX + step, endZ, 0.15, MATERIALS.roadMarkingYellow);
        curX += step;
        up = !up;
    }
}

function addBeveledBayCorners(group, x1, x2, z1, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const len = Math.hypot(dx, dz);
    const angle = Math.atan2(dz, dx);

    const cornerGeom = new THREE.BoxGeometry(len, 0.14, 0.8);
    const cornerMesh = new THREE.Mesh(cornerGeom, MATERIALS.asphaltRoad);
    cornerMesh.position.set((x1 + x2) / 2, -0.05, (z1 + z2) / 2);
    cornerMesh.rotation.y = -angle;
    group.add(cornerMesh);

    addCurbSegment(group, x1, z1, x2, z2);
}

function addArchitecturalTree(group, x, z, scale = 1.0, isRound = true) {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(x, 0, z);

    const trunkH = 1.4 * scale;
    const trunkGeom = new THREE.CylinderGeometry(0.1 * scale, 0.16 * scale, trunkH, 7);
    const trunkMesh = new THREE.Mesh(trunkGeom, MATERIALS.treeTrunk);
    trunkMesh.position.y = trunkH / 2;
    trunkMesh.castShadow = true;
    treeGroup.add(trunkMesh);

    const foliageMat = (x + z) % 2 === 0 ? MATERIALS.treeFoliage : MATERIALS.treeFoliageLight;

    if (isRound) {
        const crownR = 1.65 * scale;
        const crownGeom = new THREE.IcosahedronGeometry(crownR, 1);
        const crownMesh = new THREE.Mesh(crownGeom, foliageMat);
        crownMesh.position.y = trunkH + crownR * 0.85;
        crownMesh.rotation.y = (x * 37) % Math.PI;
        crownMesh.castShadow = true;
        treeGroup.add(crownMesh);
    } else {
        const coneH = 3.3 * scale;
        const coneR = 1.5 * scale;
        const coneGeom = new THREE.ConeGeometry(coneR, coneH, 7);
        const coneMesh = new THREE.Mesh(coneGeom, foliageMat);
        coneMesh.position.y = trunkH + coneH / 2;
        coneMesh.rotation.y = (z * 23) % Math.PI;
        coneMesh.castShadow = true;
        treeGroup.add(coneMesh);
    }

    group.add(treeGroup);
}

function addStreetLamp(group, x, z, rotY = 0) {
    const lampGroup = new THREE.Group();
    lampGroup.position.set(x, 0, z);
    lampGroup.rotation.y = rotY;

    const poleH = 5.2;
    const poleGeom = new THREE.CylinderGeometry(0.06, 0.09, poleH, 8);
    const poleMesh = new THREE.Mesh(poleGeom, MATERIALS.poleMetal);
    poleMesh.position.y = poleH / 2;
    poleMesh.castShadow = true;
    lampGroup.add(poleMesh);

    const armGeom = new THREE.BoxGeometry(1.2, 0.05, 0.05);
    const armMesh = new THREE.Mesh(armGeom, MATERIALS.poleMetal);
    armMesh.position.set(0.5, poleH - 0.1, 0);
    lampGroup.add(armMesh);

    const fixtureGeom = new THREE.BoxGeometry(0.55, 0.08, 0.18);
    const fixtureMesh = new THREE.Mesh(fixtureGeom, MATERIALS.shelterRoof);
    fixtureMesh.position.set(1.0, poleH - 0.15, 0);
    lampGroup.add(fixtureMesh);

    group.add(lampGroup);
}

// Шлагбаум поперек проезда с севера на юг (поперек X)
function addBarrierGate(group, x, z, roadWidth = 5.5) {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(x - roadWidth / 2 + 0.3, 0, z);

    const postGeom = new THREE.BoxGeometry(0.35, 1.1, 0.35);
    const postMesh = new THREE.Mesh(postGeom, MATERIALS.signBlue);
    postMesh.position.y = 0.55;
    postMesh.castShadow = true;
    gateGroup.add(postMesh);

    const armLen = roadWidth - 0.8;
    const armGeom = new THREE.BoxGeometry(armLen, 0.08, 0.05);
    const armMesh = new THREE.Mesh(armGeom, MATERIALS.signWhite);
    armMesh.position.set(armLen / 2 + 0.15, 0.9, 0);
    gateGroup.add(armMesh);

    const stripeCount = 4;
    for (let i = 0; i < stripeCount; i++) {
        const sGeom = new THREE.BoxGeometry(armLen / (stripeCount * 2), 0.09, 0.06);
        const sMesh = new THREE.Mesh(sGeom, MATERIALS.signRed);
        sMesh.position.set(0.25 + (i * 2 + 1) * (armLen / (stripeCount * 2)), 0.9, 0);
        gateGroup.add(sMesh);
    }

    group.add(gateGroup);
}

// Шлагбаум поперек проезда с запада на восток (поперек Z)
function addBarrierGateRotated(group, x, z, roadWidth = 5.0) {
    const gateGroup = new THREE.Group();
    gateGroup.position.set(x, 0, z - roadWidth / 2 + 0.3);

    const postGeom = new THREE.BoxGeometry(0.35, 1.1, 0.35);
    const postMesh = new THREE.Mesh(postGeom, MATERIALS.signBlue);
    postMesh.position.y = 0.55;
    postMesh.castShadow = true;
    gateGroup.add(postMesh);

    const armLen = roadWidth - 0.8;
    const armGeom = new THREE.BoxGeometry(0.05, 0.08, armLen);
    const armMesh = new THREE.Mesh(armGeom, MATERIALS.signWhite);
    armMesh.position.set(0, 0.9, armLen / 2 + 0.15);
    gateGroup.add(armMesh);

    const stripeCount = 4;
    for (let i = 0; i < stripeCount; i++) {
        const sGeom = new THREE.BoxGeometry(0.06, 0.09, armLen / (stripeCount * 2));
        const sMesh = new THREE.Mesh(sGeom, MATERIALS.signRed);
        sMesh.position.set(0, 0.9, 0.25 + (i * 2 + 1) * (armLen / (stripeCount * 2)));
        gateGroup.add(sMesh);
    }

    group.add(gateGroup);
}

function addPedestrianCrossingSign(group, x, z, rotY = 0) {
    const signGroup = new THREE.Group();
    signGroup.position.set(x, 0, z);
    signGroup.rotation.y = rotY;

    const poleGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.8, 6);
    const poleMesh = new THREE.Mesh(poleGeom, MATERIALS.poleMetal);
    poleMesh.position.y = 1.4;
    signGroup.add(poleMesh);

    const plateGeom = new THREE.BoxGeometry(0.55, 0.55, 0.03);
    const plateMesh = new THREE.Mesh(plateGeom, MATERIALS.signBlue);
    plateMesh.position.y = 2.8;
    signGroup.add(plateMesh);

    const triangleGeom = new THREE.BoxGeometry(0.42, 0.42, 0.04);
    const triangleMesh = new THREE.Mesh(triangleGeom, MATERIALS.signWhite);
    triangleMesh.position.y = 2.8;
    triangleMesh.rotation.z = Math.PI / 4;
    signGroup.add(triangleMesh);

    group.add(signGroup);
}

function addBusStopSign(group, x, z) {
    const signGroup = new THREE.Group();
    signGroup.position.set(x, 0, z);

    const poleGeom = new THREE.CylinderGeometry(0.04, 0.04, 2.7, 6);
    const poleMesh = new THREE.Mesh(poleGeom, MATERIALS.poleMetal);
    poleMesh.position.y = 1.35;
    signGroup.add(poleMesh);

    const plateGeom = new THREE.BoxGeometry(0.48, 0.72, 0.03);
    const plateMesh = new THREE.Mesh(plateGeom, MATERIALS.signBlue);
    plateMesh.position.y = 2.6;
    signGroup.add(plateMesh);

    const innerGeom = new THREE.BoxGeometry(0.38, 0.38, 0.04);
    const innerMesh = new THREE.Mesh(innerGeom, MATERIALS.signWhite);
    innerMesh.position.y = 2.72;
    signGroup.add(innerMesh);

    group.add(signGroup);
}

window.buildTerritory = buildTerritory;


function buildRingRoadAroundCollege(group) {
    const targetGroup = group || window.roadNetworkGroup || (typeof roadNetworkGroup !== 'undefined' ? roadNetworkGroup : null);
    if (!targetGroup) return;
    while (targetGroup.children.length > 0) {
        targetGroup.remove(targetGroup.children[0]);
    }
    const isDark = (typeof STATE !== 'undefined' && STATE.theme === 'dark');

    // Материалы для минималистичной дорожной сети
    const minimalRoadSurfaceMat = (typeof MATERIALS !== 'undefined' && MATERIALS.minimalRoadSurface) ? MATERIALS.minimalRoadSurface : new THREE.MeshStandardMaterial({
        color: isDark ? 0x181e28 : 0xc8d1dc,
        roughness: 0.95,
        metalness: 0.02,
        polygonOffset: true,
        polygonOffsetFactor: 2,
        polygonOffsetUnits: 2
    });

    const roadLineMat = (typeof MATERIALS !== 'undefined' && MATERIALS.roadContourLine) ? MATERIALS.roadContourLine : new THREE.LineBasicMaterial({
        color: isDark ? 0x94a3b8 : 0x334155, // Высококонтрастный контур (Slate-700 / Slate-400)
        linewidth: 1
    });

    const roadCenterLineMat = (typeof MATERIALS !== 'undefined' && MATERIALS.roadCenterLine) ? MATERIALS.roadCenterLine : new THREE.LineBasicMaterial({
        color: isDark ? 0x475569 : 0x64748b, // Неяркая осевая разметка полос
        linewidth: 1
    });

    const ySurface = 0.002;
    const yLine = 0.006;
    const yCenter = 0.008;

    // Вспомогательная функция для плоской минималистичной заливки полотна дороги
    function addRoadRibbon(x1, z1, x2, z2) {
        const xMin = Math.min(x1, x2);
        const xMax = Math.max(x1, x2);
        const zMin = Math.min(z1, z2);
        const zMax = Math.max(z1, z2);
        const w = xMax - xMin;
        const d = zMax - zMin;
        const geom = new THREE.PlaneGeometry(w, d);
        const mesh = new THREE.Mesh(geom, minimalRoadSurfaceMat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set((xMin + xMax) / 2, ySurface, (zMin + zMax) / 2);
        mesh.receiveShadow = false;
        targetGroup.add(mesh);
    }

    // Вспомогательная функция для кромочных контурных линий
    function addEdge(x1, z1, x2, z2) {
        const geom = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x1, yLine, z1),
            new THREE.Vector3(x2, yLine, z2)
        ]);
        const line = new THREE.Line(geom, roadLineMat);
        targetGroup.add(line);
    }

    // Накопление точек для осевой пунктирной разметки в один draw call
    const dashSegments = [];
    function addCenterDashes(x1, z1, x2, z2, dashLen = 3.0, gapLen = 2.5) {
        const dx = x2 - x1;
        const dz = z2 - z1;
        const totalLen = Math.hypot(dx, dz);
        if (totalLen < 0.5) return;
        const ux = dx / totalLen;
        const uz = dz / totalLen;
        let dist = 0;
        while (dist < totalLen) {
            const segLen = Math.min(dashLen, totalLen - dist);
            dashSegments.push(
                new THREE.Vector3(x1 + ux * dist, yCenter, z1 + uz * dist),
                new THREE.Vector3(x1 + ux * (dist + segLen), yCenter, z1 + uz * (dist + segLen))
            );
            dist += dashLen + gapLen;
        }
    }

    // ----------------------------------------------------
    // КОЛЬЦЕВЫЕ ПРОЕЗДЫ ВОКРУГ КОРПУСОВ КОЛЛЕДЖА
    // ----------------------------------------------------
    // Внутренний проезд между корпусами 2, 3 и 4:
    const innerXWest = 17.5;
    const innerXEast = 22.5;
    const innerZSouth = -18.2;
    const innerZNorth = -23.2;

    // Внешний восточный объезд (вдоль Корпуса 2 и 4 к северу):
    const eastRoadX1 = 72.0;
    const eastRoadX2 = 77.0;

    // Северный объезд сзади Корпуса 3 и Корпуса 4:
    const northRoadZ1 = -71.5;
    const northRoadZ2 = -66.5;
    const northWestEnd = -18.0;

    // Главная южная дорога (перед корпусами):
    const mainRoadZ1 = 28.5;
    const mainRoadZ2 = 38.5;
    const mainXStart = -35.0;
    const mainXEnd = 88.0;

    // 1. ПОЛОТНО ДОРОГИ (ПЛОСКАЯ МИНИМАЛИСТИЧНАЯ ЗАЛИВКА ПРОЕЗЖЕЙ ЧАСТИ)
    // Главная южная дорога
    addRoadRibbon(mainXStart, mainRoadZ1, mainXEnd, mainRoadZ2);
    // Восточный проезд
    addRoadRibbon(eastRoadX1, northRoadZ1, eastRoadX2, mainRoadZ1);
    // Северный объезд
    addRoadRibbon(northWestEnd, northRoadZ1, eastRoadX1, northRoadZ2);
    // Внутренний проезд (горизонтальный участок между К2 и К4 с разрывом под переходом К4 ↔ К2)
    addRoadRibbon(innerXEast, innerZNorth, 36.0, innerZSouth);
    addRoadRibbon(38.8, innerZNorth, eastRoadX1, innerZSouth);
    // Внутренний проезд (вертикальный участок между К3 и К4 с разрывом под переходом К3 ↔ К4)
    addRoadRibbon(innerXWest, northRoadZ2, innerXEast, -46.8);
    addRoadRibbon(innerXWest, -44.0, innerXEast, innerZSouth);

    // 2. ВЫРАЗИТЕЛЬНЫЕ КОНТУРНЫЕ ЛИНИИ КРОМОК ДОРОЖНОГО ПОЛОТНА
    // Внутренний двор:
    // Контур со стороны Корпуса 4 с разрывами под переходом К3 ↔ К4 и К4 ↔ К2
    addEdge(innerXEast, northRoadZ2, innerXEast, -46.8);
    addEdge(innerXEast, -44.0, innerXEast, innerZNorth);
    addEdge(innerXEast, innerZNorth, 36.0, innerZNorth);
    addEdge(38.8, innerZNorth, eastRoadX1, innerZNorth);
    // Контур со стороны Корпуса 3 и 2 с разрывами под переходом К3 ↔ К4 и К4 ↔ К2
    addEdge(innerXWest, northRoadZ2, innerXWest, -46.8);
    addEdge(innerXWest, -44.0, innerXWest, innerZSouth);
    addEdge(innerXWest, innerZSouth, 36.0, innerZSouth);
    addEdge(38.8, innerZSouth, eastRoadX1, innerZSouth);
    // Южный тупиковый поворот между К2 и К3
    addEdge(innerXWest, innerZSouth, innerXEast, innerZSouth);

    // Восточный проезд:
    // Внешняя (восточная) кромка
    addEdge(eastRoadX2, mainRoadZ1, eastRoadX2, northRoadZ1);
    // Внутренняя (западная) кромка с разрывом на въезд во внутренний двор
    addEdge(eastRoadX1, mainRoadZ1, eastRoadX1, innerZSouth);
    addEdge(eastRoadX1, innerZNorth, eastRoadX1, northRoadZ2);

    // Северный объезд:
    // Внешняя северная кромка
    addEdge(northWestEnd, northRoadZ1, eastRoadX2, northRoadZ1);
    // Внутренняя южная кромка с разрывом на выезд из внутреннего двора
    addEdge(northWestEnd, northRoadZ2, innerXWest, northRoadZ2);
    addEdge(innerXEast, northRoadZ2, eastRoadX1, northRoadZ2);

    // Главная южная дорога:
    addEdge(mainXStart, mainRoadZ1, eastRoadX1, mainRoadZ1);
    addEdge(eastRoadX2, mainRoadZ1, mainXEnd, mainRoadZ1);
    addEdge(mainXStart, mainRoadZ2, mainXEnd, mainRoadZ2);

    // 3. ОСЕВАЯ ПУНКТИРНАЯ РАЗМЕТКА ПОЛОС (УПРАВЛЯЕТСЯ ФЛАГОМ ROAD_SHOW_CENTERLINE)
    const showCenterline = (typeof STATE !== 'undefined' && typeof STATE.showRoadCenterline === 'boolean')
        ? STATE.showRoadCenterline
        : (typeof ROAD_SHOW_CENTERLINE !== 'undefined' ? ROAD_SHOW_CENTERLINE === 1 : true);

    if (showCenterline) {
        addCenterDashes(mainXStart + 2.0, 33.5, mainXEnd - 2.0, 33.5, 3.0, 2.5);
        addCenterDashes(74.5, mainRoadZ1, 74.5, northRoadZ1 + 2.5, 3.0, 2.5);
        addCenterDashes(northWestEnd + 2.0, -69.0, eastRoadX1 - 1.0, -69.0, 3.0, 2.5);
        // Разметка с разрывом под переходами
        addCenterDashes(innerXEast + 1.0, -20.7, 36.0, -20.7, 2.5, 2.0);
        addCenterDashes(38.8, -20.7, eastRoadX1 - 1.0, -20.7, 2.5, 2.0);
        addCenterDashes(20.0, northRoadZ2 + 1.0, 20.0, -46.8, 2.5, 2.0);
        addCenterDashes(20.0, -44.0, 20.0, -20.7, 2.5, 2.0);

        if (dashSegments.length > 0) {
            const centerGeom = new THREE.BufferGeometry().setFromPoints(dashSegments);
            const centerLines = new THREE.LineSegments(centerGeom, roadCenterLineMat);
            targetGroup.add(centerLines);
        }
    }
}

window.buildRingRoadAroundCollege = buildRingRoadAroundCollege;
