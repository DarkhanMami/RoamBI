angular.module('starter.controllers', ['chart.js'])

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

})


.controller("BarCtrl", function ($scope) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
});
