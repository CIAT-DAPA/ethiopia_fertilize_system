import rasterio
from rasterio.plot import show
from rasterio.plot import show_hist
from rasterio.mask import mask
from shapely.geometry import box
import geopandas as gpd
from fiona.crs import from_epsg
import pycrs

from flask import Flask, jsonify, request, send_file
from flask_restful import Resource
import geopandas as gpd
import pandas as pd
import requests

from conf import config


# 
class ClippingRaster(Resource):

    url = ""

    def __init__(self):
        self.url = config['GEOSERVER_URL'] + config['WORKSPACE'] + \
            "/ows?service="+config['SERVICE']+"&version=1.0.0&request=GetFeature&typeName=" + \
            config['LAYER_NAME'] + \
            "&maxFeatures=700&outputFormat=application%2Fjson"
        super().__init__()

    def getFeatures(gdf):
        """Function to parse features from GeoDataFrame in such a manner that rasterio wants them"""
        import json
        return [json.loads(gdf.to_json())['features'][0]['geometry']]

    
    def post(self):
        boundaries = request.json
        response = send_file('D:\OneDrive - CGIAR\Documents\GitHub\ethiopia_fertilize_system\src\webapi\seasonal_et_62d5b8b657c82c33d53dfd3b_jul_ond_above_202211.tif', attachment_filename='seasonal_et_62d5b8b657c82c33d53dfd3b_jul_ond_above_202211.tif')
        
        # fp = r"D:\OneDrive - CGIAR\Documents\GitHub\ethiopia_fertilize_system\src\webapi\fertilizer_et-et_wheat_compost_probabilistic_above.tif"
        # data = rasterio.open(fp)

        # minx, miny = boundaries.minx, boundaries.miny
        # maxx, maxy = boundaries.maxx, boundaries.maxy
        # bbox = box(minx, miny, maxx, maxy)

        # geo = gpd.GeoDataFrame({'geometry': bbox}, index=[0], crs=from_epsg(4326))
        # geo = geo.to_crs(crs=data.crs.data)
        # coords = self.getFeatures(geo) 
        return response



