'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_history.belongsTo(models.tbl_order, { foreignKey: 'id_order' })
    }
  }
  tbl_history.init({
    id_order: DataTypes.INTEGER,
    status_order: DataTypes.BOOLEAN,
    status_barang: DataTypes.BOOLEAN,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_history',
  });
  return tbl_history;
};