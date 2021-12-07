import { moveAround, parseInstruction } from "./02";

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

describe("Moving around", () => {
    test('No movements are valid', () => {
        expect(moveAround([])).toStrictEqual({depth: 0, horizontal: 0});
    });

    test('forward and down are independent', () => {
        expect(moveAround([
            {direction: 'forward', arg: 10},
            {direction: 'down', arg: 5}
        ])).toStrictEqual({
            depth: 5,
            horizontal: 10
        });
    });

    test('up and down are cancel out', () => {
        expect(moveAround([
            {direction: 'up', arg: 5},
            {direction: 'down', arg: 5}
        ])).toStrictEqual({
            depth: 0,
            horizontal: 0
        });
    });

    test('web input', () => {
        expect(moveAround(webInput)).toStrictEqual({
            depth: 10,
            horizontal: 15
        });
    })
});