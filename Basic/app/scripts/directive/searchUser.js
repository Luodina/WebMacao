'use strict';
angular.module('basic')
    .controller('SearchUserCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
        $scope.msg = 'searchUserCtrl';
        $scope.users = [];

        function getUsers() {
            $http.get('/api/user/all/').success(data => {
                //console.log('user', data);
                if (data && data.users) {
                    $scope.users = data.users;
                } else if (data && data.msg) {
                    $scope.$emit('noUser', data.msg);
                }
            });
        };
        getUsers();
        $scope.userEdit = user => {
            $scope.$emit('editUser', user);
        };
        $scope.userDelete = user => {
            $http.post('/api/user/del/', { id: user._id }).success(data => {
                //console.log('user has been deleted');
                getUsers();
            });
        }
    }])
    .directive('searchUser', function() {
        return {
            templateUrl: 'views/directive/searchUser.html'
        };
    });