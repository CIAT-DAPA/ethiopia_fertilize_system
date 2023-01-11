import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_adm3(self):
        #this endpoint receives one paremeter after adm3/ (woreda) that correspond to the admistrative level 2
        #examples: 637e453d6b22dee825f5b37c,637e453d6b22dee825f5b37d,637e453d6b22dee825f5b37e
        response = self.app.get('http://127.0.0.1:5000/adm3/637e453d6b22dee825f5b37d',
                                headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()