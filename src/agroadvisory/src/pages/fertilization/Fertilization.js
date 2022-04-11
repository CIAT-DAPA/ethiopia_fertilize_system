import React from 'react';

import Sidebar from '../../components/sidebar/Sidebar';

import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';

function Fertilization() {
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-04", value: "beta" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }]);
    const [map_init, setMap_init] = React.useState({ center: [8.3988271,39.9405962], zoom: 6 });
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
        <div className="row">
            <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <MapHeader title={"Type yield"} />
                <p className='text-justify'>
                    The tool provides many types of yield for a given (optimal nutrient amount). This includes:
                    <ol>
                        <li>Agronomic optimal yield</li>
                        <li>Agronomic attainable yield</li>
                        <li>Current yield (blanket yield)</li>
                        <li>Economic/profitable optimal yield based on which yield decomposition can also be calculated</li>
                    </ol>
                </p>
                <Map id="map_type_yield" init={map_init} type={"yield"} crop={crop} forecast={forecast} scenario={scenario} />
                <MapHeader title={"Nutrients"} />
                <p className='text-justify'>
                    Optimal nutrient amount (N, P, K) which accounts their interaction effect on yield.
                </p>
                <Map id="map_nutrients" init={map_init} type={"nutrients"} crop={crop} forecast={forecast} scenario={scenario} />
            </main>
        </div>
    );
}

export default Fertilization;