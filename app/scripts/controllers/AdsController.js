'use strict';

angular.module('clientApp.AdsController', [])
     .controller('AdsController', function ($scope, $routeParams, AdsService, NewspaperService) {


        $scope.ad = AdsService.Ad();
        $scope.adsList = AdsService.AdsList();
        $scope.newspaperList = NewspaperService.NewspaperList();
        $scope.newspaper = NewspaperService.Newspaper();
        $scope.selectedNewspaper = {"id":2,"publicationName":"New York"};
        $scope.errorMessage = null;

        $scope.getAd = function (id) {
            AdsService.getAd(id).then(function (d) {
                $scope.ad = d;
            }, function (error) {
                $scope.errorMessage = error;
            })
        };

        $scope.getAllAds = function () {
            AdsService.getAllAds().then(function (returnedAds) {
                $scope.adsList = returnedAds;
            }, function(error){
                $scope.errorMessage = error;
            })
        };

        $scope.saveAd = function(ad) {
            AdsService.saveAd(ad).then(function (savedAd) {
                $scope.ad = savedAd;
            }, function (error) {
                $scope.errorMessage = error;
            })
        };

        $scope.deleteAd = function(id) {
            AdsService.deleteAd(id).then(function (adId) {
                $scope.ad = null;
                $scope.getAllAds();
            },  function (error) {
                $scope.errorMessage = error;
            })
        };

        $scope.getAllNewspapers = function() {
            NewspaperService.getAllNewspapers().then(function(returnedNewspapers) {
                $scope.newspaperList = returnedNewspapers;
            },  function (error) {
                $scope.errorMessage = error;
            })
        };

        $scope.publishAd = function(adId, newspaperId) {
            var foundNewspaper =  _.findWhere($scope.newspaperList, {id: newspaperId});

            if(!foundNewspaper) { $scope.errorMessage = "Could not find the selected news paper with id " + newspaperId}

            AdsService.publishAdToNewspaper(adId, foundNewspaper)
                .then(function(returnedData) {
                    $scope.getAd(adId);
                }
            ,  function (error) {
                $scope.errorMessage = error;
                return;
            });

        };

        if($routeParams.adId) {
            $scope.getAd($routeParams.adId);
        }

        // populate all the newspapers. This should be cached and we should obviously not
        // populate it with all newspapers if there can be many newspapers.
        $scope.getAllNewspapers();

});
   // }]);