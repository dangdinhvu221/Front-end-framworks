app.controller("register_ctrl", function ($scope, $http, $rootScope) {
  $scope.register = function () {
    

    console.log($scope.accountRegister);
    if ($scope.accountRegister != null) {
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công !",
        text: "Quay lại trang chủ",
        showConfirmButton: false,
        closeOnClickOutside: false,
        allowOutsideClick: false,
        timer: 1600,
      });

      $scope.accountRegister.role = 1;
      // $rootScope.students.push(angular.copy($scope.accountRegister));
      const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
      $http.post(api, $scope.accountRegister).then(function (response) {
        $scope.students.push(response.data);
        $scope.student.id = response.data.id;
        console.log($scope.students);
      });
      window.location.href = "#!list-exam";
    } else {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin !!!",
        text: "Quay lại trang chủ",
        showConfirmButton: false,
        closeOnClickOutside: false,
        allowOutsideClick: false,
        timer: 1600,
      });
    }
  };
});

app.directive("passwordVerify", function () {
  return {
    require: "ngModel",
    scope: {
      passwordVerify: "=",
    },
    link: function (scope, element, attrs, ctrl) {
      scope.$watch(
        function () {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
            combined = scope.passwordVerify + "_" + ctrl.$viewValue;
          }
          return combined;
        },
        function (value) {
          if (value) {
            ctrl.$parsers.unshift(function (viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                ctrl.$setValidity("passwordVerify", false);
                return undefined;
              } else {
                ctrl.$setValidity("passwordVerify", true);
                return viewValue;
              }
            });
          }
        }
      );
    },
  };
});
