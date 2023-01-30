from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Metric
import json
from bson import ObjectId

class Metrics(Resource):

    def __init__(self):
        super().__init__()

    def get(self, adm4 = None):
        """
        Get forecast data for a adminsitrative level 4 (Kebele)
        ---
        parameters:
          - in: path
            name: adm4
            type: string
            required: false
        responses:
          200:
            description: Metric
            schema:
              id: Metric
              properties:
                id:
                  type: string
                  description: Metric ID
                adm4:
                  type: string
                  description: ID Administrative level 4
                forecast:
                  type: string
                  description: Forecast ID
                type:
                  type: string
                  description: Type of metric
                values:
                  type: array
                  items: {}
                  description: List of values of the metric
                 
        """
        q_set = None
        if adm4 is None:
            q_set = Metric.objects()
        else:
            ids = adm4.split(',')
            q_set = Metric.objects(adm4__in=ids)
        json_data = [{"id":str(x.id),"adm4":str(x.adm4.id),"forecast":str(x.forecast.id),"type":str(x.type.id),"values":x.values} for x in q_set]
        return json_data



