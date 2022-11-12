from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm1
import json

class AdministrativeLevel1(Resource):

    def __init__(self):
        super().__init__()

    def get(self):
        """
        Get all adm1 from database
        ---
        parameters:
        responses:
          200:
            description: List of regions
            schema:
              id: Region
              properties:
                _id:
                  type: string
                  description: Id Region
                name:
                  type: string
                  description: Region's name
                ext_id:
                  type: string
                  description: Extern Id to identify region
        """
        q_set = None
        q_set = Adm1.objects()
        json_data = q_set.to_json()
        return json.loads(json_data)
