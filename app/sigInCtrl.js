app.controller("sigin_ctrl", function ($scope, $rootScope) {
  $rootScope.historys = [];
  $rootScope.history = {};
  $scope.login = function () {
    var index = true;
    $rootScope.students.forEach((st) => {
      if ($scope.username === st.username && $scope.password === st.password ) {
        if (st.role == 0) {
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: "Với quyền là: Admin",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
          });
          $rootScope.student = st;
          console.log(st);
          $rootScope.indexStudent = st.index;
          console.log($rootScope.indexStudent);
          window.location.href = "#!list-exam";
          index = false;
          return;
        } else {
          Swal.fire({
            icon: "success",
            title: "Đăng nhập thành công!",
            text: "Với quyền là: Người dùng",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
          });
          $rootScope.student = st;
          console.log(st);
          $rootScope.indexStudent = st.index;
          console.log($rootScope.indexStudent);
          window.location.href = "#!list-exam";
          index = false;
          return;
        }
      }
    });
    if (index == true) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại!!!",
        text: "Vui lòng kiểm tra lại tài khoản & mật khẩu!!!",
      });
    }
  };
});
