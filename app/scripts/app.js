'use strict';


var app = angular.module('clientApp', [
    'clientApp.AdsController',
    'clientApp.NewspaperController',
    'clientApp.AdsService',
    'clientApp.NewspaperService',
    'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/ads.html',
            controller: 'AdsController'
        })
        .when('/editAd/', {
            templateUrl: 'views/editAd.html',
            controller: 'AdsController'
        })
        .when('/editAd/:adId', {
            templateUrl: 'views/editAd.html',
            controller: 'AdsController'
        })
        .when('/newspapers/', {
            templateUrl: 'views/newspapers.html',
            controller: 'NewspapersController'
        })
        .when('/editNewspaper/', {
            templateUrl: 'views/editNewspaper.html',
            controller: 'NewspapersController'
        })
        .when('/editNewspaper/:newspaperId', {
            templateUrl: 'views/editNewspaper.html',
            controller: 'NewspapersController'
        })
        .otherwise({
            redirectTo: '/'
        });
});