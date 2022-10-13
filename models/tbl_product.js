'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_product.belongsTo(models.tbl_kategori, { foreignKey: 'id_kategori' })
      tbl_product.belongsTo(models.tbl_user, { foreignKey: 'id_user' })
      tbl_product.belongsTo(models.tbl_gambar, { foreignKey: 'id_gambar' })
      tbl_product.hasMany(models.tbl_order, { foreignKey: 'id_product' })
      tbl_product.hasMany(models.tbl_wishlist, { foreignKey: 'id_product' })
    }
  }
  tbl_product.init({
    nama: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT,
    id_gambar: DataTypes.INTEGER,
    berhasil_dijual: DataTypes.BOOLEAN,
    id_user: DataTypes.INTEGER,
    id_kategori: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_product',
  });
  return tbl_product;
};