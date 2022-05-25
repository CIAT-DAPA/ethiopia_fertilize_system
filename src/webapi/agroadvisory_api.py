
import os
import sys
from flask import Flask, jsonify
from flask_restful import Resource, Api, fields, marshal_with
from flasgger import Swagger

from api_modules.kebele.kebele import Kebele
from api_modules.woreda.woreda import Woreda

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

#api.add_resource(WoredaList, '/woredas')
api.add_resource(Woreda, '/woredas', endpoint="woredas")
api.add_resource(Woreda, '/woredas/<woreda_id>', endpoint="woreda")
api.add_resource(Kebele, '/kebele/<kebele_id>')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
