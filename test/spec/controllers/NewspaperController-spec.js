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

        spyOn(newspaperService, "getAllNewspapers")
            .andCallFake(function(){
                if (succeedPromise) {
                    return _$q_.when(newspaperListData);
                }
                else{
                    return _$q_.reject("Something went wrong");
                }
            });

        newspaperController = controller('NewspapersController', {$scope: scope, $routeParams: routeParams});
    }));


    it('should call getAllNewspaperList when called in controller', function(){
        succeedPromise = true;
        scope.getAllNewspapers();
        scope.$digest();
        expect(newspaperService.getAllNewspapers).toHaveBeenCalled();
        expect(scope.newspaperList.length).toBe(3);
    });

    it('should return an error when getAllNewspaperList fails', function(){
        succeedPromise = false;
        scope.getAllNewspapers();
        scope.$digest();
        expect(newspaperService.getAllNewspapers).toHaveBeenCalled();
        expect(scope.newspaperList.length).toBe(0);
    });

});