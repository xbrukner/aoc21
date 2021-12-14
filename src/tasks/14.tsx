import * as day14 from '../days/14';
import { Task } from './task';

export function Task14(): JSX.Element {
    return (<Task 
        day={14}
        parser={day14.parseInput}
        firstHalf={day14.firstHalf}
        secondHalf={day14.secondHalf}
        />)
}