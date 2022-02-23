app.controller('listExamCtrl', function($scope, $rootScope) {
    $scope.cout = 0;
    $scope.pageCount = Math.ceil($rootScope.Subjects.length / 8);
    $scope.prev = function() {
        if ($scope.cout > 0) {
            $scope.cout -= 8;
        }
    }
    $scope.next = function() {
        if ($scope.cout < ($scope.pageCount - 1) * 8) {
            $scope.cout += 8;
        }
    }
});