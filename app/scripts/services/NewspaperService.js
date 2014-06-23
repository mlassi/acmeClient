angular.module('clientApp.NewspaperService', [])

    .factory("NewspaperService", function ($q, $http, $log) {

        var baseNewspaperUrl = 'http://localhost/newspapers/';

        var factory = {

            Newspaper: function() {
                return {
                    id: 155,
                    publicationName: "New York Times"
                };
            },

            getNewspaper: function (newspaperId) {
                var d = $q.defer();
                $http.get(baseNewspaperUrl + newspaperId).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            getAllNewspapers: function() {
                var d = $q.defer();
                $http.get(baseNewspaperUrl).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                    $log.info('error: ' + data + status);
                    d.reject(data);
                });
                return d.promise;
            }

        };
        return factory;


    });
