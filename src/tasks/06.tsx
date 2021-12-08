import * as day06 from '../days/06';
import { Task } from './task';

export function Task06(): JSX.Element {
    return (<Task 
        day={6}
        parser={day06.parseInput}
        firstHalf={day06.firstHalf}
        secondHalf={day06.secondHalf}
        />)
}