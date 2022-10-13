// model
const models = require('../../models')

const updateStatusOrder = async (req, res) => {
    try {

        const idOrder = req.params.id;

        const body = req.body

        const Order = await models.tbl_order.update({
            status: body.status
        }, {
            where: {
                id: idOrder
            }
        })

        // start add history
        let history = await models.tbl_history.create({
            id_order: idOrder,
            status_order: body.status,
            keterangan: "status order"
        })
        // end add history

        res.status(200).json({
            message: "Update Status Order Success",
            data: Order
        })

    } catch (error) {
        res.status(500).json({
            message: "Update Status Order Failed",
            data: []
        })
    }
}

module.exports = {
    updateStatusOrder
}