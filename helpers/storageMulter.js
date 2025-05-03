const multer  = require('multer');
module.exports = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) { // destination là // đường dẫn để lưu ảnh vào đâu thư mục uploads trong public 
          cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {  // filename ở đây là sửa lại tên ảnh là thời gian hiện tại-tên originalname trong req.file
          const uniqueSuffix = Date.now();
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
      })
    return storage;
}