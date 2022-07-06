import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';


function ISFM() {

    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-07", value: "202207" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }]);
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 6 });
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);
    
   
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
        <main>
            <section className='row'>
            <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <br />
                    <h2 className='font-link text-center'>ISFM advisories</h2>

                    <p className='font-link-body'>
                        Inorganic fertilizer could be expensive and may not be affordable by smallholders or
                        it may not be accessible due to different logistical reasons. In addition, inorganic
                        fertilizer can be more productive and sustainable when integrated with other good agronomic practices.
                        Thus, this component of the NextGen tool provides location- and context- specific organic and soil
                        fertility management advisories.
                    </p>
                    <MapHeader title={"Organic fertilizers"} />
                    <p className='font-link-body'>
                        Compost and vermi-compost (t/ha)
                    </p>
                    <Map id="map_organic_fertilizers" init={map_init} type={"compost"} crop={crop} forecast={forecast} scenario={scenario}/>
                    
                </main>
            </section>
        </main>
    );
}

export default ISFM;