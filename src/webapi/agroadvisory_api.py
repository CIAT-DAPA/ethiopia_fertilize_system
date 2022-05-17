
import os
import sys

from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
from geoserver.catalog import Catalog
from owslib.wfs import WebFeatureService
import geopandas as gpd


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

workspace = "test_kebele/"
service = "wfs"
geo_url = "http://localhost:8600/geoserver/"+workspace + \
    service  # "https://geo.aclimate.org/geoserver/rest/"
print(geo_url)
geo_user = 'admin'
geo_pwd = 'geoserver'

try:

    # cat = Catalog("http://localhost:8600/geoserver/rest/",
    #               username=geo_user, password=geo_pwd)
    # print("Connected")
    # that_layer = cat.get_resource(
    #     "sample_kebele", workspace="test_kebele")
    # print(that_layer)
    wfs = WebFeatureService(url=geo_url)

except Exception as err:
    error = str(err).split()[50:61]
    print(" ".join(error))


@app.route('/test', methods=['GET', 'POST'])
@cross_origin()
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
