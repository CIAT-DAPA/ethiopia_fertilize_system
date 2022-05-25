
workspace = "aclimate_et"
layer_name = workspace+":sample_kebele"
service = "wFS"
test_url = "https://geo.aclimate.org/geoserver/"+workspace + \
    "/ows?service="+service+"&version=1.0.0&request=GetFeature&typeName=" + \
    layer_name+"&maxFeatures=50&outputFormat=application%2Fjson"

