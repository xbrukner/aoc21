import * as day10 from '../days/10';
import { Task, parseLine } from './task';

export function Task10(): JSX.Element {
    return (<Task 
        day={10}
        parser={parseLine(day10.parse)}
        firstHalf={day10.firstHalf}
        secondHalf={day10.secondHalf}
        />)
}