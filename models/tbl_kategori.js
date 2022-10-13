'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_kategori.hasMany(models.tbl_product, { foreignKey: 'id_kategori' })
    }
  }
  tbl_kategori.init({
    nama_kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_kategori',
  });
  return tbl_kategori;
};