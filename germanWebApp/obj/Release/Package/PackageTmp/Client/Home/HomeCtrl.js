
angular.module('GermanApp')
     .controller("HomeCtrl", function ($scope, $location, $http) {
        $scope.article = "I am the home page";

        $scope.go = function (path) {
            $location.path(path);
        };

           
        //var paramId = 1;
        function getNounsByRange(id) {
            
            $http({
                url: "/Home/getNounsList",
                    method: "post",
                    data: { number: id }
                })
                .success(function successCallback(data) {
                    console.log("before");
                    console.log(data);
                    console.log("after");
                })
                .error(function errorCallback(error) {
                    console.log(error);
                });

        }
        
    });