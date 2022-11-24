const GEOSERVER_URL = "https://geo.aclimate.org/geoserver/fertilizer_et/";
const GEOSERVER_SERVICE = "wms";
const GEOSERVER_FEATURE = "oms";

const CROP_RASTER_URL = "https://webapi.nextgenagroadvisory.com/clip_raster";
const NEXTGEN_API_BASE = "http://localhost:5000/"

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
    get_raster_crop_url() {
      return CROP_RASTER_URL;
    }
    get_url_api_base(){
      return NEXTGEN_API_BASE;
    }
}

export default new Configuration();