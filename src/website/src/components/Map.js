import React, { Component } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const GEOSERVER_URL = "http://localhost:8600/geoserver/";
const [url_national_annual, setUrlNatAnnual] = GEOSERVER_URL + "datosPrueba" + "/" + "wms";

const Map = (props) => {

    return(
        <MapContainer center={props.center} zoom={props.zoom} style={{ height: '600px' }} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                    
                        <>
                        
                            <LayersControl.BaseLayer name={"Prueba 1"}>
                                <WMSTileLayer
                                    layers={'raster 1'}
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