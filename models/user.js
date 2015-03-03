var passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set: function(password) {
        this.setDataValue('password', passwordHash.generate(password));
      }
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });
  return User;
};