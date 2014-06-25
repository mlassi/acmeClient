angular.module('clientApp.NewspaperController', [])

    .controller('NewspapersController', function ($scope, $routeParams, NewspaperService) {

        $scope.newspaperList = [];
        $scope.newspaper = NewspaperService.Newspaper();

        $scope.getNewspaper = function (id) {
            NewspaperService.getNewspaper(id).then(function (d) {
                $scope.newspaper = d;
            })
        };

        $scope.saveNewspaper = function(newspaper) {
            NewspaperService.saveNewspaper(newspaper).then(function (savedNewspaper) {
                $scope.newspaper = savedNewspaper;
            });
        };

        $scope.deleteNewspaper = function(id) {
           NewspaperService.deleteNewspaper(id).then(function (newspaperId) {
                $scope.newspaper = null;
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