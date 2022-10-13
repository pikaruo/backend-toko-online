const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

const addOrder = async (req, res) => {

    try {
        const body = req.body

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idUser = decode.id
        let idProduct = req.params.id

        //!
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
                }
            ],
            where: {
                id: idProduct,
                berhasil_dijual: false,
                id_user: { [Op.ne]: idUser }
            }
        })
        //!

        console.log(product)

        if (product != null) {
            let data = await models.tbl_order.create({
                id_buyer: idUser,
                id_product: idProduct,
                id_seller: product.id_user,
                harga_tawar: body.harga_tawar,
                status: null
            })

            // start add history
            let history = await models.tbl_history.create({
                id_order: data.id,
                keterangan: "add order"
            })
            // end add history

            res.status(201).json({
                message: "Order Berhasil",
                data: data
            })
        } else {
            res.status(404).json({
                message: "Product Tidak Ditemukan"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
module.exports = { addOrder }