newFunction();

function newFunction() {
    'use strict';
    angular.module('basic')
        .controller('PeopleCtrl', ['GLOBAL', 'DBpeople', '$http', '$rootScope', '$scope', '$location', 'Upload', 'Notification', '$timeout', 'FileUploader', '$filter',
            (GLOBAL, DBpeople, $http, $rootScope, $scope, $location, Upload, Notification, $timeout, FileUploader, $filter) => {
                $scope.tab = '0';
                $scope.search = () => {
                    $scope.tab = '0';
                };
                $scope.add = (num) => {
                    $scope.tab = '1';
                };
                $scope.person = {};

                function getFileExtension(filename) {
                    if (filename) return filename
                        .split('.') // Split the string on every period
                        .slice(-1)[0]; // Get the last item from the split
                };
                let isInputDataValid = () => {
                    if (!($scope.person.personname !== undefined && $scope.person.personname !== null)) {
                        Notification.error($filter('translate')('Field name can not be empty!'));
                        return false;
                    };
                    if (!($scope.person.altname !== undefined && $scope.person.altname !== null)) {
                        Notification.error($filter('translate')('Field alternative name can not be empty!'));
                        return false;
                    };
                    if (!['f', 'm', '男', '女'].includes($scope.person.sex)) {
                        Notification.error($filter('translate')("Input value should be: 'f', 'm', '男', '女'!"));
                        return false;
                    };
                    if (!($scope.person.nationality !== undefined && $scope.person.nationality !== null)) {
                        Notification.error($filter('translate')('Field nationality can not be empty!'));
                        return false;
                    };
                    if (!($scope.person.remarks !== undefined && $scope.person.remarks !== null)) {
                        Notification.error($filter('translate')('Field remarks can not be empty!!'));
                        return false;
                    };
                    let fileExt = '';
                    if ($scope.file) fileExt = getFileExtension($scope.file.name);
                    if (!(fileExt === 'png' || fileExt === 'jpeg' || fileExt === 'jpg')) {
                        Notification.error($filter('translate')('Choose image file: png or jpegor jpg!'));
                        return false;
                    }
                    return true;
                };
                $scope.save = () => {
                    if (isInputDataValid()) {
                        $scope.uploadFile();
                    }
                };
                $scope.uploadFile = () => {
                    let fd = new FormData();
                    fd.append('imageDatas', $scope.file);
                    let uploadUrl = '/api/st/verify/face/synAdd?dbName=' + GLOBAL.STDBname;
                    let $promise = $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    });
                    $promise
                        .then(data => {
                            //console.log('upload data', data);
                            if (data.data && data.data.fail && data.data.success.length !== 0) {
                                //console.log('data.success', data.data.success);
                                return data.data.success;
                            } else {
                                console.log('data.fail', data.data.fail);
                                //return $q.reject(response); // convert into a rejection
                            }
                        })
                        .then(res => {
                            if (res) {
                                let dbData = Object.assign($scope.person, res[0]);
                                DBpeople.create({ data: dbData }).$promise
                                    .then(response => {
                                        $scope.tab = '0';
                                        return response;
                                    })
                                    .catch(err => { console.log('err', err); });
                            }
                        })
                        .then(res => {
                            console.log('res', res);
                        })
                        .catch(err => { console.log('err in xxx', err); });
                };
            }
        ]);
}