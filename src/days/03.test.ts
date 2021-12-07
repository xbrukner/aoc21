import {
  emptyGroup,
  filterPosition,
  firstHalf,
  secondHalf,
  groupBy,
  parseLine,
  rotate,
  toBinary,
} from "./03";

describe("Rotation", () => {
  test("Empty is equivalent", () => {
    expect(rotate([[]])).toStrictEqual([[]]);
  });

  test("Single line", () => {
    expect(rotate([[0, 1]])).toStrictEqual([[0], [1]]);
  });

  test("Two lines", () => {
    expect(
      rotate([
        [0, 1],
        [1, 0],
      ])
    ).toStrictEqual([
      [0, 1],
      [1, 0],
    ]);
  });

  test("Identity for two rotates", () => {
    const input = [
      [0, 1],
      [1, 0],
    ];
    expect(rotate(rotate(input))).toStrictEqual(input);
  });
});

describe("Parser", () => {
  test("Empty string", () => {
    expect(parseLine("")).toStrictEqual([]);
  });

  test("Both numbers", () => {
    expect(parseLine("01")).toStrictEqual([0, 1]);
  });
});

describe("Group by", () => {
  test("Empty", () => {
    expect(groupBy([])).toStrictEqual(emptyGroup());
  });

  test("Single input", () => {
    expect(groupBy([0])).toStrictEqual(emptyGroup().set(0, 1));
  });

  test("Multiple inputs", () => {
    expect(groupBy([0, 1, 1, 0, 0])).toStrictEqual(
      emptyGroup().set(0, 3).set(1, 2)
    );
  });
});

describe("To binary", () => {
  test("Empty", () => {
    expect(toBinary([])).toBe(0);
  });

  test("Single digit", () => {
    expect(toBinary([0])).toBe(0);
    expect(toBinary([1])).toBe(1);
  });

  test("Two digits", () => {
    expect(toBinary([0, 0])).toBe(0);
    expect(toBinary([0, 1])).toBe(1);
    expect(toBinary([1, 0])).toBe(2);
    expect(toBinary([1, 1])).toBe(3);
  });
});

const webInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

describe("First half", () => {
  test("Web input", () => {
    expect(firstHalf(webInput.split("\n").map(parseLine))).toStrictEqual([
      22, 9,
    ]);
  });
});

describe("Filter position", () => {
  test("Single input = same input", () => {
    expect(filterPosition([[0, 0]], (g) => 0, 0)).toStrictEqual([[0, 0]]);
  });

  test("Two inputs = extract 1 for second bit", () => {
    expect(
      filterPosition(
        [
          [0, 0],
          [0, 1],
        ],
        (g) => 1,
        1
      )
    ).toStrictEqual([[0, 1]]);
  });
});

describe("Second half", () => {
  test("Web input", () => {
    expect(secondHalf(webInput.split("\n").map(parseLine))).toStrictEqual([
      23, 10,
    ]);
  });
});
