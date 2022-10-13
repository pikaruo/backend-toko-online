const models = require('../../models')

// get all category
const getAllCategory = async (req, res) => {
    try {
        const category = await models.tbl_kategori.findAll({})

        res.status(200).json({
            message: "get all category success",
            data: category
        })
    } catch (error) {
        res.status(500).json({
            message: "get all category failed",
            data: []
        })
    }

}

// export
module.exports = {
    getAllCategory
}