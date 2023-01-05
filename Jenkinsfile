pipeline {
  agent { docker { image 'python:3.10.7-alpine' } }
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
    
    boolean testPassed = true
    stage('Test') {
        try{
            sh 'python -m unittest discover -s ./src/webapi/test/ -p "test_*.py"'
        }catch (Exception e){
            testPassed = false
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