'use strict';
angular.module('basic')
    .controller('HistoryCtrl', ['$rootScope', '$scope',
        ($rootScope, $scope) => {
            console.log("At history!")
        }
    ]);