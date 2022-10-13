// lib cloudinary
const cloudinary = require('../../config/cloudinary')

const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')

// fungsi crate user
const singleUpload = async (req, res) => {

    const body = req.body

    // const token = req.headers['authorization']
    // const splitToken = token.split(' ')[0]
    // const decode = jwt_decode(splitToken);
    // let idUser = decode.id

    //! UPLOAD CLOUDINARY
    //TODO Upload to Cloud Storage aka Cloudinary
    const file = req.file

    // !
    const result = await cloudinary.uploader.upload(file.path)
    console.log(result)


    // const gambar = await models.tbl_foto.create({
    //     url: result.url,
    //     public_id: result.public_id
    // })



    res.status(201).json({
        message: "Upload image berhasil",
        url: []
    })
    // !

}

// export
module.exports = {
    singleUpload
}