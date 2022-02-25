app.controller("historyCtrl", function ($scope, $rootScope, $http) {

    $scope.historyUser = [];
    const apiExam = "https://62138df189fad53b1ff8d6aa.mockapi.io/historyExam";
    $http.get(apiExam).then(function (response) {
        $rootScope.historys = response.data;
    })

    $rootScope.historys.forEach((item) => {
        if (item.idUser == $rootScope.student.id) {
            $scope.historyUser.push(angular.copy(item));
            console.log($scope.historyUser);
        }
    });
   
});
