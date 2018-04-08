'use strict';
angular.module('basic.resource', ['ngResource'])
    .factory('getAllData', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let getAllData = $resource(GLOBAL.host_getAllData + '/datasets', {}, {});
        return getAllData;
    }])
    .factory('fromdbFace', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let fromdbFace = $resource(GLOBAL.host_people + '/fromdb', {}, {});
        return fromdbFace;
    }])
    .factory('rtmFace', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let rtmFace = $resource(GLOBAL.host_people + '/rtm', {}, {});
        return rtmFace;
    }])

.factory('makefileList', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
    let makefileList = $resource(GLOBAL.host_makefile + '/getMakeFileList/:appName', { appName: '@appName' }, {});
    return makefileList;
}]);