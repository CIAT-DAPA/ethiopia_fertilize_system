import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_metric(self):
        #this endpoint receives one paremeter after metrics/(metics) that correspond to the admistrative level 4 (Kebele)
        #examples: 63850d9a9d578e523c7e9bcb, 63850d9a9d578e523c7e9bcd,63850d9a9d578e523c7e9bd4
        response = requests.get('http://127.0.0.1:5000/metrics/63850d9a9d578e523c7e9bcb',headers={"Content-Type": "application/json"}) #status code 200
        responseValidationError = requests.get('http://127.0.0.1:5000/metrics/63850d9a9d578e523c7e9bcx',headers={"Content-Type": "application/json"}) #status code 500
        responseNullArray = requests.get('http://127.0.0.1:5000/metrics/63850d9a9d578e523c7e9bc1',headers={"Content-Type": "application/json"}) #Null array
        responseNotFound = requests.get('http://127.0.0.1:5000/metrics/63850d9a9d578e523c7e9bc1/',headers={"Content-Type": "application/json"}) #Null array
        print(response)
        self.assertEqual(200, response.status_code)
        self.assertEqual(500, responseValidationError.status_code)
        self.assertEqual(404, responseNotFound.status_code)
        self.assertEqual(len(responseNullArray.json()),0)
        self.assertEqual(len(response.json())>0,True)


if __name__ == "__main__":
    unittest.main()