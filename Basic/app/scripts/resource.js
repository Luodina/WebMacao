'use strict';
angular.module('basic.resource', ['ngResource'])
    .factory('rtmReg', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let rtmReg = $resource(GLOBAL.host_people + '/rtmreg', {}, {});
        return rtmReg;
    }])
    .factory('rtmRegTest', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let rtmRegTest = $resource(GLOBAL.host_people + '/rtmregtest', {}, {});
        return rtmRegTest;
    }])
    .factory('rtmAll', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let rtmAll = $resource(GLOBAL.host_people + '/rtmall', {}, {});
        return rtmAll;
    }])
    .factory('DBhistory', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let DBhistory = $resource(GLOBAL.host_history + '/', { searchData: '@searchData', page: '@page' }, {});
        return DBhistory;
    }])
    .factory('All', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let All = $resource(GLOBAL.host_history + '/all/', {}, {});
        return All;
    }])
    .factory('DBcameras', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let DBcameras = $resource(GLOBAL.db + '/camera/:name', { name: '@name' }, {
            create: { method: 'POST' },
            del: {
                method: 'POST',
                url: GLOBAL.db + '/camera/del'
            },
            update: { method: 'PUT' }
        });

        return DBcameras;
    }])
    .factory('DBpeople', ['$resource', 'GLOBAL', function($resource, GLOBAL) {
        let DBpeople = $resource(GLOBAL.db + '/people/:name/:page', { name: '@name', page: '@page' }, {
            create: { method: 'POST' },
            del: {
                method: 'POST',
                url: GLOBAL.db + '/people/del'
            },
            update: {
                method: 'POST',
                url: GLOBAL.db + '/people/update'
            }
        });
        return DBpeople;
    }])
    .factory('STtasks', ['$resource', function($resource) {
        let STtasks = $resource('/api/st/Task/QueryResource?ProjectID=1000', {}, {});
        return STtasks;
    }])
    .factory('STtaskInfo', ['$resource', function($resource) {
        let STtaskInfo = $resource('/api/st/Task/GetTaskInfo', { taskID: '@taskID' }, {});
        return STtaskInfo;
    }])
    .factory('STtasksCreate', ['$resource', function($resource) {
        let STtasksCreate = $resource('/api/st/Task/CreateTask?ProjectID=1000', {}, {
            create: { method: 'POST' }
        });
        return STtasksCreate;

    }])
    .factory('STtasksDel', ['$resource', function($resource) {
        let STtasksDel = $resource('/api/st/Task/DeleteTask', {}, {
            del: { method: 'POST' }
        });
        return STtasksDel;
    }])
    .factory('STimageUpload', ['$resource', function($resource) {
        let STtasksCreate = $resource('/api/st/verify/face/synAdd', {}, {
            create: { method: 'POST' }
        });
        return STtasksCreate;
    }]);