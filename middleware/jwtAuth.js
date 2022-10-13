// import json webtoken
const jwt = require('jsonwebtoken')

const authJWT = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']

        console.log(req.headers)

        if (authHeader) {
            const tokenPlus = authHeader.split('auth ')[1]
            const secretKey = process.env.JWT_KEY
            const decoded = jwt.verify(tokenPlus, secretKey)
            req.userData = decoded
            next()
        } else {
            res.sendStatus(403)
        }

    } catch (error) {
        res.status(401).json({
            message: 'Silahkan Login Terlebih Dahulu!'
        })
    }
}

// export
module.exports = {
    authJWT
}