
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


workspace = "aclimate_et"
layer_name = workspace+":sample_kebele"
service = "wFS"
test_url = "https://geo.aclimate.org/geoserver/"+workspace + \
    "/ows?service="+service+"&version=1.0.0&request=GetFeature&typeName=" + \
    layer_name+"&maxFeatures=50&outputFormat=application%2Fjson"

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

# fid 	Shape_Area 	Woreda 	kebele 	n 	p 	k 	recom_cla


class Woreda(Resource):

    def get(self, woreda_id):
        """
        Get a specific woreda
        Examples of woreda_id: woreda1
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
                fid:
                  type: string
                  description: fid
                  default: sample_kebele.4
                Shape_Area:
                  type: integer
                  description: shape area
                  default: 0.00
                Woreda:
                  type: string
                  description: The woreda id
                  default: Woreda1
                kebele:
                  type: string
                  description: The kebele id
                  default: Kebele1
                N:
                  type: integer
                  description: Nitrogen data
                  default: 0.00
                P:
                  type: integer
                  description: Phosphorus data
                  default: 0.00
                K:
                  type: integer
                  description: Potassium data
                  default: 0.00
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
        Examples of kebele_id: kebele1, kebele2, kebele3, kebele5
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
                fid:
                  type: string
                  description: fid
                  default: sample_kebele.4
                Shape_Area:
                  type: integer
                  description: shape area
                  default: 0.00
                Woreda:
                  type: string
                  description: The woreda id
                  default: Woreda1
                kebele:
                  type: string
                  description: The kebele id
                  default: Kebele1
                N:
                  type: integer
                  description: Nitrogen data
                  default: 0.00
                P:
                  type: integer
                  description: Phosphorus data
                  default: 0.00
                K:
                  type: integer
                  description: Potassium data
                  default: 0.00
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
