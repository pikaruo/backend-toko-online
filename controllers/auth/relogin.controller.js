const models = require('../../models')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

async function relogin(req, res) {
    try {

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idToken = decode.id

        const Users = await models.tbl_user.findOne({
            where: {
                id: idToken
            },
            include: [
                {
                    model: models.tbl_foto,
                    attributes: ['url']
                }
            ]
        })

        // ! END TOKEN
        const secretKey = process.env.JWT_KEY
        const expireter = '24h'

        const tokenJWT = jwt.sign({
            id: Users.id,
            name: Users.name,
            role: Users.role
        }, secretKey, {
            algorithm: 'HS256',
            expiresIn: expireter
        })
        // ! END TOKEN

        res.status(200).json({
            message: 'Relogin Success',
            token_update: tokenJWT
        })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    relogin
}