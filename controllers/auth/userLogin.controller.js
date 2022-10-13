const models = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(req, res) {

    try {

        const body = req.body

        if (body.email !== '' && body.password !== '') {
            // start cek email
            const Users = await models.tbl_user.findOne({
                where: {
                    email: body.email
                },
                include: [
                    {
                        model: models.tbl_foto,
                        attributes: ['url']
                    }
                ]
            })
            // end cek email

            // end jika email tidak ditemukan
            if (!Users) {
                return res.status(401).json({
                    message: 'Email / Password salah'
                })
            }
            // end jika email tidak ditemukan

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

            // start match password
            let salt = "abcd12345"
            const matchPassword = await bcrypt.compare(body.password + salt, Users.password)
            // end match password

            // start jika password sama atau tidak sama 
            if (matchPassword) {
                res.status(200).json({
                    message: 'Login Success',
                    token: tokenJWT
                })
            } else {
                res.status(401).json({
                    message: 'Email / Password salah'
                })
            }
            // end jika password sama atau tidak sama
        }

    } catch (error) {
        if (error === 'ERROR_COLUMN_REQUIRED') {
            res.status(400).json({
                message: 'email atau password wajib diisi'
            })
        }

        res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    login
}