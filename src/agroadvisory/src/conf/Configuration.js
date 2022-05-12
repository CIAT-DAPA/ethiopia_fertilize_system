const GEOSERVER_URL = "https://geo.aclimate.org/geoserver/fertilizer_et/";
const GEOSERVER_SERVICE = "wms";
const GEOSERVER_FEATURE = "oms";

class Configuration {
    get_geoserver_url() {
        return GEOSERVER_URL;
    }
    get_geoserver_service() {
      return GEOSERVER_SERVICE;
    }
    get_geoserver_feature() {
      return GEOSERVER_FEATURE;
    }
}

export default new Configuration();