import * as day04 from '../days/04';
import { Task } from './task';

export function Task04(): JSX.Element {
    const multiply: (gamma: number, epsilon: number) => number = (gamma, epsilon) => gamma * epsilon;
    
    return (
      <Task
        day={4}
        parser={day04.parseInput}
        firstHalf={(input: day04.Input) => multiply(...day04.firstHalf(input))}
        secondHalf={(input: day04.Input) => multiply(...day04.secondHalf(input))}
      />
    );
    };