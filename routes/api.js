var express = require('express');
var router = express.Router();
const { io } = require('../bin/socket');

//! auth
const { registerUser } = require('../controllers/auth/userRegister.controller');
const { login } = require('../controllers/auth/userLogin.controller');
const { relogin } = require('../controllers/auth/relogin.controller');

//! user
const { detailUser } = require('../controllers/Users/userGetID.controller');
const { updateUser } = require('../controllers/Users/userUpdate.controller');

//! seller
const { getAllCategory } = require('../controllers/Seller/categoryGetAll.controller')
const { addCategory } = require('../controllers/Seller/categoryAdd.controller')
const { addProduct } = require('../controllers/Seller/productAdd.controller')
const { deleteProduct } = require('../controllers/Seller/productDelete.controller');
const { sellerGetAllProduct } = require('../controllers/Seller/productGetAll.controller');
const { getIdProduct } = require('../controllers/Seller/productGetID.controller');
const { updateProduct } = require('../controllers/Seller/productUpdate.controller');
const { updateBarangTerjual } = require('../controllers/Seller/sellProduct.controller');
//TODO order
const { getSellerAllOrder } = require('../controllers/Seller/orderGetAll.controller');
const { getSellerIdOrder } = require('../controllers/Seller/orderGetID.controller');
const { updateStatusOrder } = require('../controllers/Seller/orderStatusUpdate.controller');

//! buyer
const { getAllProduct } = require('../controllers/Buyer/productGetAll.controller');
const { detailProduct } = require('../controllers/Buyer/productGetID.controller');
const { addOrder } = require('../controllers/Buyer/orderAdd.controller');
const { addWishlist } = require('../controllers/Buyer/wishlistAdd.controller');
const { deleteWishlist } = require('../controllers/Buyer/wishlistDelete.controller');
const { getAllWishlist } = require('../controllers/Buyer/wishlistGetAll.controller');

//! History
const { historyBuyerGetAll } = require('../controllers/History/historyBuyerGetAll.controller');
const { historySellerGetAll } = require('../controllers/History/historySellerGetAll.controller');


//! middleware
const fileCloudinaryMiddleware = require('../middleware/file-cloudinary.middleware');
const { authJWT } = require('../middleware/jwtAuth');
const { roleAuth } = require('../middleware/roleAuth');

//! testing
const { testing } = require('../controllers/ztesting.controller/testing');
const { singleUpload } = require('../controllers/ztesting.controller/uploadSingleImage');

// ================================================================================= //

//! auth
router.post('/v1/auth/register', registerUser);
router.post('/v1/auth/login', login)
router.post('/v1/auth/relogin', relogin)

//! user
router.get('/v1/users/detail', authJWT, detailUser)
router.put('/v1/users/update', fileCloudinaryMiddleware.single("foto"), authJWT, updateUser)

//! seller
router.post('/v1/seller/category', [authJWT, roleAuth], addCategory)
router.get('/v1/seller/category', getAllCategory)
router.post('/v1/seller/product', [authJWT, roleAuth], fileCloudinaryMiddleware.array("gambar", 4), addProduct)
router.get('/v1/seller/product', [authJWT, roleAuth], sellerGetAllProduct)
router.get('/v1/seller/product/:id', [authJWT, roleAuth], getIdProduct)
router.put('/v1/seller/product/:id', [authJWT, roleAuth], fileCloudinaryMiddleware.array("gambar", 4), updateProduct)
router.delete('/v1/seller/product/:id', [authJWT, roleAuth], deleteProduct)
router.put('/v1/seller/product/status/:id', authJWT, updateBarangTerjual)
//TODO order
router.get('/v1/seller/order', [authJWT, roleAuth], getSellerAllOrder)
router.get('/v1/seller/order/:id', [authJWT, roleAuth], getSellerIdOrder)
router.put('/v1/seller/order/:id', [authJWT, roleAuth], updateStatusOrder)
//TODO history
router.get('/v1/buyer/history', authJWT, historyBuyerGetAll)
router.get('/v1/seller/history', [authJWT, roleAuth], historySellerGetAll)

//! buyer
router.get('/v1/buyer/product', getAllProduct)
router.get('/v1/buyer/product/:id', detailProduct)
router.post('/v1/buyer/order/:id', authJWT, addOrder)
router.post('/v1/buyer/wishlist', authJWT, addWishlist)
router.get('/v1/buyer/wishlist', authJWT, getAllWishlist)
router.delete('/v1/buyer/wishlist/:id', authJWT, deleteWishlist)

// controller testing
// router.post('/testing', fileCloudinaryMiddleware.array("gambar", 4), testing);
// router.post('/testing', fileCloudinaryMiddleware.single("gambar"), singleUpload);
// router.put('/testing/:id', updateBarangTerjual);

// router.get('/', function (req, res, next) {
//     io.emit('test', getAllProduct)
//     res.send("Respon");
// });

module.exports = router;
