import React, { Component, useState} from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const Map = (props) => {
    
    const GEOSERVER_URL = "http://localhost:8600/geoserver/";
    let store =  "datosPrueba";
    const [url_national_annual, setUrlNatAnnual] = useState(GEOSERVER_URL + store + "/" + "wms");

    return(
        <MapContainer center={props.center} zoom={props.zoom} style={{ height: '67vh' }} scrollWheelZoom={true} className="mt-4">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                    
                        <>
                        
                            <LayersControl.BaseLayer name={"Prueba 1"}>
                                <WMSTileLayer
                                    layers={'datosPrueba:2010'}
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