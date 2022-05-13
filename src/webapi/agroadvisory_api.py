
import os
import sys
from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
from geoserver.catalog import Catalog

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

geo_url = "https://geo.aclimate.org/geoserver/rest/"
geo_user = 'admin'
geo_pwd = 'geoserver'

cat = Catalog("http://localhost:8600/geoserver/rest",
              username=geo_user, password=geo_pwd)
that_layer = cat.get_resource("sample_kebele")
print(that_layer.name)


@app.route('/test', methods=['GET', 'POST'])
@cross_origin()
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
