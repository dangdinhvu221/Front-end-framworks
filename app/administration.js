app.controller(
  "administrationCtrl",
  function ($scope, $rootScope, $routeParams, $http) {
    $scope.isSuccess = true;
    $scope.isLoading = false;
    $scope.index = -1;
    $scope.message = "";
    $scope.list_students = [];
    // $scope.student = {}

    $scope.edit = function (index) {
      $scope.index = index;
      $scope.student = angular.copy($scope.list_students[index]);
    };

    const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
    $http.get(api).then((response) => {
      $scope.list_students = response.data;
    });
    // if (index == -1) {
    $scope.onSubmitForm = function (event) {
      event.preventDefault();

      const id = $scope.list_students[$scope.index].id;
      const updateAPI = api + "/" + id;
      $http.put(updateAPI, $scope.student).then((response) => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
          showConfirmButton: false,
          closeOnClickOutside: false,
          allowOutsideClick: false,
          timer: 1600,
        });
        $scope.student.id = response.data.id;
        $scope.list_students[$scope.index] = angular.copy($scope.student);
      });
    };

    // $scope.update = function(){

    // }

    $scope.onDelete = function (index) {
      const id = $scope.list_students[index].id;
      const deleteApi = api + "/" + id;
      Swal.fire({
        title: "Cảnh báo!!!",
        text: "Bạn có muốn kết thúc bài thi không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        backdrop: `
                rgba(0,0,123,0.4)
                url("https://data.whicdn.com/images/296419645/original.gif")
                left top
                no-repeat
            `,
      }).then((res) => {
        if (res.value) {
          Swal.fire({
            title: "Kết thúc bài thi",
            icon: "success",
            showCancelButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1000,
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.pinimg.com/originals/bf/ab/5b/bfab5b995c12220f6470115974748ef8.gif")
                left top
                no-repeat
                `,
          });
          $http.delete(deleteApi).then((response) => {
            $scope.isLoading = false;
            $scope.isSuccess = true;
            $scope.list_students.splice(index, 1);
          })
        }
      })
    };
  }
);
