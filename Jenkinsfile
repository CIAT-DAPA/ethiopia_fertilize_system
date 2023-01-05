pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'echo "building the repo"'
          }
        }
      }
    }

    stage('Test') {
        steps {
          script {
            def testResult = 'python -m unittest discover -s ./src/webapi/test/ -p "test_*.py"'
            if (testResult == 'Failed') {
                error "test failed"
            }
            echo testResult
          }
        }
    
    }
  
    stage('Deploy')
    {
      steps {
        echo "deploying the application"
        sh "sudo nohup python3 /src/webapi/agroadvisory_api.py > log.txt 2>&1 &"
      }
    }
  }
  
  
}