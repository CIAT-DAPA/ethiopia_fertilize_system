import os
from flask_restful import Resource
from URLSearchParams import URLSearchParams
import requests
import json
import ast
GEOSERVER_URL="https://geo.aclimate.org/geoserver/fertilizer_et/"
SERVICEE="wms"
#Example of layer:fertilizer_et:et_wheat_compost_probabilistic_bellow
#example of array of coordinates
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
            description: layer name at https://geo.aclimate.org/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage?8&filter=false example= et_wheat_compost_probabilistic_below
          - in: path
            name: coor
            type: array
            items:
                type: object
            required: false
            description: array of objects with coordinates lat and lon, example= [{"lat":7.17712,"lon":38.16367},{"lat":8.35343,"lon":36.51521},{"lat":8.35343,"lon":36.51521}]
            
        responses:
          200:
            description: Latitude, longitude and value
            schema:
              id: Features
              properties:
                lat:
                  type: float
                  description: lat
                  default: 8.5583
                lon:
                  type: float
                  description: lat
                  default: 8.5583
                value:
                  type: float
                  description: values
                  default: 0.00
                
        """
        arr=ast.literal_eval(coor)
        print(arr[0]['lat'])
        print(len(arr))
        list=[]
        for i in arr:
            lat=i['lat']
            lon=i['lon']
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
            
            respuesta={'layer':layer,'lat':lat,'lon':lon,'value':json['features'][0]['properties']['GRAY_INDEX']}
            if not list.__contains__(respuesta):
                list.append(respuesta)
            
        return list

            
        

       
        
        
