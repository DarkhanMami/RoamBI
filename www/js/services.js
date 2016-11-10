angular.module('starter.services', [])

.factory('Data', function ($http, $q) {
    var monthes = [];
    var colNames = [];
    var places = [];
    var fullData = {};
    var smartData = {};
    var currentMonth;
    var currentMonthNum = "01";
    var count = 0;
    // $http.get("monthes2.json").success(function (response) {
    //     monthes = response;
    //     currentMonth = monthes[0];
    //     count += 1;
    // });
    // $http.get("fullData2.json").success(function (response) {
    //     console.log('here');
    //     console.log(response);
    //     fullData = response;
    //     count += 1;
    // });
    // $http.get("colNames2.json").success(function (response) {
    //     colNames = response;
    //     count += 1;
    // });
    // $http.get("places2.json").success(function (response) {
    //     places = response;
    //     count += 1;
    // });
    //
    // $http.get("smartData2.json").success(function (response) {
    //     smartData = response;
    //     console.log(smartData);
    //     count += 1;
    // });
    var asyncInit = function() {
      // perform some asynchronous operation, resolve or reject the promise when appropriate.
      return $q(function(resolve, reject) {
          $http.get("monthes2.json").success(function (response) {
              monthes = response;
              currentMonth = monthes[0];
              $http.get("fullData2.json").success(function (response) {
                  
                  fullData = response;
                  $http.get("colNames2.json").success(function (response) {
                      colNames = response;
                      $http.get("places2.json").success(function (response) {
                          places = response;
                          $http.get("smartData2.json").success(function (response) {
                              smartData = response;


                              resolve("OK");
                          });
                      });
                  });
              });
          });





      });
    }
    return {
        init: asyncInit,
        setCurrentMonth: function(newMonth) {
            for (k in monthes) {
                if (monthes[k] == newMonth) {
                    k = +k + 1;

                    if (k < 10) {
                        currentMonthNum = "0"+k;
                    } else {
                        currentMonthNum = ""+k;
                    }
                    break;

                }
            }

            currentMonth = newMonth;
        },
        getCurrentMonth: function() {
            return currentMonth;
        },
        getMonthes: function() {
            return monthes;
        },
        getSingleData: function (name, day, colName1, colName2) {
            if (day < 10) {
                day = "0" + day
            }
            day = "" + day + "/"+currentMonthNum+"/2016"
            var col1 = -1;
            var col2 = -1;
            for (k in colNames) {
                if (colNames[k] == colName1) {
                    col1 = k;
                }
                if (colNames[k] == colName2) {
                    col2 = k;
                }
            }
            if (col1 == -1 || col2 == -1) {
                return {
                    "code": 1,
                    "message": "Wrong column names"
                }
            }

            var obj = {
                'v1': smartData[currentMonth + name + day][col1],
                'v2': smartData[currentMonth + name + day][col2],
            }
            return obj;
        },
      getPlaces: function (day, colName1, colName2) {
          if (day < 10) {
              day = "0" + day
          }
          day = "" + day + "/"+ currentMonthNum +"/2016"
          var col1 = -1;
          var col2 = -1;
          for (k in colNames) {
              if (colNames[k] == colName1) {
                  col1 = k;
              }
              if (colNames[k] == colName2) {
                  col2 = k;
              }
          }
          if (col1 == -1 || col2 == -1) {
              return {
                  "code": 1,
                  "message": "Wrong column names"
              }
          }
          var result = [];

          for (i in places) {
              var p = places[i];

              var obj = {
                  'name': p,
                  'v1': smartData[currentMonth + p + day][col1],
                  'v2': smartData[currentMonth + p + day][col2],
              }
              result.push(obj)
          }

          return result;
      },
      getColNames: function() {

          return colNames;
      },
      getNumbers: function(name, colName1, colName2) {
        var col1 = -1;
        var col2 = -1;
        for (k in colNames) {
            if (colNames[k] == colName1) {
                col1 = k;
            }
            if (colNames[k] == colName2) {
                col2 = k;
            }
        }
        if (col1 == -1 || col2 == -1) {
            return {
                "code": 1,
                "message": "Wrong column names"
            }
        }
        var r1 = [];
        var r2 = [];
        for (k in fullData[currentMonth]) {
            if (fullData[currentMonth][k][0] == name) {
                r1.push(fullData[currentMonth][k][col1]);
                r2.push(fullData[currentMonth][k][col2]);
            }
        }
        return {
            "code": 0,
            "message": "SUCCESS",
            "r1": r1,
            "r2": r2
        }
      }
    }
});
