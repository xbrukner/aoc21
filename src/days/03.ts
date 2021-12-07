type Input = Array<Array<number>>
export type Group = Map<number, number>

export function emptyGroup(): Group {
    return new Map<number, number>([[0, 0], [1, 0]]);
}

export function parseLine(str: string): Array<number> {
    return str.split('').map((i) => parseInt(i, 10));
}


export function rotate(input: Input): Input {
    if (!input[0].length) return [[]];
    return [...input[0].keys()].map(extractColumn(input));
}

function extractColumn(input: Input): (column: number) => number[] {
    return (key) => input.map((arr) => arr[key]);
}

export function groupBy(input: Array<number>): Group {
    return input.reduce(
      (group, el) => group.set(el, 1 + (group.get(el) || 0)),
      emptyGroup()
    );
}

export function toBinary(input: Array<number>): number {
    return input.reverse().reduce((prev, curr, index) => prev + curr * Math.pow(2, index), 0);
}

const mostCommon: (group: Group) => number = (group) =>
  [...group.entries()].reduce((prev, next) =>
    prev[1] > next[1] ? prev : next
  )[0];
const leastCommon: (group: Group) => number = (group) =>
  [...group.entries()].reduce((prev, next) =>
    prev[1] <= next[1] ? prev : next
  )[0];
export function firstHalf(input: Input): [number, number] {
    const rotated = rotate(input);
    const groups = rotated.map(groupBy);

    const gamma = toBinary(groups.map(mostCommon));
    const epsilon = toBinary(groups.map(leastCommon));

    return [gamma, epsilon];
}

export function filterPosition(input: Input, extractor: (group: Group) => number, index: number) {
    if (input.length === 1) return input;

    const extractedColumn = extractColumn(input)(index);
    const columnGroup = groupBy(extractedColumn);
    const selectedIndex = extractor(columnGroup);

    return input.filter((row) => row[index] === selectedIndex);
}
export function secondHalf(input: Input): [number, number] {
    const oxygenGeneratorRating = [...input[0].keys()].reduce(
      (input, index) => filterPosition(input, mostCommon, index),
      input
    )[0];

    const co2ScrubberRating = [...input[0].keys()].reduce(
      (input, index) => filterPosition(input, leastCommon, index),
      input
    )[0];

    return [toBinary(oxygenGeneratorRating), toBinary(co2ScrubberRating)];
}