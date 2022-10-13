// model
const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')
const cloudinary = require('../../config/cloudinary')

async function updateUser(req, res) {
    try {
        let body = req.body

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idUser = decode.id

        const file = req.file

        // console.log(file);

        //TODO Start Mencari User
        const selectUser = await models.tbl_user.findOne({
            include: [
                {
                    model: models.tbl_foto,
                    attributes: ['id', 'url', 'public_id']
                }
            ],
            attributes: {
                // jangan tampilkan password dan email
                exclude: ['password', 'email', 'id_foto']
            },
            where: {
                id: idUser
            }

        })
        //TODO End Mencari User

        if (file != undefined) {
            cloudinary.api.delete_resources(selectUser.tbl_foto.public_id)
            // upload image on cloudinary
            const result = await cloudinary.uploader.upload(file.path)

            const foto = await models.tbl_foto.update({
                url: result.url,
                public_id: result.public_id
            }, {
                where: {
                    id: selectUser.tbl_foto.id
                }
            })

            let data = {
                kota: body.kota,
                alamat: body.alamat,
                no_handphone: body.no_handphone,
                role: "seller"
            }

            const user = await models.tbl_user.update(data, {
                where: { id: idUser }
            })

            res.status(200).json({
                message: "user berhasil diupdate",
                data: user
            })
        } else {
            let data = {
                kota: body.kota,
                alamat: body.alamat,
                no_handphone: body.no_handphone,
                role: "seller"
            }

            const user = await models.tbl_user.update(data, {
                where: { id: idUser }
            })

            res.status(200).json({
                message: "user berhasil diupdate",
                data: user
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

module.exports = {
    updateUser
}
