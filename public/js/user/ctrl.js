define(['js/app'], function (app) {
  app.controller('user', ['$scope', '$http', function($scope, $http){

    angular.extend($scope, {
      dados: {
        nome: '',
        email: ''
      }
    });

    $http.get('/api/user').success(function(data) {
      angular.extend($scope, {
        dados: data
      });
    });

    $scope.salvar = function(dados){
      $http.post('/api/user', dados).success(function(data) {
        alert(data.message);
      })
    };

  }]);
});
