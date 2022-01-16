var app = angular.module("myApp", []);
        // .controller('myCtrl', function ($scope) {

        // })
        app.controller("myCtrl", function ($scope) {});
        app.run(function ($rootScope, $http, $timeout) {
            $http.get("../db/Subjects.js").then(function (response) {
                $rootScope.Subjects = response.data;
            });
            $rootScope.Subjects = null;
        });