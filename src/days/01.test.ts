import { countMeasurements, countTriplets, generateNSums } from './01';

const webInput = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

describe('First part', () => {
    test("Single depth measurement -> 0 increases", () => {
        expect(countMeasurements([199])).toBe(0);
    });

    test("Single decrease -> 0 increases", () => {
        expect(countMeasurements([199, 190])).toBe(0);
    });

    test("Single increase -> 1 increases", () => {
        expect(countMeasurements([199, 200])).toBe(1);
    });

    test("Two increases in row -> 1 increases", () => {
        expect(countMeasurements([199, 200, 208])).toBe(2);
    });

    test("Input from website", () => {
        expect(countMeasurements(webInput)).toBe(7);
    });
});

describe('Sum generator', () => {
    test('Lower count -> no results', () => {
        expect([...generateNSums(3, [0, 1])]).toStrictEqual([]);
    });

    test('Single group -> returns group', () => {
        expect([...generateNSums(3, [0, 1, 2])]).toStrictEqual([3]);
    });

    test('2 groups -> return 2 groups', () => {
        expect([...generateNSums(2, [1, 2, 3])]).toStrictEqual([3, 5]);
    });
});

describe('Count triplets', () => {
    test('Single group -> no result', () =>{
        expect(countTriplets([0, 1, 2])).toBe(0);
    });

    test('Decreasing group -> no result', () =>{
        expect(countTriplets([0, 1, 2, 0])).toBe(0);
    });

    test('Increasing group -> one result', () =>{
        expect(countTriplets([0, 1, 2, 1])).toBe(1);
    });

    test("Input from website", () => {
        expect(countTriplets(webInput)).toBe(5);
    });
});