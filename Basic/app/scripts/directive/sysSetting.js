'use strict';
angular.module('basic')
    .controller('SysSettingCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
        //$scope.msg = "SysSettingCtrl";
        $scope.initServer = () => {}
    }])
    .directive('sysSetting', function() {
        return {
            templateUrl: 'views/directive/sysSetting.html'
        };
    });