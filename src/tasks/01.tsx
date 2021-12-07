import * as day01 from '../days/01';
import { Task } from './task';

export function Task01(): JSX.Element {
    return (
      <Task
        day={1}
        parser={(n) => parseInt(n, 10)}
        firstHalf={day01.countMeasurements}
        secondHalf={day01.countTriplets}
      />
    );
}