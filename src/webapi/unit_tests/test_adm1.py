import unittest
import sys
sys.path.append("./src/webapi/")
from agroadvisory_api import app
import requests
from mongoengine import connect, disconnect

class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        connect('mongoenginetest', host='mongomock://localhost')
        self.app = app.test_client()

    def test_single_adm1(self):
        #this endpoint has no parameteres (Region)
        response =self.app.get('http://127.0.0.1:5000/adm1',headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)

 
if __name__ == "__main__":
    unittest.main()