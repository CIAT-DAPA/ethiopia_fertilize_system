import React from 'react';

import Configuration from "../../conf/Configuration";
import MapLegend from '../map_legend/MapLegend';
import ZoomControlWithReset from '../map_zoom_reset/ZoomControlWithReset';

import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, ScaleControl, CircleMarker, Tooltip, Marker, Popup, Polyline } from 'react-leaflet';

const ETHIOPIA_BOUNDS = [  [10, 30],  [8.5, 50],];

function Map(props) {
    const [url_service, setUrlService] = React.useState(Configuration.get_geoserver_url() + Configuration.get_geoserver_service());
    //const [types_yield, setTypesYield] = React.useState(["optimal", "attainable"]);
    const [types_yield, setTypesYield] = React.useState(["optimal"]);
    //const [nutrients, setNutrients] = React.useState(["n", "p", "k"]);
    const [nutrients, setNutrients] = React.useState(["n", "p"]);
    const { BaseLayer } = LayersControl;

    const handleEventsMap = (map) => {
        map.target.on("click", function (e) {
            props.onClick(e, map);
            //console.log(e.latlng);
            //L.marker([lat, lng], { icon }).addTo(map.target);
        });
    };

    return (
        <>
            <MapContainer center={props.init.center} zoom={props.init.zoom} style={{ height: '500px' }} scrollWheelZoom={true} whenReady={handleEventsMap} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <div className="leaflet-top leaflet-left">
                    <ZoomControlWithReset bounds={ETHIOPIA_BOUNDS} />
                </div>
                <LayersControl position="topright">
                    {props.type == "yield" ?
                        types_yield.map((item) => {
                            return <BaseLayer key={"yield_" + item} name={item}> 	
                                <WMSTileLayer
                                    layers={"fertilizer_et:et_" + props.crop + "_yieldtypes_"  + item +"_"+ props.scenario}
                                    attribution=''
                                    url={url_service}
                                    format={"image/png"}
                                    transparent={true}
                                />
                            </BaseLayer>
                        })
                        :
                        nutrients.map((item) => {
                            return <BaseLayer key={"nutrients_" + item} name={item}>
                                <WMSTileLayer
                                    layers={"fertilizer_et:et_" + props.crop +"_optimal_nutrients_"+item + "_" +props.scenario}
                                    attribution=''
                                    url={url_service}
                                    format={"image/png"}
                                    transparent={true}
                                />
                            </BaseLayer>
                        })
                    }
                </LayersControl>
                {/* <MapLegend/> */}
                <ScaleControl position="topright" />
            </MapContainer>
        </>
    );


}

export default Map;