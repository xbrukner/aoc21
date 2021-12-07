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
