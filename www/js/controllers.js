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


.controller("BarCtrl", function($scope, Data, $ionicLoading) {

    $scope.colNames = Data.getColNames();
    $scope.places = Data.getPlaces(1, $scope.colNames[3], $scope.colNames[5]);
    $scope.date = "1/01/2016";

    // Test default name & columns
    $scope.query = {
        name: $scope.places[0].name,
        colName1: $scope.colNames[3],
        colName2: $scope.colNames[5]
    }

    $scope.b2 = Data.getSingleData($scope.query.name, 1, "Сдача нефти", "добыча нефти");
    $scope.b3 = Data.getSingleData($scope.query.name, 1, "Рас. т/р", "техрежим");
    $scope.b4 = Data.getSingleData($scope.query.name, 1, "зам. доб. с нак", "Доб. ж. по рез. с нак.");


    $scope.onClick = function (points, evt) {
      $scope.places = Data.getPlaces(points[1]._index + 1, $scope.query.colName1, $scope.query.colName2);

      $scope.date = "" + (points[1]._index + 1) + "/01/2016";
      $scope.b2 = Data.getSingleData($scope.query.name, points[1]._index + 1, "Сдача нефти", "добыча нефти");
      $scope.b3 = Data.getSingleData($scope.query.name, points[1]._index + 1, "Рас. т/р", "техрежим");
      $scope.b4 = Data.getSingleData($scope.query.name, points[1]._index + 1, "зам. доб. с нак", "Доб. ж. по рез. с нак.");  


      $scope.$apply();
    };


    $scope.updateData = function(name, colName1, colName2) {
/*
        $ionicLoading.show({
          duration: 500,
          template: '<ion-spinner icon="ios"></ion-spinner>'
        });
*/

        $scope.result = Data.getNumbers(name, colName1, colName2);
        $scope.query.colName1 = colName1;
        $scope.query.colName2 = colName2;

        $scope.data = [
          $scope.result.r1,
          $scope.result.r2
        ];

        //$scope.series = [colName1, colName2];

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
          "display": false,
          "position": "top"
        }

  };

    }


   $scope.updateDataTest3 = function(name, colName1, colName2) {

        $scope.query.colName1 = colName1;
        $scope.query.colName2 = colName2;

        $scope.data = [
          [28, 48, 40, 19, 86, 27, 90, 45, 22, 35, 28, 48, 40, 19, 86, 27, 90, 45, 22, 35, 28, 48, 40, 19, 86, 27, 90, 45, 22, 35],
          [65, 59, 80, 81, 56, 55, 40, 84, 32, 14, 65, 59, 80, 81, 56, 55, 40, 84, 32, 14, 65, 59, 80, 81, 56, 55, 40, 84, 32, 14]
        ];

        //$scope.series = [colName1, colName2];

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


   $scope.updateDataTest4 = function(name, colName1, colName2) {

        $scope.query.colName1 = colName1;
        $scope.query.colName2 = colName2;

        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40, 84, 32, 14, 65, 59, 80, 81, 56, 55, 40, 84, 32, 14, 65, 59, 80, 81, 56, 55, 40, 84, 32, 14],
          [28, 48, 40, 19, 86, 27, 90, 45, 22, 35, 28, 48, 40, 19, 86, 27, 90, 45, 22, 35, 28, 48, 40, 19, 86, 27, 90, 45, 22, 35]
        ];

        //$scope.series = [colName1, colName2];

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

      $scope.b2 = Data.getSingleData($scope.query.name, 1, "Сдача нефти", "добыча нефти");
      $scope.b3 = Data.getSingleData($scope.query.name, 1, "Рас. т/р", "техрежим");
      $scope.b4 = Data.getSingleData($scope.query.name, 1, "зам. доб. с нак", "Доб. ж. по рез. с нак.");  
    }


  $scope.result = Data.getNumbers($scope.query.name, $scope.query.colName1, $scope.query.colName2);



  $scope.labels = ['1', '', '', '', '5', '', '','', '', '10', '', '', '', '', '15', '', '', '', '', '20', '','', '', '', '25', '', '', '', '', '30', ''];

  $scope.series = [$scope.query.colName1, $scope.query.colName2];

  $scope.data = [
    $scope.result.r1,
    $scope.result.r2
  ];


  $scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];


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
    "display": false,
    "position": "top"
  }

  };





});
