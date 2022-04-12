const GEOSERVER_URL = "https://geo.aclimate.org/geoserver/fertilizer_et/";
const GEOSERVER_SERVICE = "wms";

class Configuration {
    get_geoserver_url() {
        return GEOSERVER_URL;
    }
    get_geoserver_service() {
      return GEOSERVER_SERVICE;
    }
}

export default new Configuration();