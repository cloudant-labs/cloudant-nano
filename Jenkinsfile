#!groovy
// Copyright © 2017 IBM Corp. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

def getEnvForSuite(suiteName) {
  // Base environment variables
  def envVars = [
    "NVM_DIR=${env.HOME}/.nvm",
    "TIMEOUT=30000" // 30s
  ]

  // Add test suite specific environment variables
  switch(suiteName) {
    case 'tests':
      break
    default:
      error("Unknown test suite environment ${suiteName}")
  }

  return envVars
}

def setupNodeAndTest(version, testSuite='tests') {
  node {
    // Install NVM
    sh 'wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash'
    // Unstash the built content
    unstash name: 'built'

    // Run tests using creds
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'clientlibs-test', usernameVariable: 'CLOUDANT_USERNAME', passwordVariable: 'CLOUDANT_PASSWORD']]) {
      withEnv(getEnvForSuite("${testSuite}")) {
        // Actions:
        //  1. Load NVM
        //  2. Install/use required Node.js version
        //  3. Run tests
        sh """
          [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
          nvm install ${version}
          nvm use ${version}
          npm run mocha
        """
      }
    }
  }
}

stage('Build') {
  // Checkout, build
  node {
    checkout scm
    sh 'npm install'
    stash name: 'built'
  }
}

stage('QA: Node4x') {
  setupNodeAndTest('lts/argon') //4.x LTS
}

stage('QA: Node6x') {
  setupNodeAndTest('lts/boron') // 6.x LTS
}

stage('QA: Node') {
  setupNodeAndTest('node') // Current
}
