import * as day03 from '../days/03';
import { Task } from './task';

export function Task03(): JSX.Element {
    const multiply: (gamma: number, epsilon: number) => number = (gamma, epsilon) => gamma * epsilon;
    
    return (
      <Task
        day={3}
        parser={day03.parseLine}
        firstHalf={(input) => multiply(...day03.firstHalf(input))}
        secondHalf={(input) => multiply(...day03.secondHalf(input))}
      />
    );
    };