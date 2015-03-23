'use strict';

var db = require('../models'),
    NodePDF = require('nodepdf');

function getHTML(obj) {
  var _ = '';
  for(var i = 0; i < obj.length; i++){
    _ = _ + '<strong>Código: </strong>' + obj[i].Produto.codigo + '<br>';
    _ = _ + '<strong>Descricao: </strong>' + obj[i].Produto.descricao + '<br>';
    _ = _ + '<strong>Valor: </strong>' + obj[i].Produto.valor + '<br>';
    _ = _ + '<strong>Valido até: </strong>' + getFormatDataPDF(obj[i].Promocao.dataTermino) + '<br><br>';
  }
  return _;
};

function getFormatDataPDF(data){
  if(!data){
    return '';
  }
  data = data.toString();
  return data.slice(6, 8) + '/' + data.slice(4, 6) + '/' + data.slice(0, 4);;
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

exports.createPDF = function(req, res, next) {
  var data = getFormatData(new Date()),
      condicao = [
        {
          model: db.Produto,
          attributes: [ 'codigo', 'descricao', 'valor' ]
        }, {
          model: db.Promocao,
        }
      ],
      _produtos = [],
      _array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'aa', 'bb', 'cc', 'dd', 'ee'];

  for(var i = 0; i < _array.length; i++){
    if(req.param(_array[i])){
      _produtos.push(parseInt(req.param(_array[i])))
    }
  }

  db.Promocao.findAll({
    order: 'dataInicio DESC',
    where: ["? >= dataInicio and ? <= dataTermino", data, data],
    attributes: ['id']
  }).success(function(entityPromocao) {
    var promocoes = [];
    for(var i = 0; i < entityPromocao.length; i++){
      promocoes.push(entityPromocao[i].id);
    };
    db.Association.findAll({
      where: {
        PromocaoId: promocoes,
        ProdutoId: _produtos
      },
      attributes: ['id'],
      order: 'Produto.descricao ASC',
      include: condicao
    }).success(function(entityAssociation) {

      var pdf = new NodePDF(null, 'public/pdf/pdf-favoritos-' + Math.floor((Math.random() * 100) + 1) + '.pdf', {
        'content': getHTML(entityAssociation),
        'viewportSize': {
          'width': 1440,
          'height': 900
        }
      });

      pdf.on('error', function(error){
        res.json({ success: 0, message: error });
      });

      pdf.on('done', function(pathToFile){
        res.sendfile(pathToFile);
      });

    });
  });
};