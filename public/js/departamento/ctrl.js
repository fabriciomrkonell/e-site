define(['js/app'], function (app) {
  app.controller('Departamento', ['$scope', '$http', function($scope, $http) {

    angular.extend($scope, {
      dados: []
    });

    $http.get('/api/departamento').success(function(data) {
      angular.extend($scope, {
        dados: data.data
      });
    })
  }]);
});
