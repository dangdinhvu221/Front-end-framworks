app.controller(
  "listQuestionCtrl",
  function ($scope, $http, $rootScope, $routeParams, $interval) {
    $rootScope.Subjects.forEach((item) => {
      if (item.Id == $routeParams.id) {
        $scope.subject = angular.copy(item);
        return;
      }
    });

    $http.get("../db/Quizs/" + $routeParams.id + ".js").then((response) => {
      $scope.questions = response.data;
    });
    $scope.testMark = 0;
    $scope.indexQuestion = 0;
    $scope.timer = 900;
    $scope.element = [];

    $scope.move = function (x) {
      if (x < 10) {
        $scope.indexQuestion = x;
      }
    };

    $scope.mark = function () {
      if (
        $scope.questions[$scope.indexQuestion].AnswerId ==
        $scope.element[$scope.indexQuestion].answer
      ) {
        Swal.fire({
          icon: "success",
          title: "Đã trả lời đúng!",
          text: "+" + $scope.questions[$scope.indexQuestion].Marks + " điểm",
          showConfirmButton: false,
          timer: 1200,
          backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.pinimg.com/originals/14/08/3b/14083bb38a389d16705a4ac32e989ee4.gif")
                left top
                no-repeat
            `,
        });
        $scope.testMark += $scope.questions[$scope.indexQuestion].Marks;
        if ($scope.testMark < 0) {
          $scope.testMark = 10;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Sai mất rồi :((",
          showConfirmButton: false,
          timer: 1200,
          backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.pinimg.com/originals/bf/ab/5b/bfab5b995c12220f6470115974748ef8.gif")
                left top
                no-repeat
                `,
        });
      }
    };

    $scope.finish = function () {
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

          $rootScope.history.idExam = $scope.subject.Id;
          $rootScope.history.nameExam = $scope.subject.Name;
          $rootScope.history.mark = $scope.testMark;
          $rootScope.history.idUser = $rootScope.student.id;
          const apiExam =
            "https://62138df189fad53b1ff8d6aa.mockapi.io/historyExam";

          // $rootScope.students.forEach((item) => {
          //   if (item.id == $rootScope.history.idUser) {
          $http.post(apiExam, $rootScope.history).then(function (response) {
            $rootScope.historys.push(response.data);
            console.log($rootScope.historys);
            //   });
            // }
          });
          
          // $rootScope.historys.unshift(angular.copy($rootScope.history));

          window.location.href = "#!information/" + $scope.subject.Id;
        }
      });
    };

    var stop = $interval(() => {
      if ($scope.timer > 0) {
        $scope.timer -= 1;
      } else if ($scope.timer == 0) {
        $rootScope.student.marks = parseInt($scope.testMark).toString();
        $rootScope.students[$rootScope.indexStudent] = angular.copy(
          $rootScope.student
        );
        $rootScope.history.id = $rootScope.student.id;
        $rootScope.history.idExam = $scope.subject.Id;
        $rootScope.history.nameExam = $scope.subject.Name;
        $rootScope.history.mark = $scope.testMark;
        $rootScope.historys.unshift(angular.copy($rootScope.history));
        window.location.href = "#!information/" + $scope.subject.Id;
        $interval.cancel(stop);
      }
    }, 1000);
  }
);
