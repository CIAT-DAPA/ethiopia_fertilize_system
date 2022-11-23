from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Adm2
import json

class AdministrativeLevel2(Resource):

    def __init__(self):
        super().__init__()

    def get(self, adm1 = None):
        """
        Get all Administrative levels 2 from database (Zone)
        ---
        parameters:
          - in: path
            name: adm1
            type: string
            required: false
        200:
          description: Administrative levels 2
          schema:
            id: Adm2
            properties:
              id:
                type: string
                description: Id Administrative level 2
              name:
                type: string
                description: Administrative level 2 name
              ext_id:
                type: string
                description: Extern Id to identify Administrative level 2
              adm1:
                type: string
                description: Id Administrative level 1
        """
        q_set = None
        if adm1 is None:
            q_set = Adm2.objects()
        else:
            q_set = Adm2.objects(adm1=adm1)
        json_data = [{"id":str(x.id),"name":x.name,"ext_id":x.ext_id,"adm1":str(x.adm1.id)} for x in q_set]
        return json_data
