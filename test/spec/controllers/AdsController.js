
'use strict';

describe('Controller: AdsController', function () {

 //   it('should do something', function() {
 //      expect(1).toBe(1);
 //   });

    // load the controller's module
    beforeEach(module('clientApp', 'clientApp.MyController', 'ngRoute'));

    var MainCtrl,
       scope,
       route,
        rootScope;

    beforeEach(inject(
        function(_$rootScope_, $controller, _$routeParams_ ) {
            //location = _$location_;
            //route = _$route_;
            rootScope = _$rootScope_;
            scope = rootScope.$new();
          //  route = jasmine.createSpy();
            route = _$routeParams_;
            MainCtrl = $controller('MyController', { $scope : scope, $routeParams: route });
        }));


    // Initialize the controller and a mock scope
//    beforeEach(inject(function ($controller, $rootScope) {
//        scope = $rootScope.$new();
//        MainCtrl = $controller('AdsController', {
//            $scope: scope
//        });
//    }));

    it('i a test', function() {
        expect(scope.myStuff).toBe("foo");
    });

    it('is a test', function() {

    });

   // it('should have an ads object', function () {
   //     expect(scope.ad).toBeDefined();
   // });
});


