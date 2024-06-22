const multer = require('multer')

const uploadMiddleware = multer({
    dest: 'public/uploads',
});

uploadMiddleware.any();

module.exports = uploadMiddleware;