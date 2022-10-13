const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

const updateBarangTerjual = async (req, res) => {

    try {

        // start order
        const body = req.body
        const idOrder = req.params.id;
        const authHeader = req.headers['authorization']
        const tokenPlus = authHeader.split('auth ')[1]
        const decoded = jwt_decode(tokenPlus)
        const idToken = decoded.id

        const order = await models.tbl_order.findOne({
            include: [
                {
                    model: models.tbl_user,
                    attributes: ['nama_lengkap']
                },
                {
                    model: models.tbl_product,
                    attributes: ['nama', 'harga'],
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
        // end order

        const product = await models.tbl_product.update({
            berhasil_dijual: body.berhasil_dijual
        }, {
            where: {
                id: order.id_product,
                berhasil_dijual: false
            }
        })

        // start add history
        let history = await models.tbl_history.create({
            id_order: order.id,
            status_barang: body.berhasil_dijual,
            keterangan: "barang terjuak"
        })
        // end add history

        res.status(200).json({
            message: "barang berhasil terjual",
            data: product
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    updateBarangTerjual
}