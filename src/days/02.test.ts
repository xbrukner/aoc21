import { moveAroundSimple, moveAroundAimed, parseInstruction } from "./02";

const webInput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.split("\n").map(parseInstruction);

describe("Parsing", () => {
    test('Parse forward', () => {
        expect(parseInstruction('forward 5')).toStrictEqual({
            direction: 'forward',
            arg: 5
        });
    });

    test('Parse up', () => {
        expect(parseInstruction('up 23')).toStrictEqual({
            direction: 'up',
            arg: 23
        });
    });

    test('Parse down', () => {
        expect(parseInstruction('down 8')).toStrictEqual({
            direction: 'down',
            arg: 8
        });
    });
});

describe("Moving simple around", () => {
    test('No movements are valid', () => {
        expect(moveAroundSimple([])).toStrictEqual({depth: 0, horizontal: 0});
    });

    test('forward and down are independent', () => {
        expect(moveAroundSimple([
            {direction: 'forward', arg: 10},
            {direction: 'down', arg: 5}
        ])).toStrictEqual({
            depth: 5,
            horizontal: 10
        });
    });

    test('up and down are cancel out', () => {
        expect(moveAroundSimple([
            {direction: 'up', arg: 5},
            {direction: 'down', arg: 5}
        ])).toStrictEqual({
            depth: 0,
            horizontal: 0
        });
    });

    test('web input', () => {
        expect(moveAroundSimple(webInput)).toStrictEqual({
            depth: 10,
            horizontal: 15
        });
    })
});

describe("Moving aimed around", () => {
    test('No movements are valid', () => {
        expect(moveAroundAimed([])).toStrictEqual({depth: 0, horizontal: 0, aim: 0});
    });

    test('forward and down do not coincide', () => {
        expect(moveAroundAimed([
            {direction: 'forward', arg: 10},
            {direction: 'down', arg: 5}
        ])).toStrictEqual({
            aim: 5,
            depth: 0,
            horizontal: 10
        });
    });

    test('down and forward move depth', () => {
        expect(moveAroundAimed([
            {direction: 'down', arg: 5},
            {direction: 'forward', arg: 10},
        ])).toStrictEqual({
            aim: 5,
            depth: 50,
            horizontal: 10
        });
    });

    test('down and double forward move depth', () => {
        expect(moveAroundAimed([
            {direction: 'down', arg: 5},
            {direction: 'forward', arg: 10},
            {direction: 'forward', arg: 10},
        ])).toStrictEqual({
            aim: 5,
            depth: 100,
            horizontal: 20
        });
    });

    test('up and down move aim', () => {
        expect(moveAroundAimed([
            {direction: 'down', arg: 5},
            {direction: 'up', arg: 4}
        ])).toStrictEqual({
            depth: 0,
            horizontal: 0,
            aim: 1
        });
    });

    test('web input', () => {
        expect(moveAroundAimed(webInput)).toStrictEqual({
            aim: 10,
            depth: 60,
            horizontal: 15
        });
    })
});