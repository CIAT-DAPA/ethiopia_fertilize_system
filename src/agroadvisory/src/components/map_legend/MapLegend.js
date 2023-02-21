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
    const yieldIntervals = ["1-6097", "6097-7547", "7547-8997", "8997-10447", "≥ 10447"]

    const [ureaGrades, setUreaGrades] = React.useState([135.0, 200.0, 250.0, 300.0]);
    const ureaIntervals = ["135-200", "200-250", "250-300", "≥ 300"];

    const [npsGrades, setNpsGrades] = React.useState([30.0, 50.0, 100.0, 150.0]);
    const npsIntervals = ["30-50", "50-100", "100-150", "≥ 150"];

    const [vcompostGrades, setVcompostGrades] = React.useState([10.0, 15.0]);
    const vcompostIntervals = ["10-15", "≥ 15"];

    const [compostGrades, setCompostGrades] = React.useState([12.0, 16.0, 21.0]);
    const compostIntervals = ["12-16", "16-21", "≥ 21"];

    const [dominantGrades, setDominantGrades] = React.useState([0.0, 100.0, 200.0]);
    const dominantIntervals = ["0-100 above", "0-100 normal", "0-100 below"];


    const Legend = () => {
      

        let grades;
        
        if(props.geoserverLayers){
            grades = (props.currentLayer === props.geoserverLayers[0]) ? (nGrades)
                : (props.currentLayer === props.geoserverLayers[1]) ? (pGrades) 
                : (props.currentLayer === props.geoserverLayers[2]) ? (yieldGrades) 
                : (props.currentLayer === props.geoserverLayers[3]) ? (ureaGrades)
                : (props.currentLayer === props.geoserverLayers[4]) ? (npsGrades) 
                : (props.currentLayer === props.geoserverLayers[5]) ? (vcompostGrades) 
                : (props.currentLayer === props.geoserverLayers[6]) ? (compostGrades)
                : (props.currentLayer === props.geoserverLayers[7]) ? (dominantGrades) : undefined

        }
        
        return (props.currentLayer === undefined || grades === undefined) ? null:(
        
                   
            grades.map((item, idx) => (
                            <div key={"div_" + idx} >
                                <i key={"i_" + idx} style={{ background: Color.get_layer_color(item, props.currentLayer, props.geoserverLayers) }}></i>
                                {
                                    (props.currentLayer.includes(props.geoserverLayers[2])) ? yieldIntervals[idx] 
                                    : (props.currentLayer.includes(props.geoserverLayers[3])) ? ureaIntervals[idx]
                                    : (props.currentLayer.includes(props.geoserverLayers[4])) ? npsIntervals[idx] 
                                    : (props.currentLayer.includes(props.geoserverLayers[5])) ? vcompostIntervals[idx]
                                    : (props.currentLayer.includes(props.geoserverLayers[6])) ? compostIntervals[idx]
                                    : (props.currentLayer.includes(props.geoserverLayers[7])) ? dominantIntervals[idx]  
                                    : item === 0.0 ? "NA"
                                    : item
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
                        (props?.currentLayer && props?.currentLayer.includes(props.geoserverLayers[7])) ? <h6>scenaries</h6> : 
                        <h6>amounts {props?.currentLayer?.includes(props?.geoserverLayers[5]) || props?.currentLayer?.includes(props?.geoserverLayers[6]) ? "(ton/ha)": "(kg/ha)"}</h6>
                    }
                    <Legend/>
                    

                    
                </div>
            </div>
        </div>
    );
}

export default MapLegend;