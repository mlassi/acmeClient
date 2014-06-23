/*
angular.module('clientApp.models').service("Model", ['$rootScope', function($rootScope) {
    var ad = {
            id: "",
            title: "",
            description: ""
        };
   var newspaper = {
       id: "",
       publicationName: ""
   };

        twain = {
            name: "Twain",
            quote: "Why, I have known clergymen, good men, kind-hearted, liberal, sincere, and all that, who did not know the meaning of a 'flush.' It is enough to make one ashamed of one's species."
        },
        poe = {
            name: "Poe",
            quote: "Deep into that darkness peering, long I stood there, wondering, fearing, doubting, dreaming dreams no mortal ever dared to dream before."
        },
        plato = {
            name: "Plato",
            quote: "All things will be produced in superior quantity and quality, and with greater ease, when each man works at a single occupation, in accordance with his natural gifts, and at the right moment, without meddling with anything else. "
        };

    this.list = [fowler, twain, poe, plato];

    this.selectedAuthor = null;
    this.setSelectedAuthor = function(author) {
        if(this.list.indexOf(author) > -1) {
            this.selectedAuthor = author;
            $rootScope.$broadcast('authorModel::selectedAuthorUpdated', author);
        }
    };

}]);*/
