define(['js/app'], function (app) {
  app.controller('Curriculo', ['$scope', '$http', function($scope, $http) {

  angular.extend($scope, {
    dados: []
  });

  $http.get('/api/curriculo').success(function(data){
    angular.extend($scope, {
      dados: data.data
    });
  });

  $scope.getSalario = function(pretencao){
    if(pretencao == '0950_1100'){
      return 'R$ 950,00 - R$ 1.100,00';
    }else if(pretencao == '1100_1300'){
      return 'R$ 1.100,00 - R$ 1.300,00 ';
    }else if(pretencao == '1300_1500'){
      return 'R$ 1.300,00 - R$ 1.500,00';
    }else if(pretencao == '1500_2000'){
      return 'R$ 1.500,00 - R$ 2.000,00';
    }else if(pretencao == '2000_3000'){
      return 'R$ 2.000,00 - R$ 3.000,00';
    }else if(pretencao == '3000_4000'){
      return 'R$ 3.000,00 - R$ 4.000,00';
    }else if(pretencao == '4000_5000'){
      return 'R$ 4.000,00 - R$ 5.000,00';
    }else{
      return '';
    }
  };

  $scope.getSexo = function(sexo){
    if(sexo == '1'){
      return 'Masculino';
    }else{
      return 'Feminino';
    }
  };

  $scope.getTrabalha = function(trabalha){
    if(trabalha == '1'){
      return 'Sim';
    }else{
      return 'Não';
    }
  };

  $scope.getArea = function(area){
    if(area == '1'){
      return 'Reposição';
    }else if(area == '2'){
      return 'Empacotamento';
    }else if(area == '3'){
      return 'Operação de caixa';
    }else if(area == '4'){
      return 'Depósito';
    }else if(area == '5'){
      return 'Açougue';
    }else if(area == '6'){
      return 'Padaria';
    }else if(area == '7'){
      return 'Administrativo';
    }else if(area == '8'){
      return 'Liderança';
    }else{
      return '';
    }
  };

  $scope.getHierarquico = function(hierarquico){
    if(hierarquico == '1'){
      return 'Loja';
    }else if(hierarquico == '2'){
      return 'Administrativo';
    }else if(hierarquico == '3'){
      return 'Gerência';
    }else if(hierarquico == '4'){
      return 'Liderança';
    }else{
      return '';
    }
  };

  $scope.gerarPDF = function(id) {
    window.open('/api/curriculo/pdf/' + id);
  };

  }]);
});
