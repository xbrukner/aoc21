export interface Instruction {
    readonly direction: "forward" | "down" | "up",
    readonly arg: number
};

export interface SimplePosition {
    depth: number,
    horizontal: number,
}

export interface AimedPosition extends SimplePosition {
    aim: number,
}

export function parseInstruction(input: string): Instruction {
    const [direction, numbers] = input.split(' ');
    return {
        direction: direction as Instruction["direction"],
        arg: parseInt(numbers, 10)
    }
}

export function applyInstructionToSimplePosition(pos: SimplePosition, inst: Instruction): SimplePosition {
    switch (inst.direction) {
        case "down":
            return {...pos, depth: pos.depth + inst.arg};
        case "up": 
            return {...pos, depth: pos.depth - inst.arg};
        case "forward": 
            return {...pos, horizontal: pos.horizontal + inst.arg};
    }
}

export function applyInstructionToAimedPosition(pos: AimedPosition, inst: Instruction): AimedPosition{
    switch (inst.direction) {
        case "down":
            return {...pos, aim: pos.aim + inst.arg};
        case "up": 
            return {...pos, aim: pos.aim - inst.arg};
        case "forward": 
            return {
              ...pos,
              horizontal: pos.horizontal + inst.arg,
              depth: pos.depth + pos.aim * inst.arg,
            };
    }
}

export function moveAroundSimple(input: Array<Instruction>): SimplePosition {
    const initial: SimplePosition = {
        depth: 0, horizontal: 0
    };

    return input.reduce(applyInstructionToSimplePosition, initial);
}

export function moveAroundAimed(input: Array<Instruction>): AimedPosition {
    const initial: AimedPosition = {
        depth: 0, horizontal: 0, aim: 0
    };

    return input.reduce(applyInstructionToAimedPosition, initial);
}