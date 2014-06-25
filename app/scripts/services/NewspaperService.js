angular.module('clientApp.NewspaperService', [])

    .factory("NewspaperService", function ($q, $http) {

        var baseNewspaperUrl = 'http://localhost/newspapers/';

        var factory = {

            Newspaper: function() {
                return {
                    id: 0,
                    publicationName: ""
                };
            },

            NewspaperList: function() {
                return [];
            },

            getNewspaper: function (newspaperId) {
                var d = $q.defer();
                $http.get(baseNewspaperUrl + newspaperId).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                   // $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            getAllNewspapers: function() {
                var d = $q.defer();
                $http.get(baseNewspaperUrl).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                   // $log.info('error: ' + data + status);
                    d.reject(data);
                });
                return d.promise;
            },

            saveNewspaper: function(newspaper) {
                var saveUrl = baseNewspaperUrl;
                var saveMethod = 'POST';

                if(newspaper.id && newspaper.id > 0) {
                    saveUrl +=  newspaper.id;
                    saveMethod = 'PUT';
                }
                var obj = JSON.stringify(ad);

                var d = $q.defer();
                $http({
                    method: saveMethod,
                    url: saveUrl,
                    data: JSON.stringify(newspaper)
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                   // $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            },

            deleteNewspaper: function(id) {
                var d = $q.defer();
                $http({
                    method: 'DELETE',
                    url: baseNewspaperUrl + id
                }).success(function (data) {
                    d.resolve(data);
                }).error(function (data, status) {
                 //   $log.info('error: ' + data);
                    d.reject(data);
                });
                return d.promise;
            }

        };
        return factory;


    });
