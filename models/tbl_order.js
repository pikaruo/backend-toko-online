'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_order.belongsTo(models.tbl_user, { foreignKey: 'id_buyer' })
      tbl_order.belongsTo(models.tbl_product, { foreignKey: 'id_product' })
      tbl_order.hasMany(models.tbl_history, { foreignKey: 'id_order' })
    }
  }
  tbl_order.init({
    id_buyer: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER,
    id_seller: DataTypes.INTEGER,
    harga_tawar: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tbl_order',
  });
  return tbl_order;
};