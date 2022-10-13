const models = require('../../models')
// lib cloudinary
const cloudinary = require('../../config/cloudinary')
const jwt_decode = require('jwt-decode')

const deleteProduct = async (req, res) => {
    try {
        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idUser = decode.id
        const idProduct = req.params.id;

        let selectProduct = await models.tbl_product.findOne(
            {
                attributes:
                {
                    exclude: ['id_kategori', 'id_user']
                },
                where: {
                    id: idProduct,
                    id_user: idUser
                },
                include: [
                    {
                        model: models.tbl_kategori,
                        attributes: ['nama_kategori']
                    },
                    {
                        model: models.tbl_user,
                        attributes: ['nama_lengkap']
                    },
                    {
                        model: models.tbl_gambar,
                        attributes: ['url', 'public_id']
                    }
                ]
            }
        )

        let order = await models.tbl_order.findOne({
            where: {
                id_product: idProduct
            }
        })

        await models.tbl_history.destroy({
            where: {
                id_order: order.id
            }
        })

        await models.tbl_wishlist.destroy({
            where: {
                id_product: idProduct
            }
        })

        await models.tbl_order.destroy({
            where: {
                id_product: idProduct
            }
        })

        const barang = await models.tbl_product.destroy({
            where: {
                id: selectProduct.id
            }
        })


        await models.tbl_gambar.destroy({
            where: {
                id: selectProduct.id_gambar
            }
        })

        cloudinary.api.delete_resources(selectProduct.tbl_gambar.public_id)

        res.status(200).json({
            message: "delete Product success",
            data: barang
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    deleteProduct
}