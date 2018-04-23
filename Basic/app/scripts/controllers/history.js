'use strict';
angular.module('basic')
    .controller('HistoryCtrl', ['$rootScope', '$scope',
        ($rootScope, $scope) => {
            console.log("At history!")
                // grab today and inject into field
            $scope.today = function() {
                $scope.dt = new Date();
            };

            // run today() function
            $scope.today();

            // setup clear
            $scope.clear = function() {
                $scope.dt = null;
            };

            // open min-cal
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            // handle formats
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

            // assign custom format
            $scope.format = $scope.formats[0];

        }
    ]);