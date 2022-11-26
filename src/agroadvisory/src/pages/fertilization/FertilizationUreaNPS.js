import React from 'react'
import L from "leaflet";

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';

import GeoFeatures from '../../services/GeoFeatures';
import LineChart from '../../components/chart/LineChart';
import Table from '../../components/table/Table';

function FertilizationUreaNPS() {
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-07", value: "2022-07" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }, { label: "Above", value: "above" }, { label: "Below", value: "below" }]);
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 6 });
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);
    
    const [tableData, setTableData] = React.useState();
   
    
    
    const changeForecast = event => {
        setForecast(event.value);
    };

    const changeCrop = event => {
        setCrop(event.value);
    };

    const changeScenario = event => {
        setScenario(event.value);
    };

    return (
        <div>

           
                <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
                <Map id="map_nps_urea" init={map_init} type={"nps_urea"} crop={crop} forecast={forecast} 
                                        scenario={scenario} style={{height: '80vh'}}/>
                        


        </div>
     
    );
}

export default FertilizationUreaNPS;