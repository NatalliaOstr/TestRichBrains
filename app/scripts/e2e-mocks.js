
'use strict';

angular.module('e2e-mocks', ['ngMockE2E'])
    .run(function($httpBackend) {
        console.log('app run!');
        var infoservices = [
            {
                "title" : "Haircut",
                "price" : 29.2,
                "location" : "London",
                "description" : "In London you will get  everything you need",
                "images" : ["images/img1.jpg", "images/img2.jpg", "images/img4.jpg", "images/img5.jpg"]
            },
            {
                "title" : "MakeUp",
                "price" : 48.22,
                "location" : "Manchester",
                "description" : "House of MakeUp Manchester is the city's one and only Makeup and Hair boutique, offering everything needed for any occasion",
                "images" : "images/img3.jpg"
            },
            {
                "title" : "Shoes repair",
                "price" : 99.99,
                "location" : "Minsk",
                "description" : null,
                "images" : null
            }

        ];
        $httpBackend.whenGET('http://localhost:8080/data').respond(200,infoservices);
        $httpBackend.whenPOST('http://localhost:8080/data').respond(function(method, url, data){
            var result = JSON.parse(data);
            infoservices.push(result);
            return [200, result];

        });
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    });
/*angular.module('MyService').requires.push('e2e-mocks');*/