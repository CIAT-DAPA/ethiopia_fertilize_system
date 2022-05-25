import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import Home from './pages/home/Home';
import About from './pages/about/About';
import Fertilization from './pages/fertilization/Fertilization';

import './App.css';
import ISFM from './pages/isfm/ISFM';
import Agroclimate from './pages/agroclimate/Agroclimate';
import PestDisease from './pages/pest_disease/PestDisease';
import CSA from './pages/csa/CSA';
import Irrigation from './pages/irrigation/Irrigation';
import Mechanization from './pages/mechanization/Mechanization';
import BundledAAS from './pages/bundled_aas/BundledAAS';

class App extends Component {
  render() {
    return (
      <>
        <Menu />
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/fertilizer_advisories' element={<Fertilization />} />
              <Route path='/isfm' element={<ISFM />} />
              <Route path='/agroclimate' element={<Agroclimate />} />
              <Route path='/pest_disease' element={<PestDisease />} />
              <Route path='/csa' element={<CSA />} />
              <Route path='/irrigation' element={<Irrigation />} />
              <Route path='/mechanization' element={<Mechanization />} />
              <Route path='/bundled_aas' element={<BundledAAS />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </>
    );
  }

}

export default App;
