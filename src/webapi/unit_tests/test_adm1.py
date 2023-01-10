import unittest
import sys
sys.path.append("./src/webapi/")
from agroadvisory_api import app
import requests

class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_adm1(self):
        #this endpoint has no parameteres (Region)
        response =requests.get('https://webapi.nextgenagroadvisory.com/adm1',headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)

 
if __name__ == "__main__":
    unittest.main()