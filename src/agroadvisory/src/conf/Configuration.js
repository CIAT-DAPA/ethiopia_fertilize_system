const GEOSERVER_URL = "https://geo.aclimate.org/geoserver/";
const GEOSERVER_SERVICE = "wms";
const GEOSERVER_FEATURE = "oms";

const CROP_RASTER_URL = "https://webapi.nextgenagroadvisory.com/clip_raster";
const FERTILIZER_WORSPACE = "fertilizer_et"
//const NEXTGEN_API_BASE = "http://localhost:5000/"
const NEXTGEN_API_BASE = "https://webapi.nextgenagroadvisory.com/"

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
    get_fertilizer_worspace(){
      return FERTILIZER_WORSPACE;
    }

}

export default new Configuration();