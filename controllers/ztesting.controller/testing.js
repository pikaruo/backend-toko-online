// lib cloudinary
const cloudinary = require('../../config/cloudinary')
// ?
const models = require('../../models')

// import json jwt decode
const jwt_decode = require('jwt-decode')

// fungsi crate user
const testing = async (req, res) => {
    // res.send(req.file)

    // ! single file ! //
    // try {
    //     const result = await cloudinary.uploader.upload(req.file.path)
    //     res.send({
    //         message: "Upload image berhasil",
    //         img_url: result.secure_url
    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         message: error
    //     })
    // }

    //! multi file !//
    const files = req.files
    const file_url = []
    try {

        await Promise.all(
            files.map(async (file) => {

                // cloudinary.uploader.upload(file.path).then((result) => {
                //     console.log([result.url])
                //     const hasil = models.tbl_product.create({
                //         // gambar: result.url,
                //         berhasil_dijual: false,
                //         soft_delete: false,
                //     })
                //     res.status(201).json({
                //         message: "Upload image berhasil",
                //         url: hasil
                //     })
                // })

                const result = await cloudinary.uploader.upload(file.path)

                file_url.push(result.url)

            }))

        // if (roleUser === 'seller') {

        // } else {
        //     res.status(403).json({
        //         message: "forbidden"
        //     })
        // }

        // res.send({
        //     message: "Upload image berhasil",
        //     img_url: file_url
        // })

        const hasil = models.tbl_product.create({
            gambar: file_url,
            berhasil_dijual: false,
            soft_delete: false,
        })
        res.status(201).json({
            message: "Upload image berhasil",
            url: hasil
        })


    } catch (error) {
        res.status(500).json({
            message: error
        })
    }


    // ! ================= OLD ================= ! //
    // const body = req.body

    // const token = req.headers['authorization']
    // const splitToken = token.split(' ')[0]
    // const decode = jwt_decode(splitToken);
    // let idUser = decode.id
    // let roleUser = decode.role

    //! UPLOAD CLOUDINARY
    //TODO Upload to Cloud Storage aka Cloudinary
    // const fileBase64 = req.file.buffer.toString("base64")
    // const file = `data:${req.file.mimetype};base64,${fileBase64}`

    // if (roleUser === 'seller') {
    // if (body.gambar.length <= 4) {
    // !
    // cloudinary.uploader.upload(file, { folder: "binar-media-handling" }).then((result) => {

    // models.tbl_product.create({
    // nama: body.nama,
    // harga: body.harga,
    // keterangan: body.keterangan,
    // gambar: [result.url],
    // berhasil_dijual: false,
    // soft_delete: false,
    // id_user: idUser,
    // id_kategori: body.id_kategori
    //     })
    //     res.status(201).json({
    //         message: "Upload image berhasil",
    //         url: result.url
    //     })
    // })
    // !
    // } else {
    //     res.status(400).json({
    //         message: "Maksimal 4 gambar produk"
    //     })
    // }
    // } else {
    //     res.status(403).json({
    //         message: "forbidden"
    //     })
    // }

}

// export
module.exports = {
    testing
}