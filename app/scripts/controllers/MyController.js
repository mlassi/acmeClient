'use strict';

angular.module('clientApp.MyController', [])
    .controller('MyController', ['$scope', '$routeParams', function ($scope, $routeParams) {

        $scope.myStuff = "foo";

    }]);