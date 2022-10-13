const models = require('../../models')

const updateBarangTerjual = async (req, res) => {

    try {
        let id_product = req.params.id
        const body = req.body

        const product = await models.tbl_product.update({
            berhasil_dijual: body.berhasil_dijual
        }, {
            where: {
                id: id_product
            }
        })

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