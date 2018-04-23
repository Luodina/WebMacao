'use strict';
angular.module('basic.services', ['ui.bootstrap'])
    .service('loginModel', ['$uibModal', function($uibModal) {
        this.open = () => {
            return $uibModal.open({
                backdrop: 'static',
                templateUrl: 'views/layer/loginModel.html',
                size: 'size',
                controller: ['$rootScope', '$location', '$scope', '$filter', '$uibModalInstance', 'ipCookie', '$http', '$cookies', 'md5',
                    ($rootScope, $location, $scope, $filter, $uibModalInstance, ipCookie, $http, $cookies, md5) => {
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
                            console.log('removing cookie...');
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
                            e.keyCode === 13;
                        };
                        $scope.login = () => {
                            console.log('LOGIN :', $scope.usermessage.password);
                            if ($scope.usermessage.password !== undefined) {
                                $scope.usermessage.password = md5.createHash($scope.usermessage.password);
                                $rootScope.login($scope.usermessage.username, $scope.usermessage.password);
                            }
                        };
                        $rootScope.login = (username, password) => {
                            $http.post('/api/user/login/', { username, password }).success(function(user) {
                                $rootScope.error_name = false;
                                if (user.status) {
                                    $cookies.put('username', username);
                                    $cookies.put('aura_token', user.token);
                                    $uibModalInstance.dismiss();
                                    $rootScope.iflogin = true;
                                    $rootScope.username = $cookies.get('username');
                                    $location.path('/rtm');
                                } else {
                                    $rootScope.error_name = true;
                                    console.log('LOGIN FAILED!please, use login name:ocai and pass:123456');
                                }
                            });
                        };

                        $scope.cancel = function() {
                            $uibModalInstance.dismiss();
                        };
                    }
                ]
            }).result;
        };
    }]);