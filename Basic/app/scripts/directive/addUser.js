'use strict';
angular.module('basic')
    .controller('AddUserCtrl', ['$rootScope', '$scope', '$http', 'md5', '$location',
        function($rootScope, $scope, $http, md5, $location) {
            $scope.addNewUser = () => {
                if ($scope.user.password !== undefined &&
                    $scope.user.status !== undefined &&
                    $scope.user.role !== undefined) {
                    $scope.user.password = md5.createHash($scope.user.password);
                    addNewUser($scope.user);
                }
            }

            function addNewUser(user) {
                $http.post('/api/user/add/', { user: user }).success(function(user) {
                    if (user) {
                        console.log('addUser successfully!', user);
                    }
                }).catch(err => { console.log('err', err) });
            }
            //get user data from setting
            $scope.$on('user', (el, data) => {
                console.log('data in AddUserCtrl', data)
                if (data !== {}) {
                    $scope.msg = 'Edit user';
                    $scope.user = data;
                } else {
                    $scope.msg = 'Add user';
                }
            });
        }
    ])
    .directive('addUser', function() {
        return {
            templateUrl: 'views/directive/addUser.html'
        };
    });