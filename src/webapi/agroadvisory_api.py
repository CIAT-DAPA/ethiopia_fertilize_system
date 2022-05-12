
import os
import sys
from tools import GeoserverClient
from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/basic_api/hello_world', methods=['GET', 'POST'])
@cross_origin()
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
