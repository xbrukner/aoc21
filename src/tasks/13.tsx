import * as day13 from '../days/13';
import { Task } from './task';

export function Task13(): JSX.Element {
    return (<Task 
        day={13}
        parser={day13.parseInput}
        firstHalf={day13.firstHalf}
        secondHalf={day13.secondHalf}
        />)
}