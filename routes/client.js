'use strict';

var db = require('../models'),
    site = require('../configs/site');

function valid(curriculo) {
  if(!curriculo.nome){
    return false;
  }
  if(!curriculo.email){
    return false;
  }
  return true;
};

exports.salvar = function(req, res, next) {
  if(valid(req.body)){
    db.Client.create(req.body).success(function(entity) {
      site.cadastre(req, res, next, "Cadastro efetuado com sucesso!", {});
    }).error(function(error){
      site.cadastre(req, res, next, error, req.body);
    });
  }else{
    site.cadastre(req, res, next, "Favor preencher os campos obrigatórios!", req.body);
  }
};
