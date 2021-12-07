import React, {useState} from 'react';
import './App.css';
import { countMeasurements } from './days/01';

interface TaskProps {
  day: number,
  firstHalf: (list: Array<number>) => number,
  secondHalf?: (list: Array<number>) => number
};

function Task({day, firstHalf, secondHalf}: TaskProps): JSX.Element {
  const [input, setInput] = useState('');
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setInput(e.currentTarget.value);

  const parse: (text: string) => Array<number> = (text) => text.trim().split(/\s/g).map((n) => parseInt(n, 10))
  const parsed: Array<number> | undefined = input && input.trim().length ? parse(input) : undefined;

  const firstPart = parsed ? firstHalf(parsed) : '';
  const secondPart = secondHalf && parsed ? secondHalf(parsed) : '';

  return (<div>
    <h3>Day {day}</h3>
    <textarea onChange={onChange}></textarea>
    <div>
      <span>Part 1: </span><span>{firstPart}</span>
      {secondHalf && <><span>Part 2: </span><span>{secondPart}</span></>}
    </div> 
  </div>);
}
//function HalfDay

function App() {
  return (
    <div className="App">
      <h2>Advent of Code 2021</h2>
      <Task day={1} firstHalf={countMeasurements} />
    </div>
  );
}

export default App;
