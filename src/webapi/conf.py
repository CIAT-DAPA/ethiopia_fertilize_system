
import os

config = {}

if os.getenv('DEBUG', "true").lower() == "true":
    config['DEBUG']=True
    config['WORKSPACE']="aclimate_et"
    config['LAYER_NAME']=config['WORKSPACE']+":sample_kebele"
    config['SERVICE']='WFS'
    config['GEOSERVER_URL']="https://geo.aclimate.org/geoserver/"
    config['HOST']='localhost'
    config['PORT']=5000
else:
    config['DEBUG']=False
    config['WORKSPACE']=os.getenv('WORKSPACE')
    config['LAYER_NAME']=config['WORKSPACE']+os.getenv('LAYER_NAME')
    config['SERVICE']=os.getenv('SERVICE')
    config['GEOSERVER_URL']=os.getenv('GEOSERVER_URL')
    config['HOST']='0.0.0.0'
    config['PORT']=os.getenv('PORT')
