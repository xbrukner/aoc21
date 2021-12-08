import { groupByCount } from "./05";

type StateCount = Array<number>;
type StateChanges = [number, number];

export function mergeState(state: StateCount, [index, count]: StateChanges) : StateCount {
    return Array(Math.max(state.length, index + 1))
      .fill(0)
      .fill(count, index, index + 1)
      .map((value, index) => value + (state[index] || 0));
}

export function parseInput(str: String): StateCount {
    const initialState: Array<number> = str.split(',').map((v) => parseInt(v, 10));

    return groupByCount(
      initialState,
      (v) => v,
      (v) => v
    )
      .sort(([d1, _c1], [d2, _c2]) => d1 - d2)
      .reduce(mergeState, []);
}

export function fishBorn(n: number): Array<StateChanges> {
    return [[6, n], [8, n]];
}

export function calculateNext(state: StateCount): StateCount {
    return fishBorn(state[0]).reduce(mergeState, state.slice(1));
}

function iterate(state: StateCount, iterations: number): number {
    return Array<number>(iterations)
      .fill(0)
      .reduce((state) => calculateNext(state), state)
      .reduce((a, b) => a + b);
}

export function firstHalf(state: StateCount): number {
    return iterate(state, 80);
}

export function secondHalf(state: StateCount): number {
    return iterate(state, 256);
}