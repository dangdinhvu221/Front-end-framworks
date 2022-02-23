app.controller(
  "administrationCtrl",
  function ($scope, $rootScope, $routeParams, $http) {
    $scope.isSuccess = true;
    $scope.isLoading = false;
    $scope.index = -1;
    $scope.message = "";
    // $scope.students = []
    // $scope.student = {}

    $scope.edit = function (index) {
      $scope.index = index;
      $scope.student = angular.copy($rootScope.students[index]);
    };

    const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
    // if (index == -1) {
    $scope.onSubmitForm = function (event) {
      event.preventDefault();
      const id = $scope.student.id;
      const updateAPI = api + "/" + id;
      $http.put(updateAPI, $scope.student).then((response) => {
        $scope.student.id = response.data.id;
        $scope.students.push(response.data);
      });
    };

    // $scope.update = function(){

    // }

    $scope.onDelete = function (index) {
      const id = $scope.students[index].id;
      const deleteApi = api + "/" + id;
      $scope.isLoading = true;

      $http
        .delete(deleteApi)
        .then((response) => {
          $scope.isLoading = false;
          $scope.isSuccess = true;
          $scope.students.splice(index, 1);
        })
        .catch((error) => {
          $scope.isLoading = false;
          $scope.isSuccess = false;
        });
    };
  }
);
