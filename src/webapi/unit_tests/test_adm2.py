import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_adm2(self):
        #this endpoint receives one paremeter after adm2/ (Zone) that correspond to the admistrative level 1
        #examples: 637e450d6b22dee825f5b35b, 637e450d6b22dee825f5b35c,637e450d6b22dee825f5b35d
        response = self.app.get('http://127.0.0.1:5000/adm2/637e450d6b22dee825f5b35c',
                                headers={"Content-Type": "application/json"})
        print(response)
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()