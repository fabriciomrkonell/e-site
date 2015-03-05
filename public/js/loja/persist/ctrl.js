define(['js/app'], function (app) {
  app.controller('persistLoja', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    function clear(){
      angular.extend($scope, {
        update: false,
        dados: {
          id: '',
          nome: '',
          email: '',
          telefone: '',
          gerente: '',
          atendimento: ''
        }
      });
    };

    $scope.salvar = function(dados){
      $http.post("/api/loja", dados).success(function(data){
        alert(data.message);
        if($routeParams.id != undefined){
          window.location = "#/consulta-loja";
        }else{
          window.location = "#/update-loja/" + data.data;
        };
      });
    };

    if($routeParams.id != undefined){
      $scope.update = true;
      $http.get("/api/loja/" + $routeParams.id).success(function(data){
        $scope.dados = data.data;
      });
    }else{
      clear();
    };

  }]);
});