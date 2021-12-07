import * as day02 from '../days/02';
import { Task } from './task';

export function Task02(): JSX.Element {
    const multiplyPosition: (pos: day02.SimplePosition) => number = ({
      depth,
      horizontal,
    }) => depth * horizontal;
    
    return (
      <Task
        day={2}
        parser={day02.parseInstruction}
        firstHalf={(list) => multiplyPosition(day02.moveAroundSimple(list))}
        secondHalf={(list) => multiplyPosition(day02.moveAroundAimed(list))}
      />
    );
}