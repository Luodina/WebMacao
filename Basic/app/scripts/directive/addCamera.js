'use strict';
angular.module('basic')
    .controller('AddCameraCtrl', ['Notification', 'GLOBAL', '$filter', '$rootScope', '$scope', '$http', '$location', 'STtasksCreate', 'DBcameras', 'STtasksDel',
        function(Notification, GLOBAL, $filter, $rootScope, $scope, $http, $location, STtasksCreate, DBcameras, STtasksDel) {
            let mode = 'add';
            console.log('GLOBAL', GLOBAL);
            $scope.$on('camera', (el, data) => {
                if (data.camera) {
                    $scope.msg = 'Edit';
                    $scope.tasks = data.tasks;
                    $scope.camera = data.camera;
                    mode = 'update';
                } else {
                    $scope.msg = 'Add';
                    $scope.tasks = data.tasks;
                    $scope.camera = { status: false };
                    mode = 'add';
                }
            });
            $scope.applyCamera = () => {
                if (isCameraInputValid()) {
                    let taskCreateBody = {
                        "taskType": 0,
                        "param": {
                            "Source": {
                                "SourceType": 2,
                                "RtspUrl": $scope.camera.rtsp //"rtsp://10.254.0.120:5540/ch0"
                            },
                            "Result": [{
                                "Index": 0,
                                "FilterNoImg": 1,
                                "ProtocolType": 10,
                                "URL": GLOBAL.CONFIG.STresURL,
                            }, {
                                "Index": 1,
                                "FilterNoImg": 1,
                                "ProtocolType": 10,
                                "URL": GLOBAL.CONFIG.STresURL
                            }],
                            "Private": {
                                "targets": [
                                    { "dbId": GLOBAL.CONFIG.STDBname, "score": GLOBAL.CONFIG.STDBscore }
                                ]
                            }
                        }
                    };

                    console.log('mode', mode);
                    if (mode === 'add') {
                        addCamera(taskCreateBody);
                    } else {
                        updateCamera(taskCreateBody);
                    }
                }
            }

            function isCameraInputValid() {
                let pattern = 'rtsp:\/\/([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}):([0-9]{4})\/([A-Za-z0-9\-\.]+)'
                let re = new RegExp(pattern);
                if (!($scope.camera.name !== undefined &&
                        $scope.camera.location !== undefined &&
                        $scope.camera.rtsp !== undefined &&
                        $scope.camera.rtsprt !== undefined &&
                        $scope.camera.status !== undefined)) {
                    return false;
                }
                // if (!re.test($scope.camera.rtsp)) {
                //     console.log('rtsp is not correct!follow pattern');
                //     Notification.error($filter('translate')('rtsp is not correct!follow pattern!!'));
                //     return false;
                // }
                let rtspArr = [];
                if ($scope.tasks.length === 8) {
                    Notification.error($filter('translate')('There are already 8 cameras in process!!'));
                    return false;;
                }
                if ($scope.tasks && $scope.tasks.length > 0) {
                    for (let j = 0; j < $scope.tasks.length; j++) {
                        rtspArr.push($scope.tasks[j].param.Source.RtspUrl);
                    }
                    if (rtspArr.includes($scope.camera.rtsp)) {
                        Notification.error($filter('translate')('Specified rtsp url already exists!!'));
                        return false;
                    }
                }
                return true;
            }

            function updateCamera(taskCreateBody) {
                // check info in DB
                let isActive = false;
                let isDeactive = false;
                Promise.resolve()
                    .then(() => {
                        return DBcameras.get({ name: $scope.camera._id }, $scope.camera).$promise;
                    })
                    .then(data => {
                        console.log('555555555', data);
                        if (data) {
                            let oldCamera = data[0];
                            isActive = (oldCamera.status !== $scope.camera.status) && $scope.camera.status;
                            isDeactive = (oldCamera.status !== $scope.camera.status) && oldCamera.status;
                            console.log('old camera', oldCamera);
                            console.log('new camera', $scope.camera);
                            console.log('isActive', isActive);
                            console.log('isDeactive', isDeactive);
                            if (isActive) {
                                //console.log('inactive => active');
                                return STtasksCreate.create(taskCreateBody).$promise;
                            } else if (isDeactive) {
                                //console.log('active => inactive');
                                //console.log('oldCamera.taskid', oldCamera.taskid);
                                return STtasksDel.del({ taskID: oldCamera.taskid }).$promise;
                                // }else if (oldCamera.status == $scope.camera.status) {

                            } else {
                                console.log('-------------');
                                return { 'returnCode': '0' };
                            }
                        }
                    })
                    .then(data => {
                        console.log('!!!!!!!!!!!!!!!!!!!data', data);
                        if (data && data.returnCode && data.returnCode === '0') {
                            let newVal = {
                                name: $scope.camera.name,
                                location: $scope.camera.location,
                                remarks: $scope.camera.remarks
                            }
                            console.log('$scope.camera.status', $scope.camera.status);
                            if ($scope.camera.status) {
                                //'inactive => active'
                                newVal.taskid = data.taskID;
                                newVal.status = true;
                            } else {
                                //'active => inactive'
                                //newVal.taskid = null;
                                newVal.status = false;
                            }
                            return DBcameras.update({
                                query: $scope.camera._id,
                                newVal: newVal
                            }).$promise;
                        } else if (data && data.returnCode !== '0') {
                            return { status: false, msg: data.returnCode };
                        } else {
                            return { status: false, msg: 'Error!!!' };
                        }
                    })
                    .then(data => {
                        if (data && data.status) {
                            //console.log('Success', isActive, isDeactive);
                            if (isDeactive) {
                                let cam = {
                                    name: $scope.camera.name,
                                    location: $scope.camera.location,
                                    remarks: $scope.camera.remarks,
                                    status: false,
                                    rtsp: $scope.camera.rtsp,
                                    rtsprt: $scope.camera.rtsprt
                                }
                                return DBcameras.create({ camera: cam }).$promise;
                            } else {
                                return { status: 'success' }
                            }
                        };
                        if (data && !data.status) {
                            //console.log('Error', data.msg);
                            if (data.msg === '11151') {
                                Notification.error($filter('translate')('Activate camera! Connect to the same WiFi!!'));
                                //console.log('Activate camera! Connect to the same WiFi');
                            } else if (data.msg === '11001') {
                                Notification.error($filter('translate')(`Insufficient resources to create the task
                                            There’s no free video card to support the new task      
                                            Check if the video channel was full`));
                                // console.log(`Insufficient resources to create the task
                                //             There’s no free video card to support the new task      
                                //             Check if the video channel was full`);
                            } else {
                                Notification.error($filter('translate')('Error!'));
                                //console.log('Some error!!!');
                            }
                        };
                    })
                    .catch(dbErr => {
                        //console.log('dbErr', dbErr);
                        if (dbErr && dbErr.data && dbErr.data.msg) {
                            let msg;
                            dbErr.data.msg.message ? msg = dbErr.data.msg.message : (dbErr.data.msg.errmsg ? msg = dbErr.data.msg.errmsg : msg = 'Error in DB');
                            Notification.error(msg);
                            //console.log(msg);
                        };
                    })
                    .then((data) => {
                        //console.log('data=============>', data);
                        if (data) {
                            Notification.success('Camera saved successfully');
                            $scope.$emit('editCamera', true);
                            //$scope.$emit('addedCamera', true);
                        }
                    })
                    .catch(err => {
                        //console.log('Error!!!!', err);
                    })
            };

            function addCamera(taskCreateBody) {
                //rtsp://user1:asl123@10.254.1.157:554/live/0/MAIN
                if ($scope.camera.status) {
                    Promise.resolve()
                        .then(() => { return STtasksCreate.create(taskCreateBody).$promise })
                        .catch(stErr => {
                            //console.log('stErr', stErr);
                        })
                        .then((data) => {
                            //console.log('data in db cameras', data);
                            if (data && data.returnCode && data.returnCode === '0') {
                                $scope.camera.taskid = data.taskID;
                                return DBcameras.create({ camera: $scope.camera }).$promise;
                            } else {
                                return data;
                            }
                        })
                        .catch(dbErr => {
                            //console.log('dbErr', dbErr);
                            if (dbErr && dbErr.data && dbErr.config) {
                                let msg;
                                dbErr.data.msg.message ? msg = dbErr.data.msg.message : (dbErr.data.msg.errmsg ? msg = dbErr.data.msg.errmsg : msg = 'Error in DB');
                                Notification.error(msg);
                                console.log(msg);
                                return STtasksDel.del({ taskID: dbErr.config.data.camera.taskid }).$promise;
                            }
                        })
                        .then((data) => {
                            //console.log('data result', data);
                            if (data && data.status) {
                                //console.log('data result', data);
                                $scope.$emit('addedCamera', true);
                                return true;
                            } else if (data && data.returnCode && data.returnCode === '0') {
                                return true;
                            } else if (data && data.returnCode && data.returnCode === '11151') {
                                Notification.error($filter('translate')('Activate camera! Connect to the same WiFi!!'));
                                //console.log('Activate camera! Connect to the same WiFi');
                            } else if (data && data.returnCode && data.returnCode === '11001') {
                                Notification.error($filter('translate')(`Insufficient resources to create the task
                                                There’s no free video card to support the new task      
                                                Check if the video channel was full`));
                                // console.log(`Insufficient resources to create the task
                                //                 There’s no free video card to support the new task      
                                //                 Check if the video channel was full`);
                            } else {
                                Notification.error($filter('translate')('Error!'));
                                //console.log('Some error!!!');
                            }
                        })
                        .catch(err => { console.log('err', err); })
                } else {
                    DBcameras.create({ camera: $scope.camera }).$promise
                        .then(() => { $scope.$emit('addedCamera', true) })
                        .catch(dbErr => {
                            //console.log('dbErr', dbErr);
                            if (dbErr && dbErr.data && dbErr.data.msg) {
                                let msg;
                                dbErr.data.msg.message ? msg = dbErr.data.msg.message : (dbErr.data.msg.errmsg ? msg = dbErr.data.msg.errmsg : msg = 'Error in DB');
                                Notification.error(msg);
                                //console.log(msg);
                            }
                        });
                }
            };
        }
    ])
    .directive('addCamera', function() {
        return {
            templateUrl: 'views/directive/addCamera.html'
        };
    });