import { range } from "./05";

type Coord = [number, number];
type StrCoord = string;
type EnterCost = [Coord, number];
type ArrayInput = Array<EnterCost>;
type MappedInput = Map<StrCoord, number>;
type Visited = Set<StrCoord>;
type Limits = [number, number];


export function parse(input: string): ArrayInput {
    const lines = input.split('\n');
    const maxX = lines[0].length;
    return range(0, lines.length).flatMap((y) =>
      range(0, maxX).map((x) => {
          const enterCost: Coord = [x, y];
          return [enterCost, parseInt(lines[y][x], 10)];
      }
    ));
}

function arrayToMappedInput(array: ArrayInput): MappedInput {
    return array.reduce(
      (map, [coord, cost]) => map.set(coordToStr(coord), cost),
      new Map<StrCoord, number>()
    );
}

function coordToStr(coord: Coord): StrCoord {
    return `${coord[0]},${coord[1]}`;
}

function strToCoord(str: StrCoord): Coord {
    return str.split(',').map(v => parseInt(v, 10)) as Coord;
}

function getLimits(input: ArrayInput): Limits {
    return [
        input.map(([[x, _]]) => x).reduce((a, b) => Math.max(a, b)),
        input.map(([[_, y]]) => y).reduce((a, b) => Math.max(a, b)),
    ];
}

function getNeighbours(limits: Limits, [x, y]: Coord): Array<Coord> {
    const options: Array<Coord> = [ [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1] ];
    return options.filter(([x, y]) => x >= 0 && x <= limits[0] && y >= 0 && y <= limits[1]);
}

interface StaticDijkstraState {
    input: MappedInput,
    to: StrCoord,
    limits: Limits,
}

function dijkstra(current: EnterCost, options: MappedInput, visited: Visited, state: StaticDijkstraState): number {
    while (coordToStr(current[0]) !== state.to) {
        let [coord, cost] = current;
        visited.add(coordToStr(coord));

        getNeighbours(state.limits, coord)
          .map(coordToStr)
          .filter((strCoord) => !visited.has(strCoord))
          .map<[StrCoord, number]>((strCoord) => [strCoord, state.input.get(strCoord) || 0])
          .forEach(([strCoord, entryCost]) => {
            if (cost + entryCost < (options.get(strCoord) || Infinity))
                options.set(strCoord, cost + entryCost);
          });

        const next = [...options.entries()].reduce((a, b) => a[1] < b[1] ? a : b);
        options.delete(next[0]);

        current = [strToCoord(next[0]), next[1]];
    }
    return current[1];
}

function findLowest(input: ArrayInput, from: Coord, to: Coord): number {
    return dijkstra([from, 0], arrayToMappedInput([]), new Set<StrCoord>(), {
      input: arrayToMappedInput(input),
      to: coordToStr(to),
      limits: getLimits(input),
    });
}

function enlarge(input: ArrayInput): ArrayInput {
    const [maxX, maxY] = getLimits(input).map(l => l + 1);
    const diffs = range(0, 5).flatMap(x => range(0, 5).map(y => [x, y]));

    return diffs.flatMap(([diffX, diffY]) =>
      input.map<EnterCost>(([[x, y], cost]) => [
        [x + diffX * maxX, y + diffY * maxY],
        ((cost + diffX + diffY - 1) % 9) + 1,
      ])
    );
}

export function firstHalf(input: ArrayInput): number {
    return findLowest(input, [0, 0], getLimits(input));
}

export function secondHalf(input: ArrayInput): number {
    const larger = enlarge(input);
    return findLowest(larger, [0, 0], getLimits(larger));
}