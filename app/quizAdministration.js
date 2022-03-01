app.controller(
  "quizzAdministrationCtrl",
  function ($scope, $rootScope, $routeParams, $http) {
    $scope.index = -1;
    $scope.questions = [];
    $scope.list_questions = [];

    const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/quizz";
    $http.get(api).then((response) => {
      $scope.questions = response.data;
    });

    $scope.selectBox = function () {
      $scope.questions.forEach((item) => {
        if (item.Name == $scope.valueSubject) {
          $scope.list_questions.push(angular.copy(item));
          console.log($scope.list_questions);
        } else {
          $scope.list_questions = [];
        }
      });
    };

    $scope.edit = function (index) {
      $scope.index = index;
      $scope.valueSubject = angular.copy($scope.questions[index].Name);
      $scope.TextQuiz = angular.copy($scope.questions[index].Text);
      $scope.AnswerId = angular.copy($scope.questions[index].AnswerId);
      $scope.AnswerId1 = angular.copy($scope.questions[index].Answers[0].Id);
      $scope.AnswerId2 = angular.copy($scope.questions[index].Answers[1].Id);
      $scope.AnswerId3 = angular.copy($scope.questions[index].Answers[2].Id);
      $scope.AnswerId4 = angular.copy($scope.questions[index].Answers[3].Id);

      $scope.AnswerText1 = angular.copy(
        $scope.questions[index].Answers[0].Text
      );
      $scope.AnswerText2 = angular.copy(
        $scope.questions[index].Answers[1].Text
      );
      $scope.AnswerText3 = angular.copy(
        $scope.questions[index].Answers[2].Text
      );
      $scope.AnswerText4 = angular.copy(
        $scope.questions[index].Answers[3].Text
      );
    };

    $scope.cancel = function () {
      $scope.valueSubject = angular.copy("");
      $scope.TextQuiz = angular.copy("");
      $scope.AnswerId = angular.copy("");
      $scope.AnswerId1 = angular.copy("");
      $scope.AnswerId2 = angular.copy("");
      $scope.AnswerId3 = angular.copy("");
      $scope.AnswerId4 = angular.copy("");

      $scope.AnswerText1 = angular.copy("");
      $scope.AnswerText2 = angular.copy("");
      $scope.AnswerText3 = angular.copy("");
      $scope.AnswerText4 = angular.copy("");
    };

    var regax = "0123456789";
    var result = "";
    var result1 = "";
    var result2 = "";
    var result3 = "";

    for (var i = 0; i < 4; i++) {
      result += regax.charAt(Math.floor(Math.random() * regax.length));
      result1 += regax.charAt(Math.floor(Math.random() * regax.length));
      result2 += regax.charAt(Math.floor(Math.random() * regax.length));
      result3 += regax.charAt(Math.floor(Math.random() * regax.length));

      $scope.AnswerId1 = result;
      $scope.AnswerId2 = result1;
      $scope.AnswerId3 = result2;
      $scope.AnswerId4 = result3;
    }

    $scope.onSubmitForm = function (event) {
      event.preventDefault();

      $scope.quizz = {
        Text: $scope.TextQuiz,
        Name: $scope.valueSubject,
        Mark: "1",
        AnswerId: $scope.AnswerId,
        Answers: [
          { Id: $scope.AnswerId1, Text: $scope.AnswerText1 },
          { Id: $scope.AnswerId2, Text: $scope.AnswerText2 },
          { Id: $scope.AnswerId3, Text: $scope.AnswerText3 },
          { Id: $scope.AnswerId4, Text: $scope.AnswerText4 },
        ],
      };

      if ($scope.index == -1) {
        $http.post(api, $scope.quizz).then((response) => {
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
          $scope.questions.push(response.data);
        });
      } else {
        const id = $scope.questions[$scope.index].id;
        const updateAPI = api + "/" + id;
        $http.put(updateAPI, $scope.quizz).then((response) => {
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
          $scope.questions[$scope.index] = angular.copy(response.data);
        });
      }
    };

    $scope.onDelete = function (index) {
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
          const id = $scope.questions[index].id;
          const deleteApi = api + "/" + id;
          $http.delete(deleteApi).then((response) => {
            $scope.questions.splice(index, 1);
          });
        }
      });
    };
  }
);
