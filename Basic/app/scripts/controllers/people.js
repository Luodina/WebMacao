newFunction();

function newFunction() {
    'use strict';
    angular.module('basic')
        .controller('PeopleCtrl', ['$rootScope', '$scope', '$location',
            ($rootScope, $scope, $location) => {

            }
        ]);
}