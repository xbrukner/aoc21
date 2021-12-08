/*
0 = 6, abcefg
1 = 2, cf
2 = 5, acdeg
3 = 5, acdfg
4 = 4, bcdf
5 = 5, abdfg
6 = 6, abdefg
7 = 3, acf
8 = 7, abcdefg
9 = 6, abcdfg
*/
export interface Line {
    inputs: Array<string>,
    outputs: Array<string>
};

export interface DeductionState {
    line: Line,
    cf?: string, //deduceCF
    a?: string, //deduceA
    bd?: string, //deduceBD,
    b?: string, //splitBD
    d?: string,
    c?: string, //splitCF
    f?: string,
    e?: string, //deduceEG
    g?: string,
    table?: Map<string, string>, //addTable
    [key: string]: string | Map<string, string> | Line | undefined
};

const digits = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

export function initState(line: Line): DeductionState {
    return {line};
}

export function deduceCF(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;
    return {...state, cf: inputs.find(str => str.length === 2)!};
}

export function deduceA(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;

    return {
      ...state,
      a: inputs
        .find((str) => str.length === 3)!
        .split("")
        .filter(l => !state.cf!.includes(l))[0],
    };
}

export function deduceBD(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;

    return {
      ...state,
      bd: inputs
        .find((str) => str.length === 4)!
        .split("")
        .filter(l => !state.cf!.includes(l))
        .join(''),
    };
}

export function splitBD(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;

    const zero = inputs.find(
      (str) =>
        str.length === 6 && str.split("").filter((l) => state.bd!.includes(l)).length === 1
    )!;
    const b = state.bd!.split('').filter(l => zero.includes(l))[0];
    const d = state.bd!.split('').filter(l => l !== b)[0];

    return { ...state, b, d };
}

export function splitCF(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;

    const six = inputs.find(
      (str) =>
        str.length === 6 && str.split("").filter((l) => state.cf!.includes(l)).length === 1
    )!;
    const f = state.cf!.split('').filter(l => six.includes(l))[0];
    const c = state.cf!.split('').filter(l => l !== f)[0];

    return { ...state, c, f };
}

export function deduceEG(state: DeductionState): DeductionState {
    const {line} = state;
    const {inputs} = line;

    const nine = inputs.find(
      (str) =>
        str.length === 6 && str.split("").filter((l) => state.cf!.includes(l) || l === state.d).length === 3
    )!;
    const remaining = state.a! + state.b! + state.c! + state.d! + state.f!;
    const g = nine.split('').filter(l => !remaining.includes(l))[0];
    const e = digits[8].split('').filter(l => !remaining.includes(l) && l !== g)[0];

    return { ...state, e, g};
}

export function addTable(state: DeductionState): DeductionState {
    return {
      ...state,
      table: digits[8]
        .split("")
        .reduce(
          (table, letter) => table.set(state[letter] as string, letter),
          new Map<string, string>()
        ),
    };
}

export function translate(state: DeductionState, digit: string): number {
    return digits.indexOf(digit.split('').map(l => state.table!.get(l)!).sort().join(''));
}


export function parseLine(input: string): Line {
    const [inputs, outputs] = input.split('|').map(str => str.trim().split(' '));
    return {inputs, outputs};
}

export function firstHalf(input: Array<Line>): number {
    return input
      .map(
        ({ outputs }) =>
          outputs
            .map((str) => str.length)
            .filter((l) => [2, 4, 3, 7].includes(l)).length
      )
      .reduce((a, b) => a + b);
}

export function secondHalf(input: Array<Line>): number {
    return input
      .map((line) =>
        [deduceCF, deduceA, deduceBD, splitBD, splitCF, deduceEG, addTable].reduce(
          (state, fn) => fn(state),
          initState(line)
        )
      )
      .map((state) => state.line.outputs.reduce((sum, digit) => sum * 10 + translate(state, digit), 0))
      .reduce((a, b) => a + b);
}