import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_forecast(self):
        #this endpoint receives one paremeter after forecaste/ (forecast) that correspond to the crop
        #only exist one crop for now , the id is 63865d9f68c981103580abee
        response = self.app.get('http://127.0.0.1:5000/forecast/63865d9f68c981103580abee',
                                headers={"Content-Type": "application/json"})
        print(response)
        
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()