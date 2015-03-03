'use strict';

module.exports = function(sequelize, DataTypes) {
  var Produto = sequelize.define('Produto', {
    codigo: {
      type: DataTypes.STRING
    },
    descricao: {
      type: DataTypes.STRING
    },
    valor: {
      type: DataTypes.STRING,
    },
    valorAntigo: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    stars: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    imagem: {
      type: DataTypes.STRING,
      defaultValue: '/img/sem-imagem/produto.png'
    },
    favorito: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  } , {
    classMethods: {
      associate: function(models) {
        Produto.belongsTo(models.Departamento);
        Produto.hasMany(models.Association, { onDelete: 'cascade' });
      }
    }
  })
  return Produto;
};