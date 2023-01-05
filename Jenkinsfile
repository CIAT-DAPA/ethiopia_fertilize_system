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
            try{
              sh 'python -m unittest discover -s ${env.WORKSPACE}/src/webapi/test/ -p "test_*.py"'
            }catch(Exception e){
              echo e
              echo "Test Failed"
                throw err
            }
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