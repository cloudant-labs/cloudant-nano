
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
'use strict';

var url;
var usingCloudant = false;

if ((typeof process.env.CLOUDANT_USERNAME !== 'undefined') && (typeof process.env.CLOUDANT_PASSWORD !== 'undefined')) {
    usingCloudant = true;
    var user = process.env.CLOUDANT_USERNAME;
    var pass = process.env.CLOUDANT_PASSWORD;
    url = `https://${user}:${pass}@${user}.cloudant.com`;
}

module.exports = {
    admin: url || 'http://admin:password@localhost:5984',
    couch: url || 'http://localhost:5984',
    timeout: parseInt(process.env.TIMEOUT) || 5000,
    usingCloudant: usingCloudant
}
