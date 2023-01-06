pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            
            sh 'echo "building the repo"'

            sh "pip install -r ${env.WORKSPACE}/src/webapi/requirements.txt"
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
        sh "nohup python ${env.WORKSPACE}/src/webapi/agroadvisory_api.py > log.txt 2>&1 &"
      }
    }
  }

  post {
    always {
        echo 'The pipeline completed'
        junit allowEmptyResults: true, testResults:'**/test_reports/*.xml'
    }
    success {                   
        echo "Flask Application Up and running!!"
    }
    failure {
        echo 'Build stage failed'
        error('Stopping early…')
    }
  }
    
}