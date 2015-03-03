define(['js/app'], function (app) {
  app.controller('persistProduto', ['$scope', '$http', '$routeParams', '$timeout', function($scope, $http, $routeParams, $timeout) {

    angular.extend($scope, {
      dados: {},
      produto: '',
      update: false
    });

    if($routeParams.id != undefined){
      $http.get("/api/produto/" + $routeParams.id).success(function(data){
        $scope.produto = {
          "title": data.data.codigo,
          "description": "",
          "image": "",
          "originalObject": data.data
        };
      });
    };

    $scope.toogleShow = function(status){
      $scope.update = !status;
    };

    $scope.existeProdutoSelecionado = function(produto){
      if(produto){
        return angular.isObject(produto.originalObject);
      }
      return false;
    };

    $scope.salvar = function(dados){
      $http.post('/api/produto', dados).success(function(data){
        alert(data.message);
      });
    };

    $scope.submit = function(produto){
      document.myForm.action = '/api/imagem/produto/' + produto;
      $('#myForm').ajaxSubmit({
        dataType: 'text',
        error: function(xhr) {
          window.location.reload();
          return;
        },
        success: function(response) {
          if(response.error) {
            window.location.reload();
            return;
          }
          if($routeParams.id){
            window.location.reload();
          }
          window.location = '#/cadastro-produto/' + produto;
        }
      });
    };

  }]);
});
