require('dotenv').config()
// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // TODO: Ganti dengan cloudname-mu
    api_key: process.env.CLOUDINARY_API_KEY, // TODO: Ganti dengan API Key-mu
    api_secret: process.env.CLOUDINARY_API_SECRET, // TODO: Ganti dengan API Secret-mu
    secure: true
});

module.exports = cloudinary;
