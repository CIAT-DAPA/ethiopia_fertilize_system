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

            <div className='mt-3'>

                <h2 className="font-link text-center">Fertilizer advisories NPS Urea</h2>

                <p className="font-link-body">
                    The fertilizer recommendation component of NextGenAgroadvisory is location-, context-, and season- 
                        intelligent system of advising fertilizer type, amount, and time of application in wheat growing 
                        environments of Ethiopia. It is a data-driven approach based on systematic integration of large legacy 
                        agronomic data collated throughout Ethiopia and corresponding co-variates (environmental variables) 
                        using machine learning algorithms.

                </p>
                    
                <p className="font-link-body">
                The amount of NPS and Urea that should be recommended to get optimal yield.
                </p>
            </div>

            <div style={{'position': 'relative'}}>

                <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
                <Map id="map_nps_urea" init={map_init} type={"nps_urea"} crop={crop} forecast={forecast} 
                                        scenario={scenario} style={{height: '80vh'}} cuttable={true} downloadable={true} legend={true}/>
            </div>

           
                        


        </div>
     
    );
}

export default FertilizationUreaNPS;