/**
 * Created by magnuslassi on 6/25/14.
 */
// Code goes here
var app = angular.module("myApp", []);

app.factory('dataSvc', function($http, $q){
    var basePath="api/books";
    getAllBooks = function(){
        var deferred = $q.defer();
        $http.get(basePath).success(function(data){
            deferred.resolve(data);
        }).error(function(err){
            deferred.reject("service failed!");
        });
        return deferred.promise;
    };

    return{
        getAllBooks:getAllBooks
    };
});

app.controller('HomeController', function($scope, $window, dataSvc){
    function initialize(){
        dataSvc.getAllBooks().then(function(data){
            $scope.books = data;
        }, function(msg){
            $window.alert(msg);
        });
    }

    initialize();
});