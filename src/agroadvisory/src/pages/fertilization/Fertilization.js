import React from 'react';
import L from "leaflet";

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';

import GeoFeatures from '../../services/GeoFeatures';

function Fertilization() {
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-04", value: "beta" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }]);
    const [map_init, setMap_init] = React.useState({ center: [8.3988271, 39.9405962], zoom: 6 });
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);
    const icon = L.icon({iconSize: [25, 41],iconAnchor: [10, 41],popupAnchor: [2, -40],iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"});

    const changeForecast = event => {
        setForecast(event.value);
    };

    const changeCrop = event => {
        setCrop(event.value);
    };

    const changeScenario = event => {
        setCrop(event.value);
    };

    const onClickMap = (e, map) => {
        const { lat, lng } = e.latlng;
        // The object map has many layers. By default OSM is 35, but custom layers have different ids
        Object.keys(map.target._layers).forEach(function(key,index) {
            if(map.target._layers[key].wmsParams != undefined){
                const layer_name = map.target._layers[key].options.layers;
                GeoFeatures.get_value(layer_name,lat,lng)
                .then((data)=>{
                    L.marker([lat, lng], { icon }).addTo(map.target)
                        .bindPopup(layer_name.split(":")[1] + ' - value: ' + data.features[0].properties.GRAY_INDEX.toFixed(2))
                        .openPopup();
                });
            }
        });
    }

    return (
        <div className="row">
            <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario} />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <br />
                <h1>Fertilizer advisories</h1>
                <p className='text-justify'>
                    The fertilizer recommendation component of NextGenAgroadvisory is location-, context-, and season- 
                    intelligent system of advising fertilizer type, amount, and time of application in wheat growing 
                    environments of Ethiopia. It is a data-driven approach based on systematic integration of large legacy 
                    agronomic data collated throughout Ethiopia and corresponding co-variates (environmental variables) 
                    using machine learning algorithms.
                </p>
                <MapHeader title={"Type yield"} />
                <p className='text-justify'>
                    The tool provides many types of yield for a given (optimal nutrient amount). This includes:
                </p>
                <ol>
                    <li>Agronomic optimal yield</li>
                    <li>Agronomic attainable yield</li>
                </ol>
                <p className='text-justify'>
                    Based on which yield decomposition can also be calculated
                </p>
                <Map id="map_type_yield" init={map_init} type={"yield"} crop={crop} forecast={forecast} scenario={scenario} onClick={onClickMap} />
                <MapHeader title={"Nutrients"} />
                <p className='text-justify'>
                    Optimal nutrient amount (N, P, K) which accounts their interaction effect on yield.
                </p>
                <Map id="map_nutrients" init={map_init} type={"nutrients"} crop={crop} forecast={forecast} scenario={scenario} onClick={onClickMap} />
            </main>
        </div>
    );
}

export default Fertilization;