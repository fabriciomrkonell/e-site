'use strict';

var db = require('../models'),
    fs = require('fs'),
    util = require('util'),
    formidable = require('formidable');

exports.getAll = function(req, res, next) {
  db.Banner.findAll({
      attributes: ['id', 'imagem']
    }).success(function(entities) {
    res.json({ success: 1, data: entities });
  })
};

exports.persist = function(req, res, next) {
  db.Banner.create(req.body).success(function(entity) {
    res.json({ success: 1, data: entity });
  });
};

exports.excluir = function(req, res, next) {
  db.Banner.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id']
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({ success: 1, message: "Banner excluído com sucesso!" });
      });
    } else {
      res.json({ success: 0, message: "Banner não encontrado!" });
    }
  })
};

exports.setImagem = function(req, res, next, __dirname){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    fs.readFile(util.inspect(files.image.path).replace("'", "").replace("'", ""), function (err, data) {
      var nameArquivo = util.inspect(files.image.name).replace("'", "").replace("'", "");
      var novo = "/img/banners/" + req.param('id') + ".png";
      fs.writeFile(__dirname + "/public" + novo, data, function (err) {
        db.Banner.find({ where: { id: req.param('id') } }).success(function(entity) {
          if (entity) {
            entity.updateAttributes({ imagem: novo }).success(function(entitySalvo) {
              res.json({ success: 1, message: entitySalvo });
            })
          } else {
            res.json({ success: 0, message: "Banner não encontado!" });
          }
        });
      });
    });
  });
};