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
                controller: 'PeopleCtrl',
                resolve: {
                    // people: ['DBpeople',
                    //     function(DBpeople) {
                    //         return DBpeople.query({}).$promise;
                    //     }
                    // ]
                }
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
                            return STtasks.get({}).$promise
                                .then(function(data) {
                                    return data;
                                })
                                .catch(function(error) {
                                    return { resolveError: error };
                                })
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