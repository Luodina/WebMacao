'use strict';
angular.module('basic')
    .controller('RtmCtrl', ['createApp', '$rootScope', '$scope', '$filter', 'fromdbFace', 'rtmFace',
        (createApp, $rootScope, $scope, $filter, fromdbFace, rtmFace) => {
            $scope.rtm = {};
            $scope.fromdb = [];
            let handleSuccess = function(data) {
                let fromdb = data.dbList;
                if (fromdb) {
                    fromdb.forEach(function(item) {
                        $scope.fromdb.push(item);
                    }, this);
                }
            };
            let handleSuccessrtmFace = function(data) {
                if (data.rtm) {
                    $scope.rtm = data.rtm;
                }
            };
            fromdbFace.get({}, function(res) {
                handleSuccess(res);
            });
            rtmFace.get({}, function(res) {
                handleSuccessrtmFace(res);
            });
        }
    ]);