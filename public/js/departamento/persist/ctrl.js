define(['js/app'], function (app) {
  app.controller('persistDepartamento', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    function clear(){
      angular.extend($scope, {
        update: false,
        dados: {
          id: '',
          descricao: '',
          mensagem: ''
        }
      });
    };

    if($routeParams.id != undefined){
      $scope.update = true;
      $http.get("/api/departamento/" + $routeParams.id).success(function(data){
        $scope.dados = data.data;
      });
    }else{
      clear();
    };

    $scope.salvar = function(dados){
      $http.post("/api/departamento", dados).success(function(data){
        alert(data.message);
        if($routeParams.id != undefined){
          window.location = "#/consulta-departamento";
        }else{
          clear();
        };
      });
    };

  }]);
});