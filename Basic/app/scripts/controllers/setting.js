'use strict';
angular.module('basic')
    .controller('SettingCtrl', ['$rootScope', '$scope', '$http', 'tasks', 'STtaskInfo', '$q', 'cameras', '$state',
        ($rootScope, $scope, $http, tasks, STtaskInfo, $q, cameras, $state) => {
            let taskIds = [];
            if (tasks) {
                taskIds = tasks.taskIds;
            }
            let promises = [];
            $scope.tab = 0;
            $scope.selUser = {};
            $scope.selCamera = {};
            $scope.clicked = function(num, camera) {
                $scope.tab = num;
                if (num === 4) {
                    console.log('taskInfosData in set', taskInfosData);
                    $scope.$broadcast('tab', num);
                    $scope.$broadcast('camera', { camera: camera, tasks: taskInfosData });
                    $scope.tab = 4
                }
                if (num === 3) {
                    $scope.$broadcast('tab', num);
                    $scope.tab = 3
                }
                if (num === 2) {
                    $scope.$broadcast('tab', num);
                    $scope.$broadcast('user', $scope.selUser);
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
            $scope.$on('addedCamera', event => {
                console.log('back to settings');
                $state.reload();
            });
            $scope.$on('editUser', (event, data) => {
                console.log('editUser in settings', event, data);
                $scope.selUser = data;
                $scope.clicked(2);
            });
            $scope.$on('editCamera', (event, data) => {
                console.log('editCamera in settings', event, data);
                $state.reload();
            });
            let taskInfosData = [],
                promiseArray = [];
            getCameras();

            function getCameras() {
                if (taskIds) {
                    for (let i = 0; i < taskIds.length; i++) {
                        let taskId = taskIds[i];
                        let currentPromise = STtaskInfo.get({ taskID: taskId }).$promise.then(data => {
                            if (data) {
                                taskInfosData.push(data);
                            }
                            //return true; //returning value from promise.
                        });
                        promiseArray.push(currentPromise); //creating promise array
                    }
                    $q.all(promiseArray) //giving promise array input.
                        .then(data => { //success will call when all promises get resolved.
                            if (taskInfosData && cameras) {
                                console.log('taskInfosData', taskInfosData, 'cameras', cameras);
                                if (cameras.length === taskInfosData.length) {
                                    console.log('cameras equals to taskInfo');
                                } else if (cameras.length >= taskInfosData.length) {
                                    console.log('cameras greater than taskInfo');
                                } else {
                                    console.log('cameras less than taskInfo');
                                }
                                for (let i = 0; i < cameras.length; i++) {
                                    if (cameras[i].status) {
                                        cameras[i].statusShow = 'Fail';
                                        for (let j = 0; j < taskInfosData.length; j++) {
                                            if (cameras[i].rtsp === taskInfosData[j].param.Source.RtspUrl) {
                                                cameras[i].statusShow = 'Active';
                                            }
                                        }
                                    } else {
                                        cameras[i].statusShow = 'InActive';
                                    }

                                }
                                $scope.cameras = cameras;
                            } else if (cameras) {
                                for (let i = 0; i < cameras.length; i++) {
                                    if (cameras[i].status) {
                                        cameras[i].statusShow = 'Fail';
                                    } else {
                                        cameras[i].statusShow = 'InActive';
                                    }

                                }
                            }
                        })
                        .catch(err => { console.log('Error occured'); });
                }

            }
        }
    ]);