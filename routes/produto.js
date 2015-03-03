'use strict';

var db = require('../models'),
    fs = require('fs'),
    util = require('util'),
    formidable = require('formidable'),
    produtos = [],
    _produtoAtual = 0;

function getValorProduto(valor){
  return parseFloat(valor).toFixed(2).toString().replace(".", ",");
};

function end(ultimo, codigo, _entity, _res, _promocao, _data){
  produtos.push({ PromocaoId: _promocao, ProdutoId: parseInt(_entity.id) });
  if(ultimo == codigo){
    _produtoAtual = 0;
    db.Promocao.find({
      where: {
        id: _promocao
      }
    }).success(function(entityPromocao) {
      if (entityPromocao) {
        db.Association.destroy({
          where: {
            PromocaoId: entityPromocao.id
          }
        }).success(function(){
          db.Association.bulkCreate(produtos).then(function() {
            entityPromocao.updateAttributes({ totalProdutos: produtos.length }).success(function() {
              _res.json({ success: 1, message: "Produtos adicionados com sucesso!" });
              produtos = null;
              produtos = [];
            })
          });
        });
      }else{
        _res.json({ success: 0, message: "Promoção não encontrada!" });
      }
    });
  }else{
    _produtoAtual = _produtoAtual + 1;
    persist(_data[_produtoAtual][0], _data[_produtoAtual], _data[_data.length - 1][0], _produtoAtual, _data.length, _promocao, _res, _data);
  }
}

function persist(codigo, data, ultimo, atual, total, _promocao, _res, _produtoTodos) {
  db.Produto.find({
    where: {
      codigo: codigo
    }
  }).success(function(entity) {
    if (entity) {
      entity.updateAttributes({ valor: getValorProduto(data[3]) }).success(function(entityProdutoSalvo) {
        end(ultimo, codigo, entityProdutoSalvo, _res, _promocao, _produtoTodos);
      })
    } else {
      var _produto = {
        codigo: codigo,
        descricao: data[1],
        valor: getValorProduto(data[3]),
        DepartamentoId: parseInt(data[2])
      };
      db.Produto.create(_produto).success(function(entityProdutoNovo) {
        end(ultimo, codigo, entityProdutoNovo, _res, _promocao, _produtoTodos);
      }).error(function(error){
        produtos = null;
        produtos = [];
        _produtoAtual = 0;
        _res.json({ success: 0, data: data[1] });
      });
    }
  });
};

exports.getAll = function(req, res, next) {
  db.Produto.findAll({
    attributes: ['id', 'codigo', 'descricao', 'valor']
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  })
};

exports.persist = function(codigo, data, ultimo, atual, total, _promocao, _res, _produtoTodos) {
  persist(codigo, data, ultimo, atual, total, _promocao, _res, _produtoTodos);
};

exports.excluir = function(req, res, next) {
  db.Produto.find({
    where: {
      id: req.param('id')
    }
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({ success: 1, message: "Produto excluído com secesso!" });
      })
    } else {
      res.json({ success: 0, message: "Produto não encontrado!" });
    }
  })
}

exports.autocomplete = function(req, res, next) {
  db.Produto.findAll({
    where: "codigo LIKE '%" + req.param('exp') + "%'",
    attributes: ['id', 'codigo', 'descricao', 'valor', 'imagem'],
    limit: 10,
    include: [ { model: db.Departamento, attributes: [ 'descricao' ] } ]
  }).success(function(entities) {
    res.json(entities);
  })
}

exports.autocompleteNaoFavorito = function(req, res, next) {
  db.Produto.findAll({
    where: "codigo LIKE '%" + req.param('exp') + "%' and favorito = 0",
    attributes: ['id', 'codigo', 'descricao', 'valor', 'imagem'],
    limit: 10,
    include: [ { model: db.Departamento, attributes: [ 'descricao' ] } ]
  }).success(function(entities) {
    res.json(entities);
  })
}

exports.getById = function(req, res, next) {
  db.Produto.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id', 'codigo', 'descricao', 'valor', 'imagem'],
    include: [ { model: db.Departamento, attributes: [ 'descricao' ] } ]
  }).success(function(entity) {
    if(entity){
       res.json({ success: 1, data: entity });
    }else{
      res.json({ success: 0, message: "Produto não encontrado!" });
    }
  })
}

exports.update = function(req, res, next) {
  db.Produto.find({
    where: {
      id: req.body.id
    }
  }).success(function(entity) {
    if(entity){
      entity.updateAttributes({
        valor: req.body.valor,
        descricao: req.body.descricao
      }).success(function(){
        res.json({ success: 1, message: "Produto atualizado com sucesso!" });
      })
    }else{
      res.json({ success: 0, message: "Produto não encontrado!" });
    }
  });
};

exports.setImagem = function(req, res, next, __dirname){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    fs.readFile(util.inspect(files.image.path).replace("'", "").replace("'", ""), function (err, data) {
      var nameArquivo = util.inspect(files.image.name).replace("'", "").replace("'", "");
      var novo = "/img/produtos/" + req.param('id') + ".png";
      fs.writeFile(__dirname + "/public" + novo, data, function (err) {
        db.Produto.find({ where: { id: req.param('id') } }).success(function(entity) {
          if (entity) {
            entity.updateAttributes({ imagem: novo }).success(function(entitySalvo) {
              res.json({ success: 1, message: entitySalvo });
            })
          } else {
            res.json({ success: 0, message: "Produto não encontado!" });
          }
        });
      });
    });
  });
};

exports.favoritos = function(req, res, next) {
  db.Produto.findAll({
    where: {
      favorito: 1
    },
    attributes: [ 'id', 'codigo', 'descricao', 'valor']
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  });
};

exports.persistFavorito = function(req, res, next) {
  db.Produto.find({
    where: {
      id: req.param('id')
    }
  }).success(function(entity) {
    if(entity){
      var favorito = 0;
      if(entity.favorito == 0){
        favorito = 1;
      }
      entity.updateAttributes({ favorito: favorito }).success(function(entitySalvo) {
        res.json({ success: 1, message: "Produto atualizado com sucesso!" });
      })
    }else{
      res.json({ success: 0, message: "Produto não encontado!" });
    }
  });
};