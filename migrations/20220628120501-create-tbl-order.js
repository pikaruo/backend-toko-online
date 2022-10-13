'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_buyer: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tbl_users",
          },
          key: "id",
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tbl_products",
          },
          key: "id",
        },
      },
      id_seller: {
        type: Sequelize.INTEGER
      },
      harga_tawar: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_orders');
  }
};