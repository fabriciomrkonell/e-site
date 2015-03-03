define(['js/app'], function (app) {
  app.controller('password', ['$scope', '$http', function($scope, $http) {

    function clear(){
      angular.extend($scope, {
        dados: {
          password: '',
          novo: ''
        }
      });
    };

    clear();

    $scope.salvar = function(dados){
      $http.post('/api/user/password', dados).success(function(data){
        alert(data.message);
        clear();
      });
    };

  }]);
});