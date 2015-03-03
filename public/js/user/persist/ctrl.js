define(['js/app'], function (app) {
  app.controller('persistUser', ['$scope', '$http', function($scope, $http) {

    function clear(){
      $http.get("/api/user/all").success(function(data){
        angular.extend($scope, {
          dados: data.data,
          user: {
            nome: '',
            email: '',
            type: '2'
          }
        });
      });
    };

    clear();

    $scope.getUserType = function(type){
      if(type == 1){
        return "Administrador";
      }
      if(type == 2){
        return "Vendas e compras";
      }
      if(type == 3){
        return "Recursos humanos";
      }
    };

    $scope.excluir = function(id){
      $http.delete('/api/user/' + id).success(function(){
        clear();
      });
    };

    $scope.salvar = function(dados){
      $http.post("/api/user/create", dados).success(function(data){
        alert(data.message);
        clear();
      });
    };

  }]);
});