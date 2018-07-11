'use strict';
angular.module('basic')
    .controller('PeopleCtrl', ['GLOBAL', 'DBpeople', '$http', '$rootScope', '$scope', '$location', 'Upload', 'Notification', '$timeout', 'FileUploader', '$filter', '$q',
        (GLOBAL, DBpeople, $http, $rootScope, $scope, $location, Upload, Notification, $timeout, FileUploader, $filter, $q) => {
            //console.log("GLOBAL in ppl:", GLOBAL);
            $scope.role = GLOBAL.role;
            let isInputDataValid = () => {
                if (!($scope.person.personname !== undefined && $scope.person.personname !== null)) {
                    Notification.error($filter('translate')('Field name can not be empty!'));
                    return false;
                };
                if ($scope.person.personname.length > 100) {
                    Notification.error($filter('translate')('Only allow 100 Character for the Name!'));
                    return false;
                };
                if (!($scope.person.altname !== undefined && $scope.person.altname !== null)) {
                    Notification.error($filter('translate')('Field alternative name can not be empty!'));
                    return false;
                };
                if (!['F', 'M', 'f', 'm', '男', '女'].includes($scope.person.sex)) {
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
                if ($scope.file && $scope.person.image) {
                    fileExt = getFileExtension($scope.file.name);
                    if (!(fileExt === 'png' || fileExt === 'jpeg' || fileExt === 'jpg' || fileExt === 'PNG' || fileExt === 'JPEG' || fileExt === 'JPG' || $scope.mode === 'edit')) {
                        Notification.error($filter('translate')('Choose image file: png or jpeg or jpg!'));
                        return false;
                    }
                } else {
                    Notification.error($filter('translate')('Choose image file: png or jpeg or jpg!'));
                    return false;
                }
                return true;
            };
            $scope.curPage = 1;
            $scope.search = curPage => {
                $scope.curPage = curPage || 1;
                $scope.tab = '0';
                //console.log('here we are $scope.curPage', $scope.curPage);
                DBpeople.get({ page: $scope.curPage }).$promise
                    .then(response => {
                        //console.log('response', response);
                        if (response) {
                            $scope.pages = response.pages;
                            $scope.people = response.msg;
                        }
                    })
                    .catch(err => { console.log('err in DBpeople.get', err); });
            };
            $scope.add = () => {
                $scope.mode = 'new';
                $scope.tab = '1';
                $scope.person = {};
                $scope.person.imageShow = "./../images/upload-md.png";
            };
            $scope.delete = item => {
                let uploadUrl = '/api/st/verify/face/deletes?dbName=' + GLOBAL.CONFIG.STDBname + '&imageId=' + item.imageId;
                let $promise = $http.post(uploadUrl);
                $promise.then(data => {
                        if (data && data.data && data.data.result === 'success') {
                            return DBpeople.del({ id: item._id }).$promise;
                        } else {
                            return { status: 'error', msg: data.data.fail };
                        }
                    })
                    .then(res => {
                        if (res && res.status === 'error') {
                            Notification.error('Error:!', res.msg);
                        } else {
                            $scope.person = {};
                            $scope.search();
                        }
                    })
                    .catch(err => {
                        Notification.error('Error:!', err);
                        //console.log('err in delete', err); 
                    });
            };
            $scope.edit = item => {
                //console.log('item', item.image);
                $scope.mode = 'edit';
                $scope.person = item;
                $scope.oldPerson = angular.copy(item);
                $scope.person.imageShow = item.image; //'data:image/jpeg;base64,' + item.image;
                $scope.tab = '1';
            };
            $scope.save = () => {
                if (isInputDataValid()) {
                    if ($scope.mode === 'new') { saveNew(); }
                    if ($scope.mode === 'edit') { saveEdited(); }
                }
            };
            $scope.previewFile = () => {
                if ($scope.file) {
                    readBase64($scope.file).then(function(data) {
                        $scope.person.imageShow = data;
                        $scope.person.image = data;
                        //console.log('data', data);
                    });
                }
            };
            $scope.person = {};
            $scope.search($scope.curPage);

            function readBase64(file) {
                var reader = new FileReader();
                var future = $q.defer();
                reader.addEventListener("load", function() {
                    future.resolve(reader.result);
                }, false);
                reader.readAsDataURL(file);
                return future.promise;
            };

            function getFileExtension(filename) {
                if (filename) return filename
                    .split('.') // Split the string on every period
                    .slice(-1)[0]; // Get the last item from the split
            };

            function updateSTImages() {
                let url = '/api/st/verify/face/deletes?dbName=' + GLOBAL.CONFIG.STDBname + '&imageId=' + $scope.oldPerson.imageId;
                let $promise = $http.post(url);
                return $promise.then(delRes => {
                        if (delRes && delRes.data && delRes.data.result === 'success') {
                            let fd = new FormData();
                            fd.append('imageDatas', $scope.file);
                            url = '/api/st/verify/face/synAdd?dbName=' + GLOBAL.CONFIG.STDBname;
                            return $http.post(url, fd, {
                                transformRequest: angular.identity,
                                headers: { 'Content-Type': undefined }
                            });
                        } else { return { status: 'error', msg: data.data.fail } }
                    })
                    .catch(err => {
                        Notification.error('Error:!', err);
                        //console.log('err in upload new pic to ST', err);
                    });
            }

            function saveEdited() {
                //let isSTNeedsUpdates = $scope.oldPerson.image !== $scope.person.image;
                Promise.resolve()
                    .then(() => {
                        if ($scope.oldPerson.image !== $scope.person.image) {
                            return updateSTImages();
                        } else {
                            return {};
                        }
                    })
                    .then(data => {
                        if (data && data.data && data.data.success) {
                            let newVal = Object.assign({
                                altname: $scope.person.altname,
                                personname: $scope.person.personname,
                                remarks: $scope.person.remarks,
                                sex: $scope.person.sex,
                                nationality: $scope.person.nationality,
                                image: $scope.person.image
                            }, data.data.success[0]);
                            let now = new Date();
                            newVal.update_dt = now;
                            delete newVal.file;
                            delete newVal._id;
                            delete newVal.create_dt;
                            delete newVal.imageShow;
                            return DBpeople.update({
                                query: $scope.person._id,
                                newVal: newVal
                            }).$promise;
                        }
                    }).then(res => {
                        if (res && res.status === 'error') {
                            Notification.error('Error:!', res.msg);
                        } else {
                            $scope.person = {};
                            $scope.search();
                        }
                    }).catch(err => {
                        Notification.error('Error:!', err);
                        //console.log("saveEdited err =============>", err)
                    })
            }

            function saveNew() {
                let fd = new FormData();
                fd.append('imageDatas', $scope.file);
                let uploadUrl = '/api/st/verify/face/synAdd?dbName=' + GLOBAL.CONFIG.STDBname;
                let $promise = $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
                $promise.then(data => {
                        if (data && data.data && data.data.success) {
                            let res = data.data.success;
                            //console.log('res', res);
                            if (res) {
                                let dbData = Object.assign($scope.person, res[0]);
                                let now = new Date();
                                dbData.create_dt = now;
                                delete dbData.imageShow;
                                return DBpeople.create({ data: dbData }).$promise
                            }
                        } else { return { status: 'error', msg: data.data.fail } }
                    })
                    .then(res => {
                        if (res && res.status === 'error') {
                            //console.log('Error:!', res.msg);
                            Notification.error('Error:!', res.msg);
                        } else {
                            $scope.person = {};
                            $scope.search();
                        }
                    })
                    .catch(err => {
                        //console.log('err in saveNew', err);
                        Notification.error('Error:!', err);
                    });
            };
        }
    ]);