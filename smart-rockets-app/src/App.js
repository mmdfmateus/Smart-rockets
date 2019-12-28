import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>

      <div>
        <title>TP Final: Smart Rockets </title>
        <script language="javascript" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
        <script language="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
        <script language="javascript" type="text/javascript" src="dna.js"></script>
        <script language="javascript" type="text/javascript" src="population.js"></script>
        <script language="javascript" type="text/javascript" src="rocket.js"></script>

        <script language="javascript" type="text/javascript" src="sketch.js"></script>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    </div>
  );
}

export default App;
