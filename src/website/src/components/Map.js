import React, { Component, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Map = (props) => {
    
    const GEOSERVER_URL = "http://localhost:8600/geoserver/";
    let workspace =  "fertilizer_61e59d829d5d2486e18d2ea9";
    const [url_national_annual, setUrlNatAnnual] = useState(GEOSERVER_URL + workspace + "/" + "wms");

    return(
        <MapContainer center={props.center} zoom={props.zoom} style={{ height: '67vh' }} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                    
                        <>
                        
                            <LayersControl.BaseLayer name={"Optimal yield"}>
                                <WMSTileLayer
                                    layers={'fertilizer_61e59d829d5d2486e18d2ea9:optimal_yield'}
                                    attribution=''
                                    url={url_national_annual}
                                    format={"image/png"}
                                    transparent={true}
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name={"Prueba 2"}>
                                <WMSTileLayer
                                    layers={'prueba2:rf_0-15-0'}
                                    attribution=''
                                    url={url_national_annual}
                                    format={"image/png"}
                                    transparent={true}
                                />
                            </LayersControl.BaseLayer>
                            
                        </>
                        
                </LayersControl>
                

            </MapContainer>
        
    )



}
export default Map;