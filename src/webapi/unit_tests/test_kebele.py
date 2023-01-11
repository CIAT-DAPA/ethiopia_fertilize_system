import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_kebele(self):

        response = requests.get('http://127.0.0.1:5000/kebele/Abaya',headers={"Content-Type": "application/json"}) #status code 200
        responseNotFound = requests.get('http://127.0.0.1:5000/kebele/Abayaa',headers={"Content-Type": "application/json"}) #status code 404
        print(response)
        #self.assertEqual(str, type(response.json['Kebele']))
        self.assertEqual(200, response.status_code)
        self.assertEqual(404, responseNotFound.status_code)


if __name__ == "__main__":
    unittest.main()
