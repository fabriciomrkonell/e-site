module.exports = function(sequelize, DataTypes) {
  var Loja = sequelize.define('Loja', {
    nome: {
      type: DataTypes.STRING
    },
    telefone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    atendimento: {
      type: DataTypes.STRING
    },
    gerente: {
      type: DataTypes.STRING
    },
    imagem1: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/loja.png'
    },
    imagem2: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/loja.png'
    },
    imagem3: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/loja.png'
    },
    imagem4: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/loja.png'
    },
    imagem5: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/loja.png'
    },
    latitude: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    longitude: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  })
  return Loja;
};