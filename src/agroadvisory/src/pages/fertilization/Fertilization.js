import React, {useState, useEffect} from 'react'
import L from "leaflet";

import Sidebar from '../../components/sidebar/Sidebar';
import MapHeader from '../../components/map_header/MapHeader';
import Map from '../../components/map/Map';
import LineChart from '../../components/chart/LineChart';

import GeoFeatures from '../../services/GeoFeatures';
import Table from '../../components/table/Table';

function Fertilization() {
    const [opt_forecast, setOptForecast] = React.useState([{ label: "2022-04", value: "beta" }]);
    const [opt_crops, setOptCrops] = React.useState([{ label: "Wheat", value: "wheat" }]);
    const [opt_scenarios, setOptScenarios] = React.useState([{ label: "Normal", value: "normal" }]);
    const [map_init, setMap_init] = React.useState({ center: [9.3988271, 39.9405962], zoom: 6 });
    const [forecast, setForecast] = React.useState(opt_forecast[0].value);
    const [crop, setCrop] = React.useState(opt_crops[0].value);
    const [scenario, setScenario] = React.useState(opt_scenarios[0].value);
    const icon = L.icon({iconSize: [25, 41],iconAnchor: [10, 41],popupAnchor: [2, -40],iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"});
    
    const [tableData, setTableData] = useState();
    const [currentlocation, setCurrentlocation] = useState();
    const currentData = [];
    const nutrientsLayers = ["fertilizer_et:et_wheat_optimal_nutrients_n_normal", 
        "fertilizer_et:et_wheat_optimal_nutrients_p_normal", "fertilizer_et:et_wheat_yieldtypes_optimal_normal"];

    useEffect(() => {

        if(currentData && currentlocation){
            
            //console.log(currentData);

        }
    
    }, [currentlocation])
    
    // useEffect(() => {
       
    //     if(current_N_P_Yield){
    //         setUpdateChart(true);
    //     }
    //     //console.log(currentlocation);
        
    
    // }, [current_N_P_Yield])

    
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
            if(map.target._layers[key].wmsParams !== undefined){
                //Yield layer name
                const layer_name = map.target._layers[key].options.layers;
                let message = (layer_name.includes("nutrients")) ? "optimal nutrient amount: ": "yield: ";

                if(!(layer_name.includes("nutrients"))){
                    //Getting N data
                    GeoFeatures.get_value(nutrientsLayers[0],lat,lng).then((data)=>{
                        currentData[0] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                        setTableData({n: currentData[0], p: currentData[1], yieldData: currentData[2]})
                
                    });
                    //Getting P data
                    GeoFeatures.get_value(nutrientsLayers[1],lat,lng).then((data)=>{
                        currentData[1] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                        //setting table data
                        setTableData({n: currentData[0], p: currentData[1], yieldData: currentData[2]})
                            
                    });

                }
                
                //Getting yield and making a popup
                GeoFeatures.get_value(layer_name,lat,lng)
                .then((data)=>{ 
                    L.marker([lat, lng], { icon }).addTo(map.target)
                        .bindPopup(message + data.features[0].properties.GRAY_INDEX.toFixed(2) + " kg/ha")
                        .openPopup();
                        currentData[2] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                        if(!(layer_name.includes("nutrients"))){
                            setTableData({n: currentData[0], p: currentData[1], yieldData: currentData[2]})

                        }
                });
                
            }
            
        });
        //console.log(currentData);
        setCurrentlocation(e.latlng);
        
        
        
    }

    return (
        
            <div className="row">
                <Sidebar opt_forecast={opt_forecast} opt_crops={opt_crops} opt_scenarios={opt_scenarios} OnChangeForecast={changeForecast} OnChangeCrop={changeCrop} OnChangeScenario={changeScenario}/>
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
                    <MapHeader title={"Nutrients"} />
                    <p className='text-justify'>
                        Optimal nutrient amount (N, P, K) which accounts their interaction effect on yield.
                    </p>
                    <Map id="map_nutrients" init={map_init} type={"nutrients"} crop={crop} forecast={forecast} scenario={scenario} onClick={onClickMap} />
                    <MapHeader title={"Type yield"} />
                    <p className='text-justify'>
                        The tool provides many types of yield for a given (optimal nutrient amount). This includes:
                    </p>
                    <ol>
                        <li>Agronomic optimal yield (kg/ha)</li>
                        <li>Agronomic attainable yield (kg/ha)</li>
                    </ol>
                    <p className='text-justify'>
                        Based on which yield decomposition can also be calculated
                    </p>
                    {/* <div className='container'> */}
                        <div className="row justify-content-start">
                                <div className='col-8'>
                                    <Map id="map_type_yield" init={map_init} type={"yield"} crop={crop} forecast={forecast} scenario={scenario} onClick={onClickMap}/>
                                </div>
                                <div className='col-4'>
                                    
                                    <LineChart/>
                                    {
                                        tableData &&
                                            <Table 
                                            tableData={tableData}/>
                                    }

                                </div>

                        </div>

                    {/* </div> */}
                        
                  
                </main>

            </div>
     
    );
}

export default Fertilization;