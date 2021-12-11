import { range } from "./05";
import { toCoordinate } from "./09";

type Input = number[][];
type Coord = [number, number];

export function parseInput(str: string): Input {
    return str.split('\n').map(s => s.trim().split('').map(v => parseInt(v, 10)));
}

export function adjacents([x0, y0]: Coord): Coord[] {
    const diffs: Coord[] = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    return diffs
      .map<Coord>(([x, y]) => [x0 + x, y0 + y])
      .filter(([x, y]) => x >= 0 && x < 10 && y >= 0 && y < 10);
}

export function nextStep(input: Input): [Input, number] {
    let blinkedSet = new Set<String>();
    let nextInput = input.map((line) => line.map(v => v + 1));
    let toProcess: Coord[] = [];

    const filterBlinked: (coord: Coord) => boolean = ([x, y]) => nextInput[x][y] > 9; 
    const findBlinked: () => Coord[] = () => range(0, 10).flatMap<Coord>(x => range(0, 10).map<Coord>((y) => [x, y]))
        .filter(filterBlinked);
    const addProcess: (coord: Coord) => void = (coord) => {
        const strCoord = toCoordinate(coord);
        if (blinkedSet.has(strCoord)) return;
        blinkedSet.add(strCoord);
        toProcess.push(coord);
    };

    findBlinked().forEach(addProcess);
    
    for (let i = 0; i < toProcess.length; ++i) {
        const coord = toProcess[i];
        const adj = adjacents(coord);
        adj.forEach(([x, y]) => nextInput[x][y] += 1);
        adj.filter(filterBlinked).forEach(addProcess);
    }

    findBlinked().forEach(([x, y]) => nextInput[x][y] = 0);

    return [nextInput, blinkedSet.size];
}

export function firstHalf(input: Input): number {
    type State = [Input, number];
    return range(0, 100).reduce<State>(
      ([state, count], _index) => {
        const [nextState, blinked] = nextStep(state);
        return [nextState, count + blinked];
      },
      [input, 0]
    )[1];
}

export function secondHalf(input: Input): number {
    type State = [Input, number];
    let state: State = [input, 0];
    let i;
    for (i = 0; state[1] < 100; ++i) {
        state = nextStep(state[0]);
    }
    return i;
}