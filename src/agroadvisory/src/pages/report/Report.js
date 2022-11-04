import React from 'react';
import './Report.css'

import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';
import GeoFeatures from '../../services/GeoFeatures';

function Report() {

    const geo = GeoFeatures.geojson("'5ebad1b04c06b707e80d619d'");


    console.log(geo)
    
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 5 });
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-07", value: "2022-07" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }, { label: "Above", value: "above" }, { label: "Below", value: "below" }]);
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);

    const Location = () => {
        return(
            <div className='col' style={{backgroundColor: "white"}}>
                    <MapHeader title={"Location"} />
                    <Map id="location_report" init={map_init} type={"location_report"} geo={geo.value}/>
            </div>

        )

    }

    const NutrientsAndYield = () => {
        return(
            <div className='col ms-3 me-3' style={{backgroundColor: "white"}}>
                    <MapHeader title={"Nutrients and Yield"} />
                    <Map id="map_nutrients_yield" init={map_init} type={"nutrients_yield"} crop={crop} forecast={forecast} 
                                        scenario={scenario}/>
            </div>

        )

    }

    const SeasonalDominant = () => {
        return(
            <div className='col' style={{backgroundColor: "white"}}>
                    <MapHeader title={"Seasonal dominant"} />
                    <Map id="location_report" init={map_init} type={"seasonal_dominant"} />
            </div>

        )

    }

    return(
        <main>
            <br />
            <section className='container'>
                <div className="d-flex justify-content-between">
                    <h4>Report</h4>
                    <button type="button" className="btn btn-primary">Export</button>
                </div>
                    
                <div className='row'>
                        <Location/>
                        <NutrientsAndYield/>
                        <SeasonalDominant/>    
                </div>

            </section>
            
                

            
        </main>
    )

}

export default Report;