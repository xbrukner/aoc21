import React, {useState} from 'react';

interface TaskProps<Value> {
  day: number,
  parser: (s: string) => Value
  firstHalf: (list: Array<Value>) => number,
  secondHalf?: (list: Array<Value>) => number
};

export function Task<Value>({day, parser, firstHalf, secondHalf}: TaskProps<Value>): JSX.Element {
  const [input, setInput] = useState('');
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setInput(e.currentTarget.value);

  const parse: (text: string) => Array<Value> = (text) => text.trim().split('\n').map(parser);
  const parsed: Array<Value> | undefined = input && input.trim().length ? parse(input) : undefined;

  const firstPart = parsed ? firstHalf(parsed) : '';
  const secondPart = secondHalf && parsed ? secondHalf(parsed) : '';

  return (<div>
    <h3>Day {day}</h3>
    <textarea onChange={onChange}></textarea>
    <div>
      <span>Part 1: </span><span>{firstPart}</span><br />
      {secondHalf && <><span>Part 2: </span><span>{secondPart}</span></>}
    </div> 
  </div>);
}
