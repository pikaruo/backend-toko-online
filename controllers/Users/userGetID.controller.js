// model
const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')

async function detailUser(req, res) {
    try {

        // decode name user
        const authHeader = req.headers['authorization']
        const tokenPlus = authHeader.split('auth ')[1]
        const decoded = jwt_decode(tokenPlus)
        const idToken = decoded.id

        const user = await models.tbl_user.findOne({
            // jangan tampilkan password dan email
            include: [
                {
                    model: models.tbl_foto,
                    attributes: ['url']
                }
            ],
            attributes: {
                exclude: ['password', 'email', 'id_foto']
            },
            where: {
                id: idToken
            }

        })

        res.status(200).json({
            message: "show user success",
            data: user
        })

    } catch (error) {
        res.status(500).json({
            message: "user not found, please login again",
            data: []
        })
    }
}

// export
module.exports = {
    detailUser
}