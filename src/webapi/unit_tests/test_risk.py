import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_risk(self):
        #this endpoint receives one paremeter after risk/(risk)) that correspond to the admistrative level 4 (Kebele)
        #examples: 63850dba9d578e523c7eabfd, 63850dba9d578e523c7eac02, 63850dfd9d578e523c7ec346
        response = self.app.get('http://127.0.0.1:5000/risk/63850dba9d578e523c7eac02',headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()