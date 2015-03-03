var db = require('../models'),
    passwordHash = require('password-hash');

function valid(user){
  if(!user.nome){
    return false;
  }
  if(!user.email){
    return false;
  }
  return true;
};

exports.init = function(){
  db.User.find({
    where: {
      email: 'fabricioronchii@gmail.com'
    }
  }).success(function(entity){
    if(entity){
      entity.updateAttributes({
        nome: 'Administrador',
        email: 'fabricioronchii@gmail.com',
        password: 'admin'
      }).success(function(entity) {
        console.log("Usuário atualizado com sucesso!");
      });
    }else{
      db.User.create({
        nome: 'Administrador',
        email: 'fabricioronchii@gmail.com',
        password: 'admin'
      }).success(function(entity) {
        console.log("Usuário criado com sucesso!");
      });
    }
  });
};

exports.salvar = function(req, res, next) {
  db.User.find({
    where: {
      email: req.body.email
    }
  }).success(function(entity) {
    if(entity){
      res.json({ success: 0, message: "Já existe um usuário com esse email!" });
    }else{
      if(valid(req.body)){
        db.User.create(req.body).success(function(entity) {
          res.json({ success: 1, message: "Usuário criado com sucesso!" });
        });
      }else{
        res.json({ success: 0, message: "Favor preencher todos os campos!" });
      }
    }
  })
};

exports.info = function(req, res, next) {
  res.json({
    id: req.user.id,
    nome: req.user.nome,
    type: req.user.type,
    email: req.user.email
  });
};

exports.update = function(req, res, next) {
  db.User.find({
    where: {
      id: req.user.id
    }
  }).success(function(entity) {
    if(valid(req.body)){
      entity.updateAttributes(req.body).success(function(entity) {
        res.json({ success: 1, message: "Usuário atualizado com sucesso!" });
      });
    }else{
      res.json({ success: 0, message: "Favor preencher todos os campos!" });
    }
  })
};

exports.getAll = function(req, res, next) {
  db.User.findAll({
    attributes: [ 'id', 'nome', 'email', 'type' ]
  }).success(function(entities) {
    res.json({ success: 1, data: entities });
  })
};


exports.resetPassword = function(req, res, next){
  if(!req.body.novo){
    res.json({ success: 0, message: "Nova senha não permitida!" });
  }else{
    if(passwordHash.verify(req.body.password, req.user.password)){
      db.User.find({
        where: {
          id: req.user.id
        }
      }).success(function(entity) {
        entity.updateAttributes({ password: req.body.novo }).success(function(entity) {
          res.json({ success: 1, message: "Usuário atualizado com sucesso!" });
        })
      });
    }else{
      res.json({ success: 0, message: "Senha antiga inválida!" });
    }
  };
};

exports.excluir = function(req, res, next) {
  db.User.find({
    where: {
      id: req.param('id')
    },
    attributes: ['id']
  }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.json({ success: 1, message: "Usuário excluído com sucesso!" });
      });
    } else {
      res.json({ success: 0, message: "Usuário não encontrado!" });
    }
  })
};