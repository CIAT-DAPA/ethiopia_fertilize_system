from flask import Flask, jsonify
from flask_restful import Resource
from orm.database import Forecast
import json

class Forecasts(Resource):

    def __init__(self):
        super().__init__()

    def get(self, date = None):
        """
        Get all forecast from database
        ---
        parameters:
        responses:
          200:
            description: List of forecast
            schema:
              id: Forecast
              properties:
                _id:
                  type: string
                  description: Id Forecast
                date:
                  type: datetime
                  description: Date of forecast
                crop:
                  type: string
                  description: Id crop
        """
        q_set = None
        if date is None:
            q_set = Forecast.objects()
        else:
            q_set = Forecast.objects(date=date)
        json_data = q_set.to_json()
        return json.loads(json_data)
