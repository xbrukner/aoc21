import { rotate } from "./03";

type Item = {
    marked: boolean,
    value: number,
}
type Board = Array<Array<Item>>

export type Input = {
    numbers: Array<number>, 
    boards: Array<Board>
}

export function markNumber(board: Board, n: number): Board {
    return board.map((row) => row.map((prev) => prev.value === n ? {...prev, marked: true} : prev));
}

export function bingo(board: Board): boolean {
    const hasRow = (b: Board) => b.some((row) => row.every((el) => el.marked === true)) 
    return hasRow(board) || hasRow(rotate(board) as Board);
}

export function unmarkedSum(board: Board): number {
    return board
      .map((row) =>
        row
          .filter((item) => item.marked === false)
          .map((item) => item.value)
          .reduce((a, b) => a + b, 0)
      )
      .reduce((a, b) => a + b, 0);
}

export function parseInput(input: string): Input {
    const lineToItems: (input: string) => Array<Item> = (input) => input.match(/\d+/g)!.map((val) => ({
        marked: false, value: parseInt(val, 10)
    }));
    const data = input.split('\n\n');
    return {
        numbers: data[0].split(',').map((val) => parseInt(val, 10)),
        boards: data.slice(1).map((board) => board.split('\n').map(lineToItems))
    } 
}

export function firstHalf(input: Input): [number, number] {
    const states = input.numbers
      .reduce((boards, n) => [boards[0].map((b) => markNumber(b, n))].concat(boards), [input.boards])
      .reverse().slice(1);
    
    const first = states.findIndex((boards) => boards.some(bingo));

    return [input.numbers[first], unmarkedSum(states[first].find(bingo)!)];
}

export function secondHalf(input: Input): [number, number] {
    const states = input.numbers
      .reduce((boards, n) => [boards[0].map((b) => markNumber(b, n))].concat(boards), [input.boards])
      .reverse().slice(1);
    
    const last = states.findIndex((boards) => boards.every(bingo));

    const lastBingoBoard = states[last - 1].map(bingo).findIndex(b => !b);

    return [input.numbers[last], unmarkedSum(states[last][lastBingoBoard])];
}