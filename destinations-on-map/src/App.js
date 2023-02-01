import logo from "./logo.svg";
import React, { Component, useRef, useEffect, useState } from "react";
import reactDom from "react-dom";
import "./App.css";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import map from "./Components/map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1IjoicmF5ZW5iZCIsImEiOiJja3J1ZmZsYXIzdDAxMm9wZTdna2RxbmIwIn0.kqjiFe-ZOMlb97bJ0mBStw";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Header} />
      </BrowserRouter>
    </div>

    /* <div className="App">
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
    </div>*/
  );
}

export default App;
