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
        "vcompost_probabilistic", "compost_probabilistic", "dominant"];
let popUpMessage = '';
let unitPopupMessage='';



function Map(props) {

    const [nutrients_yield, setNutrients_yield] = React.useState(["n", "p", "optimal"]);
    const [compost, setCompost] = React.useState(["compost", "vcompost"]);
    const [fertilizer, setNutrients] = React.useState(["nps", "urea"]);
    const [currentLayer, setCurrentLayer] = React.useState();
    const [warning, setWarning] = React.useState(false);
    const [polygonCoords, setPolygonCoords] = React.useState();
    const [mapRef, setRefMap] = React.useState();
    //For changing the layer according to scenerario selected (Sidebar)
    const [lastSelected, setLastSelected] = React.useState();
    const [scenarios, setScenarios] = React.useState(["normal", "above", "below"]);

    const { BaseLayer } = LayersControl;
    const icon = L.icon({iconSize: [25, 41],iconAnchor: [10, 41],popupAnchor: [2, -40],iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"});
    const request = Configuration.get_raster_crop_url();
    let layerType;

    //Current marker
    var marker = null;

    var paramIdFilter;

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

    function getUrlService(workspace, service){
        return Configuration.get_geoserver_url()+workspace+'/'+service
    }

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
        
        unitPopupMessage = popUpMessage===""?"":" kg/ha";

    }
    
    React.useEffect(() => {
        if (mapRef)
        mapRef.target.flyToBounds(props.bounds)
    },[props.bounds])

    const handleEventsMap = (map) => {

        // Adding print/export button on the map
        if(props.downloadable){
            L.easyPrint({
                title: 'Download map',
                position: 'topright',
                sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
                exportOnly: true, //If false it will print
                hideControlContainer: true
                
            }).addTo(map.target);
           
        }

        if (props.bounds){
            map.target.flyToBounds(props.bounds)
        }

        setRefMap(map);
        
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
                        if(data.features[0] && data.features[0].properties.GRAY_INDEX.toFixed(2) > 0 && popUpMessage != "") {
                            
                            marker = L.marker([lat, lng], { icon }).addTo(map.target)
                                .bindPopup(popUpMessage + data.features[0].properties.GRAY_INDEX.toFixed(2) + unitPopupMessage)
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
        
            <MapContainer zoomSnap={0.25} zoomDelta={0.25} center={props.init.center} zoom={props.init.zoom} zoomControl={false} style={props.style} scrollWheelZoom={true} whenReady={handleEventsMap} renderer={L.canvas()}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                    
                />
                <LayersControl position="topright" collapsed={false}>
                    {props.type === "nutrients_yield" ?
                        nutrients_yield.map((item) => {
                           
                            
                            return <BaseLayer key={"nutrients_yield_" + item} name={item==="optimal"?"optimal yield":item} checked={item===lastSelected?true:false}> 
                    
                                {
                                    layerType = (item === "optimal")?"_yieldtypes_":"_optimal_nutrients_"
                                }
                                
                    
                                <WMSTileLayer
                                    key={"fertilizer_et:et_" + props.crop + layerType  + item +"_"+ props.scenario}
                                    layers={"fertilizer_et:et_" + props.crop + layerType  + item +"_"+ props.scenario}
                                    attribution=''
                                    url={getUrlService('fertilizer_et', 'wms')}
                                    format={"image/png"}
                                    transparent={true}
                                    params={{'time': props.forecast}}
                                    eventHandlers={{
                                        add: (e) => {
                                          onLayerChange(e.target.options.layers);
                                          setLastSelected(item);
                                          
                                        }
                                      }}
                                    
                                />
                            </BaseLayer>
                        })
                        : props.type === "nps_urea" ?
                            fertilizer.map((item) => {
                                return <BaseLayer key={"nps_urea" + item} name={item} checked={item===lastSelected?true:false}>
                                   
                                    <WMSTileLayer
                                        key={"fertilizer_et:et_" + props.crop + "_"+ item + "_probabilistic_" +props.scenario}
                                        layers={"fertilizer_et:et_" + props.crop + "_"+ item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={getUrlService('fertilizer_et', 'wms')}
                                        format={"image/png"}
                                        transparent={true}
                                        params={{'time': props.forecast}}
                                        eventHandlers={{
                                            add: (e) => {
                                              onLayerChange(e.target.options.layers);
                                              setLastSelected(item);
                                            }
                                          }}
                                    />
                                </BaseLayer>
                            })
                            : props.type === "compost" ?
                            compost.map((item) => {
                                return <BaseLayer key={"compost_" + item} name={item} checked={item===lastSelected?true:false}>
                                    <WMSTileLayer
                                        key={"fertilizer_et:et_" + props.crop + "_" + item + "_probabilistic_" +props.scenario}
                                        layers={"fertilizer_et:et_" + props.crop + "_" + item + "_probabilistic_" +props.scenario}
                                        attribution=''
                                        url={getUrlService('fertilizer_et', 'wms')}
                                        format={"image/png"}
                                        transparent={true}
                                        params={{'time': props.forecast}}
                                        eventHandlers={{
                                            add: (e) => {
                                              onLayerChange(e.target.options.layers);
                                              setLastSelected(item);
                                            }
                                          }}
                                    />
                                </BaseLayer>
                            })
                            : props.type === "location" ? (
                                props.kebele ?
                                    <BaseLayer key={props.type + " - " + Date.now()} name={"administrative levels"} checked={props.checked}>
                                        <WMSTileLayer
                                            layers={"administrative:et_adm4"}
                                            attribution=''
                                            url={getUrlService('administrative', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            styles='Etiopia_Admin_Styles'
                                            cql_filter= {`id_adm4=${props.param}`}
                                        />
                                    </BaseLayer>
                                : props.woreda ?
                                    <BaseLayer key={props.type + " - " + Date.now()} name={"administrative levels"} checked={props.checked}>
                                        <WMSTileLayer
                                            layers={"administrative:et_adm4"}
                                            attribution=''
                                            url={getUrlService('administrative', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            styles='Etiopia_Admin_Styles'
                                            cql_filter= {`id_adm3=${props.param}`}
                                        />
                                    </BaseLayer>
                                : props.zone ? 
                                    <BaseLayer key={props.type + " - " + Date.now()} name={"administrative levels"} checked={props.checked}>
                                        <WMSTileLayer
                                            layers={"administrative:et_adm3"}
                                            attribution=''
                                            url={getUrlService('administrative', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            styles='Etiopia_Admin_Styles'
                                            cql_filter= {`ADM2_PCODE='ET${props.param.length == 4 ? props.param : "0" + props.param}'`}
                                        />
                                    </BaseLayer>
                                : props.region ?
                                    <BaseLayer key={props.type + " - " + Date.now()} name={"administrative levels"} checked={props.checked}>
                                        <WMSTileLayer
                                            layers={"administrative:et_adm2"}
                                            attribution=''
                                            url={getUrlService('administrative', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            styles='Etiopia_Admin_Styles'
                                            cql_filter= {`ADM1_PCODE='ET${props.param.length == 2 ? props.param : "0" + props.param}'`}
                                        />
                                    </BaseLayer>
                                
                                :
                                    <BaseLayer key={props.type + " - " + Date.now()} name={"administrative levels"} checked={props.checked}>
                                        <WMSTileLayer
                                            layers={"administrative:et_adm1"}
                                            attribution=''
                                            url={getUrlService('administrative', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            styles='Etiopia_Admin_Styles'
                                        />
                                    </BaseLayer>
                            )
                       
                            : props.type === "seasonal_dominant" ?
                            
                                 <BaseLayer key={props.type} name={"dominant"} checked={props.checked}>
                                    <WMSTileLayer
                                        layers={"aclimate_et:seasonal_country_et_dominant"}
                                        attribution=''
                                        url={getUrlService('aclimate_et', 'wms')}
                                        format={"image/png"}
                                        transparent={true}
                                        // params={{'time': props.forecast}}
                                        eventHandlers={{
                                            add: (e) => {
                                              onLayerChange(e.target.options.layers);
                                              
                                            }
                                          }}
                                    />
                                </BaseLayer>
                            
                            : props.type === "recommendation_report" ?

                                scenarios.map(scenario => {
                                    return <BaseLayer key={scenario} name={scenario} checked={scenario === 'normal'} >
                                        <WMSTileLayer
                                            key={`fertilizer_et:et_wheat_yieldtypes_optimal_${scenario}`}
                                            layers={`fertilizer_et:et_wheat_yieldtypes_optimal_${scenario}`}
                                            attribution=''
                                            url={getUrlService('fertilizer_et', 'wms')}
                                            format={"image/png"}
                                            transparent={true}
                                            params={{ 'time': "2022-7" }}
                                            eventHandlers={{
                                                add: (e) => {
                                                    onLayerChange(e.target.options.layers);
                                                    setLastSelected("optimal");
                                                }
                                            }}

                                        />

                                    </BaseLayer>
                                }) 
                            : props.type === "nps_urea_report" ?
                                fertilizer.map((item) => {
                                    return scenarios.map(scenario => {
                                        return <BaseLayer key={`${item}_${scenario}`} name={`${item} ${scenario}`} checked={(item === "nps" && scenario === "normal")}>

                                            <WMSTileLayer
                                                key={"fertilizer_et:et_wheat_" + item + "_probabilistic_" + scenario}
                                                layers={"fertilizer_et:et_wheat_" + item + "_probabilistic_" + scenario}
                                                attribution=''
                                                url={getUrlService('fertilizer_et', 'wms')}
                                                format={"image/png"}
                                                transparent={true}
                                                params={{ 'time': "2022-7" }}
                                                eventHandlers={{
                                                    add: (e) => {
                                                        onLayerChange(e.target.options.layers);
                                                        setLastSelected(item);
                                                    }
                                                }}
                                            />
                                        </BaseLayer>
                                    })
                                })
                            : props.type === "compost_report" ?
                                compost.map((item) => {
                                    return scenarios.map(scenario => {
                                        return <BaseLayer key={`${item}_${scenario}`}  name={`${item} ${scenario}`} checked={(item === "compost" && scenario === "normal")}>

                                            <WMSTileLayer
                                                key={"fertilizer_et:et_wheat_" + item + "_probabilistic_" + scenario}
                                                layers={"fertilizer_et:et_wheat_" + item + "_probabilistic_" + scenario}
                                                attribution=''
                                                url={getUrlService('fertilizer_et', 'wms')}
                                                format={"image/png"}
                                                transparent={true}
                                                params={{ 'time': "2022-7" }}
                                                eventHandlers={{
                                                    add: (e) => {
                                                        onLayerChange(e.target.options.layers);
                                                        setLastSelected(item);
                                                    }
                                                }}
                                            />
                                        </BaseLayer>
                                    })
                                })                          
                            :
                                <></>
                                
                            

                    }
                </LayersControl>
                {
                    props.legend &&
                        <MapLegend currentLayer={currentLayer} geoserverLayers={geoserverLayers}/>
                }
                <ScaleControl position="bottomleft" />
                <div className="leaflet-top leaflet-left">
                    <ZoomControlWithReset bounds={props.bounds? props.bounds: ETHIOPIA_BOUNDS} />
                </div>
                {
                    props.cuttable && 
                        <DrawControl
                        setPolygonCoords={setPolygonCoords}
                        />
                }
            
                {
                props.geo ? <GeoJSON attribution="" key={"advisory_geojson"+props.geo.timeStamp} data={props.geo} style={props.styleGeojson} /> : <GeoJSON attribution="" />
                }
            </MapContainer>
           
        </>
    );


}

export default Map;