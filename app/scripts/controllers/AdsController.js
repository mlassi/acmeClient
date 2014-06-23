'use strict';

// .controller('AdsController', function ($scope, $http, $routeParams, AdModel, NewspaperModel, AdsService) {

// .controller('AdsController', ['$scope', '$http', '$routeParams', 'AdModel', 'AdsService', function ($scope, $http, $routeParams, AdModel, AdsService) {
//angular.module('clientApp.controllers', ['clientApp.services'])
angular.module('clientApp.controllers', [])

    .controller('AdsController', function ($scope, $http, $routeParams, AdsService, NewspaperService) {

        $scope.toJSON = function(obj) {
            return JSON.stringify(obj, null, 2);
        };

        $scope.ad = AdsService.Ad();
        //$scope.ad = {};
        $scope.adsList = [];
        $scope.newspaperList = [];
        $scope.newspaper = NewspaperService.Newspaper();

        $scope.getAd = function (id) {
            AdsService.getAd(id).then(function (d) {
                $scope.ad = d;
            })
        };

        $scope.getAllAds = function () {
            AdsService.getAllAds().then(function (returnedAds) {
                $scope.adsList = returnedAds;
            })
        };

        $scope.saveAd = function() {
            AdsService.saveAd($scope.ad).then(function (savedAd) {
                $scope.ad = savedAd;
            });
        };

        $scope.deleteAd = function(id) {
            AdsService.deleteAd(id).then(function (adId) {
                var a = adId;
            })
        };

        $scope.getAllNewspapers = function() {
            NewspaperService.getAllNewspapers().then(function(returnedNewspapers) {
                $scope.newspaperList = returnedNewspapers;
            })
        };

        $scope.publishAd = function(newspaper) {
            AdsService.publishAdToNewspaper($routeParams.adId, newspaper).then(function(returnedData) {
                var something = returnedData;
            })

        };

        if($routeParams.adId) {
            $scope.getAd($routeParams.adId);
        }

        // populate all the newspapers. This should be cached and we should obviously not populate it with all newspapers if there can be many newspapers.
        $scope.getAllNewspapers();

});