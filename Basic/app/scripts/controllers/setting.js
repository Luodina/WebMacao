'use strict';
angular.module('basic')
    .controller('SettingCtrl', ['$rootScope', '$scope', '$http',
        ($rootScope, $scope, $http) => {
            $scope.tab = 0;
            $scope.selUser = {};
            $scope.clicked = function(num) {
                console.log("num", num)
                $scope.tab = num;
                if (num === 4) {
                    $scope.$broadcast('tab', num);
                    $scope.tab = 4
                }
                if (num === 3) {
                    $scope.$broadcast('tab', num);
                    $scope.tab = 3
                }
                if (num === 2) {
                    $scope.$broadcast('tab', num);
                    $scope.$broadcast('user', $scope.selUser)
                    $scope.tab = 2
                }
                if (num === 1) {
                    $scope.tab = 1;
                    $scope.$broadcast('tab', num);
                }
                if (num === 0) {
                    $scope.tab = 0;
                    $scope.$broadcast('tab', num);
                }
            }
            $scope.isUserManagementShow = false;
            $scope.userManagementShow = () => {
                $scope.isUserManagementShow = !$scope.isUserManagementShow;
            }
            $scope.isCameraSettingShow = false;
            $scope.cameraSettingShow = () => {
                $scope.isCameraSettingShow = !$scope.isCameraSettingShow;
            }
            $scope.cameras = [];

            function getCameras() {
                $http.get('/api/camera/all/').success(function(data) {
                    console.log("get Camera successfully!", data);
                    $scope.cameras = data.cameras;
                });
            };
            getCameras();
            $scope.$on('addedCamera', event => {
                console.log("back to settings");
                $scope.tab = 0;
                getCameras();
            });
            $scope.$on('editUser', (event, data) => {
                console.log("editUser in settings", event, data);
                $scope.selUser = data;
                $scope.clicked(2)
            });
        }
    ]);