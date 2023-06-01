pipeline {

    agent any

    environment {
        remote = null
        user = credentials('fertalizer_user')
        host = credentials('fertalizer_host')
        name = credentials('fertalizer_name')
        ssh_key = credentials('fertalizer_devops')
        release_url = credentials('fertalizer_release')
    }

    stages {
        stage('Ssh to connect Tesla server') {
            steps {
                script {
                    // Set up remote SSH connection parameters
                    remote.allowAnyHosts = true
                    remote.identityFile = ssh_key
                    remote.user = user
                    remote.name = name
                    remote.host = host
                    
                }
            }
        }
        stage('Download latest release') {
            steps {
                script {
                    def GIT_HUB_URL = release_url
                    sshCommand remote: remote, command: """
                        # Download the latest release from GitHub
                        sudo su
                        cd /var/www/docs/webapi/
                        kill -9 \$(netstat -nepal | grep 5000 | awk '{print \$9}' | awk -F '/' '{print \$1}')
                        mv -r api api_backup_\$(date +"%Y%m%d")
                        rm -fr releaseApi.zip
                        curl -LJO \$(curl -Ls \${GIT_HUB_URL} | jq -r '.assets[0].browser_download_url')
                        unzip -o releaseApi.zip
                        rm -fr releaseApi.zip
                        mv -r src/webapi/ api
                    """
                }
            }
        }
        stage('Init Api') {
            steps {
                script {
                    sshCommand remote: remote, command: """
                        cd /var/www/docs/webapi/
                        source env/bin/activate
                        export DEBUG=False
                        export WORKSPACE=fertilizer_et
                        export LAYER_NAME=:et_wheat_fertilizer_recommendation_normal
                        export SERVICE=WFS
                        export GEOSERVER_URL="https://geo.aclimate.org/geoserver/"
                        export FERTILIZER_RASTERS_DIR="./raster_files/cropped/"
                        export PORT=5000
                        cd api/
                        nohub python agroadvisory_api.py > log.txt 2>&1 &
                    """
                }
            }
        }
    }
 
}