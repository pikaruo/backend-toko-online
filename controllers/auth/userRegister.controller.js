// import bcrypt
const bcrypt = require('bcrypt')
// model
const models = require('../../models')

// register user
const registerUser = async (req, res) => {
    try {
        const body = req.body

        //TODO Start Pengecekan email
        let cekEmail = await models.tbl_user.findOne({
            where: {
                email: body.email
            }
        })
        //TODO End Pengecekan email

        // start enkripsi
        let salt = "abcd12345"
        const hashPassword = await bcrypt.hash(body.password + salt, 12)
        // end enkripsi

        if (body.nama_lengkap !== "" && body.email !== "" && body.password !== "") {
            if (cekEmail == null) {

                const foto = await models.tbl_foto.create({
                    url: "",
                    public_id: ""
                })

                await models.tbl_user.create({
                    nama_lengkap: body.nama_lengkap,
                    email: body.email,
                    password: hashPassword,
                    id_foto: foto.id,
                    role: "buyer"
                })

                res.status(200).json({
                    message: "add Users success"
                })
            } else {
                res.status(406).json({
                    message: "Email Telah Digunakan!"
                })
            }
        } else {
            res.status(412).json({
                message: "Lengkapi Seluruh Bagian!"
            })
        }

    } catch (error) {
        if (error === 'ERROR_COLUMN_REQUIRED') {
            res.status(400).json({
                message: 'email atau password wajib diisi'
            })
        }

        res.status(500).json({
            message: error
        })
    }

}

// export
module.exports = {
    registerUser
}