import React, {useState} from 'react';
import './App.css';
import { Task01 } from './tasks/01';
import { Task02 } from './tasks/02';
import { Task03 } from './tasks/03';
import { Task04 } from './tasks/04';
import { Task05 } from './tasks/05';
import { Task06 } from './tasks/06';
import { Task07 } from './tasks/07';
import { Task08 } from './tasks/08';
import { Task09 } from './tasks/09';
import { Task10 } from './tasks/10';
import { Task11 } from './tasks/11';

function App() {
  return (
    <div className="App">
      <h2>Advent of Code 2021</h2>
      <Task01 />
      <Task02 />
      <Task03 />
      <Task04 />
      <Task05 />
      <Task06 />
      <Task07 />
      <Task08 />
      <Task09 />
      <Task10 />
      <Task11 />
    </div>
  );
}

export default App;
