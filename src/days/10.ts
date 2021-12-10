const open = '([{<'.split('');
const close = ')]}>'.split('');
const scores = [3, 57, 1197, 25137];

export function parse(str: string) : string[] {
    return str.split('');
}

type ReduceState = [number[], string | boolean];
export function findIllegal(input: string[]): ReduceState {
  const opening = (state: number[], next: string): [boolean, number[]] =>
    open.includes(next) ? [true, state.concat(open.indexOf(next))] : [false, state];
  const closing = (state: number[], next: string): [boolean | undefined, number[]] =>
    close.includes(next)
      ? state.slice(-1)[0] === close.indexOf(next)
        ? [true, state.slice(0, -1)]
        : [undefined, state]
      : [false, state];

    const startState: ReduceState = [[], false];

    return input.reduce(
        ([state, illegal]: ReduceState, next): ReduceState => {
            if (illegal) return [state, illegal];
            const [f1, s1] = opening(state, next);
            if (f1) return [s1, false];
            const [f2, s2] = closing(state, next);
            if (f2 === undefined) return [s2, next];
            return [s2, false];
        }, startState
    );
}

export function firstHalf(input: string[][]): number {
    return input
      .map((i) => findIllegal(i)[1])
      .filter((v) => typeof v === "string")
      .map((v) => scores[close.indexOf(v as string)])
      .reduce((a, b) => a + b, 0);
}

export function secondHalf(input: string[][]): number {
    const allScores = input
      .map(findIllegal)
      .filter(([_s, illegal]) => illegal === false)
      .map(([state, _illegal]) => state.reverse().reduce((sum, missing) => 5 * sum + missing + 1, 0))
      .sort((a, b) => a - b);
    
    return allScores[((allScores.length - 1) / 2)];
}