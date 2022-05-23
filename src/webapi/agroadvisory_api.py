
import os
import sys
from flask import Flask, jsonify
from flask_restful import Resource, Api, fields, marshal_with
from flasgger import Swagger

import geopandas as gpd
import pandas as pd


app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)


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


class WoredaList(Resource):

    def get(self):
        """
        Get all woredas
        
        ---
        responses:
          200:
            description: All woredas

        """
        return kebeles_data_frame.to_json(orient='records')


class Woreda(Resource):

    def get(self, woreda_id):
        """
        Get a specific woreda
        
        ---
        parameters:
          - in: path
            name: woreda_id
            type: string
            required: true
        responses:
          200:
            description: A single woreda
            schema:
              id: Woreda
              properties:
                username:
                  type: string
                  description: The woreda id
                  default: Woreda1
        """
        search_for = woreda_id.lower()
        result = kebeles_data_frame[kebeles_data_frame['Woreda']
                                    == search_for.capitalize()]

        if not result.empty:
            return result.to_json(orient='records')
        else:
            return 'No woreda found with id: ' + woreda_id, 404


class Kebele(Resource):

    # Get a specific kebele
    def get(self, kebele_id):
        """
        Get a specific kebele
        
        ---
        parameters:
          - in: path
            name: kebele_id
            type: string
            required: true
        responses:
          200:
            description: A single kebele
            schema:
              id: Kebele
              properties:
                username:
                  type: string
                  description: The kebele id
                  default: Kebele1
        """
        search_for = kebele_id.lower()
        result = kebeles_data_frame[kebeles_data_frame['kebele']
                                    == search_for.capitalize()]
        if not result.empty:
            return result.to_json(orient='records')
        else:
            return 'No kebele found with id: ' + kebele_id, 404


api.add_resource(WoredaList, '/woredas')
api.add_resource(Woreda, '/woreda/<woreda_id>')
api.add_resource(Kebele, '/kebele/<kebele_id>')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
