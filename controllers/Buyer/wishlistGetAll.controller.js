const models = require('../../models')
const jwt_decode = require('jwt-decode')
const { Op } = require("sequelize");

const getAllWishlist = async (req, res) => {
    try {

        const token = req.headers['authorization']
        const splitToken = token.split('auth ')[1]
        const decode = jwt_decode(splitToken);
        let idUser = decode.id

        //!
        const product = await models.tbl_product.findOne({
            include: [
                {
                    model: models.tbl_kategori,
                    attributes: ['nama_kategori']
                },
                {
                    model: models.tbl_user,
                    attributes: ['nama_lengkap', 'kota']
                },
                {
                    model: models.tbl_gambar,
                    attributes: ['url']
                }
            ],
            where: {
                berhasil_dijual: false,
                id_user: { [Op.ne]: idUser }
            }
        })
        //!

        //!
        const wishlist = await models.tbl_wishlist.findOne({
            where: {
                id_user: idUser
            }
        })
        //!

        // if (wishlist != null) {
        if (product != null) {
            let data = await models.tbl_wishlist.findAll({
                include: [
                    {
                        model: models.tbl_product,
                        include: [
                            {
                                model: models.tbl_kategori,
                            },
                            {
                                model: models.tbl_gambar,
                            }
                        ],
                        where: {
                            berhasil_dijual: false
                        }
                    }
                ],
                where: {
                    id_user: idUser
                }
            })

            res.status(201).json({
                message: "Get Wishlist Berhasil",
                data: data
            })
        } else {
            res.status(404).json({
                message: "Product Tidak Ditemukan"
            })
        }
        // } else {
        //     res.status(405).json({
        //         message: "Wishlist tidak ditemukan"
        //     })
        // }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

module.exports = { getAllWishlist }