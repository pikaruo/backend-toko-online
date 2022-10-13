const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

const detailProduct = async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const idProduct = req.params.id;

        // jika tidak ada token
        if (authHeader === undefined) {
            const product = await models.tbl_product.findOne({
                where: {
                    id: idProduct,
                    berhasil_dijual: false
                },
                include: [
                    {
                        model: models.tbl_kategori,
                        attributes: ['nama_kategori']
                    },
                    {
                        model: models.tbl_user,
                        attributes: ['nama_lengkap', 'kota']
                    },
                    {
                        model: models.tbl_gambar,
                        attributes: ['url']
                    }
                ]
            })
            res.status(200).json({
                message: "show Product success",
                data: product
            })
        } else {
            const tokenPlus = authHeader.split('auth ')[1]
            const decoded = jwt_decode(tokenPlus)
            const idToken = decoded.id

            const product = await models.tbl_product.findOne({
                include: [
                    {
                        model: models.tbl_kategori,
                        attributes: ['nama_kategori']
                    },
                    {
                        model: models.tbl_user,
                        attributes: ['nama_lengkap', 'kota']
                    },
                    {
                        model: models.tbl_gambar,
                        attributes: ['url']
                    },
                    {
                        model: models.tbl_wishlist
                    }
                ],
                where: {
                    id: idProduct,
                    berhasil_dijual: false,
                    id_user: { [Op.ne]: idToken }
                }
            })
            res.status(200).json({
                message: "show Product success",
                data: product
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "show Product failed" + error,
            data: []
        })
    }

}

module.exports = {
    detailProduct
}