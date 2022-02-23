app.controller("changePassword", function ($scope, $rootScope, $http) {
  $scope.changePassword = function () {
    if ($rootScope.student == null) {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập!!!",
        text: "Quay lại trang chủ !",
      });
      window.location.href = "#!list-exam";
    } else {
      if ($rootScope.student.password == $scope.studentC.passwordOld) {
        if ($rootScope.student.password == $scope.studentC.password) {
          Swal.fire({
            icon: "error",
            title: "Trùng lặp với mật khẩu cũ !",
          });
        } else {
          const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
          const id = $rootScope.student.id
          const updateAPI = api + "/" + id
          $http.put(updateAPI, $scope.student).then(function (response) {
            $scope.students.push(response.data);
            console.log(response);
          });
          $rootScope.student.password = $scope.studentC.password;
          $rootScope.students[$rootScope.indexStudent] = angular.copy(
            $rootScope.student
          );
          Swal.fire({
            title: "Đổi mật khẩu thành công",
            text: "Bạn có muốn quay lại trang chủ không ? ",
            icon: "success",
          }).then((res) => {
            if (res.value) {
              window.location.href = "#!ListTest";
            }
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Vui lòng kiểm tra lại mật khẩu cũ !",
        });
      }
    }
  };
});
