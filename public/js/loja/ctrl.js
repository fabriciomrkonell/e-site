define(['js/app'], function (app) {
  app.controller('Loja', ['$scope', '$http', function($scope, $http) {

    angular.extend($scope, {
      dados: []
    });

    $http.get('/api/loja').success(function(data) {
      angular.extend($scope, {
        dados: data.data
      });
    });

  }]);
});
