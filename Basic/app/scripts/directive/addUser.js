'use strict';
angular.module('basic')
    .controller('AddUserCtrl', ['$rootScope', '$scope', '$http', 'md5', '$location', 'Notification', '$filter',
        function($rootScope, $scope, $http, md5, $location, Notification, $filter) {
            $scope.roles = ['admin', 'user'];
            $scope.user = {};
            let isInputDataValid = () => {
                if (!($scope.user.name !== undefined)) {
                    Notification.error($filter('translate')('Field name can not be empty!'));
                    return false;
                };
                if ($scope.user.name.length > 100) {
                    Notification.error($filter('translate')('Only allow 100 Character for the Name!'));
                    return false;
                };
                if (!($scope.user.password !== undefined)) {
                    Notification.error($filter('translate')('Field password can not be empty!'));
                    return false;
                };
                if (($scope.user.role !== 'admin' && $scope.user.role !== 'user')) {
                    Notification.error($filter('translate')('Please, chose User role!'));
                    return false;
                };
                return true;
            };
            $scope.addNewUser = () => {
                if (isInputDataValid()) {
                    if ($scope.mode === 'add') { addNewUser($scope.user); }
                    if ($scope.mode === 'edit') { editNewUser($scope.user); }
                }
            }

            function editNewUser(user) {
                let dataUser = angular.copy(user);
                delete dataUser.password2;
                dataUser.password = md5.createHash(dataUser.password);
                let query = {
                    name: dataUser.name,
                    pass: dataUser.password
                };
                let newVal = {
                    // status: $scope.user.status,
                    role: $scope.user.role
                }
                $http.post('/api/user/edit/', { query: query, newVal: newVal }).success(function(user) {
                    if (user) {
                        Notification.success('User edited successfully!');
                        $scope.$emit('editCamera', true)
                    } else {
                        Notification.error('User hasnt been updated successfully!');
                    }
                }).catch(err => { console.log('err', err) });
            };

            function addNewUser(user) {
                let dataUser = angular.copy(user);
                delete dataUser.password2;
                dataUser.password = md5.createHash(dataUser.password);
                $http.post('/api/user/add/', { user: dataUser }).success(function(user) {
                    if (user) {
                        if (user.status) {
                            Notification.success('User added successfully!');
                            $scope.$emit('editCamera', true)
                        } else {
                            Notification.error(user.msg);
                            //Notification.error($filter('translate')(''));
                        }
                    }
                }).catch(err => { console.log('err', err) });
            };
            //get user data from setting
            $scope.$on('user', (el, data) => {
                if (Object.getOwnPropertyNames(data).length > 0) {
                    let user = angular.copy(data);
                    delete user.password;
                    $scope.msg = 'Edit user';
                    $scope.user = user;
                    $scope.mode = 'edit';
                } else {
                    $scope.msg = 'Add user';
                    $scope.mode = 'add';
                }
            });
        }
    ])
    .directive('addUser', function() {
        return {
            templateUrl: 'views/directive/addUser.html'
        };
    });