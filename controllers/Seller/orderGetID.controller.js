// model
const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

async function getSellerIdOrder(req, res) {
    try {
        const idOrder = req.params.id;
        // decode name user
        const authHeader = req.headers['authorization']
        const tokenPlus = authHeader.split('auth ')[1]
        const decoded = jwt_decode(tokenPlus)
        const idToken = decoded.id

        const order = await models.tbl_order.findOne({
            include: [
                {
                    model: models.tbl_user,
                    include: [
                        {
                            model: models.tbl_foto
                        }
                    ]
                },
                {
                    model: models.tbl_product,
                    attributes: ['nama', 'harga', 'berhasil_dijual'],
                    include: [
                        {
                            model: models.tbl_user,
                            attributes: ['nama_lengkap', 'kota']
                        },
                        {
                            model: models.tbl_kategori,
                            attributes: ['nama_kategori']
                        },
                        {
                            model: models.tbl_gambar,
                            attributes: ['url']
                        }
                    ],
                    where: {
                        id_user: idToken
                    }
                }
            ]
            ,
            where: {
                id: idOrder,
                [Op.or]: [
                    { status: null },
                    { status: true }
                ]
            }
        })

        res.status(200).json({
            message: "get order success",
            data: order
        })

    } catch (error) {
        res.status(500).json({
            message: "order not found, please try again" + error,
            data: []
        })
    }
}

// export
module.exports = {
    getSellerIdOrder
}