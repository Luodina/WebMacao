'use strict';
angular.module('basic.resource', ['ngResource'])
    .factory('fromdbFace', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let fromdbFace = $resource(GLOBAL.host_people + '/fromdb', {}, {});
        return fromdbFace;
    }])
    .factory('rtmFace', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let rtmFace = $resource(GLOBAL.host_people + '/rtm', {}, {});
        return rtmFace;
    }])
    .factory('DBcameras', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let DBcameras = $resource(GLOBAL.db + '/camera/:name', { name: '@name' }, {
            create: { method: 'POST' },
            del: { method: 'DELETE' },
            update: { method: 'PUT' }
        });
        return DBcameras;
    }])
    .factory('DBpeople', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let DBcameras = $resource(GLOBAL.db + '/people/:name', { name: '@name' }, {
            create: { method: 'POST' },
            del: {
                method: 'POST',
                url: GLOBAL.db + '/people/del'
            },
            update: { method: 'PUT' }
        });
        return DBcameras;
    }])
    .factory('STtasks', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let STtasks = $resource('/api/st/Task/QueryResource?ProjectID=1000', {}, {});
        return STtasks;

    }])
    .factory('STtaskInfo', ['$resource', 'GLOBAL', '$q', function($resource, GLOBAL, $q) {
        let STtaskInfo = $resource('/api/st/Task/GetTaskInfo', { taskID: '@taskID' }, {});
        return STtaskInfo;
    }])
    .factory('STtasksCreate', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let STtasksCreate = $resource('/api/st/Task/CreateTask?ProjectID=1000', {}, {
            create: { method: 'POST' }
        });
        return STtasksCreate;

    }])
    .factory('STtasksDel', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let STtasksDel = $resource('/api/st/Task/DeleteTask', {}, {
            del: { method: 'POST' }
        });
        return STtasksDel;
    }])
    .factory('STimageUpload', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let STtasksCreate = $resource('/api/st/verify/face/synAdd', {}, {
            create: { method: 'POST' }
        });
        return STtasksCreate;
    }]);