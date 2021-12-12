import * as day12 from '../days/12';
import { Task } from './task';

export function Task12(): JSX.Element {
    return (<Task 
        day={12}
        parser={day12.parseInput}
        firstHalf={day12.firstHalf}
        secondHalf={day12.secondHalf}
        />)
}