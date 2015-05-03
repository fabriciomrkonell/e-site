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

  $scope.gerarPDF = function(obj) {
    var doc = new jsPDF();
    doc.setFontSize(30);
    doc.text(15, 20, "Currículo");
    doc.setFontSize(16);

    // Nome
    doc.setFontType("bold");
    doc.text(15, 40, "Nome: ");
    doc.setFontType("normal");
    doc.text(35, 40, obj.nome  || "");

    //Email
    doc.setFontType("bold");
    doc.text(15, 48, "Email: ");
    doc.setFontType("normal");
    doc.text(34, 48, obj.email || "");

    //Nascimento
    doc.setFontType("bold");
    doc.text(15, 56, "Nascimento: ");
    doc.setFontType("normal");
    doc.text(51, 56, obj.nascimento  || "");

    //Sexo
    doc.setFontType("bold");
    doc.text(120, 56, "Sexo: ");
    doc.setFontType("normal");
    doc.text(137, 56, $scope.getSexo(obj.sexo));

    //Cidade
    doc.setFontType("bold");
    doc.text(15, 64, "Cidade: ");
    doc.setFontType("normal");
    doc.text(38, 64, obj.cidade || "");

    //Estado
    doc.setFontType("bold");
    doc.text(120, 64, "Estado: ");
    doc.setFontType("normal");
    doc.text(143, 64, obj.estado || "");

    //Telefone
    doc.setFontType("bold");
    doc.text(15, 75, "Telefone: ");
    doc.setFontType("normal");
    doc.text(42, 75, obj.telefone || "");

    //Celular
    doc.setFontType("bold");
    doc.text(120, 75, "Celular: ");
    doc.setFontType("normal");
    doc.text(142, 75, obj.celular || "");

    //Faixa salárial
    doc.setFontType("bold");
    doc.text(15, 86, "Faixa salárial: ");
    doc.setFontType("normal");
    doc.text(54, 86, $scope.getSalario(obj.salarioAtual));

    //Pretenção salárial
    doc.setFontType("bold");
    doc.text(15, 94, "Pretenção salarial: ");
    doc.setFontType("normal");
    doc.text(67, 94, $scope.getSalario(obj.pretensao));

   //Cargo desejado
    doc.setFontType("bold");
    doc.text(15, 105, "Cargo desejado: ");
    doc.setFontType("normal");
    doc.text(61, 105, obj.cargo || "");

    //Nível hierárquico
    doc.setFontType("bold");
    doc.text(15, 113, "Nível hierárquico: ");
    doc.setFontType("normal");
    doc.text(65, 113, $scope.getHierarquico(obj.hierarquico));

    //Área profissional
    doc.setFontType("bold");
    doc.text(15, 121, "Área profissional: ");
    doc.setFontType("normal");
    doc.text(65, 121, $scope.getArea(obj.area));

    //Trabalha atualmente
    doc.setFontType("bold");
    doc.text(120, 121, "Trabalha atualmente: ");
    doc.setFontType("normal");
    doc.text(178, 121, $scope.getTrabalha(obj.trabalha));

    if(obj.outrasEmpresas != null){
      doc.setFontType("bold");
      doc.text(15, 132, "Empresas: ");
      doc.setFontType("normal");
      doc.text(15, 139, doc.splitTextToSize(obj.outrasEmpresas, 190))
    }

    doc.save("curriculo_" + obj.nome + ".pdf");
  };

  $scope.excluir = function(id, index) {
    var _confirm = confirm("Deseja realmente excluir?");
    if(_confirm){
      $http.delete("/api/curriculo/" + id).success(function(data){
        $scope.dados.splice(index, 1);
      });
    }
  };

  }]);
});