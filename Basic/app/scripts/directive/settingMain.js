'use strict';
angular.module('basic')
    .controller('SettingMainCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
        $scope.cameras = [];
        $scope.$on('camerasStatus', (event, data) => {
            //console.log('data', data);
            $scope.cameras = data.cameras
            for (let i = 0; i < cameras.length; i++) {
                cameras[i].statusShow = 'Fail';
                for (let j = 0; j < taskInfosData.length; j++) {
                    if (cameras[i].rtsp === taskInfosData[j].param.Source.RtspUrl) {
                        cameras[i].statusShow = 'Active';
                    }
                }
            }
        })
    }])
    .directive('settingMain', function() {
        return {
            templateUrl: 'views/directive/settingMain.html'
        };
    });