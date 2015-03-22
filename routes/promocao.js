'use strict';

var db = require('../models');

function valid(promocao){
  if(!promocao.descricao){
    return false;
  }
  if(!promocao.dataInicio){
    return false;
  }
  if(!promocao.dataTermino){
    return false;
  }
  return true;
};

function getFormatData(data){
  var retorno = data.getFullYear();
  if(parseInt(data.getMonth() + 1) < 10){
    retorno = retorno + "0" + parseInt(data.getMonth() + 1);
  }else{
    retorno = retorno + parseInt(data.getMonth() + 1);
  }
  if(parseInt(data.getDate()) < 10){
    retorno = retorno + "0" + parseInt(data.getDate());
  }else{
    retorno = retorno + parseInt(data.getDate());
  }
  return parseInt(retorno);
};

exports.persist = function(req, res, next) {
  db.Promocao.find({
    where: {
      id: req.body.id
    },
    attributes: ['id', 'descricao', 'dataInicio', 'dataTermino', 'totalProdutos']
  }).success(function(entity) {
    if(valid(req.body)){
      if(entity){
        entity.updateAttributes(req.body).success(function(entity) {
          res.json({ success: 1, message: "Promoção atualizada com sucesso!" });
        })
      }else{
        db.Promocao.create(req.body).success(function(entity) {
          res.json({ success: 1, message: "Promoção criada com sucesso!" });
        });
      }
    }else{
      res.json({ success: 0, message: "Favor preencher todos os campos!" });
    }
  });
};

exports.getAll = function(req, res, next) {
  var data = getFormatData(new Date());
  db.Promocao.findAll({
    order: 'dataInicio DESC',
    limit: 10,
    where: [ "dataInicio > ?", data],
    attributes: ['id', 'descricao', 'dataInicio', 'dataTermino', 'totalProdutos']
  }).success(function(entitiesProximasPromocao) {
    db.Promocao.findAll({
      order: 'dataInicio ASC',
      where: ["? >= dataInicio and ? <= dataTermino", data, data],
      attributes: ['id', 'descricao', 'dataInicio', 'dataTermino', 'totalProdutos']
    }).success(function(entitiesAtuaisPromocao){
      res.json({
        success: 1,
        data: {
          proximas: entitiesProximasPromocao,
          atuais: entitiesAtuaisPromocao
        }
      });
    });
  });
};

exports.excluir = function(req, res, next) {
  db.Promocao.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id']
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({ success: 1, message: "Promoção excluida com secesso!" });
      })
    } else {
      res.json({ success: 0, message: "Promoção não encontrada!" });
    }
  });
};

exports.getById = function(req, res, next) {
  db.Promocao.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id', 'descricao', 'dataInicio', 'dataTermino', 'totalProdutos']
  }).success(function(entity) {
    if (entity) {
      res.json({ success: 1, data: entity });
    } else {
      res.json({ success: 0, message: "Promoção não encontrada!" });
    }
  })
};

exports.getAllById = function(req, res, next) {
  db.Promocao.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id', 'descricao', 'dataInicio', 'dataTermino', 'totalProdutos']
  }).success(function(entityPromocao) {
    if (entityPromocao) {
      db.Association.findAll({
        where: {
          PromocaoId: entityPromocao.id
        },
        attributes: ['id'],
        order: 'Produto.descricao ASC',
        include: [ {
          model: db.Produto,
          attributes: [ 'id', 'descricao', 'valor', 'codigo', 'imagem'],
          order: 'Produto.id ASC'
        } ]
      }).success(function(entityAssociation) {
        res.json({ success: 1, data: { promocao: entityPromocao, produtos: entityAssociation } });
      });
    } else {
      res.json({ success: 0, message: "Promoção não encontrada!" });
    }
  })
};


exports.excluirProduto = function(req, res, next) {
  db.Association.find({
    where: {
      id: req.param('id')
    }
  }).success(function(entity){
    if(entity){
      entity.destroy().success(function(){
        db.Promocao.find({
          where: {
            id: entity.PromocaoId
          }
        }).success(function(entityPromocao){
          entityPromocao.updateAttributes({ totalProdutos: entityPromocao.totalProdutos - 1 }).success(function(){
            res.json({ success: 1, message: "Produto excluído da promoção!" });
          })
        });
      });
    }else{
      res.json({ success: 0, message: "Associação não encontrada!" });
    }
  });
};

exports.adicionarProduto = function(req, res, next) {
  db.Association.create({
    ProdutoId: req.body.produto,
    PromocaoId: req.body.promocao
  }).success(function() {
    db.Promocao.find({
      where: {
        id: req.body.promocao
      }
    }).success(function(entityPromocao) {
      entityPromocao.updateAttributes({ totalProdutos: entityPromocao.totalProdutos + 1 }).success(function(){
        res.json({ success: 1, message: "Produto adicionado a promoção com sucesso!" });
      })
    });
  }).error(function(){
    res.json({ success: 0, message: "Promoção ou produto não encontrados!" });
  });
};