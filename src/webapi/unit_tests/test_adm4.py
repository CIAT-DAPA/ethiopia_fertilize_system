import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_adm4(self):
        #this endpoint receives one paremeter after adm4/(Kebele) that correspond to the admistrative level 3
        #examples: 637e45476b22dee825f5b4a6, 637e45476b22dee825f5b4a7, 637e45476b22dee825f5b4a9
        response = self.app.get('http://127.0.0.1:5000/adm4/637e45476b22dee825f5b4a7',
                                headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()