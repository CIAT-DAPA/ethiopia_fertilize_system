import React, { useEffect } from 'react';
import { EditControl } from "react-leaflet-draw";
import {FeatureGroup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";


function DrawControl(props){
    //const _created = (e) => props.setPolygonCoords(e.layer.editing.latlngs[0][0]);
    const _created = (e) => props.setPolygonCoords(e.layer._bounds);
    //const _created = (e) => props.setPolygonCoords(e.layer);

    return(
        <FeatureGroup>
        <EditControl
            position='bottomleft'
            onCreated={_created}
            draw={{
                rectangle: true,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
                polygon: false
            }}
        />
        {/* <Circle center={[51.51, -0.06]} radius={200} /> */}

       
        </FeatureGroup>


    )

}
export default DrawControl;
        
  
