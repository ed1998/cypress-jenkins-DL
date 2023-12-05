pipeline {
    agent {
        docker { image 'cypress/browsers:latest' }
    }
    stages {
        stage('build') {
            steps {
                sh 'npm run test'
            }
        }
        stage('test') {
            steps {

            }
        }
    }
}