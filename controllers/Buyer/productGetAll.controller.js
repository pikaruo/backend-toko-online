const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

async function getAllProduct(req, res) {
    try {
        const authHeader = req.headers['authorization']

        // jika tidak ada token
        if (authHeader === undefined) {
            let product = await models.tbl_product.findAll(
                {
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
                            attributes: ['url']
                        }
                    ], where: {
                        berhasil_dijual: false
                    }
                }
            )
            res.status(200).json({
                message: "success access product",
                data: product
            })
            // jika ada token
        } else {
            const tokenPlus = authHeader.split('auth ')[1]
            const decoded = jwt_decode(tokenPlus)
            const idToken = decoded.id

            let product = await models.tbl_product.findAll(
                {
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
                    ], where: {
                        berhasil_dijual: false,
                        id_user: { [Op.ne]: idToken }
                    }
                }
            )
            res.status(200).json({
                message: "success access product",
                data: product
            })
        }


    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getAllProduct
}