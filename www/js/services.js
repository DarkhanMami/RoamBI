angular.module('starter.services', [])

.factory('Static', function () {
    return {
      testData: function () {
          return {
              "data": "this is a test"
          }
      }
    }
});
