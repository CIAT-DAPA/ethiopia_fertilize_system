from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Crop
import json

class Crops(Resource):

    def __init__(self):
        super().__init__()

    def get(self):
        """
        Get all crops from database
        ---
        responses:
          200:
            description: List of the crops
            schema:
              id: Crops
              properties:
                _id:
                  type: string
                  description: Id crop
                name:
                  type: string
                  description: Crop's name
        """
        q_set = None
        q_set = Crop.objects()
        json_data = q_set.to_json()
        return json.loads(json_data)
