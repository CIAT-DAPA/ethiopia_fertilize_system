import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_metric(self):
        #this endpoint receives one paremeter after metrics/(metics) that correspond to the admistrative level 4 (Kebele)
        #examples: 63850d9a9d578e523c7e9bcb, 63850d9a9d578e523c7e9bcd,63850d9a9d578e523c7e9bd4
        response = self.app.get('http://127.0.0.1:5000/metrics/63850d9a9d578e523c7e9bcd',headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()