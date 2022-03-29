import './App.css';
import React, { Component } from 'react';
import Map from './components/Map';

function App() {
  return (
    <Map
    center={{lat: 8.36399064480884, lng: 39.40866527188474}}
    zoom={6}
    />
  );
}

export default App;
