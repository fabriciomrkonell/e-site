module.exports = function(sequelize, DataTypes) {
  var Produto2 = sequelize.define('Produto2', {
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
    },
    imagem: {
      type: DataTypes.TEXT,
    },
    favorito: {
      type: DataTypes.INTEGER,
    }
  } , {
    classMethods: {
      associate: function(models) {
        Produto2.hasMany(models.Promocao);
        Produto2.belongsTo(models.Departamento);
      }
    }
  })
  return Produto2;
};