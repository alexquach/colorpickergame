import React, { useState, useEffect } from 'react';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'

import './App.css';
import Picker from './Picker';

function randomNum() {
  return Math.floor(Math.random() * 1000000)
}

function App() {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">

        <div> Color Picker! <br>
        </br>Generate a random color, and try your best to match it on the picker! Good luck!
        </div>
        <br></br>

        <div>Your Guess:</div>
        <div id="color-box"></div>

        <Router>
          <Route path="/colorpickergame/:id" component={Picker}></Route>
          <Route exact path="/colorpickergame/"> 
            <Redirect to={"/colorpickergame/" + randomNum()} />
          </Route>
        </Router>

        <div style={{ marginTop: '20px' }}>
            Share/Compete with friends by sending them the link!
        </div>

      </header>
    </div>
  );
}

export default App;
