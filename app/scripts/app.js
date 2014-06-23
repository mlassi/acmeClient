'use strict';


var app = angular.module('clientApp', [
    'clientApp.controllers',
    'clientApp.AdsService',
    'clientApp.NewspaperService',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/ads.html',
            controller: 'AdsController'
        })
        .when('/editad/', {
            templateUrl: 'views/editAd.html',
            controller: 'AdsController'
        })
        .when('/editad/:adId', {
            templateUrl: 'views/editAd.html',
            controller: 'AdsController'
        })
        .when('/newspapers/', {
            templateUrl: 'views/newspapers.html',
            controller: 'NewspapersController'
        })
        .when('/editnewspaper/:newspaperId', {
            templateUrl: 'views/editNewspaper.html',
            controller: 'NewspapersController'
        })
        .otherwise({
            redirectTo: '/'
        });
});