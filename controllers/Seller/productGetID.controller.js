const models = require('../../models')
const jwt_decode = require('jwt-decode')

async function getIdProduct(req, res) {

    const token = req.headers['authorization']
    const splitToken = token.split('auth ')[1]
    const decode = jwt_decode(splitToken);
    let idToken = decode.id

    try {

        const idProduct = req.params.id;

        let product = await models.tbl_product.findOne(
            {
                attributes:
                {
                    exclude: ['id_kategori', 'id_user']
                },
                where: {
                    id: idProduct,
                    id_user: idToken,
                    berhasil_dijual: false
                },
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
                attributes: {
                    exclude: ['id_user', 'id_gambar']
                }
            }
        )

        res.status(200).json({
            message: "success access product",
            data: product
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getIdProduct
}