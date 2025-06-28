// file này sẽ chứa các đoạn code config
// nhúng mongoose
const mongoose = require('mongoose');


//  dùng câu lệnh dưới đây để check xem connect database thành công hay thất bại 
module.exports.connect = async (req, res) => {
    // try {
    //     // dùng câu lệnh connect để connect data trong mongoose local
    //     await mongoose.connect(process.env.MONGO_URL)
    //     console.log("connect local success");
    // } catch (error) {
    //     console.log("connect local error");
    // }

    try {
        // dùng câu lệnh connect để connect data trong mongoose online
        await mongoose.connect(process.env.MONGO_URLONLINE)
        console.log("connect online success");
    } catch (error) {
        console.log("connect online error");
    }
}
