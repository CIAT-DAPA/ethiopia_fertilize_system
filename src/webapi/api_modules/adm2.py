from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm2
import json

class AdministrativeLevel2(Resource):

    def __init__(self):
        super().__init__()

    def get(self, adm1 = None):
        """
        Get all zones from database
        ---
        parameters:
        responses:
          200:
            description: List of zones
            schema:
              id: Zone
              properties:
                _id:
                  type: string
                  description: Id Zone
                name:
                  type: string
                  description: Zone's name
                ext_id:
                  type: string
                  description: Extern Id to identify zone
                adm1:
                  type: string
                  description: Id of the region
        """
        q_set = None
        if adm1 is None:
            q_set = Adm2.objects()
        else:
            q_set = Adm2.objects(adm1=adm1)
        json_data = q_set.to_json()
        return json.loads(json_data)
