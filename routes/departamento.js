'use strict';

var db = require('../models'),
    fs = require('fs'),
    util = require('util'),
    formidable = require('formidable');

function valid(departamento){
  if(!departamento.descricao){
    return false;
  }
  return true;
};

exports.persist = function(req, res, next) {
  db.Departamento.find({
    where: {
      id: req.body.id
    }
  }).success(function(entity) {
    if(entity){
      entity.updateAttributes(req.body).success(function() {
        res.json({ success: 1, message: "Departamento atualizado com sucesso!" });
      });
    }else{
      if(valid(req.body)){
        db.Departamento.create(req.body).success(function(entityDepartamentoSalvo) {
          res.json({ success: 1, message: "Departamento salvo com sucesso!", data: entityDepartamentoSalvo.id });
        });
      }else{
        res.json({ success: 0, message: "Favor preencher todos os campos!" });
      }
    }
  });
};

exports.getById = function(req, res, next) {
  db.Departamento.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id', 'descricao', 'mensagem']
  }).success(function(entity) {
    if (entity) {
      res.json({ success: 1, data: entity });
    } else {
      res.json({ success: 0, message: "Departamento não encontrada!" });
    }
  })
};

exports.getAll = function(req, res, next) {
  db.Departamento.findAll({
    attributes: ['id', 'descricao', 'mensagem']
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  })
};