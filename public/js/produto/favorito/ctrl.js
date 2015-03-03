define(['js/app'], function (app) {
  app.controller('favoritoProduto', ['$scope', '$http', function($scope, $http) {

    function getFavoritos(){
      $http.get("/api/produtos/favoritos").success(function(data){
        $scope.dados = data.data;
      });
    };

    getFavoritos();

    angular.extend($scope, {
      dados: [],
      produto: ''
    });

    $scope.$watch('produto', function(newValue, oldValue){
      if(angular.isObject(newValue)){
        $scope.toogleFavorito(newValue.originalObject.id)
      }else{
        $scope.produto = '';
      }
    });

    $scope.toogleFavorito = function(produto){
      $http.post("/api/produtos/favoritos/" + produto).success(function(data){
        getFavoritos();
      });
    };

  }]);
});
