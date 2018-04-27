'use strict';
angular
    .module('basic', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate',
        'ngFileUpload',
        'isteven-multi-select',
        'dndLists',
        'ui.bootstrap',
        'ui-notification',
        'angularSpinner',
        'ngCookies',
        'ui.select',
        'toggle-switch',
        'cfp.hotkeys',
        'ui.bootstrap.datetimepicker',
        'angularMoment',
        'chart.js',
        'ui.router',
        'basic.routers',
        'basic.resource',
        'basic.services',
        'ui.router.state.events',
        'angularFileUpload',
        'hc.marked',
        'smart-table',
        'angular-md5',
        'ipCookie'
    ])
    .constant('GLOBAL', {
        host_user: './api/user',
        host_people: './api/people',
        STserver: './api/st',
        db: './api/db',
        STDBname: 'Web_test',
        STresURL: '10.254.0.116:3000',
        STDBscore: '0.5'
    })
    .config(['$translateProvider', '$windowProvider', function($translateProvider, $windowProvider) {
        let window = $windowProvider.$get();
        //let lang = window.navigator.userLanguage || window.navigator.language;
        let lang = 'zh';
        if (lang) {
            lang = lang.substr(0, 2);
            $translateProvider.preferredLanguage(lang);
        }
    }])
    .config(['NotificationProvider', 'usSpinnerConfigProvider', 'ChartJsProvider', function(NotificationProvider, usSpinnerConfigProvider, ChartJsProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });
        usSpinnerConfigProvider.setDefaults({ color: 'orange', radius: 0 });
        ChartJsProvider.setOptions({
            chartColors: ['#4da9ff', '#79d2a6', '#ff9900', '#ff704d', '#669999', '#4d0000']
        });
    }])
    .run(['$rootScope', '$location', '$cookies', function($rootScope, $location, $cookies) {
        $rootScope.showTitle = true;
        $rootScope.$on('$stateChangeStart', function(toState) {
            $rootScope.active = toState.name;
            $rootScope.username = $cookies.get('username');
        });
        $rootScope.logout = () => {
            $location.path('/');
        };
        $rootScope.getUsername = () => {
            return $cookies.get('username');
        };
    }])
    // .run(function($state) {
    //     $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    //         event.preventDefault();
    //         $state.go('error');
    //         console.log('Here we are!')
    //     });
    // });