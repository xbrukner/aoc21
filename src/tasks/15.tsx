import * as day15 from '../days/15';
import { Task } from './task';

export function Task15(): JSX.Element {
    return (<Task 
        day={15}
        parser={day15.parse}
        firstHalf={day15.firstHalf}
        secondHalf={day15.secondHalf}
        />)
}