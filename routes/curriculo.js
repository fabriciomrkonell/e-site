'use strict';

var db = require('../models'),
    nodemailer = require('nodemailer');

function valid(curriculo) {
  if(!curriculo.nome){
    return false;
  }
  if(!curriculo.email){
    return false;
  }
  if(!curriculo.cidade){
    return false;
  }
  if(!curriculo.telefone){
    return false;
  }
  /*var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;
  if(!er.exec(curriculo.email)){
    return false;
  }*/
  return true;
};

exports.enviar = function(req, res, next) {
  if(valid(req.body)){
    db.Curriculo.create(req.body).success(function(entity) {
      var transporter = nodemailer.createTransport("SMTP", {
        host: 'smtp.redetop.com.br',
        port: 587,
        auth: {
          user: 'ranchobom.curriculos@redetop.com.br',
          pass: 'rb@curriculos'
        }
      });
      var html = '<div style="font-size: 18px"><b>Nome</b>: ' + entity.nome + '<br>';
      html = html + '<b>Email</b>: ' + entity.email + '<br>';
      html = html + '<b>Nascimento</b>: ' + entity.nascimento + '<br>';
      html = html + '<b>Endereço</b>: ' + entity.cidade + ' - ' + entity.estado + '<br>';
      html = html + '<b>Telefone</b>: ' + entity.telefone + '<br>';
      html = html + '</div>';
      var mailOptions = {
        to: 'ranchobom.curriculos@redetop.com.br',
        from: 'ranchobom.curriculos@redetop.com.br',
        subject: 'Currículo - ' + entity.nome,
        html: html
      };
      transporter.sendMail(mailOptions);
      res.json({ success: 1, message: "Curriculo enviado com sucesso!" });
    });
  }else{
    res.json({ success: 0, message: "Favor preencher todos os campos!" });
  }
};

exports.getAll = function(req, res, next) {
  db.Curriculo.findAll({
    attributes: [ 'nome', 'email', 'nascimento', 'sexo', 'cidade', 'estado', 'telefone', 'celular', 'salarioAtual', 'trabalha', 'conheceuSite', 'cargo', 'hierarquico', 'area', 'pretensao', 'outrasEmpresas', 'outras' ],
    order: 'noma ASC'
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  });
};