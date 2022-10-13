// import json jwt decode
const jwt_decode = require('jwt-decode')


const roleAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']

        if (authHeader) {

            const tokenPlus = authHeader.split('auth ')[1]
            const decoded = jwt_decode(tokenPlus)
            let role = decoded.role

            if (role === 'seller') {
                next()
            } else {
                res.status(401).json({
                    message: 'Anda Bukan Rolenya!'
                })
            }
        } else {
            res.sendStatus(403)
        }

    } catch (error) {
        res.status(401).json({
            message: 'Tidak Memiliki Akses'
        })
    }
}

// export
module.exports = {
    roleAuth
}