import React from 'react'
import L from "leaflet";

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';

import GeoFeatures from '../../services/GeoFeatures';
import LineChart from '../../components/chart/LineChart';
import Table from '../../components/table/Table';

import '../../assets/styles/font.css';

function Fertilization() {
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-07", value: "2022-07" }, { label: "2022-06", value: "2022-06" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }]);
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
        setCrop(event.value);
    };

    return (
        
            <div className="row">
                <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <br />
                    <h2 className="font-link text-center">Fertilizer advisories</h2>
                    
                        <p className="font-link-body">
                        The fertilizer recommendation component of NextGenAgroadvisory is location-, context-, and season- 
                        intelligent system of advising fertilizer type, amount, and time of application in wheat growing 
                        environments of Ethiopia. It is a data-driven approach based on systematic integration of large legacy 
                        agronomic data collated throughout Ethiopia and corresponding co-variates (environmental variables) 
                        using machine learning algorithms.

                        </p>
                    
                    <MapHeader title={"Nutrients and Yield"} />
                    <div className='text-justify'>
                        <p className="font-link-body">
                        Optimal nutrient amount (N & P) shows their interaction effect on optimal yield and the yield shows its maximum value based the optimal nutrient amount.
                        
                        </p>
                        {/* <ol className="font-link-body">
                            <li>Agronomic optimal yield (kg/ha)</li>
                            {/* <li>Agronomic attainable yield (kg/ha)</li>
                        </ol> */}

                    {/* <div className='text-justify'>
                        <p className="font-link-body">
                            Based on which yield decomposition can also be calculated

                        </p>
                    </div> */}
            
                    </div>

                        <div className="row justify-content-start">
                                <div className='col-8'>
                                    <Map id="map_nutrients_yield" init={map_init} type={"nutrients_yield"} crop={crop} forecast={forecast} 
                                        scenario={scenario} setTableData={setTableData}/>

                                </div>
                                <div className='col-4'>
                                    
                                    {/* <LineChart/> */}
                                    {
                                        tableData &&
                                            <Table 
                                            tableData={tableData}/>
                                    }

                                </div>

                        </div>


                    <MapHeader title={"Fertilizer NPS Urea"} />
                    
                        <p className="font-link-body">
                            The amount of NPS and Urea that should be recommended to get optimal yield.

                        </p>
                    
                   
                    
            
                    <Map id="map_nps_urea" init={map_init} type={"nps_urea"} crop={crop} forecast={forecast} 
                                        scenario={scenario}/>
                        
                  
                </main>

            </div>
     
    );
}

export default Fertilization;