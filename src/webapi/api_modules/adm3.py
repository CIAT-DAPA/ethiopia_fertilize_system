from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm3
import json

class AdministrativeLevel3(Resource):

    def __init__(self):
        super().__init__()

    def get(self,adm2=None):
        """
        Get all Administrative levels 3 from database (Woreda)
        ---
        parameters:
          - in: path
            name: adm2
            type: string
            required: false
        responses:    
          200:
            description: Administrative levels 3
            schema:
              id: Adm3
              properties:
                id:
                  type: string
                  description: Id Administrative level 3
                name:
                  type: string
                  description: Administrative level 3 name
                ext_id:
                  type: string
                  description: Extern Id to identify Administrative level 3
                adm2:
                  type: string
                  description: Id Administrative level 2
        """
        q_set = None
        if adm2 is None:
            q_set = Adm3.objects()
        else:
            print(adm2)
            q_set = Adm3.objects(adm2 = adm2)
        json_data = [{"id":str(x.id),"name":x.name,"ext_id":x.ext_id,"adm2":str(x.adm2.id)} for x in q_set]
        return json_data