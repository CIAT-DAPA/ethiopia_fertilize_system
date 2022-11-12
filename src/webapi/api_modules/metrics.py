from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Metric
import json

class Metrics(Resource):

    def __init__(self):
        super().__init__()

    def get(self, adm4, forecast):
        """
        Get all metrics from database
        ---
        parameters:
        responses:
          200:
            description: List of metrics for adm4
            schema:
              id: Metrics
              properties:
                _id:
                  type: string
                  description: Id Metric
                adm4:
                  type: string
                  description: Kebele ID
                forecast:
                  type: string
                  description: Forecast ID
                type:
                  type: string
                  description: Type of metric
                values:
                  type: dict
                  description: List of values of the metric
                scenario:
                  type: int
                  description: Describes the type of scenario 0 = None,1 = Above,2 = Normal,3 = Below
        """
        q_set = None
        q_set = Metric.objects(adm4=adm4,forecast=forecast)
        json_data = q_set.to_json()
        return json.loads(json_data)
