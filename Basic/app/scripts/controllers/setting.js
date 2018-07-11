'use strict';
angular.module('basic')
    .controller('SettingCtrl', ['$scope', 'tasks', 'STtaskInfo', '$q', 'cameras', '$state', 'STtasksDel', 'DBcameras', 'Notification', 'GLOBAL',
        ($scope, tasks, STtaskInfo, $q, cameras, $state, STtasksDel, DBcameras, Notification, GLOBAL) => {
            //console.log("GLOBAL in sys set:", GLOBAL);
            cameras ? cameras : cameras = [];
            $scope.role = GLOBAL.role;
            let taskIds = [];
            $scope.serverStatus = 'Active';
            if (tasks) {
                if (tasks.resolveError) {
                    $scope.serverStatus = tasks.resolveError.statusText;
                } else {
                    taskIds = tasks.taskIds ? tasks.taskIds : [];
                    $scope.serverStatus = 'Active';
                }
            }
            $scope.tab = 0;
            $scope.selUser = {};
            $scope.selCamera = {};
            let taskInfosData = [],
                promiseArray = [];
            $scope.clicked = function(num, camera) {
                $scope.tab = num;
                if (num === 4) {
                    //console.log('taskInfosData in set', taskInfosData);
                    $scope.$broadcast('tab', num);
                    $scope.$broadcast('camera', { camera: camera, tasks: taskInfosData });
                    $scope.tab = 4;
                }
                if (num === 3) {
                    $scope.$broadcast('tab', num);
                    $scope.tab = 3;
                }
                if (num === 2) {
                    $scope.$broadcast('tab', num);
                    $scope.$broadcast('user', $scope.selUser);
                    $scope.tab = 2;
                }
                if (num === 1) {
                    $scope.tab = 1;
                    $scope.$broadcast('tab', num);
                }
                if (num === 0) {
                    $scope.tab = 0;
                    $scope.$broadcast('tab', num);
                }
            };
            $scope.isUserManagement = true;
            $scope.isUserManagementShow = false;
            $scope.userManagementShow = () => {
                $scope.isUserManagementShow = !$scope.isUserManagementShow;
            };
            $scope.isCameraSettingShow = false;
            $scope.cameraSettingShow = () => {
                $scope.isCameraSettingShow = !$scope.isCameraSettingShow;
            };
            $scope.$on('addedCamera', event => {
                //console.log('back to settings', event);
                $state.reload();
            });
            $scope.$on('editUser', (event, data) => {
                //console.log('editUser in settings', event, data);
                $scope.selUser = data;
                $scope.clicked(2);
            });
            $scope.$on('editCamera', (event, data) => {
                //console.log('editCamera in settings', event, data);
                $state.reload();
            });
            $scope.$on('noUser', (event, data) => {
                $scope.isUserManagement = false;
                //console.log('noUser', data);
            });

            function getCameras() {
                //console.log('taskIds', taskIds, 'cameras', cameras);
                if (taskIds || cameras) {
                    for (let i = 0; i < taskIds.length; i++) {
                        promiseArray.push(STtaskInfo.get({ taskID: taskIds[i] }).$promise); //creating promise array
                    }
                    $q.all(promiseArray) //giving promise array input.
                        .then(taskInfosData => { //success will call when all promises get resolved.
                            //console.log('Array promises:', taskInfosData, 'cameras:', cameras);
                            if (taskInfosData && cameras) {
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
                        .catch(err => { console.log('Error occured', err); });
                }
            }
            getCameras();
            $scope.cameraDelete = (taskid, cameraid, status) => {
                //console.log('taskid', taskid, 'cameraid', cameraid);
                Promise.resolve()
                    .then(() => {
                        if (taskid !== undefined && status === 'Active') {
                            return STtasksDel.del({ taskID: taskid }).$promise;
                        } else {
                            return { returnCode: "0" };
                        }
                    })
                    .then(data => {
                        if (data && data.returnCode === "0") {
                            return DBcameras.del({
                                query: cameraid
                            }).$promise;
                        } else if (data && data.returnCode !== "0") {
                            return { status: 'error', msg: data.returnCode };
                        } else {
                            return { status: 'error', msg: 'Error!!!' };
                        }
                    })
                    .then(data => {
                        if (data && data.status === 'success') {
                            Notification.success("success");
                            $scope.$emit('editCamera', true);
                        } else if (data && data.status === 'error') {
                            Notification.error(data.msg);
                            //console.log(data.msg);
                        } else {
                            Notification.error("Hmmmm");
                        }
                    })
                    .catch(err => {
                        Notification.error(err);
                        //console.log('STtasksDel err', err);
                    });
            };
        }
    ]);