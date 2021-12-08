import * as day05 from '../days/05';
import { Task, parseLine } from './task';

export function Task05(): JSX.Element {
    return (<Task 
        day={5}
        parser={parseLine(day05.parseLine)}
        firstHalf={day05.firstHalf}
        secondHalf={day05.secondHalf}
        />)
}