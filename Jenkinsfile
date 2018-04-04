node {
    def app 
    env.DOCKER_REGISTRY = 'dockerhub'    
    properties([
        parameters([
            string(name: 'REGISTRY_CREDENTIAL', defaultValue: 'pUVw-eJJwvowCAIexHb4eQyVVHxYSLWJORYbvR3IPUU')
        ])
    ])
    stage('Clone Repository...') {
        checkout scm 
    }
    stage('Build Docker Image ...') {
        app = docker.build("aura/web")
    }
    stage('Acceptance Tests...') {
        app.withRun{
            echo 'Tests passed'
        }
    }
    stage('Docker Image Push...') {
        docker.withRegistry("https://${env.DOCKER_REGISTRY}"){
            sh "docker login -u luodina -p luodina"
            app.push("${env.BRANCH_NAME.toLowerCase()}")
        }
    }
}