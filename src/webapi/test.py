import requests

url = "https://geo.aclimate.org/geoserver/aclimate_et/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=aclimate_et:sample_kebele&maxFeatures=50&outputFormat=application%2Fjson"
response = requests.get(url)
print(response.content)