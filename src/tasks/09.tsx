import * as day09 from '../days/09';
import { Task } from './task';

export function Task09(): JSX.Element {
    return (<Task 
        day={9}
        parser={day09.parseInput}
        firstHalf={day09.firstHalf}
        secondHalf={day09.secondHalf}
        />)
}