angular.module('starter.controllers', ['chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state) {

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

.controller('NalogyCtrl', function($scope, NalogyData, $ionicPopover, $state, $ionicHistory) {
    $scope.show = false;
    var promise = NalogyData.init();
    // $scope.currentMonth = "";
    promise.then(function(greeting) {
        run();

    }, function(reason) {
        console.log(reason);
    });

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
     });

    $scope.goTo = function(stateName) {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $scope.popover.hide();
      $state.go(stateName);
    }

    $scope.updateYear2 = function(newYear2) {
        console.log(newYear2);
        $scope.year2 = newYear2;
        $scope.years1 = [newYear2 - 1];
        $scope.year1 = newYear2 - 1;
        // $scope.years1 = [$scope.year1];
        $scope.updateGraph();
        $scope.data = [
          $scope.result.r1,
          $scope.result.r2,
          $scope.result.r9,
          $scope.result.r10
        ];
        // $scope.lastyear2 = $scope.result.r10[$scope.result.r10.length - 1];
    }


    $scope.currentMonthIndex = 0;

    $scope.onClick = function (points, evt) {
    //   console.log(points[1]._index);
      $scope.currentMonthIndex = points[1]._index;
      $scope.currentMonth = $scope.monthes[points[1]._index];
      $scope.updateGraph();
      $scope.$apply();
    };

    $scope.updateGraph = function() {
        console.log('updating graph');
        console.log($scope.year1);
        console.log($scope.year2);
        $scope.result = {
            r1: NalogyData.filter($scope.year1, $scope.query.name, 0),
            r2: NalogyData.filter($scope.year2, $scope.query.name, 0),
            r3: NalogyData.filter($scope.year1, $scope.query.name, 1),
            r4: NalogyData.filter($scope.year2, $scope.query.name, 1),
            r5: NalogyData.filter($scope.year1, $scope.query.name, 2),
            r6: NalogyData.filter($scope.year2, $scope.query.name, 2),
            r7: NalogyData.filter($scope.year1, $scope.query.name, 3),
            r8: NalogyData.filter($scope.year2, $scope.query.name, 3),
            r9: NalogyData.filter($scope.year1, $scope.query.name, 4),
            r10: NalogyData.filter($scope.year2, $scope.query.name, 4)
        }

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r1[$scope.currentMonthIndex],
            v2: $scope.result.r2[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];


          if ($scope.pretitle == "Налоговая нагрузка") {
              $scope.selectedItem = {
                name: $scope.query.name,
                v1: $scope.result.r1[$scope.currentMonthIndex],
                v2: $scope.result.r2[$scope.currentMonthIndex]
              };
          } else if ($scope.pretitle == "Налоги, (нарас.) млн.тг") {
              $scope.selectedItem = {
                name: $scope.query.name,
                v1: $scope.result.r3[$scope.currentMonthIndex],
                v2: $scope.result.r4[$scope.currentMonthIndex]
              };
          } else if ($scope.pretitle == "Доход, млн.тг") {
              $scope.selectedItem = {
                name: $scope.query.name,
                v1: $scope.result.r5[$scope.currentMonthIndex],
                v2: $scope.result.r6[$scope.currentMonthIndex]
              };
          } else if ($scope.pretitle == "Доход, (нарас.) млн.тг") {
              $scope.selectedItem = {
                name: $scope.query.name,
                v1: $scope.result.r7[$scope.currentMonthIndex],
                v2: $scope.result.r8[$scope.currentMonthIndex]
              };
          };




          $scope.b1 = {
              v1: $scope.result.r1[$scope.currentMonthIndex],
              v2: $scope.result.r2[$scope.currentMonthIndex]
          };
          $scope.b2 = {
              v1: $scope.result.r3[$scope.currentMonthIndex],
              v2: $scope.result.r4[$scope.currentMonthIndex]
          };
          $scope.b3 = {
              v1: $scope.result.r5[$scope.currentMonthIndex],
              v2: $scope.result.r6[$scope.currentMonthIndex]
          };
          $scope.b4 = {
              v1: $scope.result.r7[$scope.currentMonthIndex],
              v2: $scope.result.r8[$scope.currentMonthIndex]
          };


        $scope.labels = ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль','авг', 'сен', 'окт', 'ноя', 'дек'];

        $scope.series = [$scope.query.colName, $scope.query.colName];

        for (i in $scope.result.r9) {
            if ($scope.result.r9[i]) {
                $scope.lastyear1 = $scope.result.r9[i];
            }
        }
        for (i in $scope.result.r10) {
            if ($scope.result.r10[i]) {
                $scope.lastyear2 = $scope.result.r10[i];

            }
        }

        $scope.lastyear2;

        console.log($scope.result);

    }

    var run = function() {

      $scope.companies = NalogyData.getCompanies();
      var years = NalogyData.getYears();
      $scope.years = years.slice(0, years.length - 1);
    //   console.log($scope.years);
      $scope.monthes = NalogyData.getMonthes();
      $scope.year1 = 2015;
      $scope.years1 = [2015];
      $scope.year2 = 2016;

      $scope.query = {
          name: $scope.companies[0],
      }

      $scope.pretitle = 'Налоговая нагрузка';

      $scope.currentMonth = NalogyData.getMonthes()[0];

      $scope.height = screen.height / 36;

      $scope.updateGraph();

      $scope.data = [
        $scope.result.r1,
        $scope.result.r2,
        $scope.result.r9,
        $scope.result.r10
      ];
      for (i in $scope.result.r9) {
          if ($scope.result.r9[i]) {
              $scope.lastyear1 = $scope.result.r9[i];
          }
      }
      for (i in $scope.result.r10) {
          if ($scope.result.r10[i]) {
              $scope.lastyear2 = $scope.result.r10[i];
          }
      }
    //   $scope.lastyear2 = $scope.result.r10[$scope.result.r10.length - 1];

      $scope.colors = [
                          {
                              backgroundColor: '#00cc00',
                              borderColor: '#00cc66',
                              hoverBackgroundColor: '#A2DED0',
                              hoverBorderColor: '#A2DED0'
                          },
                          {
                              backgroundColor: '#0066ff',
                              borderColor: '#3366ff',
                              hoverBackgroundColor: '#65C6BB',
                              hoverBorderColor: '#65C6BB'
                          },
                          {

                              borderColor: '#006600'
                          },
                          {
                              borderColor: '#0000cc'
                          },

                      ];


        $scope.datasetOverride = [{ yAxisID: 'y-axis-1',type: 'bar' }, { yAxisID: 'y-axis-1',type: 'bar' }, { yAxisID: 'y-axis-2', type: 'line' }, { yAxisID: 'y-axis-2',type: 'line'}];
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
                position: 'right',
                // elements: {
                //     line: {
                //         fill: false,
                //         skipNull: true,
                //         drawNull: false,
                //     }
                // }
              }
            ]
          },


          "legend": {
          "display": false,
          "position": "top"
        }

      };

      $scope.updateData = function() {
        $scope.data = [
          $scope.result.r1,
          $scope.result.r2,
          $scope.result.r9,
          $scope.result.r10
        ];

        // $scope.lastyear2 = $scope.result.r10[$scope.result.r10.length - 1];

        $scope.selectedItem.v1 = $scope.result.r1[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r2[$scope.currentMonthIndex];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r1[$scope.currentMonthIndex],
            v2: $scope.result.r2[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.options.scales.yAxes[1].display = true;
        $scope.pretitle = 'Налоговая нагрузка';
      }

      $scope.updateData2 = function() {
        $scope.data = [
          $scope.result.r3,
          $scope.result.r4
        ];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r3[$scope.currentMonthIndex],
            v2: $scope.result.r4[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.selectedItem.v1 = $scope.result.r3[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r4[$scope.currentMonthIndex];

        $scope.options.scales.yAxes[1].display = false;
        $scope.pretitle = 'Налоги, (нарас.) млн.тг';
      }
      $scope.updateData3 = function() {
        $scope.data = [
          $scope.result.r5,
          $scope.result.r6
        ];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r5[$scope.currentMonthIndex],
            v2: $scope.result.r6[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.selectedItem.v1 = $scope.result.r5[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r6[$scope.currentMonthIndex];

        $scope.options.scales.yAxes[1].display = false;
        $scope.pretitle = 'Доход, млн.тг';
      }

      $scope.updateData4 = function() {
        $scope.data = [
          $scope.result.r7,
          $scope.result.r8
        ];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r7[$scope.currentMonthIndex],
            v2: $scope.result.r8[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.selectedItem.v1 = $scope.result.r7[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r8[$scope.currentMonthIndex];

        $scope.options.scales.yAxes[1].display = false;
        $scope.pretitle = 'Доход, (нарас.) млн.тг';
      }



      $scope.show = true;
    }


})

.controller('YearNalogyCtrl', function($scope, NalogyData, $ionicPopover, $state, $ionicHistory) {
    $scope.show = false;
    var promise = NalogyData.init();
    // $scope.currentMonth = "";
    promise.then(function(greeting) {
        run();

    }, function(reason) {
        console.log(reason);
    });

    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
     });

    $scope.goTo = function(stateName) {
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $scope.popover.hide();
      $state.go(stateName);
    }



    $scope.currentMonthIndex = 0;

    $scope.onClick = function (points, evt) {
    //   console.log(points[1]._index);
      $scope.currentMonthIndex = points[1]._index;
      $scope.currentMonth = $scope.monthes[points[1]._index];
      $scope.updateGraph();
      $scope.$apply();
    };

    $scope.updateGraph = function() {
        console.log('updating graph');
        console.log($scope.year1);
        console.log($scope.year2);
        $scope.result = {
            r1: [340749, 378332, 273947, 220564],
            r2: [183193, 158765, 67224, 43847],
            r3: [54, 42, 25, 20],
            r4: [210230, 176245, 78600, 52340],
            r5: [183193, 158765, 67224, 43847],
            r6: [87, 90, 86, 84],
            r7: [183193, 158765, 67224, 43847],
            r8: [23000, 24120, 22560, 15900],
            r9: [13, 15, 34, 36]
        }


          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r1[$scope.currentMonthIndex],
            v2: $scope.result.r2[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];


          $scope.selectedItem = {
              name: $scope.query.name,
              v1: $scope.result.r1[$scope.currentMonthIndex],
              v2: $scope.result.r2[$scope.currentMonthIndex]
          };


          $scope.b1 = {
              v1: $scope.result.r1[$scope.currentMonthIndex],
              v2: $scope.result.r2[$scope.currentMonthIndex]
          };
          $scope.b2 = {
              v1: $scope.result.r4[$scope.currentMonthIndex],
              v2: $scope.result.r5[$scope.currentMonthIndex]
          };
          $scope.b3 = {
              v1: $scope.result.r7[$scope.currentMonthIndex],
              v2: $scope.result.r8[$scope.currentMonthIndex]
          };


            $scope.labels = ['2013', '2014', '2015', '2016 (янв-окт)'];

            $scope.series = [$scope.query.colName, $scope.query.colName];

            $scope.data = [
              $scope.result.r3,
              $scope.result.r1,
              $scope.result.r2

            ];


        console.log($scope.result);
    }

    var run = function() {

      $scope.companies = NalogyData.getCompanies();
      $scope.years = NalogyData.getYears();
      $scope.monthes = ['2013', '2014', '2015', '2016 (янв-окт)'];


      $scope.query = {
          name: $scope.companies[0],
      }

      $scope.pretitle = 'Налоговая нагрузка';

      $scope.currentMonth = 2013;

      $scope.height = screen.height / 36;

      $scope.updateGraph();

      $scope.colors = [
                          {

                              borderColor: '#ff0b7a'
                          },
                          {
                              backgroundColor: '#00cc00',
                              borderColor: '#00cc66',
                              hoverBackgroundColor: '#A2DED0',
                              hoverBorderColor: '#A2DED0'
                          },
                          {
                              backgroundColor: '#0066ff',
                              borderColor: '#3366ff',
                              hoverBackgroundColor: '#65C6BB',
                              hoverBorderColor: '#65C6BB'
                          }


                      ];


        $scope.datasetOverride = [{ yAxisID: 'y-axis-1', type: 'line' }, { yAxisID: 'y-axis-2',type: 'bar' }, { yAxisID: 'y-axis-2',type: 'bar' }];
        $scope.options = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'right',
              },
              {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'left'
              }

            ]
          },


          "legend": {
          "display": false,
          "position": "top"
        }

      };

      $scope.updateData = function() {
        $scope.data = [
          $scope.result.r3,
          $scope.result.r1,
          $scope.result.r2,
        ];

        $scope.selectedItem.v1 = $scope.result.r1[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r2[$scope.currentMonthIndex];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r1[$scope.currentMonthIndex],
            v2: $scope.result.r2[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.options.scales.yAxes[1].display = true;
        $scope.pretitle = 'Налоговая нагрузка';
      }

      $scope.updateData2 = function() {
        $scope.data = [
          $scope.result.r6,
          $scope.result.r4,
          $scope.result.r5,

        ];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r4[$scope.currentMonthIndex],
            v2: $scope.result.r5[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.selectedItem.v1 = $scope.result.r4[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r5[$scope.currentMonthIndex];

        $scope.options.scales.yAxes[1].display = false;
        $scope.pretitle = 'Начисленные и выплаченные';
      }
      $scope.updateData3 = function() {
        $scope.data = [
          $scope.result.r9,
          $scope.result.r7,
          $scope.result.r8,

        ];

          $scope.places = [{
            name: $scope.companies[0],
            v1: $scope.result.r7[$scope.currentMonthIndex],
            v2: $scope.result.r8[$scope.currentMonthIndex]
          },
          {
            name: 'КПН'
          },
          {
            name: 'НДС'
          },
          {
            name: 'Соц. налоги'
          },
          {
            name: 'НДПИ'
          },
          {
            name: 'Штрафы'
          },
          {
            name: 'Пени'
          }

          ];

        $scope.selectedItem.v1 = $scope.result.r7[$scope.currentMonthIndex];
        $scope.selectedItem.v2 = $scope.result.r8[$scope.currentMonthIndex];

        $scope.options.scales.yAxes[1].display = false;
        $scope.pretitle = 'Расходы по фиксированным';
      }


      $scope.show = true;
    }


})

.controller("BarCtrl", function($scope, Data, $ionicLoading, $http, $timeout) {
    $scope.show = false;
    var promise = Data.init();
    // $scope.currentMonth = "";
    promise.then(function(greeting) {
        run();

    }, function(reason) {
        console.log(reason);
    });

    var run = function() {
        $scope.colNames = Data.getColNames();
        console.log('getting places');
        $scope.places = Data.getPlaces(1, $scope.colNames[3], $scope.colNames[5]);


        // Test default name & columns
        $scope.query = {
            name: $scope.places[0].name,
            colName1: $scope.colNames[3],
            colName2: $scope.colNames[5]
        }

        $scope.b1 = Data.getSingleData($scope.query.name, 1, "Замер", "Резервуар");
        $scope.b2 = Data.getSingleData($scope.query.name, 1, "Сдача нефти", "добыча нефти");
        $scope.b3 = Data.getSingleData($scope.query.name, 1, "Рас. т/р", "техрежим");
        $scope.b4 = Data.getSingleData($scope.query.name, 1, "зам. доб. с нак", "Доб. ж. по рез. с нак.");

        $scope.height = screen.height / 36;

        $scope.onClick = function (points, evt) {
          $scope.places = Data.getPlaces(points[1]._index + 1, $scope.query.colName1, $scope.query.colName2);

          $scope.date = "" + (points[1]._index + 1) + "/01/2016";
          $scope.b1 = Data.getSingleData($scope.query.name, points[1]._index + 1, "Замер", "Резервуар");
          $scope.b2 = Data.getSingleData($scope.query.name, points[1]._index + 1, "Сдача нефти", "добыча нефти");
          $scope.b3 = Data.getSingleData($scope.query.name, points[1]._index + 1, "Рас. т/р", "техрежим");
          $scope.b4 = Data.getSingleData($scope.query.name, points[1]._index + 1, "зам. доб. с нак", "Доб. ж. по рез. с нак.");
          $scope.currentDay = points[1]._index + 1;
          $scope.selectedItem = Data.getSingleData($scope.query.name, points[1]._index + 1, $scope.query.colName1, $scope.query.colName2);
          $scope.selectedItem["name"] = $scope.query.name;

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
            $scope.currentDay = 1;
            $scope.places = Data.getPlaces(1, colName1, colName2);
            console.log('looping');
            angular.forEach($scope.places, function(value, key) {
              if (value.name == name) {
                  $scope.selectedItem = {
                      "name": name,
                      "v1": value.v1,
                      "v2": value.v2,
                  }
              }
            }, null);


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


        $scope.updateData($scope.query.name, $scope.query.colName1, $scope.query.colName2);

        $scope.raw_selected = function(name) {
            console.log('seleted ' + name);
          $scope.query.name = name;
          $scope.result = Data.getNumbers(name, $scope.query.colName1, $scope.query.colName2);
          console.log($scope.result);
          $scope.data = [
              $scope.result.r1,
              $scope.result.r2
            ];
            angular.forEach($scope.places, function(value, key) {
              if (value.name == name) {
                  $scope.selectedItem = {
                      "name": name,
                      "v1": value.v1,
                      "v2": value.v2,
                  }
              }
            }, null);
          $scope.b1 = Data.getSingleData($scope.query.name, 1, "Замер", "Резервуар");
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


      //$scope.colors = ['#72C02C', '#3498DB', '#717984', '#F1C40F'];

    $scope.colors = [
                        {
                            backgroundColor: '#00cc00',
                            borderColor: '#00cc66',
                            hoverBackgroundColor: '#A2DED0',
                            hoverBorderColor: '#A2DED0'
                        },
                        {
                            backgroundColor: '#0066ff',
                            borderColor: '#3366ff',
                            hoverBackgroundColor: '#65C6BB',
                            hoverBorderColor: '#65C6BB'
                        },

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
        "display": false,
        "position": "top"
      }

      };


      $scope.show = true;
      $scope.monthes = Data.getMonthes();
      if (!$scope.currentMonth) {
          $scope.currentDay = "1";
         $scope.currentMonth = Data.getMonthes()[0]
     }

    }

    $scope.updateMonth = function(newMonth) {
        console.log(newMonth);
        $scope.currentMonth = newMonth;
        console.log('updating month');
        console.log('new month');
        console.log($scope.currentMonth);
        Data.setCurrentMonth($scope.currentMonth);
        $scope.show = false;
        run();


    }


});
