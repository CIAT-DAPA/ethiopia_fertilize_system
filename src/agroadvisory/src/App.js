import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import Home from './pages/home/Home';
import About from './pages/about/About';
import Fertilization from './pages/fertilization/Fertilization';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Menu />
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/fertilization' element={<Fertilization />} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </>
    );
  }

}

export default App;
