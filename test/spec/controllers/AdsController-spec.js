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

var loadAdErrorMsg = "Something when wrong while loading ad";
var loadAdListErrorMsg = "Something went wrong while loading ad list";
var loadNewspaperListErrorMsg = "Something went wrong while loading newspaper list";
var saveAdErrorMsg = "Something went wrong while saving ad";
var deleteAdErrorMsg = "Something went wrong while deleting ad";
var postAdToNewspaperErrorMsg = "Something went wrong while posting ad";
var cancelAdToNewspaperErrorMsg = "Something went wrong while cancelling ad in newspaper";

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
                    return _$q_.reject(loadNewspaperListErrorMsg);
                }
            });

        spyOn(adsService, "getAllAds")
            .andCallFake(function(){
                if (succeedPromise) {
                    return _$q_.when(adListData);
                }
                else{
                    return _$q_.reject(loadAdListErrorMsg);
                }
            });

        spyOn(adsService, "getAd")
            .andCallFake(function(id){
                if (succeedPromise) {
                    return _$q_.when(adListData[id]);
                }
                else{
                    return _$q_.reject(loadAdErrorMsg);
                }
            });

        spyOn(adsService, "saveAd")
            .andCallFake(function(ad){
                if (succeedPromise) {
                    return _$q_.when(adListData[ad.id - 1]);
                }
                else{
                    return _$q_.reject(saveAdErrorMsg);
                }
            });

        spyOn(adsService, "deleteAd")
            .andCallFake(function(adId){
                if (succeedPromise) {
                    return _$q_.when(adId);
                }
                else{
                    return _$q_.reject(deleteAdErrorMsg);
                }
            });

        spyOn(adsService, "publishAdToNewspaper")
            .andCallFake(function(id, newspaper){
               if(succeedPromise) {
                   return _$q_.when(adListData[id - 1]);
               }
                else {
                   return _$q_.reject(postAdToNewspaperErrorMsg);
               }
            });

        adsController = controller('AdsController', {$scope: scope, $routeParams: routeParams});
    }));

    describe('ad list and newspaper list scenarios', function() {
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

        it('ad list should be null if the ad list cannot be loaded', function() {
            succeedPromise = false;
            scope.getAllAds();
            scope.$digest();
            expect(adsService.getAllAds).toHaveBeenCalled();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe(loadAdListErrorMsg);
        })
    });

    describe('ad load scenarios', function() {
        it('should load an when ad when getAd is called in controller', function(){
            succeedPromise = true;
            scope.getAd(2);
            scope.$digest();
            expect(adsService.getAd).toHaveBeenCalled();
            expect(scope.ad.id).toBe(3);
        });

        it('ad should be null if the ad cannot be loaded', function() {
            succeedPromise = false;
            scope.getAd(2);
            scope.$digest();
            expect(adsService.getAd).toHaveBeenCalled();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe(loadAdErrorMsg);
        })
    });

    describe("save ad scenarios", function() {

        it("should return a saved newspaper when an ad  is saved", function() {
            succeedPromise = true;
            var adToSave = adListData[1];
            scope.saveAd(adToSave);
            scope.$digest();
            expect(adsService.saveAd).toHaveBeenCalled();
            expect(scope.ad.id).toBe(adToSave.id);
        });

        it("should not return an ad when save ad fails", function() {
            succeedPromise = false;
            var adToSave = adListData[1];
            scope.saveAd(adToSave);
            scope.$digest();
            expect(adsService.saveAd).toHaveBeenCalled();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe(saveAdErrorMsg);
        });

    });

    describe("delete ad scenarios", function() {

        it("the ad should be deleted when delete is called", function() {
            succeedPromise = true;
            scope.deleteAd(2);
            scope.$digest();
            expect(adsService.deleteAd).toHaveBeenCalled();
            expect(scope.ad).toBeNull();
        });

        it("should return an error message if the ad cannot be deleted", function() {
            succeedPromise = false;
            scope.deleteAd(2);
            scope.$digest();
            expect(adsService.deleteAd).toHaveBeenCalled();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe(deleteAdErrorMsg);
        });
    });

    describe("post ad / cancel ad scenarios", function() {

        it("should post ad when called", function() {
            succeedPromise = true;
            var newspaperToPublishTo = newspaperListData[2];
            scope.publishAd(1, newspaperToPublishTo);
            scope.$digest();
            expect(adsService.publishAdToNewspaper).toHaveBeenCalled();
        });

        it("should not post ad if an error occurs when called", function() {
            succeedPromise = false;
            var newspaperToPublishTo = newspaperListData[2];
            scope.publishAd(1, newspaperToPublishTo);
            scope.$digest();
            expect(adsService.publishAdToNewspaper).toHaveBeenCalled();
            expect(scope.errorMessage).toBeDefined();
            expect(scope.errorMessage).toBe(postAdToNewspaperErrorMsg);
        });

    });



});