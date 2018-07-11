'use strict';
angular.module('basic.services', ['ui.bootstrap'])
    .service('loginModel', ['$uibModal', function($uibModal) {
        this.open = () => {
            return $uibModal.open({
                backdrop: 'static',
                templateUrl: 'views/layer/loginModel.html',
                size: 'size',
                controller: ['$rootScope', '$location', '$scope', '$filter', '$uibModalInstance', 'ipCookie', '$http', '$cookies', 'md5', 'GLOBAL',
                    ($rootScope, $location, $scope, $filter, $uibModalInstance, ipCookie, $http, $cookies, md5, GLOBAL) => {
                        $scope.expires = 7;
                        $scope.expirationUnit = 'days';

                        let setMessage = function(message, messageStyle) {
                            $scope.message = message ? message : null;
                            $scope.messageStyle = messageStyle ? messageStyle : 'success';
                        };
                        $scope.saveCookie = function() {
                            setMessage();
                            $scope.messageStyle = 'success';
                            // key, value, options
                            console.log('saving cookie...');
                            ipCookie('username', $scope.usermessage.username, {
                                expires: $scope.expires,
                                expirationUnit: $scope.expirationUnit
                            });
                            ipCookie('userpass', $scope.usermessage.password, {
                                expires: $scope.expires,
                                expirationUnit: $scope.expirationUnit
                            });
                            console.log('new cookie value...');
                            console.log(ipCookie('username'));
                            console.log(ipCookie('userpass'));
                            setMessage('Cookie created. Use your browser cookie display to verify content or expiry.');
                        };
                        $scope.deleteCookie = function() {
                            setMessage();
                            //console.log('removing cookie...');
                            ipCookie.remove('username');
                            ipCookie.remove('userpass');
                            if (ipCookie() === undefined) {
                                setMessage('Successfully deleted cookie.');
                            } else {
                                setMessage('Unable to delete cookie.', 'danger');
                            }
                        };
                        $scope.username = $filter('translate')('web_common_010');
                        $scope.password = $filter('translate')('web_common_011');
                        $scope.signin = $filter('translate')('web_common_012');
                        $scope.isForget = false;

                        $scope.enterLogin = (e) => {
                            e.keyCode = 13;
                        };

                        function login(username, pass) {
                            //console.log('login user');
                            let password = md5.createHash(pass);
                            $http.post('/api/user/login', { username, password })
                                .success(user => {
                                    //console.log('login user', user);
                                    $rootScope.error_name = false;
                                    if (user.status) {
                                        $cookies.put('username', username);
                                        $cookies.put('token', user.token);
                                        $uibModalInstance.dismiss();
                                        GLOBAL.role = user.role;
                                        $rootScope.iflogin = true;
                                        $rootScope.username = $cookies.get('username');
                                        $location.path('/rtm');
                                    } else {
                                        $rootScope.error_name = true;
                                        $scope.msg = user.msg;
                                        //console.log('LOGIN FAILED!');
                                    }
                                });
                        }
                        $scope.login = () => {
                            //console.log('LOGIN arrived!');
                            if ($scope.usermessage.username !== undefined && $scope.usermessage.password !== undefined) {
                                //console.log($scope.usermessage.username, $scope.usermessage.password);
                                login($scope.usermessage.username, $scope.usermessage.password);
                            }
                        };
                        $scope.cancel = function() {
                            $uibModalInstance.dismiss();
                        };
                    }
                ]
            }).result;
        };
    }]);