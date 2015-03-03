module.exports = function(sequelize, DataTypes) {
  var Association = sequelize.define('Association', {
  }, {
    classMethods: {
      associate: function(models) {
        Association.belongsTo(models.Produto);
        Association.belongsTo(models.Promocao);
      }
    }
  })
  return Association;
};