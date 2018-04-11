'use strict';
angular.module('basic')
    .controller('AddCameraCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {
        $scope.msg = "AddCameraCtrl";
        $scope.addCamera = () => {
            if ($scope.camera.name !== undefined &&
                $scope.camera.location !== undefined &&
                $scope.camera.rtsp !== undefined &&
                $scope.camera.status !== undefined) {
                $http.post('/api/camera/add/', { camera: $scope.camera }).success(function(camera) {
                    console.log("addCamera successfully!", camera);
                    $scope.$emit('addedCamera', true);
                }).catch(err => {
                    console.log("Error", err)
                });
            }
        }
    }])
    .directive('addCamera', function() {
        return {
            templateUrl: 'views/directive/addCamera.html'
        };
    });