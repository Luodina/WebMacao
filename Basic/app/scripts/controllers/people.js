'use strict';
angular.module('basic')
    .controller('PeopleCtrl', ['GLOBAL', 'DBpeople', '$http', '$rootScope', '$scope', '$location', 'Upload', 'Notification', '$timeout', 'FileUploader', '$filter',
        (GLOBAL, DBpeople, $http, $rootScope, $scope, $location, Upload, Notification, $timeout, FileUploader, $filter) => {
            $scope.STImage = "https://sanrio-production-weblinc.netdna-ssl.com/media/W1siZiIsIjIwMTYvMDYvMTQvMjAvNDgvMzQvMTM3L2NocmFjdGVyX2hlbGxvX2tpdHR5LmpwZyJdXQ/chracter-hello-kitty.jpg?sha=f5e7c272d3fc6e78";
            $scope.search = () => {
                $scope.tab = '0';
                DBpeople.get({}).$promise
                    .then(response => {
                        console.log('response', response);
                        $scope.people = response.docs;
                    })
                    .catch(err => { console.log('err', err); });
            };
            $scope.add = (num) => {
                $scope.tab = '1';
                // let uploadUrl = '/api/st/verify/face/gets?dbName=' + GLOBAL.STDBname + '&imageId=' + item.imageId;
                // $http.post(uploadUrl).then(data => {
                //     console.log('upload data', data);
                //     $scope.search();
                // }).catch(err => { console.log('err in delete', err); });
            };
            $scope.delete = (item) => {
                let uploadUrl = '/api/st/verify/face/deletes?dbName=' + GLOBAL.STDBname + '&imageId=' + item.imageId;
                let $promise = $http.post(uploadUrl);
                $promise.then(data => {
                        console.log('upload data', data);
                        return true;
                    }).then(data => {
                        DBpeople.del({ id: item._id }).$promise
                            .then(response => {
                                console.log('response DBpeople', response);
                                $scope.search();
                                return response;
                                //$scope.people = response.docs;
                                // $timeout(() => {
                                //     Notification.success($filter('translate')('Deleted successfully!'));
                                //     //$scope.search();
                                // }, 1000);
                            })
                            .catch(err => { console.log('err', err); });
                    })
                    .catch(err => { console.log('err in delete', err); });
            };
            $scope.edit = (item) => {
                console.log('item', item);
                $scope.person = item;
                $scope.STImage = "http://10.232.1.49:80/verify/face/gets?imageId=" + item.imageId;
                console.log('$scope.STImage', $scope.STImage);
                $scope.tab = '1';
                // let uploadUrl = '/api/st/verify/face/gets?dbName=' + GLOBAL.STDBname + '&imageId=' + item.imageId;
                // $http.post(uploadUrl).then(data => {
                //     console.log('upload data', data);
                //     $scope.search();
                // }).catch(err => { console.log('err in delete', err); });
            };
            $scope.person = {};
            $scope.search();

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
                            Notification.error($filter('translate')(data.data.fail[0].errReason));
                            //return $q.reject(response); // convert into a rejection
                        }
                    })
                    .then(res => {
                        if (res) {
                            console.log('res', res);
                            let dbData = Object.assign($scope.person, res[0]);
                            let now = new Date();
                            dbData.create_dt = now;
                            DBpeople.create({ data: dbData }).$promise
                                .then(response => {
                                    //$scope.tab = '0';
                                    $scope.search();
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