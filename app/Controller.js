var app = angular.module("myApp", ["ngRoute"]);


app.controller("myCtrl", function ($scope, $rootScope, $location) {
  
});

app.run(function ($rootScope, $http, $timeout) {
  const apiSubject = 'https://62138df189fad53b1ff8d6aa.mockapi.io/subjects'
  $http.get(apiSubject).then(function (response) {
    $rootScope.Subjects = response.data;
  });

  const api = "https://62138df189fad53b1ff8d6aa.mockapi.io/Students";
  $http.get(api).then(function (response) {
    $rootScope.students = response.data;
    // console.log(response);
  });

  $rootScope.student = JSON.parse(localStorage.getItem('users'));
  
  $rootScope.logout = function () {
    $rootScope.student = null;
    $rootScope.password = null;
    $rootScope.indexStudent = -1;
    Swal.fire({
      icon: "warning",
      title: "Đăng xuất thành công !",
      text: "Quay lại trang chủ!",
      showConfirmButton: false,
      closeOnClickOutside: false,
      allowOutsideClick: false,
      timer: 1600,
    });
    localStorage.removeItem('users');
  };

});

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/homePage", { templateUrl: "../template/index.html" })
    .when("/about", { templateUrl: "../template/about.html" })
    .when("/feedback", { templateUrl: "../template/feedback.html" })
    .when("/information/:id", { templateUrl: "../template/informationExam.html",})
    .when("/learning", { templateUrl: "../template/learning.html" })
    .when("/list-exam", { templateUrl: "../template/list-exam.html" })
    .when("/listQuestion/:id", { templateUrl: "../template/listQuestion.html" })
    .when("/Contact", { templateUrl: "../template/Contact.html" })
    .when("/profile", { templateUrl: "../template/profile.html" })
    .when("/history", { templateUrl: "../template/history.html" })
    .when("/administration", { templateUrl: "../template/User-Administration.html"})
    .when("/subjectAdministration", { templateUrl: "../template/subject-administration.html"})
    .when("/quizzAdministration", { templateUrl: "../template/quizz-administration.html"})
    
    .otherwise({ redirectTo: "/list-exam" });
});

app.run(function ($rootScope) {
  $rootScope.$on("$routeChangeStart", function () {
    $rootScope.loading = true;
  });
  $rootScope.$on("$routeChangeSuccess", function () {
    $rootScope.loading = false;
  });

  $rootScope.$on("$routeChangeError", function () {
    $rootScope.loading = false;
    alert("Lỗi, không tải được template");
  });
});
