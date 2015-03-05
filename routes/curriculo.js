'use strict';

var db = require('../models'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    pdf = require('html-pdf');

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

  function getSalario(pretencao){
    if(pretencao == '0950_1100'){
      return 'R$ 950,00 - R$ 1.100,00';
    }else if(pretencao == '1100_1300'){
      return 'R$ 1.100,00 - R$ 1.300,00 ';
    }else if(pretencao == '1300_1500'){
      return 'R$ 1.300,00 - R$ 1.500,00';
    }else if(pretencao == '1500_2000'){
      return 'R$ 1.500,00 - R$ 2.000,00';
    }else if(pretencao == '2000_3000'){
      return 'R$ 2.000,00 - R$ 3.000,00';
    }else if(pretencao == '3000_4000'){
      return 'R$ 3.000,00 - R$ 4.000,00';
    }else if(pretencao == '4000_5000'){
      return 'R$ 4.000,00 - R$ 5.000,00';
    }else{
      return '';
    }
  };

  function getSexo(sexo){
    if(sexo == '1'){
      return 'Masculino';
    }else{
      return 'Feminino';
    }
  };

  function getTrabalha(trabalha){
    if(trabalha == '1'){
      return 'Sim';
    }else{
      return 'Não';
    }
  };

  function getArea(area){
    if(area == '1'){
      return 'Reposição';
    }else if(area == '2'){
      return 'Empacotamento';
    }else if(area == '3'){
      return 'Operação de caixa';
    }else if(area == '4'){
      return 'Depósito';
    }else if(area == '5'){
      return 'Açougue';
    }else if(area == '6'){
      return 'Padaria';
    }else if(area == '7'){
      return 'Administrativo';
    }else if(area == '8'){
      return 'Liderança';
    }else{
      return '';
    }
  };

  function getHierarquico(hierarquico){
    if(hierarquico == '1'){
      return 'Loja';
    }else if(hierarquico == '2'){
      return 'Administrativo';
    }else if(hierarquico == '3'){
      return 'Gerência';
    }else if(hierarquico == '4'){
      return 'Liderança';
    }else{
      return '';
    }
  };

  function getConheceuSite(site){
    if(site == '1'){
      return 'Google';
    }else if(site == '2'){
      return 'Rádio';
    }else if(site == '3'){
      return 'Jornal';
    }else if(site == '4'){
      return 'Facebook';
    }else if(site == '10'){
      return 'Outros';
    }else{
      return '';
    }
  };

function getHTML(obj) {
  var _ = '';
  _ = _ + '<strong>Nome: </strong>' + obj.nome + '<br>';
  _ = _ + '<strong>Email: </strong>' + obj.email + '<br>';
  _ = _ + '<strong>Data de Nascimento: </strong>' + obj.nascimento + '<br>';
  _ = _ + '<strong>Sexo: </strong>' + getSexo(obj.sexo) + '<br><br>';
  _ = _ + '<strong>Cidade: </strong>' + obj.cidade + '<br>';
  _ = _ + '<strong>Estado: </strong>' + obj.estado + '<br><br>';
  _ = _ + '<strong>Telefone: </strong>' + obj.telefone + '<br>';
  _ = _ + '<strong>Celular: </strong>' + obj.celular + '<br><br>';
  _ = _ + '<strong>Salário atual: </strong>' + getSalario(obj.salarioAtual) + '<br>';
  _ = _ + '<strong>Pretensão salárial: </strong>' + getSalario(obj.pretensao) + '<br><br>';
  _ = _ + '<strong>Trabalha? </strong>' + getTrabalha(obj.trabalha) + '<br>';
  _ = _ + '<strong>Onde conheceu o site? </strong>' + getConheceuSite(obj.conheceuSite) + '<br><br>';
  _ = _ + '<strong>Cargo desejado: </strong>' + obj.cargo + '<br>';
  _ = _ + '<strong>Área de profissional: </strong>' + getArea(obj.area) + '<br>';
  _ = _ + '<strong>Nível hierárquico: </strong>' + getHierarquico(obj.hierarquico) + '<br><br>';
  _ = _ + '<strong>Outras empresas: </strong>' + obj.outrasEmpresas + '<br>';
  return _;
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
    attributes: [ 'id', 'nome', 'email', 'nascimento', 'sexo', 'cidade', 'estado', 'telefone', 'celular', 'salarioAtual', 'trabalha', 'conheceuSite', 'cargo', 'hierarquico', 'area', 'pretensao', 'outrasEmpresas', 'outras' ],
    order: 'nome ASC'
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  });
};

exports.createPDF = function(req, res, next) {
  db.Curriculo.find({
    attributes: [ 'nome', 'email', 'nascimento', 'sexo', 'cidade', 'estado', 'telefone', 'celular', 'salarioAtual', 'trabalha', 'conheceuSite', 'cargo', 'hierarquico', 'area', 'pretensao', 'outrasEmpresas', 'outras' ],
    where: {
      id: req.param('id')
    }
  }).success(function(entity) {
    if(entity){
      var options = {
            border: {
              "top": "1in",
              "right": "1in",
              "bottom": "1in",
              "left": "1in"
            },
            entityformat: 'Letter',
            filename: './tmp/' + entity.nome + '.pdf'
          };
      pdf.create(getHTML(entity), options).toFile(function(err, _res) {
        if (err) return console.log(err);
        return res.download(_res.filename);
      });
    }else{
      return res.json({ success: 0, message: "Currículo não encontrado" });
    }
  });
};