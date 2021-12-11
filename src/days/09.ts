type Heightmap = Map<String, number>;

type Sizelimits = [number, number];

export function toCoordinate([x, y]: [number, number]) : string {
    return `${x},${y}`;
}

export function fromCoordinate(str: String): [number, number] {
    return str.split(',').map(v => parseInt(v)) as [number, number];
}

function sizeLimits(heights: Heightmap): Sizelimits {
    return [...heights.keys()].map(fromCoordinate)
        .reduce(([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)]);
}

export function findAdjecent(coord: String, limits: Sizelimits): Array<string> {
    const moves: Array<[number, number]> = [[-1, 0], [0, -1], [1, 0], [0, 1]];
    const [posX, posY] = fromCoordinate(coord);
    const [limX, limY] = limits;

    return moves
      .map<[number, number]>(([x, y]) => [posX + x, posY + y])
      .filter(([x, y]) => x >= 0 && y >= 0 && x <= limX && y <= limY)
      .map(v => toCoordinate(v));
}


export function isLowest(coord: String, heights: Heightmap, limits: Sizelimits): boolean {
    const value = heights.get(coord)!;
    return findAdjecent(coord, limits).every(c => heights.get(c)! > value);
}

export function basinSize(coord: String, heights: Heightmap, limits: Sizelimits): number {
    let set = new Set<String>([coord]);
    let arr = [coord];
    for (let i = 0; i < arr.length; ++i) {
        const el = arr[i];
        findAdjecent(el, limits)
          .filter((c) => heights.get(c)! < 9)
          .filter((c) => !set.has(c))
          .forEach((c) => {arr.push(c); set.add(c)});
    }
    return set.size;
}

export function parseInput(str: string): Heightmap {
    return str
      .split("\n")
      .reduce(
        (map, line, x) =>
          line
            .split("")
            .reduce(
              (map, height, y) =>
                map.set(toCoordinate([x, y]), parseInt(height, 10)),
              map
            ),
        new Map<String, number>()
      );
}

export function firstHalf(heights: Heightmap) : number {
    const limits = sizeLimits(heights);

    return [...heights.keys()]
      .filter((c) => isLowest(c, heights, limits))
      .map((c) => heights.get(c)!)
      .reduce((a, b) => a + b + 1, 0);
}

export function secondHalf(heights: Heightmap) : number {
    const limits = sizeLimits(heights);

    return [...heights.keys()]
      .filter((c) => isLowest(c, heights, limits))
      .map((c) => basinSize(c, heights, limits))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b)
}