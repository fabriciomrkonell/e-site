var db = require('../models');

exports.init = function() {
  db.User.findAll().success(function(entities) {
    if (entities.length == 0) {
      var _user = {
        nome: 'Rancho Bom Supermercados',
        email: 'redetopschroeder@gmail.com',
        password: 'SCHRedeTop123',
        type: 1
      };
      db.User.create(_user);
    }
  });
};