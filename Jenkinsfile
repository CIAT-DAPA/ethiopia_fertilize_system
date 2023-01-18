pipeline {

    agent { label ' Linux01'}

    stages {

        stage('get release') {

            steps {

                sh """curl \
                    -H "Accept: application/vnd.github+json" \
                    -H "Authorization: Bearer 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"\
                    -H "X-GitHub-Api-Version: 2022-11-28" \
                    https://api.github.com/repos/santiago123x/ethiopia_fertilize_system/releases/latest"""

            }
        }
    } 
}