newFunction();

function newFunction() {
    'use strict';
    angular.module('basic')
        .controller('PeopleCtrl', ['$rootScope', '$scope', '$location', 'Upload', 'Notification', '$timeout', 'FileUploader', '$filter',
            ($rootScope, $scope, $location, Upload, Notification, $timeout, FileUploader, $filter) => {
                $scope.tab = '0';
                $scope.search = function() {
                    $scope.tab = '0';
                };
                $scope.add = function(num) {
                    $scope.tab = '1';
                };
                // let uploader = $rootScope.uploader = new FileUploader({
                //     url: 'upload.php',
                //     queueLimit: 1,
                //     removeAfterUpload: true
                // });
                // $rootScope.clearItems = () => {
                //     uploader.clearQueue();
                // };

                function getFileExtension(filename) {
                    return filename
                        .split('.') // Split the string on every period
                        .slice(-1)[0]; // Get the last item from the split
                }

                function getFileName(filename) {
                    return filename.replace('.' + getFileExtension(filename), ''); // Get the first item from the split
                }
                $scope.upload = () => {

                    if ($scope.file) {
                        console.log($scope.file);
                        document.getElementById('fileUpload').style.background = '#f4f4f4';
                        document.getElementById('fileUpload').style.color = '#999';
                        document.getElementById('fileUpload').style.border = 'solid 1px #999';
                        let fileExt = getFileExtension($scope.file.name);
                        if (fileExt === 'png' || fileExt === 'jpeg' || fileExt === 'jpg') {

                            $scope.uploadFile($scope.file);
                        } else {
                            Notification.error($filter('translate')('Choose image file!'));
                        }
                    }
                };
                $scope.uploadFile = file => {
                    console.log('uploadFile!');
                    Upload.upload({ url: '/api/people/upload', data: { file: file } })
                        .then(data => {
                            console.log(data);
                            $timeout(() => {
                                Notification.success($filter('translate')('web_common_explore_013'));
                            }, 1000);
                        }).catch(err => {
                            Notification.success($filter('translate')(err));
                        });
                };
            }
        ]);
}