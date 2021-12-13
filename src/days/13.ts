import { groupByCount, range } from "./05";

type Dot = [number, number];
export interface Input {
    dots: Array<Dot>,
    folds: Array<["horizontal" | "vertical", number]>
}

function serialize([x, y]: Dot): string {
    return `${x},${y}`;
}

function deserialize(str: string): Dot {
    return str.split(',').map(v => parseInt(v, 10)) as Dot;
}

export function parseInput(input: string): Input {
    const [dots, folds] = input.split('\n\n');

    return {
        dots: dots.split('\n').map(deserialize),
        folds: folds.split('\n').map(s => {
            const [axis, index] = s.split('=');
            return [axis === 'fold along x' ? 'vertical' : 'horizontal', parseInt(index, 10)]
        })
    }
}

function deduplicate(dots: Array<Dot>): Array<Dot> {
    return groupByCount(dots, serialize, deserialize).map(([dot, _count]) => dot);
}

export function fold(input: Input): Input {
    const fold = input.folds[0];
    const horizontal: (dot: Dot) => Dot = ([x, y]) => [x, y < fold[1] ? y : fold[1] - (y - fold[1])]
    const vertical: (dot: Dot) => Dot = ([x, y]) => [x < fold[1] ? x : fold[1] - (x - fold[1]), y]
    const manipulate = fold[0] === 'horizontal' ? horizontal : vertical;

    return {
        dots: deduplicate(input.dots.map(manipulate)),
        folds: input.folds.slice(1)
    }
}

export function firstHalf(input: Input): number {
    return fold(input).dots.length;
}

export function secondHalf(input: Input): string{
    const res = range(0, input.folds.length).reduce((input, _i) => fold(input), input);
    const dots = res.dots.map(serialize);
    return range(
      0,
      res.dots.map(([x, _y]) => x).reduce((a, b) => Math.max(a, b)) + 1
    )
      .map((x) =>
        range(
          0,
          res.dots.map(([_x, y]) => y).reduce((a, b) => Math.max(a, b)) + 1
        )
          .map((y) => dots.includes(serialize([x, y])) ? "#" : ".")
          .join('')
      )
      .join('\n');
}