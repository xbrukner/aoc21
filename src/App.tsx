import React, {useState} from 'react';
import './App.css';
import { Task01 } from './tasks/01';
import { Task02 } from './tasks/02';
import { Task03 } from './tasks/03';
import { Task04 } from './tasks/04';

function App() {
  return (
    <div className="App">
      <h2>Advent of Code 2021</h2>
      <Task01 />
      <Task02 />
      <Task03 />
      <Task04 />
    </div>
  );
}

export default App;
