'use strict';
/**
 * Controller of the HomeCtrl
 */
angular.module('basic')
    .controller('HomeCtrl', ['$scope', 'loginModel',
        function($scope, loginModel) {
            $scope.login = () => {
                console.log("Here we are!")
                loginModel.open();
            };
            $scope.login();
        }
    ]);