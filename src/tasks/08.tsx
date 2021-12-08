import * as day08 from '../days/08';
import { Task, parseLine } from './task';

export function Task08(): JSX.Element {
    return (<Task 
        day={8}
        parser={parseLine(day08.parseLine)}
        firstHalf={day08.firstHalf}
        secondHalf={day08.secondHalf}
        />)
}