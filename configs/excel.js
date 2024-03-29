'use strict';

var db = require('../models'),
    excelParser = require('node-xlsx'),
    produto = require('../routes/produto'),
    formidable = require('formidable');

exports.persist = function(req, res, next){
  var form = new formidable.IncomingForm(),
      dados = [], flag;
  form.parse(req, function(err, fields, files) {
    if(files.excel.size == 0){
      res.json({ success: 0, message: "Excel inválido!" });
    };
    var data = excelParser.parse(files.excel.path);
    data = data[0].data;
    if(data.length == 0){
      res.json({ success: 0, message: "Excel sem produtos!" });
    }
    if(err) throw err;
    for(var i = 0; i < data.length; i++){
      if(parseInt(data[i][0])){
        flag = true;
        for(var j = 0; j < dados.length; j++){
          if(data[i][0] == dados[j][0]){
            flag = false;
          }
        }
        if(flag){
          dados.push(data[i])
        }
      };
    };
    produto.persist(dados[0][0], dados[0], dados[dados.length - 1][0], 0, dados.length, req.param('id'), res, dados);
    dados = null;
    dados = [];
  });
};