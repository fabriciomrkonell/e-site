define(['js/app'], function (app) {
  app.controller('editPromocao', ['$scope', '$http', '$routeParams', '$window', function($scope, $http, $routeParams, $window) {

    angular.extend($scope, {
      expressao: '',
      loader: true,
      dados: {},
      produtos: []
    });

    function getAll(){
      $http.get("/api/promocao/all/" + $routeParams.id).success(function(data){
        $scope.dados = data.data.promocao;
        $scope.produtos = data.data.produtos;
        $scope.loader = false;
      });
    }

    getAll();

    function clear(){
      $scope.expressao = '';
    };

    $scope.getFormatData = function(data){
      if(!data){
        return '';
      }
      data = data.toString();
      return data.slice(6, 8) + '/' + data.slice(4, 6) + '/' + data.slice(0, 4);;
    };

    $scope.existeExpressao = function(){
      return angular.isObject($scope.expressao);
    };

    $scope.excluir = function(id, index){
      $http.delete("/api/promocao/produto/" + id).success(function(data){
        $scope.produtos.splice(index, 1);
        clear();
      });
    };

    $scope.adicionar = function(obj){
      for(var i = 0; i < $scope.produtos.length; i++){
        if($scope.produtos[i].Produto.codigo == obj.originalObject.codigo){
          return alert("Esse produto já pertence a essa promoção!");
        }
      }
      $http.post("/api/promocao/produto", {
        "promocao": $scope.dados.id,
        "produto": obj.originalObject.id
      }).success(function(data){
        alert(data.message);
        getAll();
        clear();
      })
    }

  }]);
});