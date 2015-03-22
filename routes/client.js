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

exports.getAll = function(req, res, next) {
  db.Client.findAll({
    attributes: [ 'id', 'nome', 'email', 'telefone' ],
    order: 'nome ASC'
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  });
};

exports.excluir = function(req, res, next) {
  db.Client.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id']
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({ success: 1, message: "Cliente excluído com sucesso!" });
      });
    }else{
      res.json({ success: 0, message: "Cliente não encontrado!" });
    }
  })
};