import { countMeasurements } from './01';

test('Single depth measurement -> 0 increases', () => {
    expect(countMeasurements([199])).toBe(0);
});

test('Single decrease -> 0 increases', () => {
    expect(countMeasurements([199, 190])).toBe(0);
});

test('Single increase -> 1 increases', () => {
    expect(countMeasurements([199, 200])).toBe(1);
});

test('Two increases in row -> 1 increases', () => {
    expect(countMeasurements([199, 200, 208])).toBe(2);
});

test('Input from website', () => {
    const webInput = [
        199, 200, 208, 210, 200, 207, 240, 269, 260, 263
    ];
    expect(countMeasurements(webInput)).toBe(7);
});