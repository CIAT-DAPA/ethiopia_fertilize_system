import os
from flask_restful import Resource
from URLSearchParams import URLSearchParams
import requests
import json
import ast
GEOSERVER_URL="https://geo.aclimate.org/geoserver/fertilizer_et/";
SERVICEE="wms";
lista=[]
class Coordinates(Resource):


    def __init__(self):
        super().__init__()
    def post(self,layer=None,coor=None):
        """
        Get Features

        ---
        parameters:
          - in: path
            name: layer
            type: string
            required: false
          - in: path
            name: coor
            type: array
            items:
                type: object
            required: false
        responses:
          200:
            description: Latitude, longitude and value
            schema:
              id: Features
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
        arr=ast.literal_eval(coor)
        print(arr[0]['lat'])
        print(len(arr))
        pr=[]
        for i in arr:
            lat=i['lat']
            lon=i['lon']
            pr.append(lon)
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
            json= data
            
            respuesta={'lat':lat,'lon':lon,'value':json['features'][0]['properties']['GRAY_INDEX']}
            if not lista.__contains__(respuesta):
                lista.append(respuesta)
            
        return lista

            
        

       
        
        
