'use strict';

describe("Service : AdsService", function() {

    var adsService,
        succeedPromise,
        $httpBackend,
        validSingleAdResponse;

    validSingleAdResponse = {"id": 1, "title": "first title", "description": "first description"};

    beforeEach(function(){
        module("clientApp");
    });

    beforeEach(inject(function( _$q_,_AdsService_, _$httpBackend_, _$log_){
        adsService = _AdsService_;
        $httpBackend = _$httpBackend_;

       // $httpBackend.expectGET("http://localhost/ads/1").respond(validSingleAdResponse);

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('test ', function() {

        it('should return an ad when an existing id is sent', function() {
            var returnData = { excited: true };

            // expectGET to make sure this is called once.
            $httpBackend.expectGET('http://localhost/ads/1').respond(returnData);

            // make the call.
            var returnedPromise = adsService.getAd(1);

            // set up a handler for the response, that will put the result
            // into a variable in this scope for you to test.
            var result = null;
            returnedPromise.then(function(response) {
                result = response;
            });

            // flush the backend to "execute" the request to do the expectedGET assertion.
            $httpBackend.flush();

            expect(result).toEqual(returnData);
        });



    });
});
