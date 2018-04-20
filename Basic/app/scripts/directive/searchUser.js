'use strict';
angular.module('basic')
    .controller('SearchUserCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
        $scope.msg = 'searchUserCtrl';
        $scope.users = [];

        function getUsers() {
            $http.get('/api/user/all/').success(data => {
                $scope.users = data.users;
            });
        };
        getUsers();
        $scope.userEdit = user => {
            $scope.$emit('editUser', user);
        };
    }])
    .directive('searchUser', function() {
        return {
            templateUrl: 'views/directive/searchUser.html'
        };
    });