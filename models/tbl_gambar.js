'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_gambar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_gambar.hasOne(models.tbl_product, { foreignKey: 'id_gambar' })
    }
  }
  tbl_gambar.init({
    url: DataTypes.ARRAY(DataTypes.STRING),
    public_id: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'tbl_gambar',
  });
  return tbl_gambar;
};