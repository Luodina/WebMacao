'use strict';
angular.module('basic')
    .controller('SettingMainCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
        $scope.msg = "SettingMainCtrl";

    }])
    .directive('settingMain', function() {
        return {
            templateUrl: 'views/directive/settingMain.html'
        };
    });