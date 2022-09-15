import rasterio
from rasterio.plot import show
from rasterio.plot import show_hist
from rasterio.mask import mask
from shapely.geometry import box
import geopandas as gpd
from fiona.crs import from_epsg
import pycrs

from flask import Flask, jsonify, request, send_from_directory
from flask_restful import Resource, reqparse
import geopandas as gpd
import pandas as pd
import requests

import os

from conf import config


# Define parser and request args
parser = reqparse.RequestParser()
parser.add_argument('boundaries', type=str, required=True, help='Boundaries')
parser.add_argument('layer', type=str, default=False, required=True, help='Layer name')

class ClippingRaster(Resource):

    url = ""

    def __init__(self):
        self.url = config['GEOSERVER_URL'] + config['WORKSPACE'] + \
            "/ows?service="+config['SERVICE']+"&version=1.0.0&request=GetFeature&typeName=" + \
            config['LAYER_NAME'] + \
            "&maxFeatures=700&outputFormat=application%2Fjson"
        super().__init__()

    def getFeatures(self, gdf):
        """Function to parse features from GeoDataFrame in such a manner that rasterio wants them"""
        import json
        return [json.loads(gdf.to_json())['features'][0]['geometry']]

    
    def get(self):
        
        args = parser.parse_args()
        minx, miny, maxx, maxy = args['boundaries'].split(',')
        layer = args['layer'] 

        rasters_dir = ".//raster_files//fertilizer_et//"
        raster_folder = rasters_dir+layer+"/"
        entries = os.listdir(raster_folder)
        
        fp = raster_folder+entries[0]
        out = config["FERTILIZER_RASTERS_DIR"]+entries[0]
        data = rasterio.open(fp)

        bbox = box(float(minx), float(miny), float(maxx), float(maxy))

        geo = gpd.GeoDataFrame({'geometry': bbox}, index=[0], crs=from_epsg(4326))
        geo = geo.to_crs(crs=data.crs.data)

        coords = self.getFeatures(geo)    

        out_img, out_transform = mask(dataset=data, shapes=coords, crop=True)
        out_meta = data.meta.copy()
    
        epsg_code = int(data.crs.data['init'][5:])
        
        out_meta.update({"driver": "GTiff", 
                        "height": out_img.shape[1],
                        "width": out_img.shape[2],
                        "transform": out_transform,
                        "crs": pycrs.parse.from_epsg_code(epsg_code).to_proj4()})

        with rasterio.open(out, "w", **out_meta) as dest:
            dest.write(out_img)

        print(entries[0])
        return send_from_directory(config["FERTILIZER_RASTERS_DIR"], entries[0], as_attachment=True)



