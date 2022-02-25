app.controller('quizzAdministrationCtrl', function ($scope, $rootScope, $routeParams, $http){

    const api = 'https://621429af89fad53b1f0c503e.mockapi.io/Quiz';
    $http.get(api).then((response) => {
        $scope.questions = response.data;
      });
  
      $scope.edit = function (index) {
        $scope.index = index;
        $scope.quizz.TextQuiz = angular.copy($scope.questions[index].Text);
        $scope.quizz.AnswerId = angular.copy($scope.questions[index].AnswerId);
        $scope.quizz.AnswerId1 = angular.copy($scope.questions[index].Answers[0].Id);
        $scope.quizz.AnswerId2 = angular.copy($scope.questions[index].Answers[1].Id);
        $scope.quizz.AnswerId3 = angular.copy($scope.questions[index].Answers[2].Id);
        $scope.quizz.AnswerId4 = angular.copy($scope.questions[index].Answers[3].Id);

        $scope.quizz.AnswerText1 = angular.copy($scope.questions[index].Answers[0].Text);
        $scope.quizz.AnswerText2 = angular.copy($scope.questions[index].Answers[1].Text);
        $scope.quizz.AnswerText3 = angular.copy($scope.questions[index].Answers[2].Text);
        $scope.quizz.AnswerText4 = angular.copy($scope.questions[index].Answers[3].Text);
      };

      $scope.quizz = {
        Text: $scope.TextQuiz,
        Name: $scope.valueSubject,
        Mark: "1",
        AnswerId: $scope.AnswerId,
        Answers: [
            { "Id": $scope.AnswerId1, "Text": $scope.AnswerText1 },
            { "Id": $scope.AnswerId2, "Text": $scope.AnswerText2 },
            { "Id": $scope.AnswerId3, "Text": $scope.AnswerText3 },
            { "Id": $scope.AnswerId4, "Text": $scope.AnswerText4 }
        ]
    }

    $scope.onSubmitForm = function (event) {
      event.preventDefault();

      $http.post(api, $scope.quizz).then(response => {
        $scope.questions.unshift(response.data)
      }).catch(err => {
        log.error(err)
      })
    }
})