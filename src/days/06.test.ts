import { mergeState, parseInput, firstHalf, secondHalf } from "./06"

test('Merge state', () => {
    expect(mergeState([], [0, 1])).toStrictEqual([1]);
    expect(mergeState([1, 1], [1, 2])).toStrictEqual([1, 3]);
    expect(mergeState([1, 1], [3, 2])).toStrictEqual([1, 1, 0, 2]);
});

test('Parse input', () => {
    expect(parseInput('3,4,3,1,2')).toStrictEqual([0,1,1,2,1]);
})

test('Web input first half', () => {
    expect(firstHalf(parseInput('3,4,3,1,2'))).toBe(5934);
});

test('Web input second half', () => {
    expect(secondHalf(parseInput('3,4,3,1,2'))).toBe(26984457539);
});