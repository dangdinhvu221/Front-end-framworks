app.controller("informationEx", function ($scope, $rootScope, $routeParams) {
  $rootScope.Subjects.forEach((item) => {
    if (item.Id == $routeParams.id) {
      $scope.subject = angular.copy(item);
      return;
    }
  });

  $scope.start_exam = function () {
    // console.log($rootScope.student.role);

    if ($rootScope.student == null) {
      Swal.fire({
        icon: "error",
        title: "Bạn chưa đăng nhập!",
        text: "Hãy quay lại sau khi đăng nhập!",
      });
    } else if ($rootScope.student.role == 0) {
      Swal.fire({
        icon: "warning",
        title: 'Chỉ "Người dùng" mới làm được bài!',
        text: "Quay lại trang chủ!",
      });
      return;
    } else {
      Swal.fire({
        title: "Chuẩn bị vào bài thi!",
        text: "Bạn đã sẵn sàng ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Không",
        backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.pinimg.com/originals/99/96/db/9996db22055a04a3a6090b36b522a675.gif")
                left top
                no-repeat
            `,
      }).then((response) => {
        if (response.value) {
          document.location = "#!listQuestion/" + $scope.subject.Id;
        }
        console.log(response);
      });
    }
  };
});

app.directive("quizfpoly", function () {
  return {
    restrict: "AE",
    scope: {},
    templateUrl: "../template/listQuestion.html",
  };
});
