// lib cloudinary
const cloudinary = require('../../config/cloudinary')

const models = require('../../models')
// import json jwt decode
const jwt_decode = require('jwt-decode')

// fungsi crate user
const updateProduct = async (req, res) => {

    try {
        const body = req.body

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idUser = decode.id
        let roleUser = decode.role

        //! UPLOAD CLOUDINARY
        //TODO Upload to Cloud Storage aka Cloudinary
        const files = req.files
        const file_url = []
        const public_id = []

        console.log(files);

        if (roleUser === 'seller') {
            if (files.length <= 4) {
                // !

                //TODO START MENCAARI PRODUCT
                const idProduct = req.params.id;

                let selectProduct = await models.tbl_product.findOne(
                    {
                        where: {
                            id: idProduct
                        },
                        include: [
                            {
                                model: models.tbl_kategori,
                                attributes: ['nama_kategori']
                            },
                            {
                                model: models.tbl_user,
                                attributes: ['nama_lengkap']
                            },
                            {
                                model: models.tbl_gambar,
                                attributes: ['id', 'url', 'public_id']
                            }
                        ]
                    }
                )
                //TODO END MENCARI PRODCUT

                if (files.length != 0) {
                    // hapus gambar
                    cloudinary.api.delete_resources(selectProduct.tbl_gambar.public_id)
                    // upload gambar
                    await Promise.all(
                        files.map(async (file) => {
                            const result = await cloudinary.uploader.upload(file.path)
                            file_url.push(result.url)
                            public_id.push(result.public_id)
                            console.log(result);
                        }))
                    // update tbl gambar
                    await models.tbl_gambar.update({
                        url: file_url,
                        public_id: public_id
                    }, {
                        where: {
                            id: selectProduct.tbl_gambar.id
                        }
                    })
                    // update tbl produck
                    const product = await models.tbl_product.update({
                        nama: body.nama,
                        harga: body.harga,
                        keterangan: body.keterangan,
                        berhasil_dijual: false,
                        soft_delete: false,
                        id_user: idUser,
                        id_kategori: body.id_kategori
                    }, {
                        where: {
                            id: selectProduct.id,
                            id_user: idUser
                        }
                    })
                    res.status(201).json({
                        message: "Prodak Berhasil diupdate!",
                        url: product
                    })
                } else {
                    // update tbl produck
                    const product = await models.tbl_product.update({
                        nama: body.nama,
                        harga: body.harga,
                        keterangan: body.keterangan,
                        berhasil_dijual: false,
                        soft_delete: false,
                        id_user: idUser,
                        id_kategori: body.id_kategori
                    }, {
                        where: {
                            id: selectProduct.id,
                            id_user: idUser
                        }
                    })
                    res.status(201).json({
                        message: "Prodak Berhasil diupdate!",
                        url: product
                    })
                }

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
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }

}

// export
module.exports = {
    updateProduct
}