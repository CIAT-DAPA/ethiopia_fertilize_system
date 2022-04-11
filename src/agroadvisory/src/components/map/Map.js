import React from 'react';

import Configuration from "../../conf/Configuration";

import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Polyline } from 'react-leaflet';

function Map(props) {
    const [url_service, setUrlService] = React.useState(Configuration.get_geoserver_url() + Configuration.get_geoserver_service());
    const [types_yield, setTypesYield] = React.useState(["optimal", "attainable"]);
    const [nutrients, setNutrients] = React.useState(["n", "p", "k"]);
    const { BaseLayer } = LayersControl;

    return (
        <>
            <MapContainer center={props.init.center} zoom={props.init.zoom} style={{ height: '500px' }} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position="topright">
                    {props.type == "yield" ?
                        types_yield.map((item) => {
                            return <BaseLayer key={"yield_" + item} name={item}>
                                        <WMSTileLayer
                                            layers={"fertilizer_et:yieldtypes_" + props.crop + "_" + item + "_yield_" + props.scenario}
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
                                            layers={"fertilizer_et:nutrients_" + props.crop + "_" + item + "_" + props.scenario}
                                            attribution=''
                                            url={url_service}
                                            format={"image/png"}
                                            transparent={true}
                                        />
                                    </BaseLayer>
                        })
                    }
                </LayersControl>
            </MapContainer>
        </>
    );


}

export default Map;