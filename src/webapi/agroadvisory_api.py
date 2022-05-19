
import os
import sys
from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS
import geopandas as gpd
import pandas as pd


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

workspace = "test_kebele_workspace"
service = "wFS"
test_url = "http://localhost:8600/geoserver/"+workspace + \
    "/ows?service="+service+"&version=1.0.0&request=GetFeature&typeName=test_kebele_workspace:sample_kebele&maxFeatures=50&outputFormat=application%2Fjson"

# Reading wfs into geodataframe
geo_data_frame = gpd.read_file(test_url)

# Casting to pandas dataframe (easy to manipulate)
kebeles_data_frame = pd.DataFrame(geo_data_frame)
# Dropping 'geometry' column
kebeles_data_frame.drop('geometry', inplace=True, axis=1)


# Get all woredas
@app.route('/woredas', methods=['GET'])
@cross_origin()
def list_all_woredas_data():
    return kebeles_data_frame.to_json(orient='records')

# Get a specific kebele
@app.route('/woredas/<kebele>', methods=['GET'])
@cross_origin()
def get_kebele(kebele):
    search_for = kebele.lower()
    result = kebeles_data_frame[kebeles_data_frame['kebele']
                                == search_for.capitalize()]
    return result.to_json(orient='records')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
