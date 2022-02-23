app.controller("ProfileController", function ($scope, $rootScope, $http) {
  $scope.updateAccount = function () {
    const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
    const id = $rootScope.student.id;
    const updateAPI = api +'/' + id;
    console.log(id);
    $http.put(updateAPI, $rootScope.student).then(function (response) {
      $scope.students.push(response.data);
      console.log(response);
    });
    $rootScope.students[$rootScope.indexStudent] = angular.copy(
      $rootScope.student
    );

    Swal.fire({
      icon: "success",
      title: "Cập nhập thông tin cá nhân thành công !",
      text: "Quay lại trang chủ!",
      showConfirmButton: false,
      closeOnClickOutside: false,
      allowOutsideClick: false,
      timer: 1600,
    });
    window.location.href = "#!list-exam";
  };
});
