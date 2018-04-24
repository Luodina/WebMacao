'use strict';
angular.module('basic')
    .controller('HistoryCtrl', ['$rootScope', '$scope',
        ($rootScope, $scope) => {
            let now = new Date();
            $scope.cameras = [{ name: '1' }, { name: '2' }, { name: '3' }]
            $scope.period = {
                start: now,
                finish: now
            };
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };
            $scope.setSelected = (name) => {
                $scope.selected = name;
            };

        }
    ]);