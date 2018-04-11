'use strict';
/**
 * Resource file for en g18n
 */
angular.module('basic').config(['$translateProvider', function($translateProvider) {
    $translateProvider.translations('zh', {
        'web_common_000': 'Real Time Monitoring',
        'web_common_001': 'All Cameras'
    });
}]);