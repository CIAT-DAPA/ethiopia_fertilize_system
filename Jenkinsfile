pipeline {

    agent any

    stages {

        stage('get release') {

            steps {

                sh """curl \
                    -H "Accept: application/vnd.github+json" \
                    -H "Authorization: Bearer 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"\
                    -H "X-GitHub-Api-Version: 2022-11-28" \
                    https://api.github.com/repos/OWNER/REPO/releases/latest"""

            }
        }
    } 
}