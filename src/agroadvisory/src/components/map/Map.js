import React from 'react';
import L from "leaflet";
import GeoFeatures from '../../services/GeoFeatures';
import Configuration from "../../conf/Configuration";
import MapLegend from '../map_legend/MapLegend';
import ZoomControlWithReset from '../map_zoom_reset/ZoomControlWithReset';
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, ScaleControl, withLeaflet} from 'react-leaflet';
import "leaflet-easyprint";

//For reset map view
const ETHIOPIA_BOUNDS = [  [10, 30],  [8.5, 50],];

const auxTableData = [];
const geoserverLayers = ["optimal_nutrients_n", 
        "optimal_nutrients_p", "yieldtypes_optimal", 
        "urea_probabilistic", "nps_probabilistic", 
        "vcompost_probabilistic", "compost_probabilistic"];
let popUpMessage = '';


function Map(props) {
    const [url_service, setUrlService] = React.useState(Configuration.get_geoserver_url() + Configuration.get_geoserver_service());
    //const [types_yield, setTypesYield] = React.useState(["optimal", "attainable"]);
    const [nutrients_yield, setNutrients_yield] = React.useState(["n", "p", "optimal yield"]);
    const [types_yield, setTypesYield] = React.useState(["optimal"]);
    const [compost, setCompost] = React.useState(["compost", "vcompost"]);
    //const [nutrients, setNutrients] = React.useState(["n", "p", "k"]);
    const [fertilizer, setNutrients] = React.useState(["nps", "urea"]);
    const [currentLayer, setCurrentLayer] = React.useState();
    const { BaseLayer } = LayersControl;
    const icon = L.icon({iconSize: [25, 41],iconAnchor: [10, 41],popupAnchor: [2, -40],iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"});
    const [coord, setPosition] = React.useState([]);
    let layerType;

    //Current marker
    var marker = null;

   

    //For changing Map legend and popup message according to each layer (each one uses differents colors and values)
    const onLayerChange = (currentLayerName) => {

        for(let i = 0; i < geoserverLayers.length; i++) {
            if(currentLayerName.includes(geoserverLayers[i])) {
                setCurrentLayer(geoserverLayers[i])
            }
        }

        popUpMessage = (currentLayerName.includes("optimal_nutrients")) ? "optimal nutrient amount: ": 
            (currentLayerName.includes("yieldtypes")) ? "optimal yield amount: " : 
            (currentLayerName.includes(geoserverLayers[3]) || currentLayerName.includes(geoserverLayers[4])) ? "fertilizer amount: " : 
            (currentLayerName.includes(geoserverLayers[5])) ? "vermi-compost: " : 
            (currentLayerName.includes(geoserverLayers[6])) ? "compost: " : "" 

    }
    

    const handleEventsMap = (map) => {


        // Adding print/export button on the map
        L.easyPrint({
            title: 'Download map',
            position: 'topright',
            sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
            exportOnly: true,
            hideControlContainer: true
            
        }).addTo(map.target);
       
        map.target.on("click", function (e) {
            //props.onClick(e, map);
            const { lat, lng } = e.latlng;

            //Just one marker at once
            if (marker !== null) {
                map.target.removeLayer(marker);
            }
                
            // The object map has many layers. By default OSM is 35, but custom layers have different ids
            Object.keys(map.target._layers).forEach(function(key,index) {
                if(map.target._layers[key].wmsParams !== undefined){
                    //Yield layer name
                    const layer_name = map.target._layers[key].options.layers;
                    
                    if((layer_name.includes(geoserverLayers[2]))){
                        //Getting N data  	fertilizer_et:et_wheat_optimal_nutrients_n_normal 
                        let nLayer = "fertilizer_et:et_"+props.crop+"_"+geoserverLayers[0]+"_"+props.scenario
                        GeoFeatures.get_value(nLayer,lat,lng).then((data)=>{
                            if(data.features[0] && data.features[0].properties.GRAY_INDEX.toFixed(2) > 0) {
                                auxTableData[0] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                                props.setTableData({n: auxTableData[0], p: auxTableData[1], yieldData: auxTableData[2]})

                            }
                    
                        });
                        //Getting P data
                        let pLayer = "fertilizer_et:et_"+props.crop+"_"+geoserverLayers[1]+"_"+props.scenario
                        GeoFeatures.get_value(pLayer,lat,lng).then((data)=>{
                            if(data.features[0] && data.features[0].properties.GRAY_INDEX.toFixed(2) > 0) {
                                auxTableData[1] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                                //setting table data
                                props.setTableData({n: auxTableData[0], p: auxTableData[1], yieldData: auxTableData[2]})

                            }
                                
                        });

                    }
                    
                    onLayerChange(layer_name);
                    //Making a popup
                    GeoFeatures.get_value(layer_name,lat,lng)
                    .then((data)=>{ 
                        if(data.features[0] && data.features[0].properties.GRAY_INDEX.toFixed(2) > 0) {
                            
                            marker = L.marker([lat, lng], { icon }).addTo(map.target)
                                .bindPopup(popUpMessage + data.features[0].properties.GRAY_INDEX.toFixed(2) + " kg/ha")
                                .openPopup();
                                auxTableData[2] = data.features[0].properties.GRAY_INDEX.toFixed(2);
                                if(layer_name.includes(geoserverLayers[2])){
                                    props.setTableData({n: auxTableData[0], p: auxTableData[1], yieldData: auxTableData[2]})

                                }
    
                                
                        }
                    });
                    
                }
                
            });
            
            });
    };

    return (
        <>
            <MapContainer center={props.init.center} zoom={props.init.zoom} zoomControl={false} style={{ height: '500px' }} scrollWheelZoom={true} whenReady={handleEventsMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <div className="leaflet-top leaflet-left">
                    <ZoomControlWithReset bounds={ETHIOPIA_BOUNDS} />
                </div>
                <LayersControl position="topright">
                    {props.type == "nutrients_yield" ?
                        nutrients_yield.map((item) => {
                            return <BaseLayer key={"nutrients_yield_" + item} name={item}> 
                                {
                                    layerType = (item === "optimal yield")?"_yieldtypes_":"_optimal_nutrients_"
                                }
                                {
                                    item = (item === "optimal yield")?"optimal": item
                                }


                                <WMSTileLayer
                                    layers={"fertilizer_et:et_" + props.crop + layerType  + item +"_"+ props.scenario}
                                    attribution=''
                                    url={url_service}
                                    format={"image/png"}
                                    transparent={true}
                                />
                            </BaseLayer>
                        })
                        : props.type == "nps_urea" ?
                            fertilizer.map((item) => {
                                return <BaseLayer key={"nps_urea" + item} name={item}>
                                   
                                    <WMSTileLayer
                                        layers={"fertilizer_et:et_" + props.crop + "_"+ item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                    />
                                </BaseLayer>
                            })
                            :
                            compost.map((item) => {
                                return <BaseLayer key={"compost_" + item} name={item}>
                                    <WMSTileLayer
                                        layers={"fertilizer_et:et_" + props.crop + "_" + item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                    />
                                </BaseLayer>
                            })
                    }
                </LayersControl>
                <MapLegend currentLayer={currentLayer} geoserverLayers={geoserverLayers}/>
                <ScaleControl position="bottomleft" />
      
            </MapContainer>
        </>
    );


}

export default Map;