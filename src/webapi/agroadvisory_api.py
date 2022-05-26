
import os
import sys
from flask import Flask, redirect
from flask_restful import Api
from flasgger import Swagger
from conf import config

from api_modules.kebele import Kebele
from api_modules.woreda import Woreda

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

@app.route('/')
def home():
    return redirect("/apidocs")

api.add_resource(Woreda, '/woredas', endpoint="woredas")
api.add_resource(Woreda, '/woredas/<woreda_id>', endpoint="woreda")
api.add_resource(Kebele, '/kebele/<kebele_id>')

if __name__ == '__main__':
    if config['DEBUG']:
        app.run(threaded=True, port=config['PORT'], debug=config['DEBUG'])
    else:
        app.run(host=config['HOST'], port=config['PORT'], debug=config['DEBUG'])

# nohup python3 agroadvisory_api.py > log.txt 2>&1 &