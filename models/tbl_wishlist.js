'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_wishlist.belongsTo(models.tbl_user, { foreignKey: 'id_user' })
      tbl_wishlist.belongsTo(models.tbl_product, { foreignKey: 'id_product' })
    }
  }
  tbl_wishlist.init({
    id_product: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_wishlist',
  });
  return tbl_wishlist;
};