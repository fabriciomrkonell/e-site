'use strict';

module.exports = function(sequelize, DataTypes) {
  var Banner = sequelize.define('Banner', {
    imagem: {
      type: DataTypes.STRING,
      defaultValue: '/img/banners/sem-imagem.png'
    }
  })
  return Banner;
};