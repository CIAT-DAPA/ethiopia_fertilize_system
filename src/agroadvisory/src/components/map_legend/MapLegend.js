import React from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl, WMSTileLayer, Polygon, CircleMarker, Tooltip, Marker, Popup, Rectangle } from 'react-leaflet'
import Color from '../tools/Color';

import './MapLegend.css';

function MapLegend(props) {
    const BOUNDS_STYLE = { weight: 1 }
    const [nGrades, setNGrades] = React.useState([0.0, 100.0, 110.0, 120.0, 130.0, 140.0, 150.0, 160.0, 170.0, 180.0, 190.0, 200.0]);
    const [pGrades, setPGrades] = React.useState([0.0, 5.0, 9.0, 13.0, 17.0, 21.0, 25.0, 29.0, 33.0]);
    const [yieldGrades, setYieldGrades] = React.useState([1.0, 6097.60, 7547.60,  8997.60, 10447.60]);
    const yieldIntervals = ["< 6097.60", ">= 6097.60", ">= 7547.60", ">= 8997.60", ">= 10447.60"]
    const [currentGrade, setCurrentGrade] = React.useState();


    const Legend = () => {
        console.log(props.currentLayer);

        let grades;
        
        if(props.geoserverLayers){
            grades = (props.currentLayer === props.geoserverLayers[0]) ? (nGrades)
                : (props.currentLayer === props.geoserverLayers[1]) ? (pGrades) 
                : (props.currentLayer === props.geoserverLayers[2]) ? (yieldGrades) : undefined

        }


        
        return (props.currentLayer === undefined || grades === undefined) ? null:(
        
                   
            grades.map((item, idx) => (
                            <div key={"div_" + idx} >
                                <i key={"i_" + idx} style={{ background: Color.get_layer_color(item, props.currentLayer, props.geoserverLayers) }}></i>
                                {
                                    (props.currentLayer.includes(props.geoserverLayers[2])) ? yieldIntervals[idx] : item
                                }
                                
                                
                                <br />
                            </div>
                        ))
                

        );


    }





    return (
        <div className={"leaflet-bottom leaflet-right"}>
            <div className="leaflet-control leaflet-bar">
                <div className='info legend'>
                    {
                        props.currentLayer ? <h6>amounts (kg/ha)</h6> : <h6>select a layer and clicks!</h6>
                    }
                    <Legend/>
                    

                    
                </div>
            </div>
        </div>
    );
}

export default MapLegend;