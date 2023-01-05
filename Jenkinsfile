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
          sh "python -m unittest discover -s ${env.WORKSPACE}/src/webapi/unit_tests/ -p 'test_*.py'"
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