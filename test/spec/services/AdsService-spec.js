'use strict';

describe("Service : AdsService", function() {

    var adsService,
        result,
        $httpBackend,
        validSingleAdResponse,
        validAllAdsResponse,
        existingNewspaper;

    validSingleAdResponse = {"id": 1, "title": "first title", "description": "first description"};
    validAllAdsResponse = [ {"id": 1, "title": "first title", "description": "first description"},
                            {"id": 2, "title": "second title", "description": "second description"}
                            ];
    existingNewspaper = {"id": 1, "publicationName":"New York Times"};

    beforeEach(function(){
        module("clientApp");
    });

    beforeEach(inject(function(_AdsService_, _$httpBackend_, _$log_){
        adsService = _AdsService_;
        $httpBackend = _$httpBackend_;

        result = null;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('retrieve single ad ', function() {

        it('should return an ad when an existing id is sent', function() {
            $httpBackend.expectGET('http://localhost/ads/1').respond(validSingleAdResponse);

            var returnedPromise = adsService.getAd(1);

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validSingleAdResponse);
        });

        it('should not return an ad when an invalid id is sent', function() {
            $httpBackend.whenGET('http://localhost/ads/99').respond(404);
            var returnedPromise = adsService.getAd(99);

            returnedPromise.then(function(response) {
                result = response;
            }, function(error) {
                result = error;
            });
           $httpBackend.flush();

            expect(result).toBe("error");
        });
    });

    describe('retrive multiple ads', function() {
        it(' should return two ads when retrieve all ads', function() {
            $httpBackend.expectGET('http://localhost/ads/').respond(validAllAdsResponse);

            var returnedPromise = adsService.getAllAds();

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validAllAdsResponse);
        })

        it('should not return ads when there is a server error', function() {
            $httpBackend.whenGET('http://localhost/ads/').respond(500);
            var returnedPromise = adsService.getAllAds();

            returnedPromise.then(function(response) {
                result = response;
            }, function(error) {
                result = error;
            });
            $httpBackend.flush();

            expect(result).toBe("error");
        });
    });

    describe('save ad', function() {

        it("should save a new ad given a valid ad", function() {
            var newAd = {};
            angular.copy(validSingleAdResponse, newAd);
            newAd.id = 0;
            $httpBackend.expectPOST('http://localhost/ads/', newAd).respond(newAd);

            var returnedPromise = adsService.saveAd(newAd);

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(newAd);
        });

        it("should save an existing ad given a valid ad", function() {
            $httpBackend.expectPUT('http://localhost/ads/1', validSingleAdResponse).respond(validSingleAdResponse);

            var returnedPromise = adsService.saveAd(validSingleAdResponse);

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validSingleAdResponse);
        });

        it('should return 404 if the ad was expected to exist', function() {
            var otherAd = {};
            angular.copy(validSingleAdResponse, otherAd);
            otherAd.id = 99;
            $httpBackend.expectPUT('http://localhost/ads/99', otherAd).respond(404);

            var returnedPromise = adsService.saveAd(otherAd);

            returnedPromise.then(function(response) {
                result = response;
            }, function(error) {
                result = error;
            });
            $httpBackend.flush();

            expect(result).toBe("error");
        });

        describe('delete ad', function() {
            it('should delete an ad if it is an existing ad', function() {
                $httpBackend.expectDELETE('http://localhost/ads/1').respond(validSingleAdResponse);

                var returnedPromise = adsService.deleteAd(1);

                returnedPromise.then(function(response) {
                    result = response;
                });
                $httpBackend.flush();

                expect(result).toEqual(validSingleAdResponse);
            });

            it('should return 404 if the ad cannot be found', function() {
                $httpBackend.expectDELETE('http://localhost/ads/99').respond(404);

                var returnedPromise = adsService.deleteAd(99);

                returnedPromise.then(function(response) {
                    result = response;
                }, function(error) {
                    result = error;
                });
                $httpBackend.flush();

                expect(result).toBe("error");
            });
        });

        describe('post ad to news paper', function() {
           it('should post the ad to newspaper if both are valid', function() {
               $httpBackend.expectPOST('http://localhost/ads/1/newspapers/newspaper', existingNewspaper)
                   .respond(validSingleAdResponse);

               var returnedPromise = adsService.publishAdToNewspaper(1, existingNewspaper);

               returnedPromise.then(function(response) {
                   result = response;
               });
               $httpBackend.flush();

               expect(result).toEqual(validSingleAdResponse);
           });

           it('should return 404 if the ad or newspaper cannot be found', function() {
               $httpBackend.expectPOST('http://localhost/ads/99/newspapers/newspaper', existingNewspaper)
                   .respond(404);

               var returnedPromise = adsService.publishAdToNewspaper(99, existingNewspaper);

               returnedPromise.then(function(response) {
                   result = response;
               }, function(error) {
                   result = error;
               });
               $httpBackend.flush();

               expect(result).toBe("error");
           });
        });

    });

});
