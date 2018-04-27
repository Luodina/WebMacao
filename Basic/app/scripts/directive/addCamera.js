'use strict';
angular.module('basic')
    .controller('AddCameraCtrl', ['GLOBAL', '$rootScope', '$scope', '$http', '$location', 'STtasksCreate', 'DBcameras', 'STtasksDel',
        function(GLOBAL, $rootScope, $scope, $http, $location, STtasksCreate, DBcameras, STtasksDel) {
            let mode = 'add';
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
                                "URL": GLOBAL.STresURL,
                            }, {
                                "Index": 1,
                                "FilterNoImg": 1,
                                "ProtocolType": 10,
                                "URL": GLOBAL.STresURL
                            }],
                            "Private": {
                                "targets": [
                                    { "dbId": GLOBAL.STDBname, "score": GLOBAL.STDBscore }
                                ]
                            }
                        }
                    };
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
                        $scope.camera.status !== undefined)) {
                    return false;
                }
                if (!re.test($scope.camera.rtsp)) {
                    console.log('rtsp is not correct!follow pattern');
                    return false;
                }
                for (let j = 0; j < $scope.tasks.length; j++) {
                    rtspArr.push($scope.tasks[j].param.Source.RtspUrl);
                }
                if (rtspArr.includes($scope.camera.rtsp)) {
                    console.log('rtsp is not correct!');
                    return false;;
                }
            }

            function updateCamera(taskCreateBody) {
                // check info in DB
                let nameArr = [],
                    locationArr = [],
                    rtspArr = [];
                DBcameras.query({ name: $scope.camera._id }, $scope.camera).$promise
                    .then(data => {
                        let oldCamera = data[0];
                        console.log('oldCamera', oldCamera);
                        if ((oldCamera.status !== $scope.camera.status) && $scope.camera.status) {
                            console.log('active => inactive ');
                            STtasksCreate.create(taskCreateBody).$promise.then(data => { // if camera status from inative to active => create a task at ST server
                                if (data && data.returnCode && data.returnCode === '0') {
                                    $scope.camera.taskid = data.taskID;
                                    DBcameras.update({
                                            query: $scope.camera._id,
                                            newVal: {
                                                name: cameras.name,
                                                taskid: cameras.taskid,
                                                status: cameras.status,
                                                location: cameras.location,
                                                remarks: cameras.remarks,
                                                create_date: new Date()
                                            }
                                        }).$promise
                                        .then(data => {
                                            console.log('DBcameras.update data', data);
                                            if (data) { $scope.$emit('editCamera', true) }
                                        })
                                        .catch(err => { console.log('err', err); });
                                } else if (data && data.returnCode && data.returnCode === '11151') {
                                    console.log('Activate camera! Connect to the same WiFi');
                                } else if (data && data.returnCode && data.returnCode === '11001') {
                                    console.log(`Insufficient resources to create the task
                            There’s no free video card to support the new task      
                            Check if the video channel was full`);
                                } else if (data && data.returnCode && data.returnCode === '0') {
                                    console.log(data);
                                } else {
                                    console.log('Some error!!!');
                                }
                            });
                        } else if ((oldCamera.status !== $scope.camera.status) && oldCamera.status) {
                            STtasksDel.del({ taskID: $scope.camera.taskid }).$promise.then(
                                DBcameras.update({
                                    query: $scope.camera._id,
                                    newVal: {
                                        del_date: new Date()
                                    }
                                }).$promise
                                .then(data => {
                                    console.log('DBcameras.update data', data);
                                    if (data) { $scope.$emit('editCamera', true) }
                                })
                                .catch(err => { console.log('DBcameras err', err); })
                                //$scope.$emit('addedCamera', true)
                            ).catch(err => { console.log('STtasksDel err', err); })
                        }
                    })
                    .catch(err => { console.log('err', err); });
                //STtasksDel.del({ taskID: $scope.camera.taskid }).$promise.then($scope.$emit('addedCamera', true))
            }

            function addCamera(taskCreateBody) {
                console.log('$scope.camera.status', $scope.camera.status);
                if ($scope.camera.status) {
                    STtasksCreate.create(taskCreateBody).$promise.then(data => {
                        if (data && data.returnCode && data.returnCode === '0') {
                            $scope.camera.taskid = data.taskID;
                            DBcameras.create({ camera: $scope.camera }).$promise
                                .then($scope.$emit('addedCamera', true))
                                .catch(err => { console.log('err', err); });
                        } else if (data && data.returnCode && data.returnCode === '11151') {
                            console.log('Activate camera! Connect to the same WiFi');
                        } else if (data && data.returnCode && data.returnCode === '11001') {
                            console.log(`Insufficient resources to create the task
                        There’s no free video card to support the new task      
                        Check if the video channel was full`);
                        } else if (data && data.returnCode && data.returnCode === '0') {
                            console.log(data);
                        } else {
                            console.log('Some error!!!');
                        }
                    });
                } else {
                    DBcameras.create({ camera: $scope.camera }).$promise
                        .then($scope.$emit('addedCamera', true))
                        .catch(err => { console.log('err', err); });
                }
            };
        }
    ])
    .directive('addCamera', function() {
        return {
            templateUrl: 'views/directive/addCamera.html'
        };
    });