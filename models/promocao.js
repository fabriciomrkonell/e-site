module.exports = function(sequelize, DataTypes) {
  var Promocao = sequelize.define('Promocao', {
    descricao: {
      type: DataTypes.STRING
    },
    dataInicio: {
      type: DataTypes.INTEGER,
    },
    dataTermino: {
      type: DataTypes.INTEGER,
    },
    totalProdutos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        Promocao.hasMany(models.Produto)
        Promocao.hasMany(models.Association, { onDelete: 'cascade' });
      }
    }
  })
  return Promocao;
};