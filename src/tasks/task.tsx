import React, {useState} from 'react';

interface TaskProps<Input> {
  day: number,
  parser: (s: string) => Input,
  firstHalf: (input: Input) => number,
  secondHalf?: (list: Input) => number
};

export function parseLine<InputLine>(lineParser: (s: string) => InputLine): (s: string) => Array<InputLine> {
    return (s) => s.split('\n').map(lineParser);
}

export function Task<Input>({day, parser, firstHalf, secondHalf}: TaskProps<Input>): JSX.Element {
  const [input, setInput] = useState('');
  const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => setInput(e.currentTarget.value);


  const parse: (text: string) => Input = (text) => parser(text.trim());
  const parsed: Input | undefined = input && input.trim().length ? parse(input) : undefined;

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
