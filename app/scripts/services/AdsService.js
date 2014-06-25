angular.module('clientApp.AdsService', [])

    .factory("AdsService", function ($q, $http, $log) {

        var baseAdsUrl = 'http://localhost/ads/';

        var factory = {

            Ad: function() {
                return {
                    id:0,
                    title: "",
                    description: ""
                };
            },

            getAd: function (adId) {
                var d = $q.defer();
                $http.get(baseAdsUrl + adId).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            getAllAds: function() {
                var d = $q.defer();
                $http.get(baseAdsUrl).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            publishAdToNewspaper: function(adId, newspaper) {
                var d  = $q.defer();
                var news = JSON.stringify(newspaper);
                $http({
                    method: 'POST',
                    url: baseAdsUrl + adId + '/newspapers/newspaper',
                    data: news
                }).success(function (data, status) {
                    d.resolve(data);
                }).error(function (data) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            saveAd: function(ad) {
                var saveUrl = baseAdsUrl;
                var saveMethod = 'POST';

                if(ad.id && ad.id > 0) {
                    saveUrl +=  ad.id;
                    saveMethod = 'PUT';
                }
                var obj = JSON.stringify(ad);

                var d = $q.defer();
                $http({
                    method: saveMethod,
                    url: saveUrl,
                    data: JSON.stringify(ad)
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            deleteAd: function(id) {
                var d = $q.defer();
                $http({
                    method: 'DELETE',
                    url: baseAdsUrl + id
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            }


        };
        return factory;


    });