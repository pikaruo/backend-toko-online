function fileValidation(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg|JPG|JPEG|PNG)$/)) {
        req.fileValidation = "File upload not valid"
        return cb(new Error('Only File Image can Upload'), false)
    }

    cb(null, true)
}

module.exports = {
    fileValidation
}
