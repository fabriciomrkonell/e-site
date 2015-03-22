define(['js/app'], function (app) {
  app.controller('Cliente', ['$scope', '$http', function($scope, $http) {

  angular.extend($scope, {
    dados: []
  });

  $http.get('/api/cliente').success(function(data){
    angular.extend($scope, {
      dados: data.data
    });
  });

  $scope.excluir = function(id, index) {
    var _confirm = confirm("Deseja realmente excluir?");
    if(_confirm){
      $http.delete("/api/cliente/" + id).success(function(data){
        $scope.dados.splice(index, 1);
      });
    }
  };

  }]);
});
