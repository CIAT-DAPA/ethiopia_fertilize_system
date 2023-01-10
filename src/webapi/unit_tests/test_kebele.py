import unittest
import requests
from agroadvisory_api import app


class TestAgroadisory(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_single_kebele(self):

        response = requests.get('https://webapi.nextgenagroadvisory.com/kebele/Abaya',
                                headers={"Content-Type": "application/json"})
        print(response)
        #self.assertEqual(str, type(response.json['Kebele']))
        self.assertEqual(200, response.status_code)


if __name__ == "__main__":
    unittest.main()
