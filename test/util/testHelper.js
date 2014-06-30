'use strict';

var TestHelper = (function() {

    var succeedPromise;
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

        function setSucceedPromise(value) {
            succeedPromise = value;
        }

        function getNewspaperListMockData() {
            return newspaperListData;
        }

        function getAdListMockData() {
            return adListData;
        }

        function createAdServiceMocks(adsService, newspaperService, $q) {

        var loadAdErrorMsg = "Something when wrong while loading ad";
        var loadAdListErrorMsg = "Something went wrong while loading ad list";
        var loadNewspaperListErrorMsg = "Something went wrong while loading newspaper list";
        var saveAdErrorMsg = "Something went wrong while saving ad";
        var deleteAdErrorMsg = "Something went wrong while deleting ad";
        var postAdToNewspaperErrorMsg = "Something went wrong while posting ad";
        var cancelAdToNewspaperErrorMsg = "Something went wrong while cancelling ad in newspaper";

        var    ad,
            adId,
            newspaper;

        spyOn(newspaperService, "getAllNewspapers")
            .andCallFake(function(){
                if (succeedPromise) {
                    return $q.when(newspaperListData);
                }
                else{
                    return $q.reject(loadNewspaperListErrorMsg);
                }
            });

        spyOn(adsService, "getAllAds")
            .andCallFake(function(){
                if (succeedPromise) {
                    return $q.when(adListData);
                }
                else{
                    return $q.reject(loadAdListErrorMsg);
                }
            });

        spyOn(adsService, "getAd")
            .andCallFake(function(id){
                if (succeedPromise) {
                    return $q.when(adListData[id]);
                }
                else{
                    return $q.reject(loadAdErrorMsg);
                }
            });

        spyOn(adsService, "saveAd")
            .andCallFake(function(ad){
                if (succeedPromise) {
                    return $q.when(adListData[ad.id - 1]);
                }
                else{
                    return $q.reject(saveAdErrorMsg);
                }
            });

        spyOn(adsService, "deleteAd")
            .andCallFake(function(adId){
                if (succeedPromise) {
                    return $q.when(adId);
                }
                else{
                    return $q.reject(deleteAdErrorMsg);
                }
            });

        spyOn(adsService, "publishAdToNewspaper")
            .andCallFake(function(id, newspaper){
                if(succeedPromise) {
                    return $q.when(adListData[id - 1]);
                }
                else {
                    return $q.reject(postAdToNewspaperErrorMsg);
                }
            });
    }

    function createNewspaperMocks(newspaperService, $q) {
        spyOn(newspaperService, "getAllNewspapers")
            .andCallFake(function(){
                if (succeedPromise) {
                    return $q.when(newspaperListData);
                }
                else{
                    return $q.reject("Something went wrong");
                }
            });

        spyOn(newspaperService, "getNewspaper")
            .andCallFake(function(id){
                if (succeedPromise) {
                    return $q.when(newspaperListData[id]);
                }
                else{
                    return $q.reject("Something went wrong");
                }
            });

        spyOn(newspaperService, "saveNewspaper")
            .andCallFake(function(newspaper){
                if (succeedPromise) {
                    return $q.when(newspaperListData[newspaper.id - 1]);
                }
                else{
                    return $q.reject("Something went wrong");
                }
            });

        spyOn(newspaperService, "deleteNewspaper")
            .andCallFake(function(newspaperId){
                if (succeedPromise) {
                    return $q.when(newspaperId);
                }
                else{
                    return $q.reject("Something went wrong");
                }
            });
    }

    return {
        createAdServiceMocks: createAdServiceMocks,
        createNewspaperMocks: createNewspaperMocks,
        setSucceedPromise: setSucceedPromise,
        getNewspaperListMockData: getNewspaperListMockData,
        getAdListMockData: getAdListMockData
    };

})();