'use strict';

var newspaperListData = [
    { "id": 1, "publicationName": "Angular JS" },
    { "id": 2, "publicationName": "Mastering Angular JS" },
    { "id": 3, "publicationName": "Unit Testing using Jasmine" }
];

describe("Controller : NewspaperController", function() {

    var newspaperService,
        scope,
        controller,
        routeParams,
        succeedPromise,
        newspaperController;

    beforeEach(function(){
        module("clientApp");
    });

    beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$routeParams_,  _NewspaperService_){
        controller = _$controller_;

        scope = _$rootScope_.$new();
        routeParams = _$routeParams_;
        newspaperService = _NewspaperService_;

        TestHelper.createNewspaperMocks(newspaperService, _$q_);

        newspaperController = controller('NewspapersController', {$scope: scope, $routeParams: routeParams});
    }));

    describe('newspaper list scenarios', function() {
        it('should call getAllNewspaperList when called in controller', function(){
            TestHelper.setSucceedPromise(true);
            scope.getAllNewspapers();
            scope.$digest();
            expect(newspaperService.getAllNewspapers).toHaveBeenCalled();
            expect(scope.newspaperList.length).toBe(3);
        });

        it('should return an error when getAllNewspaperList fails', function(){
            TestHelper.setSucceedPromise(false);
            scope.getAllNewspapers();
            scope.$digest();
            expect(newspaperService.getAllNewspapers).toHaveBeenCalled();
            expect(scope.newspaperList.length).toBe(0);
        });
    });

    describe('newspaper load scenarios', function() {
        it('should call getNewspaper when called in controller', function(){
            TestHelper.setSucceedPromise(true);
            scope.getNewspaper(2);
            scope.$digest();
            expect(newspaperService.getNewspaper).toHaveBeenCalled();
            expect(scope.newspaper.id).toBe(3);
        });

        xit('should return a newspaper when the routeParam id has been set', function() {
            TestHelper.setSucceedPromise(true);
            var routeParamsStub = jasmine.createSpy('routeParamsStub')
            routeParamsStub.newspaperId = 1;
            scope.$routeParams = routeParamsStub;
            expect(scope.newspaper.id).toBe(1);
        })
    });

    describe("save newspaper scenarios", function() {

        it("should return a saved newspaper when a new newspaper is saved", function() {
            TestHelper.setSucceedPromise(true);
           var newspaperToSave = newspaperListData[1];
           scope.saveNewspaper(newspaperToSave);
           scope.$digest();
            expect(newspaperService.saveNewspaper).toHaveBeenCalled();
            expect(scope.newspaper.id).toBe(newspaperToSave.id);
        });

        it("should not return a newspaper when save newspaper fails", function() {
            TestHelper.setSucceedPromise(false);
            var newspaperToSave = TestHelper.getNewspaperListMockData()[1];
            scope.saveNewspaper(newspaperToSave);
            scope.$digest();
            expect(newspaperService.saveNewspaper).toHaveBeenCalled();
            expect(scope.newspaper.id).toBe(0);
        });

    });

    describe("delete newspaper scenarios", function() {
        it("the newspaper should be deleted when delete is called", function() {
            TestHelper.setSucceedPromise(true);
            scope.deleteNewspaper(2);
            scope.$digest();
            expect(newspaperService.deleteNewspaper).toHaveBeenCalled();
            expect(scope.newspaper).toBeNull();
        });
    });

});