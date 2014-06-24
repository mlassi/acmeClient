angular.module('clientApp.NewspaperController', [])

    .controller('NewspapersController', function ($scope, $http, $routeParams, NewspaperService) {

        $scope.newspaperList = [];
        $scope.newspaper = NewspaperService.Newspaper();

        $scope.getNewspaper = function (id) {
            NewspaperService.getNewspaper(id).then(function (d) {
                $scope.newspaper = d;
            })
        };

        $scope.saveNewspaper = function() {
            NewspaperService.saveNewspaper($scope.newspaper).then(function (savedNewspaper) {
                $scope.newspaper = savedNewspaper;
            });
        };

        $scope.deleteNewspaper = function(id) {
           NewspaperService.deleteNewspaper(id).then(function (newspaperId) {
                var a = newspaperId;
            })
        };

        $scope.getAllNewspapers = function() {
            NewspaperService.getAllNewspapers().then(function(returnedNewspapers) {
                $scope.newspaperList = returnedNewspapers;
            })
        };

        if($routeParams.newspaperId) {
            $scope.getNewspaper($routeParams.newspaperId);
        }

    });