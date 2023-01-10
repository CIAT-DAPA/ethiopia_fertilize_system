import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_crops(self):
        #this endpoint has no parameteres (crop)
        response = requests.get('https://webapi.nextgenagroadvisory.com/crops',
                                headers={"Content-Type": "application/json"})
        print(response)
        
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()