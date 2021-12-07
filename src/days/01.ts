type Counter = {
    count: number,
    last?: number,
}

export function countMeasurements(depths: Array<number>): number {
    const reducer = ({count, last}: Counter, current: number): Counter => ({
        count: count + (last && last < current ? 1 : 0),
        last: current,
    });

    const initial: Counter = {
        count: 0
    };

    return depths.reduce(reducer, initial).count;
}

export function* generateNSums(n: number, input: Array<number>): Generator<number, void, void> {
    if (input.length < n) return;
    let window: Array<number> = input.slice(0, n);
    let sum = window.reduce((a, b) => a + b);
    yield sum;

    for (const element of input.slice(n)) {
        const last = window.shift() as number; //because the array will never be empty
        window.push(element);
        sum = sum - last + element;
        yield sum;
    }

    return;
}

export function countTriplets(depths: Array<number>): number {
    return countMeasurements([...generateNSums(3, depths)]);
}