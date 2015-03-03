'use strict';

var db = require('../models'),
    fs = require('fs'),
    util = require('util'),
    formidable = require('formidable');

function valid(loja){
  if(!loja.nome){
    return false;
  }
  if(!loja.telefone){
    return false;
  }
  if(!loja.email){
    return false;
  }
  if(!loja.email){
    return false;
  }
  if(!loja.atendimento){
    return false;
  }
  if(!loja.gerente){
    return false;
  }
  return true;
};

exports.persist = function(req, res, next) {
  db.Loja.find({
    where: {
      id: req.body.id
    }
  }).success(function(entity) {
    if(entity){
      entity.updateAttributes(req.body).success(function() {
        res.json({ success: 1, message: "Loja atualizada com sucesso!" });
      });
    }else{
      if(valid(req.body)){
        db.Loja.create(req.body).success(function(entityLojaSalva) {
          res.json({ success: 1, message: "Loja salva com sucesso!", data: entityLojaSalva.id });
        });
      }else{
        res.json({ success: 0, message: "Favor preencher todos os campos!" });
      }
    }
  });
};

exports.getById = function(req, res, next) {
  db.Loja.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id', 'nome', 'telefone', 'email', 'atendimento', 'gerente', 'imagem1']
  }).success(function(entity) {
    if (entity) {
      res.json({ success: 1, data: entity });
    } else {
      res.json({ success: 0, message: "Loja não encontrada!" });
    }
  })
};

exports.getAll = function(req, res, next) {
  db.Loja.findAll({
    attributes: ['id', 'nome', 'telefone', 'email', 'atendimento', 'gerente', 'imagem1']
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  })
};

exports.setImagem = function(req, res, next, __dirname){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    fs.readFile(util.inspect(files.image.path).replace("'", "").replace("'", ""), function (err, data) {
      var nameArquivo = util.inspect(files.image.name).replace("'", "").replace("'", "");
      var novo = "/img/lojas/" + req.param('id') + ".png";
      fs.writeFile(__dirname + "/public" + novo, data, function (err) {
        db.Loja.find({ where: { id: req.param('id') } }).success(function(entity) {
          if (entity) {
            entity.updateAttributes({ imagem1: novo }).success(function(entitySalvo) {
              res.json({ success: 1, message: entitySalvo });
            })
          } else {
            res.json({ success: 0, message: "Loja não encontada!" });
          }
        });
      });
    });
  });
};