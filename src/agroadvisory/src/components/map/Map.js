import React from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, ScaleControl, GeoJSON} from 'react-leaflet';
import "leaflet-easyprint";
import GeoFeatures from '../../services/GeoFeatures';
import Configuration from "../../conf/Configuration";
import MapLegend from '../map_legend/MapLegend';
import ZoomControlWithReset from '../map_zoom_reset/ZoomControlWithReset';
import DrawControl from '../map_draw/DrawControl';

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
    const [warning, setWarning] = React.useState(false);
    const { BaseLayer } = LayersControl;
    const icon = L.icon({iconSize: [25, 41],iconAnchor: [10, 41],popupAnchor: [2, -40],iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"});
    const [polygonCoords, setPolygonCoords] = React.useState();
    const [lastSelected, setLastSelected] = React.useState("optimal");
    const request = Configuration.get_raster_crop_url();
    let layerType;

    //Current marker
    var marker = null;

    React.useEffect(() => {
        
        if(polygonCoords && currentLayer){
            let parameters = {minx: polygonCoords._southWest.lng, miny: polygonCoords._southWest.lat, maxx: polygonCoords._northEast.lng, maxy: polygonCoords._northEast.lat, layer: "et_"+props.crop+"_"+currentLayer+"_"+props.scenario}
            let requestFormatted = request+"?"+"boundaries="+parameters["minx"]+","+parameters["miny"]+","+parameters["maxx"]+","+parameters["maxy"]+"&"+"layer="+parameters["layer"]
            window.location.href = requestFormatted;
            setWarning(false);
            

        }else if(polygonCoords && !currentLayer){
            setWarning(true);
        }

    
    }, [polygonCoords]);

    // React.useEffect(() => {
        
    //     if(polygonCoords && currentLayer){
    //         let parameters = {minx: polygonCoords._southWest.lng, miny: polygonCoords._southWest.lat, maxx: polygonCoords._northEast.lng, maxy: polygonCoords._northEast.lat, layer: "et_"+props.crop+"_"+currentLayer+"_"+props.scenario}
    //         let requestFormatted = request+"?"+"boundaries="+parameters["minx"]+","+parameters["miny"]+","+parameters["maxx"]+","+parameters["maxy"]+"&"+"layer="+parameters["layer"]
    //         window.location.href = requestFormatted;
    //         setWarning(false);
            

    //     }else if(polygonCoords && !currentLayer){
    //         setWarning(true);
    //     }

    
    // }, [polygonCoords]);

    //For changing Map legend and popup message according to each layer (each one uses differents colors and values)
    const onLayerChange = (currentLayerName) => {

        for(let i = 0; i < geoserverLayers.length; i++) {
            if(currentLayerName.includes(geoserverLayers[i])) {
                setCurrentLayer(geoserverLayers[i]);
                break;
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
            exportOnly: true, //If false it will print
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
            {
                warning && <div class="alert alert-warning text-center" role="alert">
                                To download the clipping of a raster you must select a layer first
                            </div>

            }
        
            <MapContainer center={props.init.center} zoom={props.init.zoom} zoomControl={false} style={{ height: '500px' }} scrollWheelZoom={true} whenReady={handleEventsMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    
                />
                <LayersControl position="topright" >
                    {props.type === "nutrients_yield" ?
                        nutrients_yield.map((item) => {
                           
                            
                            return <BaseLayer key={"nutrients_yield_" + item} name={item} checked={item===lastSelected?true:false}> 
                                {
                                    layerType = (item === "optimal yield")?"_yieldtypes_":"_optimal_nutrients_"
                                }
                                {
                                    item = (item === "optimal yield")?"optimal": item
                                }
                                
                    
                                <WMSTileLayer
                                    key={"fertilizer_et:et_" + props.crop + layerType  + item +"_"+ props.scenario}
                                    layers={"fertilizer_et:et_" + props.crop + layerType  + item +"_"+ props.scenario}
                                    attribution=''
                                    url={url_service}
                                    format={"image/png"}
                                    transparent={true}
                                    params={{'time': props.forecast}}
                                    eventHandlers={{
                                        add: (e) => {
                                          onLayerChange(e.target.options.layers);
                                          console.log(item);
                                          console.log(e);
                                          setLastSelected(item);
                                          console.log(lastSelected);
                                        }
                                      }}
                                    
                                />
                            </BaseLayer>
                        })
                        : props.type === "nps_urea" ?
                            fertilizer.map((item) => {
                                return <BaseLayer key={"nps_urea" + item} name={item}>
                                   
                                    <WMSTileLayer
                                        layers={"fertilizer_et:et_" + props.crop + "_"+ item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                        params={{'time': props.forecast}}
                                        eventHandlers={{
                                            add: (e) => {
                                              onLayerChange(e.target.options.layers);
                                            }
                                          }}
                                    />
                                </BaseLayer>
                            })
                            : props.type === "compost" ?
                            compost.map((item) => {
                                return <BaseLayer key={"compost_" + item} name={item}>
                                    <WMSTileLayer
                                        layers={"fertilizer_et:et_" + props.crop + "_" + item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                        params={{'time': props.forecast}}
                                        eventHandlers={{
                                            add: (e) => {
                                              onLayerChange(e.target.options.layers);
                                              
                                            }
                                          }}
                                    />
                                </BaseLayer>
                            })
                            : props.type === "location_report" ?
                            
                                 <BaseLayer key={props.type} name={"location"}>
                                    <WMSTileLayer
                                        //layers={"fertilizer_et:Admin_fertilizerAdvisoryZone1"}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                        // params={{'time': props.forecast}}
                                        // eventHandlers={{
                                        //     add: (e) => {
                                        //       onLayerChange(e.target.options.layers);
                                              
                                        //     }
                                        //   }}
                                    />
                                </BaseLayer>
                            
                            : props.type === "seasonal_dominant" ?
                            
                                 <BaseLayer key={props.type} name={"dominant"}>
                                    <WMSTileLayer
                                        layers={"aclimate_et:seasonal_country_et_dominant"}
                                        attribution=''
                                        url={'https://geo.aclimate.org/geoserver/aclimate_et/wms'}
                                        format={"image/png"}
                                        transparent={true}
                                        // params={{'time': props.forecast}}
                                        // eventHandlers={{
                                        //     add: (e) => {
                                        //       onLayerChange(e.target.options.layers);
                                              
                                        //     }
                                        //   }}
                                    />
                                </BaseLayer>
                            
                            :// props.type === "recommendation" ?
                                <BaseLayer key={"recommendation_"} name={"recommendation"}>
                                    <WMSTileLayer
                                        layers={"fertilizer_et:et_wheat_fertilizer_recommendation_normal"}
                                        attribution=''
                                        url={url_service}
                                        format={"image/png"}
                                        transparent={true}
                                        //params={{'time': props.forecast}}
                                        // eventHandlers={{
                                        //     add: (e) => {
                                        //       onLayerChange(e.target.options.layers);
                                        //     }
                                        //   }}
                                    />
                                </BaseLayer>
                                
                            

                    }
                </LayersControl>
                <MapLegend currentLayer={currentLayer} geoserverLayers={geoserverLayers}/>
                <ScaleControl position="bottomleft" />
                <div className="leaflet-top leaflet-left">
                    <ZoomControlWithReset bounds={ETHIOPIA_BOUNDS} />
                </div>
                <DrawControl
                setPolygonCoords={setPolygonCoords}
                />
            

            {props.geo ? <GeoJSON attribution="" key={"advisory_geojson"} data={props.geo} /> : <GeoJSON attribution="" />}
      
            </MapContainer>
           
        </>
    );


}

export default Map;