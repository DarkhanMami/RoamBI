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

    $scope.colNames = Data.getColNames();

    console.log($scope.colNames[4]);

    $scope.places = Data.getPlaces(1, $scope.colNames[4], $scope.colNames[5]);

    // Test default name & columns
    $scope.query = {
        name: $scope.places[0],
        colName1: $scope.colNames[4],
        colName2: $scope.colNames[5]
    }

    $scope.b2 = Data.getSingleData("UAZ_005U", 31, "Сдача нефти", "добыча нефти");
    $scope.b3 = Data.getSingleData("UAZ_005U", 31, "Рас. т/р", "техрежим");
    $scope.b4 = Data.getSingleData("UAZ_005U", 31, "зам. доб. с нак", "Доб. ж. по рез. с нак.");


    $scope.updateData = function() {
        $scope.result = Data.getNumbers($scope.query.name, $scope.query.colName1, $scope.query.colName2);
    }

    $scope.raw_selected = function(name) {
      $scope.query.name = name;
      $scope.result = Data.getNumbers(name, $scope.query.colName1, $scope.query.colName2);
    }

})


.controller("BarCtrl", function($scope, Data) {

    $scope.colNames = Data.getColNames();
    $scope.places = Data.getPlaces(1, $scope.colNames[3], $scope.colNames[5]);
    $scope.date = "1/01/2016";

    // Test default name & columns
    $scope.query = {
        name: $scope.places[0].name,
        colName1: $scope.colNames[3],
        colName2: $scope.colNames[5]
    }

    $scope.onClick = function (points, evt) {
      $scope.places = Data.getPlaces(points[1]._index + 1, $scope.query.colName1, $scope.query.colName2);

      $scope.date = "" + (points[1]._index + 1) + "/01/2016";
      $scope.$apply();
    };


    $scope.updateData = function(name, colName1, colName2) {
        $scope.result = Data.getNumbers(name, colName1, colName2);
        $scope.query.colName1 = colName1;
        $scope.query.colName2 = colName2;

        $scope.data = [
          $scope.result.r1,
          $scope.result.r2
        ];

        $scope.series = [colName1, colName2];

        $scope.places = Data.getPlaces(1, colName1, colName2);


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
          },


          "legend": {
          "display": true,
          "position": "top"
        }

  };

    }

    $scope.raw_selected = function(name) {
      $scope.query.name = name;
      $scope.result = Data.getNumbers(name, $scope.query.colName1, $scope.query.colName2);
      $scope.data = [
          $scope.result.r1,
          $scope.result.r2
        ];
    }


  $scope.result = Data.getNumbers($scope.query.name, $scope.query.colName1, $scope.query.colName2);



  $scope.labels = ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21','22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  $scope.series = [$scope.query.colName1, $scope.query.colName2];

  $scope.data = [
    $scope.result.r1,
    $scope.result.r2
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
    },


    "legend": {
    "display": true,
    "position": "top"
  }

  };
});
