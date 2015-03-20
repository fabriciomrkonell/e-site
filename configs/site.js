var db = require('../models'),
    sequelize = require('sequelize'),
    nodemailer = require('nodemailer');

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
  return retorno;
};

function setFormatData(data){
  data.setHours(0);
  data.setMinutes(0);
  data.setSeconds(0);
  return data;
};

exports.index = function(req, res, next) {
  db.Produto.findAll({
    where: {
      favorito: 1
    },
    attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId', 'stars' ]
  }).success(function(entityProdutos) {
    db.Banner.findAll({
      attributes: [ 'imagem' ]
    }).success(function(entityBanners) {
      db.Departamento.findAll({
        attributes: [ 'descricao', 'id' ],
        order: 'descricao ASC'
      }).success(function(entityDepartamentos) {
        res.render('layouts/default', {
          title: 'Home',
          page: '/',
          produtos: entityProdutos,
          banners: entityBanners,
          departamentos: entityDepartamentos,
          departamento: false,
          expressao: ''
        });
      });
    });
  });
};

exports.history = function(req, res, next) {
  db.Banner.findAll({
    attributes: [ 'imagem' ]
  }).success(function(entityBanners) {
    db.Departamento.findAll({
      attributes: [ 'descricao', 'id' ],
      order: 'descricao ASC'
    }).success(function(entityDepartamentos) {
      res.render('layouts/default', {
        title: 'Home',
        page: '/history',
        banners: entityBanners,
        departamentos: entityDepartamentos
      });
    });
  });
};

exports.stores = function(req, res, next) {
  db.Loja.findAll({
    attributes: [ 'id', 'nome', 'telefone', 'email', 'atendimento', 'gerente', 'imagem1' ]
  }).success(function(entityLojas) {
    db.Banner.findAll({
      attributes: [ 'imagem' ]
    }).success(function(entityBanners) {
      db.Departamento.findAll({
        attributes: [ 'descricao', 'id' ],
        order: 'descricao ASC'
      }).success(function(entityDepartamentos) {
        res.render('layouts/default', {
          title: 'Home',
          page: '/stores',
          lojas: entityLojas,
          banners: entityBanners,
          departamentos: entityDepartamentos
        });
      });
    });
  });
};

exports.sales = function(req, res, next) {
  var data = getFormatData(new Date()),
      pag = 1,
      offset = 0,
      condicao = { },
      dep = req.param('dep') || false,
      exp = req.param('exp') || '';

  if(parseInt(req.param('pag')) > 1){
    pag = parseInt(req.param('pag'));
    offset = (parseInt(req.param('pag')) * 21);
  }

  if(dep){
    if(exp != '' || exp != null){
      condicao = {
        model: db.Produto,
        attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId', 'stars' ],
        where: {
          DepartamentoId: dep,
          descricao: {
            like: "%" + exp + "%"
          }
        }
      }
    }else{
      condicao = {
        model: db.Produto,
        attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId','stars' ],
        where: {
          DepartamentoId: dep
        }
      }
    }
  }else{
    if(exp != '' || exp != null){
      condicao = {
        model: db.Produto,
        attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId', 'stars' ],
        where: {
          descricao: {
            like: "%" + exp + "%"
          }
        }
      }
    }else{
      condicao = {
        model: db.Produto,
        attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId', 'stars' ]
      }
    }
  }

  db.Departamento.findAll({
    attributes: [ 'descricao', 'id' ],
    order: 'descricao ASC'
  }).success(function(entityDepartamentos) {
    db.Promocao.findAll({
      order: 'dataInicio DESC',
      limit: 10,
      where: ["? >= dataInicio and ? <= dataTermino", data, data],
      attributes: ['id']
    }).success(function(entityPromocao) {
      var promocoes = [];
      for(var i = 0; i < entityPromocao.length; i++){
        promocoes.push(entityPromocao[i].id);
      };
      db.Association.findAll({
        offset: offset,
        limit: 21,
        where: {
          PromocaoId: promocoes
        },
        order: 'Produto.descricao ASC',
        include: [ condicao ]
      }).success(function(entityAssociation) {
        if(entityAssociation.length < 1){
          pag = 1;
        }
        res.render('layouts/default', {
          title: 'Home',
          page: '/sales',
          pagina: pag,
          departamentos: entityDepartamentos,
          produtos: entityAssociation,
          departamento: dep,
          expressao: exp
        });
      });
    });
  });
};

exports.stars = function(req, res, next) {
  db.Departamento.findAll({
    attributes: [ 'descricao', 'id' ],
    order: 'descricao ASC'
  }).success(function(entityDepartamentos) {
    res.render('layouts/default', {
      title: 'Home',
      page: '/stars',
      departamentos: entityDepartamentos,
    });
  });
};

exports.salesstars = function(req, res, next) {
  var data = getFormatData(new Date()),
      condicao = {
        model: db.Produto,
        attributes: [ 'id', 'descricao', 'imagem', 'valor', 'DepartamentoId' ]
      },
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
      include: [ condicao ]
    }).success(function(entityAssociation) {
      res.json(entityAssociation);
    });
  });
};

exports.curriculo = function(req, res, next, message, data) {
  db.Departamento.findAll({
    attributes: [ 'descricao', 'id' ],
    order: 'descricao ASC'
  }).success(function(entityDepartamentos) {
    res.render('layouts/default', {
      title: 'Home',
      page: '/curriculo',
      message: message,
      data: data || {},
      departamentos: entityDepartamentos
    });
  });
};

exports.contact = function(req, res, next) {
  db.Departamento.findAll({
    attributes: [ 'descricao', 'id' ],
    order: 'descricao ASC'
  }).success(function(entityDepartamentos) {
    res.render('layouts/default', {
      title: 'Home',
      page: '/contact',
      departamentos: entityDepartamentos
    });
  });
};

exports.cadastre = function(req, res, next, message, data) {
  db.Departamento.findAll({
    attributes: [ 'descricao', 'id' ],
    order: 'descricao ASC'
  }).success(function(entityDepartamentos) {
    res.render('layouts/default', {
      title: 'Home',
      page: '/cadastre',
      data: data || {},
      message: message,
      departamentos: entityDepartamentos
    });
  });
};

exports.enviar = function(req, res, next) {
  if(!req.body.name){
    return res.json({ success: 0, message: "Favor preencher todos os campos!" });
  }
  if(!req.body.subject){
    return res.json({ success: 0, message: "Favor preencher todos os campos!" });
  }
  if(!req.body.message){
    return res.json({ success: 0, message: "Favor preencher todos os campos!" });
  }
  var transporter = nodemailer.createTransport("SMTP", {
    host: 'smtp.redetop.com.br',
    port: 587,
    auth: {
        user: 'ranchobom.contato@redetop.com.br',
        pass: 'rb@contatos'
    }
  });
  var html = '<div style="font-size: 18px"><b>Nome</b>: ' + req.body.name + '<br>';
  html = html + '<b>Email</b>: ' + req.body.email + '<br>';
  html = html + '<b>Telefone</b>: ' + req.body.phone + '<br>';
  html = html + '<b>Assunto</b>: ' + req.body.subject + '<br>';
  html = html + '<b>Mensagem</b>: ' + req.body.message;
  html = html + '</div>';
  var mailOptions = {
    to: 'ranchobom.contato@redetop.com.br',
    from: 'ranchobom.contato@redetop.com.br',
    subject: 'Nova Mensagem - ' + req.body.subject,
    html: html
  };
  transporter.sendMail(mailOptions);
  res.json({ success: 1, message: "Mensagem enviada com sucesso!" });
};