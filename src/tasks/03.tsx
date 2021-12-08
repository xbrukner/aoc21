import * as day03 from '../days/03';
import { Task, parseLine } from './task';

export function Task03(): JSX.Element {
    const multiply: (gamma: number, epsilon: number) => number = (gamma, epsilon) => gamma * epsilon;
    
    return (
      <Task
        day={3}
        parser={parseLine(day03.parseLine)}
        firstHalf={(input: day03.Input) => multiply(...day03.firstHalf(input))}
        secondHalf={(input) => multiply(...day03.secondHalf(input))}
      />
    );
    };