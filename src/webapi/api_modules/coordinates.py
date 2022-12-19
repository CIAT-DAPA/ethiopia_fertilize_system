import os
from flask_restful import Resource

from URLSearchParams import URLSearchParams
import requests


GEOSERVER_URL="https://geo.aclimate.org/geoserver/fertilizer_et/";
SERVICEE="wms";
layer= 'fertilizer_et:et_wheat_compost_probabilistic_below'
lon= 38.16367;
lat= 7.17712;

class Coordinates(Resource):


    def __init__(self):
        super().__init__()

    def get(self):
        """
        Get Features

        ---
        parameters:
          - in: path
            name: layer
            type: string
            required: false
          - in: path
            name: coordinates
            type: string
            required: false
         
        
        responses:
          200:
            description: Latitude, longitude and value
            schema:
              id: Woreda
              properties:
                coordinates:
                  type: integer
                  description: coordinates
                  default: 0.00
                value:
                  type: integer
                  description: values
                  default: 0.00
                
        """
        parameters={
            'service':'WMS',
            'version':'1.1.1',
            'request':'GetFeatureInfo',
            'layers':layer,
            'query_layers':layer,
            'feature_count':10,
            'info_format':'application/json',
            'format_options':'callback:handleJson',
            'SrsName':'EPSG:4326',
            'width':101,
            'height':101,
            'x':50,
            'y':50,
            'bbox':str(lon - 0.1) + ',' + str(lat - 0.1) + ',' + str(lon + 0.1) + ',' + str(lat + 0.1)}

        self.url=str(URLSearchParams(GEOSERVER_URL + SERVICEE).append(parameters))
        print(self.url)
        response= requests.get(self.url)
        data= response.json()
        return data
        

       
        
        
