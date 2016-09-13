angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal

})
.controller('TestCtrl', function($scope, Data) {
    $scope.places = Data.getPlaces();
    $scope.colNames = Data.getColNames();

    // Test default name & columns
    $scope.query = {
        name: $scope.places[0],
        colName1: $scope.colNames[4],
        colName2: $scope.colNames[5]
    }

    $scope.updateData = function() {
        $scope.result = Data.getNumbers($scope.query.name, $scope.query.colName1, $scope.query.colName2);
    }

})
.controller('BrowseCtrl', function($scope) {
    $scope.test = "test";

});
