import unittest
import sys
import unittest
from agroadvisory_api import app
from mongoengine import connect, disconnect
sys.path.append("./src/webapi/")

import requests
class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        connect('mongoenginetest', host='mongomock://localhost')
        self.app = app.test_client()

    def test_single_adm1(self):
        
        #this endpoint has no parameteres (Region)
        response =self.app.get('http://127.0.0.1:5000/adm2/637e450d6b22dee825f5b35b',headers={"Content-Type": "application/json"})
        #responseNotFound =requests.get('http://127.0.0.1:5000/4555454',headers={"Content-Type": "application/json"})
        print(response)
        #print(responseNotFound)
        self.assertEqual(200, response.status_code)
        #self.assertEqual(404, responseNotFound.status_code)


if __name__ == "__main__":
    unittest.main()