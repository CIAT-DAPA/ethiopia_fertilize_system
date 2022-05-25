from flask import Flask, jsonify
from flask_restful import Resource
import geopandas as gpd
import pandas as pd

from conf import config

class Kebele(Resource):

    url = ""

    def __init__(self):
      self.url = config['GEOSERVER_URL'] + config['WORKSPACE'] + \
            "/ows?service="+config['SERVICE']+"&version=1.0.0&request=GetFeature&typeName=" + \
            config['LAYER_NAME'] +"&maxFeatures=50&outputFormat=application%2Fjson"
      super().__init__()

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
        # Reading wfs into geodataframe
        geo_data_frame = gpd.read_file(self.url)
        # Casting to pandas dataframe (easy to manipulate)
        kebeles_data_frame = pd.DataFrame(geo_data_frame)
        # Dropping 'geometry' column
        kebeles_data_frame.drop('geometry', inplace=True, axis=1)

        search_for = kebele_id.lower()
        result = kebeles_data_frame[kebeles_data_frame['kebele']
                                    == search_for.capitalize()]
        if not result.empty:
            return result.to_json(orient='records')
        else:
            return 'No kebele found with id: ' + kebele_id, 404

