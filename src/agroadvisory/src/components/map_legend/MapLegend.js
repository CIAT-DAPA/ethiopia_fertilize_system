import React from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Rectangle } from 'react-leaflet'
import Color from '../tools/Color';

import './MapLegend.css';

function MapLegend(props) {
    const BOUNDS_STYLE = { weight: 1 }
    const [grades, setGrades] = React.useState([0.0, 5.0, 10.0, 20.0, 40.0, 60.0, 80.0, 100.0]);


    return (
        <div className={"leaflet-bottom leaflet-right"}>
            <div className="leaflet-control leaflet-bar">
                <div className='info legend'>
                    <h5>Porcentaje</h5>
                    {grades.map((item, idx) => (
                        <div key={"div_" + idx} >
                            <i key={"i_" + idx} style={{ background: Color.get_color(item) }}></i>
                            {item}
                            
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MapLegend;