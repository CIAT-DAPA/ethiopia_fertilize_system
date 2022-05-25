
import os
import sys
from flask import Flask, jsonify
from flask_restful import Resource, Api, fields, marshal_with
from flasgger import Swagger
from conf import config

from api_modules.kebele import Kebele
from api_modules.woreda import Woreda

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

#api.add_resource(WoredaList, '/woredas')
api.add_resource(Woreda, '/woredas', endpoint="woredas")
api.add_resource(Woreda, '/woredas/<woreda_id>', endpoint="woreda")
api.add_resource(Kebele, '/kebele/<kebele_id>')

if __name__ == '__main__':
    if config['DEBUG']:
        app.run(threaded=True, port=config['PORT'], debug=config['DEBUG'])
    else:
        app.run(host=config['HOST'], port=config['PORT'], debug=config['DEBUG'])
