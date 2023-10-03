pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'NBA-Web-API-Server',
                    url: 'https://github.com/Choiwonwong/NBA-WebServer.git'
            }
        }
    }
}


