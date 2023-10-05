pipeline {
    agent any
    
    // 환경변수 지정
    environment {
        REGION='us-east-1' // 이거 Public Region이라서 그럼
        ECR_PATH='public.ecr.aws/s2t1t5c1/proto-web'
        ACCOUNT_ID='622164100401'
        AWS_CREDENTIAL_NAME='NBA-AWS-Credential'
        // IMAGE_NAME = 'proto-web'
        IMAGE_VERSION = "1.0.1"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'NBA-Web-API-Gitops-Pipeline-Credential',
                    url: 'https://github.com/Choiwonwong/NBA-WebServer.git'
            }
        }
        stage('build') {
            steps {
                sh 'echo "Building the project..."'
            }
        }
        
        stage('dockerizing project by dockerfile') {
            steps {
                sh '''
        		 docker build -t $ECR_PATH:$IMAGE_VERSION .
        		 '''
            }
        }
    
        stage('upload aws ECR') {
            steps {
                script {
                    docker.withRegistry("https://$ECR_PATH", "ecr:$REGION:$AWS_CREDENTIAL_NAME") {
                        docker.image("$ECR_PATH:$IMAGE_VERSION").push()
                    }
                }
            } 
        }
    }
}