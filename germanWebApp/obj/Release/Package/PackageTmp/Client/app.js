
(function () {
    var app = angular.module('GermanApp',
    [   // Dependencies
        'ngRoute',
        'ngMaterial',
        'ngAnimate'
    ]);

    //Where we configure various services
    var config = function ($routeProvider) {

        $routeProvider
            .when("/",
                { templateUrl: "./Client/Home/Home.html" })
            //.when("/home",
            //    { templateUrl: "./Client/Home/Home.html" })
            .when("/articles",
                { templateUrl: "./Client/GermanArticles/GermanArticles.html" })

            .otherwise(
                { redirectTo: "/" });
    };

    app.config(config);
    //app.run(['$anchorScroll', function ($anchorScroll) {
    //    $anchorScroll.yOffset = 50;
    //}]);


}());