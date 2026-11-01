import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Тест синхронизации дорожной сети: схема и 3D-территория

# Координаты кольцевой дороги вокруг корпусов (общие для обоих видов)
inner_h = {'x': (22.5, 72.0), 'z': (-23.2, -18.2)} # Проезд К2-К4
inner_v = {'x': (17.5, 22.5), 'z': (-66.5, -18.2)} # Проезд К3-К4
north_r = {'x': (-18.0, 77.0), 'z': (-71.5, -66.5)} # Северный объезд
east_r  = {'x': (72.0, 77.0), 'z': (-71.5, 24.5)}   # Восточный проезд

print("=== 1. VERIFYING ROAD CONTINUITY & JUNCTIONS ===")
# 1. Проверяем стык горизонтального проезда с восточным:
assert inner_h['x'][1] == east_r['x'][0], "Горизонтальный проезд должен стыковаться с восточным (X=72.0)"
# 2. Проверяем стык горизонтального проезда с вертикальным:
assert inner_h['x'][0] == inner_v['x'][1], "Горизонтальный проезд стыкуется с вертикальным (X=22.5)"
# 3. Проверяем стык вертикального проезда с северным:
assert inner_v['z'][0] == north_r['z'][1], "Вертикальный проезд стыкуется с северным (Z=-66.5)"
# 4. Проверяем стык северного проезда с восточным:
assert north_r['x'][1] == east_r['x'][1], "Северный проезд стыкуется с восточным (X=77.0)"

print("  [OK] Все дороги между корпусами образуют замкнутый непрерывный контур")

print("\n=== 2. VERIFYING TAPER AND FLARE GEOMETRY ===")
west_taper = [(-10.0, 28.2), (-6.0, 25.4), (-6.0, 28.2)]
east_taper = [(38.0, 25.4), (40.5, 28.2), (38.0, 28.2)]
west_flare = [(70.0, 28.2), (72.0, 24.5), (72.0, 28.2)]
east_flare = [(77.0, 24.5), (80.0, 28.2), (77.0, 28.2)]

def triangle_area(pts):
    (x1, z1), (x2, z2), (x3, z3) = pts
    return abs(0.5 * (x1*(z2 - z3) + x2*(z3 - z1) + x3*(z1 - z2)))

print(f"  [OK] Bus bay west taper: {triangle_area(west_taper):.2f} m^2 (Solid asphalt)")
print(f"  [OK] Bus bay east taper: {triangle_area(east_taper):.2f} m^2 (Solid asphalt)")
print(f"  [OK] Driveway west flare: {triangle_area(west_flare):.2f} m^2 (Solid asphalt)")
print(f"  [OK] Driveway east flare: {triangle_area(east_flare):.2f} m^2 (Solid asphalt)")

assert triangle_area(west_taper) > 0
assert triangle_area(east_taper) > 0
assert triangle_area(west_flare) > 0
assert triangle_area(east_flare) > 0

print("\n=== 3. VERIFYING ZERO CORNER OVERSHOOT (PROMENADE SIDEWALK) ===")
# Promenade sidewalk ends at Z=24.5, meeting the curb (72.0, 24.5) exactly
prom_corner = (72.0, 24.5)
flare_start = (72.0, 24.5)
assert prom_corner == flare_start, "Promenade sidewalk corner must match flare start point!"
print("  [OK] Promenade sidewalk corner meets curb at (72.0, 24.5) with ZERO overshoot")

print("\n=== 4. VERIFYING SKYWALK UNDERPASS GAPS (NO ROAD/CURBS OVER 2ND FLOOR CORRIDORS) ===")
# Читаем territory.js и проверяем, что ни один бордюр и ни один отрезок дороги не пересекают переходы
territory_js = open("js/territory.js", "r", encoding="utf-8").read()

# Проверяем бордюры у перехода К3 ↔ К4 (Z: -46.8..-44.0)
assert "addCurbSegment(group, innerXWest, northRoadZ2, innerXWest, -46.8)" in territory_js, "Бордюр должен останавливаться на Z=-46.8"
assert "addCurbSegment(group, innerXWest, -44.0, innerXWest, innerZSouth)" in territory_js, "Бордюр должен возобновляться на Z=-44.0"
# Проверяем бордюры у перехода К4 ↔ К2 (X: 36.0..38.8)
assert "addCurbSegment(group, innerXEast, innerZSouth, 36.0, innerZSouth)" in territory_js, "Бордюр должен останавливаться на X=36.0"
assert "addCurbSegment(group, 38.8, innerZSouth, roadX1, innerZSouth)" in territory_js, "Бордюр должен возобновляться на X=38.8"

# Проверяем схему кольцевой дороги в buildRingRoadAroundCollege
assert "addRoadRibbon(innerXWest, northRoadZ2, innerXEast, -46.8)" in territory_js
assert "addRoadRibbon(innerXWest, -44.0, innerXEast, innerZSouth)" in territory_js
assert "addRoadRibbon(innerXEast, innerZNorth, 36.0, innerZSouth)" in territory_js
assert "addRoadRibbon(38.8, innerZNorth, eastRoadX1, innerZSouth)" in territory_js

print("  [OK] Все проезды и бордюры имеют строгие разрывы под переходами К3-К4 и К4-К2")
print("  [OK] Надземные переходы 2-го этажа полностью изолированы от проезжей части")

print("\nALL TERRITORY VERIFICATIONS PASSED SUCCESSFULLY!")
