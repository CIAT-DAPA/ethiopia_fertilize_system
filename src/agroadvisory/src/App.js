import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

import Home from './pages/home/Home';
import About from './pages/about/About';
import Fertilization from './pages/fertilization/Fertilization';
import FertilizationUreaNPS from './pages/fertilization/FertilizationUreaNPS';

import './App.css';
import ISFM from './pages/isfm/ISFM';
import Agroclimate from './pages/agroclimate/Agroclimate';
import PestDisease from './pages/pest_disease/PestDisease';
import CSA from './pages/csa/CSA';
import Irrigation from './pages/irrigation/Irrigation';
import Mechanization from './pages/mechanization/Mechanization';
import BundledAAS from './pages/bundled_aas/BundledAAS';
import Report from './pages/report/Report';
import ReportWoreda from './pages/report_woreda/ReportWoreda';
import WheatRust from './pages/wheat_rust/WheatRust';
import Lime from './pages/lime/Lime';
import Methodology from './pages/methodology/Methodology';

import store from './redux/store/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>

          <div className="container-fluid">
            <Menu />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/fertilizer_advisories' element={<Fertilization />} />
              <Route path='/fertilizer_advisories_nps_urea' element={<FertilizationUreaNPS />} />
              <Route path='/isfm' element={<ISFM />} />
              <Route path='/agroclimate' element={<Agroclimate />} />
              <Route path='/lime' element={<Lime />} />
              <Route path='/pest_disease' element={<PestDisease />} />
              <Route path='/csa' element={<CSA />} />
              <Route path='/irrigation' element={<Irrigation />} />
              <Route path='/mechanization' element={<Mechanization />} />
              <Route path='/bundled_aas' element={<BundledAAS />} />
              <Route path='/wheat_rust' element={<WheatRust />} />
              <Route path='/report' element={<Report />} />
              <Route path='/report_woreda' element={<ReportWoreda />} />
              <Route path='/methodology' element={<Methodology />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
          <Footer />
        </Router>

      </Provider>
    );
  }

}

export default App;
