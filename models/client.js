module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    nome: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  })
  return Client;
};