// lib cloudinary
const cloudinary = require('../../config/cloudinary')

const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')

// fungsi crate user
const abcd = async (req, res) => {

    const body = req.body

    const token = req.headers['authorization']
    const splitToken = token.split(' ')[0]
    const decode = jwt_decode(splitToken);
    let idUser = decode.id
    let roleUser = decode.role

    //! UPLOAD CLOUDINARY
    //TODO Upload to Cloud Storage aka Cloudinary
    const files = req.files
    const file_url = []

    if (roleUser === 'seller') {
        if (files.length <= 4) {
            // testing
            const kategori = await models.tbl_kategori.create({
                nama_kategori: body.nama_kategori
            })
            // testing

            // !
            await Promise.all(
                files.map(async (file) => {
                    const result = await cloudinary.uploader.upload(file.path)
                    file_url.push(result.url)
                }))

            const product = models.tbl_product.create({
                nama: body.nama,
                harga: body.harga,
                keterangan: body.keterangan,
                gambar: file_url,
                berhasil_dijual: false,
                soft_delete: false,
                id_user: idUser,
                id_kategori: kategori.id
            })
            res.status(201).json({
                message: "Upload image berhasil",
                url: product
            })
            // !
        } else {
            res.status(400).json({
                message: "Maksimal 4 gambar produk"
            })
        }
    } else {
        res.status(403).json({
            message: "forbidden"
        })
    }

}

// export
module.exports = {
    abcd
}