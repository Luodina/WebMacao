'use strict';
angular.module('basic.routers', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        let states = [{
                name: 'index',
                url: '/',
                templateUrl: 'views/login.html',
                controller: 'HomeCtrl'
            },
            {
                name: 'rtm',
                url: '/rtm',
                templateUrl: 'views/rtm/rtm.html',
                controller: 'RtmCtrl'
            },
            {
                name: 'people',
                url: '/people',
                templateUrl: 'views/people.html',
                controller: 'PeopleCtrl'
            },
            {
                name: 'history',
                url: '/history',
                templateUrl: 'views/history.html',
                controller: 'HistoryCtrl'
            },
            {
                name: 'setting',
                url: '/setting',
                templateUrl: 'views/setting.html',
                controller: 'SettingCtrl',
                resolve: {
                    tasks: ['STtasks',
                        function(STtasks) {
                            return STtasks.get({}).$promise;
                        }
                    ],
                    cameras: ['DBcameras',
                        function(DBcameras) {
                            return DBcameras.query({}).$promise;
                        }
                    ]
                }
            },
            {
                name: 'person',
                url: '/people/{person}',
                templateUrl: 'views/person.html',
                controller: 'PersonCtrl'
            }
        ];
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    });