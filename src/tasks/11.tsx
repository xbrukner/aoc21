import * as day11 from '../days/11';
import { Task } from './task';

export function Task11(): JSX.Element {
    return (<Task 
        day={11}
        parser={day11.parseInput}
        firstHalf={day11.firstHalf}
        secondHalf={day11.secondHalf}
        />)
}