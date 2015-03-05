'use strict';

define(['angularAMD', 'angular-route', 'angular-sanitize', 'autocomplete'], function(angularAMD) {

  var app = angular.module("app", ['ngRoute', 'ngSanitize', 'angucomplete']);

  app.config(function ($routeProvider, $locationProvider, $httpProvider) {

     $routeProvider.when("/home", angularAMD.route({
      templateUrl: '/views/home!' + Math.random(),
      permission: [0,1,2,3]
    })).when("/meus-dados", angularAMD.route({
      templateUrl: '/views/user!' + Math.random(),
      controller: 'user',
      controllerUrl: 'js/user/ctrl',
      permission: [1,2,3]
    })).when("/meus-dados-password", angularAMD.route({
      templateUrl: '/views/password/user!' + Math.random(),
      controller: 'password',
      controllerUrl: 'js/user/password/ctrl',
      permission: [1,2,3]
    })).when("/novo-usuario", angularAMD.route({
      templateUrl: '/views/persist/user!' + Math.random(),
      controller: 'persistUser',
      controllerUrl: 'js/user/persist/ctrl',
      permission: [1]
    })).when("/cadastro-departamento", angularAMD.route({
      templateUrl: '/views/persist/departamento!' + Math.random(),
      controller: 'persistDepartamento',
      controllerUrl: 'js/departamento/persist/ctrl',
      permission: [1,2]
    })).when("/cadastro-promocao", angularAMD.route({
      templateUrl: '/views/persist/promocao!' + Math.random(),
      controller: 'persistPromocao',
      controllerUrl: 'js/promocao/persist/ctrl',
      permission: [1,2]
    })).when("/cadastro-loja", angularAMD.route({
      templateUrl: '/views/persist/loja!' + Math.random(),
      controller: 'persistLoja',
      controllerUrl: 'js/loja/persist/ctrl',
      permission: [1,2]
    })).when("/banner-home", angularAMD.route({
      templateUrl: '/views/persist/banner!' + Math.random(),
      controller: 'persistBanner',
      controllerUrl: 'js/banner/persist/ctrl',
      permission: [1,2]
    })).when("/update-promocao/:id", angularAMD.route({
      templateUrl: '/views/persist/promocao!' + Math.random(),
      controller: 'persistPromocao',
      controllerUrl: 'js/promocao/persist/ctrl',
      permission: [1,2]
    })).when("/update-departamento/:id", angularAMD.route({
      templateUrl: '/views/persist/departamento!' + Math.random(),
      controller: 'persistDepartamento',
      controllerUrl: 'js/departamento/persist/ctrl',
      permission: [1,2]
    })).when("/update-loja/:id", angularAMD.route({
      templateUrl: '/views/persist/loja!' + Math.random(),
      controller: 'persistLoja',
      controllerUrl: 'js/loja/persist/ctrl',
      permission: [1,2]
    })).when("/edit-promocao/:id", angularAMD.route({
      templateUrl: '/views/edit/promocao!' + Math.random(),
      controller: 'editPromocao',
      controllerUrl: 'js/promocao/edit/ctrl',
      permission: [1,2]
    })).when("/cadastro-promocao-produto-excel/:id", angularAMD.route({
      templateUrl: '/views/excel/promocao!' + Math.random(),
      controller: 'excelPromocao',
      controllerUrl: 'js/promocao/excel/ctrl',
      permission: [1,2]
    })).when("/consulta-promocao", angularAMD.route({
      templateUrl: '/views/promocao!' + Math.random(),
      controller: 'Promocao',
      controllerUrl: 'js/promocao/ctrl',
      permission: [1,2]
    })).when("/consulta-departamento", angularAMD.route({
      templateUrl: '/views/departamento!' + Math.random(),
      controller: 'Departamento',
      controllerUrl: 'js/departamento/ctrl',
      permission: [1,2]
    })).when("/consulta-loja", angularAMD.route({
      templateUrl: '/views/loja!' + Math.random(),
      controller: 'Loja',
      controllerUrl: 'js/loja/ctrl',
      permission: [1,2]
    })).when("/cadastro-produto", angularAMD.route({
      templateUrl: '/views/persist/produto!' + Math.random(),
      controller: 'persistProduto',
      controllerUrl: 'js/produto/persist/ctrl',
      permission: [1,2]
    })).when("/cadastro-produto/:id", angularAMD.route({
      templateUrl: '/views/persist/produto!' + Math.random(),
      controller: 'persistProduto',
      controllerUrl: 'js/produto/persist/ctrl',
      permission: [1,2]
    })).when("/consulta-produto", angularAMD.route({
      templateUrl: '/views/produto!' + Math.random(),
      controller: 'Produto',
      controllerUrl: 'js/produto/ctrl',
      permission: [1,2]
    })).when("/produtos-favoritos", angularAMD.route({
      templateUrl: '/views/favorito/produto!' + Math.random(),
      controller: 'favoritoProduto',
      controllerUrl: 'js/produto/favorito/ctrl',
      permission: [1,2]
    })).when("/candidatos-vagas", angularAMD.route({
      templateUrl: '/views/curriculo!' + Math.random(),
      controller: 'Curriculo',
      controllerUrl: 'js/curriculo/ctrl',
      permission: [1,3]
    })).otherwise({ redirectTo: "/home" });

    var interceptor = function($window){
      function success(response){
        if(response.data.success == 2){
          return error(response);
        }
        if(response.data.success == 0){
          return error(response);
        }
        return response;
      };
      function error(response) {
        if(response.data.success == 2){
          alert(response.data.message || 'Falha na autenticação!');
          window.location = '/admin';
        }
        if(response.data.success == 0){
          alert(response.data.message);
        }
      };
      return function(promise) {
        return promise.then(success, error);
      }
    }
    $httpProvider.responseInterceptors.push(interceptor);
  });

  app.controller("homeCtrl", function($scope, $rootScope, $window){

    $rootScope.$watch('grupo', function(newValue, oldValue){
      angular.extend($scope, {
        grupo: newValue
      });
    });

    $scope.temAcesso = function(tela, grupo){
      for(var i = 0; i < tela.length; i++){
        if(parseInt(tela[i]) == parseInt(grupo)){
          return true;
        }
      }
      return false;
    };

    $scope.sair = function(){
      $window.location.href = "/logout";
    };
  });

  app.run(function($rootScope, $templateCache, $http, $location) {

    var tela = [];
    var passou = null;

    angular.extend($rootScope, {
      grupo: 0
    })

    $http.get("/api/user").success(function(data){
      angular.extend($rootScope, {
        grupo: data.type,
      });
      document.getElementById("my-nav").style.display = "";
    }).error(function(){
      $location.path("/");
    });

    $rootScope.$on("$routeChangeStart", function(event, toState, toParams, fromState, fromParams){
      if(toState.$$route){
        tela = toState.$$route.permission;
      }
      passou = true;
      if($rootScope.grupo == 0){
        passou = false;
      }else{
        for(var i = 0; i < tela.length; i++){
          if(tela[i] == $rootScope.grupo){
            passou = false;
            i = tela.length;
          }
        }
      }
      if(passou){
        $location.path("/home");
      }
    });

    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });
  });

  return angularAMD.bootstrap(app);
});