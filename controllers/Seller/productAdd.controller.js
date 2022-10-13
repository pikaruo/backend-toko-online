const cloudinary = require('../../config/cloudinary')
const models = require('../../models')
const jwt_decode = require('jwt-decode')

// fungsi crate user
const addProduct = async (req, res) => {

    try {
        const body = req.body

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idToken = decode.id
        let roleToken = decode.role

        //! SELECT PRODUCT
        const selectProduct = await models.tbl_product.findAll({
            where: {
                id_user: idToken,
                berhasil_dijual: false
            }
        })
        //! SELECT PRODUCT

        //! UPLOAD CLOUDINARY
        //TODO Upload to Cloud Storage aka Cloudinary
        const files = req.files
        const file_url = []
        const public_id = []

        if (selectProduct.length < 4) {
            if (roleToken === 'seller') {
                if (files.length <= 4) {
                    // !
                    await Promise.all(
                        files.map(async (file) => {
                            const result = await cloudinary.uploader.upload(file.path)
                            file_url.push(result.url)
                            public_id.push(result.public_id)
                            console.log(result);
                        }))

                    const gambar = await models.tbl_gambar.create({
                        url: file_url,
                        public_id: public_id
                    })

                    models.tbl_product.create({
                        nama: body.nama,
                        harga: body.harga,
                        keterangan: body.keterangan,
                        id_gambar: gambar.id,
                        berhasil_dijual: false,
                        soft_delete: false,
                        id_user: idToken,
                        id_kategori: body.id_kategori
                    })
                    res.status(201).json({
                        message: "Prodak Berhasil ditambahkan",
                        url: []
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
        } else {
            res.status(400).json({
                message: "Maksimal 4 produk"
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}

// export
module.exports = {
    addProduct
}