import * as day07 from '../days/07';
import { Task } from './task';

export function Task07(): JSX.Element {
    return (<Task 
        day={7}
        parser={day07.parseInput}
        firstHalf={day07.firstHalf}
        secondHalf={day07.secondHalf}
        />)
}