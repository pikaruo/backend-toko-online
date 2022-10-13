// model
const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')

async function sellerGetAllProduct(req, res) {
    try {

        // decode name user
        const authHeader = req.headers['authorization']
        const tokenPlus = authHeader.split('auth ')[1]
        const decoded = jwt_decode(tokenPlus)
        const idToken = decoded.id

        const product = await models.tbl_product.findAll({
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
            ],
            where: {
                id_user: idToken,
                berhasil_dijual: false
            },
            attributes: {
                exclude: ['id_user', 'id_gambar']
            }
        })

        res.status(200).json({
            message: "get all product success",
            data: product
        })

    } catch (error) {
        res.status(500).json({
            message: "product not found, please try again" + error,
            data: []
        })
    }
}

// export
module.exports = {
    sellerGetAllProduct
}