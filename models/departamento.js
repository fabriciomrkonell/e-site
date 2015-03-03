module.exports = function(sequelize, DataTypes) {
  var Departamento = sequelize.define('Departamento', {
    descricao: {
      type: DataTypes.STRING
    },
    mensagem: {
      type: DataTypes.STRING
    }
  } , {
    classMethods: {
      associate: function(models) {
        Departamento.hasMany(models.Produto);
      }
    }
  })
  return Departamento;
};
