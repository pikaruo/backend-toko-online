const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

async function historySellerGetAll(req, res) {
    try {
        const authHeader = req.headers['authorization']
        const tokenPlus = authHeader.split('auth ')[1]
        const decoded = jwt_decode(tokenPlus)
        const idToken = decoded.id

        const history = await models.tbl_history.findAll({
            include: [

                {
                    model: models.tbl_order,
                    where: {
                        id_seller: idToken
                    },
                    include: [
                        {
                            model: models.tbl_user
                        },
                        {
                            model: models.tbl_product,
                            include: [
                                {
                                    model: models.tbl_gambar
                                },
                                {
                                    model: models.tbl_user
                                }
                            ]
                        }
                    ]
                }
            ]
        })

        res.status(200).json({
            message: "get all history success",
            data: history
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    historySellerGetAll
}