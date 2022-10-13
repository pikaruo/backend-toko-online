const models = require('../../models')

// add category
const addCategory = async (req, res) => {
    try {

        const body = req.body

        await models.tbl_kategori.create({
            nama_kategori: body.nama_kategori
        })

        res.status(200).json({
            message: "add Category success"
        })

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}

// export
module.exports = {
    addCategory
}