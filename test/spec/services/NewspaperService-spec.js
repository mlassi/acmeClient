'use strict';

describe("Service : NewspaperService", function() {

    var newspaperService,
        result,
        $httpBackend,
        validSingleNewspaperResponse,
        validAllNewspapersResponse,
        existingNewspaper;

    validSingleNewspaperResponse = {"id": 1, "publicationName": "New York Times"};
    validAllNewspapersResponse = [
        {"id": 1, "publicationName": "New York Times"},
        {"id": 2, "publicationName": "Boston Glove"}
    ];

    beforeEach(function () {
        module("clientApp");
    });

    beforeEach(inject(function (_NewspaperService_, _$httpBackend_) {
        newspaperService = _NewspaperService_;
        $httpBackend = _$httpBackend_;

        result = null;
    }));

    describe('retrieve single newspaper ', function() {

        it('should return a newspaper when an existing id is sent', function() {
            $httpBackend.expectGET('http://localhost/newspapers/1').respond(validSingleNewspaperResponse);

            var returnedPromise = newspaperService.getNewspaper(1);

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validSingleNewspaperResponse);
        });

        it('should not return a newspaper when an invalid id is sent', function() {
            $httpBackend.whenGET('http://localhost/newspapers/99').respond(404);
            var returnedPromise = newspaperService.getNewspaper(99);

            returnedPromise.then(function(response) {
                result = response;
            }, function(error) {
                result = error;
            });
            $httpBackend.flush();

            expect(result).toBe("error");
        });
    });

    describe('retrive multiple newspapers ', function() {
        it(' should return two newspapers when retrieving all newspapers', function() {
            $httpBackend.expectGET('http://localhost/newspapers/').respond(validAllNewspapersResponse);

            var returnedPromise = newspaperService.getAllNewspapers();

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validAllNewspapersResponse);
        })

        it('should not return any newspapers when there is a server error', function() {
            $httpBackend.whenGET('http://localhost/newspapers/').respond(500);
            var returnedPromise = newspaperService.getAllNewspapers();

            returnedPromise.then(function(response) {
                result = response;
            }, function(error) {
                result = error;
            });
            $httpBackend.flush();

            expect(result).toBe("error");
        });
    });

    describe('save newspaper', function() {

        it("should save a new newspaper given a valid newspaper", function () {
            var newNewspaper = {};
            angular.copy(validSingleNewspaperResponse, newNewspaper);
            newNewspaper.id = 0;
            $httpBackend.expectPOST('http://localhost/newspapers/', newNewspaper).respond(newNewspaper);

            var returnedPromise = newspaperService.saveNewspaper(newNewspaper);

            returnedPromise.then(function (response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(newNewspaper);
        });

        it("should save an existing newspaper given a valid newspaper", function () {
            $httpBackend.expectPUT('http://localhost/newspapers/1', validSingleNewspaperResponse)
                .respond(validSingleNewspaperResponse);

            var returnedPromise = newspaperService.saveNewspaper(validSingleNewspaperResponse);

            returnedPromise.then(function (response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validSingleNewspaperResponse);
        });

        it('should return 404 if the newspaper was expected to exist but does not exist', function () {
            var otherNewspaper = {};
            angular.copy(validSingleNewspaperResponse, otherNewspaper);
            otherNewspaper.id = 99;
            $httpBackend.expectPUT('http://localhost/newspapers/99', otherNewspaper).respond(404);

            var returnedPromise = newspaperService.saveNewspaper(otherNewspaper);

            returnedPromise.then(function (response) {
                result = response;
            }, function (error) {
                result = error;
            });
            $httpBackend.flush();

            expect(result).toBe("error");
        });
    });

    describe('delete newspaper', function() {
        it('should delete a newspaper if it is an existing newspaper', function() {
            $httpBackend.expectDELETE('http://localhost/newspapers/1').respond(validSingleNewspaperResponse);

            var returnedPromise = newspaperService.deleteNewspaper(1);

            returnedPromise.then(function(response) {
                result = response;
            });
            $httpBackend.flush();

            expect(result).toEqual(validSingleNewspaperResponse);
        });

        it('should return 404 if the newspaper cannot be found', function() {
            $httpBackend.expectDELETE('http://localhost/newspapers/99').respond(404);

            var returnedPromise = newspaperService.deleteNewspaper(99);

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
