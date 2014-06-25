//
//'use strict';
//
//describe('Controller: AdsController', function () {
//
//    // load the controller's module
//   // beforeEach(module('clientApp', 'clientApp.MyController', 'ngRoute'));
//
//
//    /*
//    beforeEach(module(function($provide) {
//        var adsService = {
//            getAllAds: function() {
//                return [
//                    {id: 1,
//                        "title": "first title",
//                        "description": "first description"
//                    }];
//            }
//        };
//        $provide.value("AdsService", adsService);
//    }));
//*/
//    var MainCtrl,
//       scope,
//       route,
//        rootScope,
//        $provide,
//        service;
//
//    beforeEach(function() {
//       module('clientApp.AdsController', 'ngRoute');
//    });
//
//    beforeEach(module(function($provide) {
//        service = { getAd: function(adId) {
//            return { id: 1, title: "my title", description: "my description"};
//        }};
//        $provide.value('AdsService', service);
//    }));
//
//    describe("some cool stuff", function() {
//        beforeEach(inject(
//            function(_$rootScope_, $controller, _$routeParams_ ) {
//                rootScope = _$rootScope_;
//                scope = rootScope.$new();
//                route = _$routeParams_;
//
//                MainCtrl = $controller('AdsController', { $scope : scope, $routeParams: route });
//            }));
//
//        it('i a test', function() {
//            expect(scope.stuff).toBe("123");
//        });
//    });
//
//});
//
//
