import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useLocation } from "react-router-dom";
import { useParams, Redirect, NavLink, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

function color_meter(cwith, ccolor) {

  if (!cwith && !ccolor) return;

  var _cwith = (cwith.charAt(0) == "#") ? cwith.substring(1, 7) : cwith;
  var _ccolor = (ccolor.charAt(0) == "#") ? ccolor.substring(1, 7) : ccolor;

  var _r = parseInt(_cwith.substring(0, 2), 16);
  var _g = parseInt(_cwith.substring(2, 4), 16);
  var _b = parseInt(_cwith.substring(4, 6), 16);

  var __r = parseInt(_ccolor.substring(0, 2), 16);
  var __g = parseInt(_ccolor.substring(2, 4), 16);
  var __b = parseInt(_ccolor.substring(4, 6), 16);

  var p1 = Math.abs(((_r - __r) / 255) * 100);
  var p2 = Math.abs(((_g - __g) / 255) * 100);
  var p3 = Math.abs(((_b - __b) / 255) * 100);

  return Number.parseFloat(100 - (p1 + p2 + p3) / 3).toPrecision(5);
}

function randomNum() {
  return Math.floor(Math.random() * 1000000)
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function hashSeed(seed) {
  return "#" + ((Math.floor(seed) * 6942069420) % 16777215).toString(16);
}

function Picker() {
  // const location = useLocation();
  // const seed = new URLSearchParams(location.search).get('session');
  // console.log(seed)

  const params = useParams();
  const seed = params['id']
  console.log(seed);


  const [color, setColor] = useState("#aabbcc");
  const [score, setScore] = useState("n/a");
  const [true_color, setTrueColor] = seed ? useState(hashSeed(seed)) : useState(randomColor());

  useEffect(() => {
    document.getElementById('color-box').style.backgroundColor = color
    document.body.style.backgroundColor = true_color
  });

  return (
    <div>
      <p>Your Score: {score}</p>

      <Button
        style={{ margin: '5px' }}
        onClick={() => setScore(color_meter(true_color, color) + '%')}
        variant='outlined'
        color="inherit"
      >Score Me</Button>
      
      <Button
        style={{ margin: '5px' }}
        onClick={() => {
          const num = randomNum();
          <Redirect to={"/colorpickergame/" + num} />
          setTrueColor(hashSeed(num));
          }}
        variant='outlined'
        color="inherit"
      ><NavLink to={"/colorpickergame/" + randomNum()}
          style={{color: "white", 'text-decoration': "none"}}
      >Randomize!</NavLink></Button>
      

      <span height="50px"></span>
      <div style={{ display: "flex", 'justify-content': "center" }}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
}

export default Picker;