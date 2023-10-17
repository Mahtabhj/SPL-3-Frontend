pipeline {
    agent {
        node {
            label 'wafr'
        }
    }        
    stages{
        stage('Build') {
            steps {
                sh "docker-compose -f frontend/docker-compose.yml down"
            }
        }        
        stage('Deploy') {
            steps {
                sh "docker-compose -f frontend/docker-compose.yml build"
                sh "docker-compose -f frontend/docker-compose.yml up -d"
            }
        }
    }
}
