'use strict';

// .controller('AdsController', function ($scope, $http, $routeParams, AdModel, NewspaperModel, AdsService) {

// .controller('AdsController', ['$scope', '$http', '$routeParams', 'AdModel', 'AdsService', function ($scope, $http, $routeParams, AdModel, AdsService) {
//angular.module('clientApp.controllers', ['clientApp.services'])
//     .controller('AdsController', ['$scope', '$routeParams', 'AdsService, NewspaperService', function ($scope, $routeParams, AdsService, NewspaperService) {

angular.module('clientApp.AdsController', [])
     .controller('AdsController', function ($scope, $routeParams, AdsService, NewspaperService) {


        $scope.ad = AdsService.Ad();
        $scope.adsList = AdsService.AdsList();
        $scope.newspaperList = NewspaperService.NewspaperList();
        $scope.newspaper = NewspaperService.Newspaper();
        $scope.errorMessage = null;

        $scope.getAd = function (id) {
            AdsService.getAd(id).then(function (d) {
                $scope.ad = d;
            }, function (error) {
                $scope.ad = null;
                $scope.errorMessage = error;
            })
        };

        $scope.getAllAds = function () {
            AdsService.getAllAds().then(function (returnedAds) {
                $scope.adsList = returnedAds;
            }, function(error){
                $scope.adsList = null;
                $scope.errorMessage = error;
            })
        };

        $scope.saveAd = function(ad) {
            AdsService.saveAd(ad).then(function (savedAd) {
                $scope.ad = savedAd;
            }, function (error) {
                $scope.ad = null;
                $scope.errorMessage = error;
            })
        };

        $scope.deleteAd = function(id) {
            AdsService.deleteAd(id).then(function (adId) {
            },  function (error) {
                $scope.ad = null;
                $scope.errorMessage = error;
            })
        };

        $scope.getAllNewspapers = function() {
            NewspaperService.getAllNewspapers().then(function(returnedNewspapers) {
                $scope.newspaperList = returnedNewspapers;
            },  function (error) {
                $scope.ad = null;
                $scope.errorMessage = error;
            })
        };

        $scope.publishAd = function(newspaper) {
            AdsService.publishAdToNewspaper($routeParams.adId, newspaper).then(function(returnedData) {
            },  function (error) {
                $scope.ad = null;
                $scope.errorMessage = error;
            })

        };

        if($routeParams.adId) {
            $scope.getAd($routeParams.adId);
        }

        // populate all the newspapers. This should be cached and we should obviously not populate it with all newspapers if there can be many newspapers.
        $scope.getAllNewspapers();

});
   // }]);