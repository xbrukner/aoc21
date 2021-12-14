import { groupByCount, range } from "./05";

export interface InputNaive {
    expansions: Map<string, string>,
    template: string,
}

type PairCount = [string, number, boolean]
export interface InputSmart {
    expansions: Map<string, string>,
    template: Array<PairCount>,
}

export function parseInputNaive(str: string): InputNaive {
    const [template, groups] = str.split('\n\n');

    return {
      template,
      expansions: groups
        .split("\n")
        .map((l) => l.split(" -> "))
        .reduce(
          (map, [from, to]) => map.set(from, to),
          new Map<string, string>()
        ),
    };
}

export function parseInput(str: string): InputSmart {
    const [template, groups] = str.split('\n\n');
    const pairs = groupByCount(
        generatePairs(template),
        (s) => s,
        (s) => s
      ).map<PairCount>(([s, v]) => [s, v, false]);
    pairs[pairs.length - 1][2] = true;

    return {
      template: pairs,
      expansions: groups
        .split("\n")
        .map((l) => l.split(" -> "))
        .reduce(
          (map, [from, to]) => map.set(from, to),
          new Map<string, string>()
        ),
    };
}

function generatePairs(template: string): Array<string> {
    type State = [Array<string>, string];

    return template
      .slice(1)
      .split('')
      .reduce<State>(
        ([acc, prev], current) => [acc.concat(prev + current), current],
        [[], template[0]]
      )[0];
}

function expandNaive({expansions, template}: InputNaive): InputNaive {
    return {
        expansions: expansions,
        template: generatePairs(template)
            .map(pair => pair[0] + (expansions.get(pair) || ''))
            .join('') + template.slice(-1)
    }
}

function sumPairs(pairs: Array<PairCount>): Array<PairCount> {
    const toString = (str: string, last: boolean) => `${str},${last}`;
    return [...pairs.reduce(
        (map, [str, c, last]) => map.set(toString(str, last), c + (map.get(toString(str, last)) || 0)),
        new Map<string, number>()
    ).entries()].map(([str, c]) => {
        const [pair, last] = str.split(',');

        return [pair, c, last === 'false' ? false : true];
    });
}

function expandSmart({expansions, template}: InputSmart): InputSmart {
    return {
      expansions: expansions,
      template: sumPairs(template.flatMap(([str, c, last]) =>
        expansions.has(str)
          ? !last ? [
              [str[0] + expansions.get(str), c, false],
              [expansions.get(str) + str[1], c, false],
            ] : [
              [str[0] + expansions.get(str), c, false],
              [expansions.get(str) + str[1], c, true],
            ]
          : [[str, c, last]]
      )),
    };
}

function countElements(pairs: Array<PairCount>): Array<[string, number]> {
    return [
      ...pairs
        .reduce(
          (map, [str, c, last]) => {
            const m = map.set(str[0], c + (map.get(str[0]) || 0));
            if (last) m.set(str[1], c + (map.get(str[1]) || 0))
            return m;
          }, 
          new Map<string, number>()
        )
        .entries(),
    ];
}

export function firstHalfNaive(input: InputNaive): number {
    const {template} = range(0, 10).reduce((state, _) => expandNaive(state), input);

    const groups = groupByCount(template.split(''), s => s, s => s).map(([_, c]) => c);

    return Math.max(...groups) - Math.min(...groups);
}

export function firstHalf(input: InputSmart): number {
    const {template} = range(0, 10).reduce((state, _) => expandSmart(state), input);

    const groups = countElements(template).map(([_, c]) => c);

    return Math.max(...groups) - Math.min(...groups);
}

export function secondHalf(input: InputSmart): number {
    const {template} = range(0, 40).reduce((state, _) => expandSmart(state), input);

    const groups = countElements(template).map(([_, c]) => c);

    return Math.max(...groups) - Math.min(...groups);
}