var booksData = [
    { "ID": 1, "Name": "Angular JS" },
    { "ID": 2, "Name": "Mastering Angular JS" },
    { "ID": 3, "Name": "Unit Testing using Jasmine" }
];

describe('controller tests', function(){
    var windowMock, booksDataSvc, scope, controller;

    var succeedPromise, homeCtrl, homeCtrlScope;

    beforeEach(function(){
        module("myApp");
    });

    beforeEach(inject(function($controller, $rootScope, $q, dataSvc){
        controller = $controller;

        scope = $rootScope;
        homeCtrlScope = $rootScope.$new();

        booksDataSvc = dataSvc;

        windowMock = {
            location: { href: "" },
            alert: function (message) {
                this.msg = message;
            },
            msg: ""
        };

        spyOn(booksDataSvc, "getAllBooks")
            .andCallFake(function(){
                if (succeedPromise) {
                    return $q.when(booksData);
                }
                else{
                    return $q.reject("Something went wrong");
                }
            });
    }));

    function createController(){
        homeCtrl = controller('HomeController', {$scope: homeCtrlScope, $window: windowMock});
    }

    it('Should call getAllBooks on creating controller', function(){
        succeedPromise = true;
        createController();
        homeCtrlScope.$digest();
        expect(booksDataSvc.getAllBooks).toHaveBeenCalled();
        expect(homeCtrlScope.books.length).not.toBe(0);
    });

    it('Should alert a message when service fails', function(){
        succeedPromise = false;
        createController();
        homeCtrlScope.$digest();
        expect(booksDataSvc.getAllBooks).toHaveBeenCalled();
        expect(windowMock.msg).not.toBe("");
    });
});
