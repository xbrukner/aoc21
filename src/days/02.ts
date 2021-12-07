export interface Instruction {
    readonly direction: "forward" | "down" | "up",
    readonly arg: number
};

export interface Position {
    depth: number,
    horizontal: number,
}

export function parseInstruction(input: string): Instruction {
    const [direction, numbers] = input.split(' ');
    return {
        direction: direction as Instruction["direction"],
        arg: parseInt(numbers, 10)
    }
}

export function applyInstructionToPosition(pos: Position, inst: Instruction): Position {
    switch (inst.direction) {
        case "down":
            return {...pos, depth: pos.depth + inst.arg};
        case "up": 
            return {...pos, depth: pos.depth - inst.arg};
        case "forward": 
            return {...pos, horizontal: pos.horizontal + inst.arg};
    }
}

export function moveAround(input: Array<Instruction>): Position {
    const initial: Position = {
        depth: 0, horizontal: 0
    };

    return input.reduce(applyInstructionToPosition, initial);
}