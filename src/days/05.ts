
type Point = [number, number];

type Line = [Point, Point];

export function serializePoint([x, y]: Point): string {
    return `${x},${y}`
}

export function deserializePoint(str: String): Point {
    return str.split(',').map((v) => parseInt(v, 10)) as Point;
}

export function parseLine(strline: String): Line {
    return strline.split('->').map((s) => s.trim()).map(deserializePoint) as Line;
}

export function range(start: number, end: number): Array<number> {
    return [...Array(end - start).keys()].map((v) => v + start)
}
export function expandHorizontal([[x0, y0], [x1, y1]]: Line): Array<Point> {
    if (x0 === x1) {
        return range(Math.min(y0, y1), Math.max(y0, y1) + 1).map((y) => [x0, y]);
    }
    return [];
}

export function expandVertical([[x0, y0], [x1, y1]]: Line): Array<Point> {
    if (y0 === y1) {
        return range(Math.min(x0, x1), Math.max(x0, x1) + 1).map((x) => [x, y0]);
    }
    return [];
}

export function expandDiagonal([[x0, y0], [x1, y1]]: Line): Array<Point> {
    if (Math.max(x0, x1) - Math.min(x0, x1) === Math.max(y0, y1) - Math.min(y0, y1)) {
        const diffX = x1 - x0;
        const diffY = y1 - y0;

        return range(0, Math.abs(diffX) + 1).map(
            (index) => [x0 + Math.sign(diffX) * index, y0 + Math.sign(diffY) * index]
        );
    }
    return [];
}

export function groupByCount<Type, Serialized>(
  input: Array<Type>,
  serialize: (v: Type) => Serialized,
  deserialize: (s: Serialized) => Type,
): Array<[Type, number]> {
    return [...input.map(serialize).reduce(
        (map, val) => map.set(val, 1 + (map.get(val) || 0)),
        new Map<Serialized, number>()
    )
    .entries()].map(([s, c]) => [deserialize(s), c]);
}

export function firstHalf(input: Array<Line>): number {
    const horizontal = input.flatMap(expandHorizontal);
    const vertical = input.flatMap(expandVertical);
    
    return groupByCount(horizontal.concat(vertical), serializePoint, deserializePoint)
        .filter(([_, count]) => count > 1)
        .length;
}

export function secondHalf(input: Array<Line>): number {
    const horizontal = input.flatMap(expandHorizontal);
    const vertical = input.flatMap(expandVertical);
    const diagonal = input.flatMap(expandDiagonal);
    
    return groupByCount(horizontal.concat(vertical, diagonal), serializePoint, deserializePoint)
        .filter(([_, count]) => count > 1)
        .length;
}