'use strict';
angular.module('basic')
    .controller('RtmCtrl', ['$rootScope', '$scope', '$filter', 'fromdbFace', 'rtmFace', 'socket',
        ($rootScope, $scope, $filter, fromdbFace, rtmFace, socket) => {
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

            // other clients will listen to new events here 
            socket.on('connect', function(data) {
                console.log(data);
                // push the data.comments to your $scope.comments    
            });

            socket.on('send:name', function(data) {
                $scope.name = data.name;
                console.log("Here we are?", data.name);
            });
        }
    ]);