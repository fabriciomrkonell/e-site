define(['js/app'], function (app) {
  app.controller('Produto', ['$scope', '$http', function($scope, $http) {

    angular.extend($scope, {
      produto: '',
      order: 'codigo',
      dados: []
    });

    $http.get("/api/produto").success(function(data){
      angular.extend($scope, {
        dados: data.data
      });
    });

    $scope.excluir = function(codigo, index){
      $http.delete("/api/produto/" + codigo).success(function(data){
        for(var i = 0; i < $scope.dados.length; i++){
          if($scope.dados[i].id == codigo){
            $scope.dados.splice(i, 1);
            i = $scope.dados.length;
          }
        };
      });
    };

  }]);
});
