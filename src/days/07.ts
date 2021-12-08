import { range } from "./05";

type HorizontalPosition = number;
type CrabLine = Array<HorizontalPosition>;
type Fuel = number;

export function parseInput(str: String): CrabLine {
    return str.split(',').map(v => parseInt(v, 10));
}

export function calculateFuelConstant(from: HorizontalPosition, to: HorizontalPosition): Fuel {
    return Math.abs(from - to);
}

export function calculateFuelSeries(from: HorizontalPosition, to: HorizontalPosition): Fuel {
    const n = calculateFuelConstant(from, to);
    return n * (n + 1) / 2;
}

function simulateAndMinimize(crabs: CrabLine, cost: (from: HorizontalPosition, to: HorizontalPosition) => Fuel): Fuel {
    return Math.min(...range(Math.min(...crabs), Math.max(...crabs) + 1)
      .map((h) =>
        crabs.map((crab) => cost(crab, h)).reduce((a, b) => a + b)
      ));
}

export function firstHalf(crabs: CrabLine): Fuel {
    return simulateAndMinimize(crabs, calculateFuelConstant);
}

export function secondHalf(crabs: CrabLine): Fuel {
    return simulateAndMinimize(crabs, calculateFuelSeries);
}