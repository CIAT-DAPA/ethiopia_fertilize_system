import axios from "axios";

import Configuration from "../conf/Configuration";

class GeoFeatures {
    get_value(layer, lat, lon) {
        const parameters = {
            service: 'WMS',
            version: '1.1.1',
            request: 'GetFeatureInfo',
            layers: layer,
            query_layers: layer,
            feature_count: 10,
            info_format: 'application/json',
            format_options: 'callback:handleJson',
            SrsName: 'EPSG:4326',
            width: 101,
            height: 101,
            x: 50,
            y: 50,
            bbox: (lon - 0.1) + ',' + (lat - 0.1) + ',' + (lon + 0.1) + ',' + (lat + 0.1)
        }
        const url = Configuration.get_geoserver_url() + Configuration.get_geoserver_service() + "?" + new URLSearchParams(parameters).toString();

        return axios
            .get(url)
            .then(response => {
            
                return response.data;
            });
    }

    geojson(ids){
        const url = "https://geo.aclimate.org/geoserver/administrative/"+ "ows?service=WFS&version=1.0.0&request=GetFeature&typeName=administrative:admin_levels&maxFeatures=50&outputFormat=application/json&CQL_FILTER=name_adm4 in (" + ids + ")&SRSNAME=EPSG:4326";
        console.log(url);
        return axios.get(url, {})
            .then(response => {
                return response.data;
            });
    }

}

export default new GeoFeatures();