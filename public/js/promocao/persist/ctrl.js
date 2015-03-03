define(['js/app'], function (app) {
  app.controller('persistPromocao', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

    function getFormatDataInicio(dados){
      return dados.dataInicioAno + '' + dados.dataInicioMes + '' + dados.dataInicioDia;
    };

    function getFormatDataTermino(dados){
      return dados.dataTerminoAno + '' + dados.dataTerminoMes + '' + dados.dataTerminoDia;
    };

    function getFloatDate(data){
      data = data.toString();
      if(data.length == 1){
        return "0" + data;
      }
      return data;
    };

    function clear(){
      var _data = new Date();
      angular.extend($scope, {
        dados: {
          id: '',
          descricao: '',
          dataInicioDia: getFloatDate(_data.getDate()),
          dataInicioMes: getFloatDate(_data.getMonth() + 1),
          dataInicioAno: _data.getFullYear(),
          dataTerminoDia: getFloatDate(_data.getDate()),
          dataTerminoMes: getFloatDate(_data.getMonth() + 1),
          dataTerminoAno: _data.getFullYear()
        }
      });
    };

    angular.extend($scope, {
      update: false
    });

    if($routeParams.id != undefined){
      angular.extend($scope, {
        update: true
      });
      $http.get("/api/promocao/" + $routeParams.id).success(function(data){
        data = data.data;
        angular.extend($scope, {
          dados: {
            id: data.id,
            descricao: data.descricao,
            dataInicioDia: data.dataInicio.toString().slice(6, 8),
            dataInicioMes: data.dataInicio.toString().slice(4, 6),
            dataInicioAno: data.dataInicio.toString().slice(0, 4),
            dataTerminoDia: data.dataTermino.toString().slice(6, 8),
            dataTerminoMes: data.dataTermino.toString().slice(4, 6),
            dataTerminoAno: data.dataTermino.toString().slice(0, 4)
          }
        });
        /*data = data.data;
        angular.extend($scope, {
          dados: {
            id: data.id,
            descricao: data.descricao,
            dataInicio: new Date(data.dataInicio),
            dataTermino: new Date(data.dataTermino)
          }
        });*/
      });
    }else{
      clear();
    };

    $scope.persistir = function(dados){
      var persist = {
        id: dados.id,
        descricao: dados.descricao,
        dataInicio: getFormatDataInicio(dados),
        dataTermino: getFormatDataTermino(dados)
      };
      $http.post("/api/promocao", persist).success(function(response){
        alert(response.message);
        if($routeParams.id != undefined){
          window.location = "#consulta-promocao";
        }else{
          clear();
        };
      });
    };
  }]);
});