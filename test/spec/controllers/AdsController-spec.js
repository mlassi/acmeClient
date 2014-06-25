'use strict';

var newspaperListData = [
    { "id": 1, "publicationName": "Angular JS" },
    { "id": 2, "publicationName": "Mastering Angular JS" },
    { "id": 3, "publicationName": "Unit Testing using Jasmine" }
];

var adListData = [
    { "id": 1, "title": "Cook needed", "description": "A cook is needed for McDonalds" },
    { "id": 2, "title": "Car mechanic is needed", "description": "Needs to know how to fix new cars too!" },
    { "id": 3, "title": "Rock star principal", "description": "Need a really awesome principal for a struggling school." }
];

describe("Controller : AdsController", function() {
    var adsService,
        newspaperService,
        scope,
        controller,
        routeParams,
        succeedPromise,
        adsController;

    beforeEach(function(){
        module("clientApp");
    });

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$routeParams_, _AdsService_,  _NewspaperService_){
        controller = _$controller_;

        scope = _$rootScope_.$new();
        routeParams = _$routeParams_;
        newspaperService = _NewspaperService_;
        adsService = _AdsService_;

        spyOn(newspaperService, "getAllNewspapers")
            .andCallFake(function(){
                if (succeedPromise) {
                    return _$q_.when(newspaperListData);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        spyOn(adsService, "getAllAds")
            .andCallFake(function(){
                if (succeedPromise) {
                    return _$q_.when(adListData);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        spyOn(adsService, "getAd")
            .andCallFake(function(id){
                if (succeedPromise) {
                    return _$q_.when(adListData[id]);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        spyOn(adsService, "saveAd")
            .andCallFake(function(ad){
                if (succeedPromise) {
                    return _$q_.when(adListData[ad.id - 1]);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        spyOn(adsService, "deleteAd")
            .andCallFake(function(adId){
                if (succeedPromise) {
                    return _$q_.when(adId);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        adsController = controller('AdsController', {$scope: scope, $routeParams: routeParams});
    }));

    describe('ad list scenarios', function() {
        it('should call getAllNewspapers when called in controller', function(){
            succeedPromise = true;
            scope.getAllNewspapers();
            scope.$digest();
            expect(newspaperService.getAllNewspapers).toHaveBeenCalled();
            expect(scope.newspaperList.length).toBe(3);
        });

        it('should call getAllAds when called in controller', function(){
            succeedPromise = true;
            scope.getAllAds();
            scope.$digest();
            expect(adsService.getAllAds).toHaveBeenCalled();
            expect(scope.adsList.length).toBe(3);
        });

    });
});