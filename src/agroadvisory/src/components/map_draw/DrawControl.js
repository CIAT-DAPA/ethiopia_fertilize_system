import React, { useEffect } from 'react';
import { EditControl } from "react-leaflet-draw";
import {FeatureGroup} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";


function DrawControl(props){
    const _created = (e) => props.setPolygonCoords(e.layer._bounds);

    return(
        <FeatureGroup>
        <EditControl
            position='bottomleft'
            onCreated={_created}
            draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
            }}
        />
        {/* <Circle center={[51.51, -0.06]} radius={200} /> */}

       
        </FeatureGroup>


    )

}
export default DrawControl;
        
  
