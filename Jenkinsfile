pipeline {
    agent any
    environment {
        REGION='ap-northeast-1'
        ECR_PATH='dkr.ecr.ap-northeast-1.amazonaws.com'
        ACCOUNT_ID='622164100401'
        AWS_CREDENTIAL_NAME='NBA-AWS-Credential-v2'
        IMAGE_NAME = 'nba-web'
        IMAGE_VERSION = "1.3.4"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master',
                    credentialsId: 'NBA-Web-API-Gitops-Pipeline-Credential',
                    url: 'https://github.com/Choiwonwong/NBA-WebServer.git'
            }
        }
        stage('Get API EndPoint'){
            steps {
                script {
                    sh 'rm -f .env.production'
                    sh '''
                    touch .env.production
                    echo "REACT_APP_API_URL=$(kubectl get svc nba-api-service -n api -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')" >> .env.production
                    echo "REACT_APP_API_PORT=8000" >> .env.production
                    '''
                }
            }
        }
        stage('Change nginx.conf'){
            steps{
                script{
                    sh '''
                    NEW_DNS=$(kubectl get svc nba-web-service -n web -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
                    sed -i "s/localhost/\$NEW_DNS/" nginx.conf
                    '''
                }
            }
        }
        stage('build') {
            steps {
                sh '''
        		 docker build -t $ACCOUNT_ID.$ECR_PATH/$IMAGE_NAME:$IMAGE_VERSION .
        		 '''
            }
        }
        stage('upload aws ECR') {
            steps {                
                sh 'rm  ~/.dockercfg || true'
                sh 'rm ~/.docker/config.json || true'
                script {
                    docker.withRegistry("https://$ACCOUNT_ID.$ECR_PATH", "ecr:$REGION:$AWS_CREDENTIAL_NAME") {
                        docker.image("$ACCOUNT_ID.$ECR_PATH/$IMAGE_NAME:$IMAGE_VERSION").push()
                    }
                }
            } 
        }
        stage('Deploy in NBA EKS') {
            steps {                
                sh 'kubectl apply -f manifest/deployment.yaml'
            } 
        }
    }
}


