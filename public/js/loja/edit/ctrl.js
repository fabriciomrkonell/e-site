define(['js/app'], function (app) {
  app.controller('editLoja', ['$scope', '$http', '$window', '$routeParams', function($scope, $http, $window, $routeParams) {

    angular.extend($scope, {
      dados: []
    });

    $http.get('/api/loja/imagem/' + $routeParams.id ).success(function(data) {
      angular.extend($scope, {
        dados: data.data
      });
    });

    $scope.submit = function(id, loja){
      var form = 'myForm' + loja;
      document[form].action = '/api/imagem/loja/imagem' + loja + '/' + id;
      $("#" + form).ajaxSubmit({
        dataType: 'text',
        error: function(xhr) {
          window.location.reload();
        },
        success: function(response) {
          window.location.reload();
        }
      });
    };

  }]);
});