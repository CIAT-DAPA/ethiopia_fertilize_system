from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm4
import json

class AdministrativeLevel4(Resource):

    def __init__(self):
        super().__init__()

    def get(self, adm3 = None):
        """
        Get all kebeles from database
        ---
        parameters:
          - in: path
            name: adm3
            type: string
            required: false
        responses:
          200:
            description: List of regions
            schema:
              id: Kebele
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
                aclimate_id:
                  type: string
                  description: Id into aclimate system
                adm3:
                  type: string
                  description: Id of the woreda
        """
        q_set = None
        if adm3 is None:
            q_set = Adm4.objects()
        else:
            q_set = Adm4.objects(adm3=adm3)
        json_data = q_set.to_json()
        return json.loads(json_data)
