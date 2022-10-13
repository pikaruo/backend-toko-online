'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_user.hasMany(models.tbl_product, { foreignKey: 'id_user' })
      tbl_user.belongsTo(models.tbl_foto, { foreignKey: 'id_foto' })
      tbl_user.hasMany(models.tbl_order, { foreignKey: 'id_buyer' })
      tbl_user.hasMany(models.tbl_wishlist, { foreignKey: 'id_user' })
    }
  }
  tbl_user.init({
    nama_lengkap: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id_foto: DataTypes.INTEGER,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_handphone: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_user',
  });
  return tbl_user;
};