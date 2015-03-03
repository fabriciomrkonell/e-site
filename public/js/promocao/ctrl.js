define(['js/app'], function (app) {
  app.controller('Promocao', ['$scope', '$http', function($scope, $http) {

    angular.extend($scope, {
      dados: []
    });

    $scope.getFormatData = function(data){
      data = data.toString();
      return data.slice(6, 8) + '/' + data.slice(4, 6) + '/' + data.slice(0, 4);;
    };

    $scope.excluir = function(id, index, promocao){
      $http.delete('/api/promocao/' + id).success(function(data){
        alert(data.message);
        $scope.dados[promocao].splice(index, 1);
      });
    };

    $http.get('/api/promocao').success(function(data) {
      angular.extend($scope, {
        dados: data.data
      });
    });

  }]);
});
