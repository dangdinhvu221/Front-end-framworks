app.controller(
  "subjectAdministrationCtrl",
  function ($scope, $rootScope, $http) {
    $scope.index = -1;
    $scope.clear = function () {
      $scope.subject = {};
    };

    $scope.edit = function (index) {
      $scope.index = index;
      $scope.subject = angular.copy($scope.Subjects[index]);
    };

    const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/subjects";
    $scope.onSubmitForm = function (event) {
      event.preventDefault();

      var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var result = "";
      for (var i = 0; i < 4; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      $scope.subject.Id = result.toUpperCase();
      if ($scope.index == -1) {
      $scope.subject.Logo = document.getElementById("inputGroupFile01").files[0].name;
        $http.post(api, $scope.subject).then((response) => {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công!",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://data.whicdn.com/images/296419645/original.gif")
                left top
                no-repeat
            `,
          });
          $rootScope.Subjects.unshift(response.data);
          $scope.clear();
        });
      } else {
        const id = $rootScope.Subjects[$scope.index].id;
        const updateAPI = api + "/" + id;
        $http.put(updateAPI, $scope.subject).then((response) => {
          Swal.fire({
            icon: "success",
            title: "Cập nhật thành công!",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
            backdrop: `
                rgba(0,0,123,0.4)
                url("https://data.whicdn.com/images/296419645/original.gif")
                left top
                no-repeat
            `,
          });
          $rootScope.Subjects[$scope.index] = angular.copy(response.data);
          $scope.clear();
        });
      }
      // $rootScope.Subjects.unshift(angular.copy($scope.subject));
    };

    $scope.onDelete = function (index) {
      const id = $scope.Subjects[index].id;
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
            $scope.Subjects.splice(index, 1);
          });
        }
      });
    };
  }
);
