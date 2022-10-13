'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      keterangan: {
        type: Sequelize.TEXT
      },
      id_gambar: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tbl_gambars",
          },
          key: "id",
        },
      },
      berhasil_dijual: {
        type: Sequelize.BOOLEAN
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tbl_users",
          },
          key: "id",
        },
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "tbl_kategoris",
          },
          key: "id",
        },
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
    await queryInterface.dropTable('tbl_products');
  }
};