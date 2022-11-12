from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm3
import json

class AdministrativeLevel3(Resource):

    def __init__(self):
        super().__init__()

    def get(self,adm2=None):
        """
        Get all woredas from database
        ---
        parameters:
        responses:
          200:
            description: List of woredas
            schema:
              id: Woreda
              properties:
                _id:
                  type: string
                  description: Id Woreda
                name:
                  type: string
                  description: Woreda's name
                ext_id:
                  type: Extern ID
                  description: Extern Id to identify woreda
                zone:
                  type: string
                  description: Id of the zone
        """
        q_set = None
        if adm2 is None:
            q_set = Adm3.objects()
        else:
            q_set = Adm3.objects(adm2 = adm2)
        json_data = q_set.to_json()
        return json.loads(json_data)