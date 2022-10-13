'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbl_foto.hasOne(models.tbl_user, { foreignKey: 'id_foto' })
    }
  }
  tbl_foto.init({
    url: DataTypes.STRING,
    public_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_foto',
  });
  return tbl_foto;
};