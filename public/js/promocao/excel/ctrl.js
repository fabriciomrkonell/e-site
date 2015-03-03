define(['js/app'], function (app) {
  app.controller('excelPromocao', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams) {

    function getFormatData(data){
      data = data.toString();
      return data.slice(6, 8) + '/' + data.slice(4, 6) + '/' + data.slice(0, 4);;
    };

    angular.extend($scope, {
      dados: [],
      upload: true
    });

    $http.get("/api/promocao/" + $routeParams.id).success(function(data){
      data = data.data;
      angular.extend($scope.dados, {
        id: data.id,
        descricao: data.descricao,
        dataInicio: getFormatData(data.dataInicio),
        dataTermino: getFormatData(data.dataTermino)
      });
    });

    $scope.submit = function(){
      $scope.erros = [];
      $scope.upload = false;
      document.myForm.action = '/api/promocao/excel/' + $routeParams.id;
      $("#myForm").ajaxSubmit({
        dataType: 'text',
        error: function(xhr) {
          $scope.upload = true;
          window.location.reload();
          return;
        },
        success: function(response) {
          $scope.upload = true;
          response = $.parseJSON(response);
          if(response.success == 0) {
            $scope.erros.push(response.data);
            $scope.$digest();
            return false;
          }
          window.location = '#/consulta-promocao';
        }
      });
    };

  }]);
});