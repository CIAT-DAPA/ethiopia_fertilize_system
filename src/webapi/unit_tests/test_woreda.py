import unittest
#import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_woredas(self):

        response = self.app.get(
            'http://127.0.0.1:5000/woredas', headers={"Content-Type": "application/json"})
        #self.assertEqual(str, type(response.json['Woreda']))
        self.assertEqual(200, response.status_code)

    def test_single_woreda(self):

        response = self.app.get('http://127.0.0.1:5000/woreda/woreda1',
                                headers={"Content-Type": "application/json"})
        # print(response)
        #self.assertEqual(str, type(response.json['Woreda']))
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()
