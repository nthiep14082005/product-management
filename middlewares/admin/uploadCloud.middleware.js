const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cấu hình cloudinary truy cập vào tài khoản
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_KEY,
//     api_secret: process.env.CLOUD_SECRET
// });
cloudinary.config({
    cloud_name: 'dletlqryn',
    api_key: '384887498885773',
    api_secret: 'IburYofYHMuXRymtcmRKwu97T4M'
});
// end

module.exports.uploads = async (req, res, next) => { // -> câu lệnh trong hướng dẫn đẩy cloud tĩnh -> https://cloudinary.com/blog/node_js_file_upload_to_a_local_server_or_to_the_cloud
                    if(req.file) {
                        let streamUpload = (req) => { // -> giải thích đoạn câu lệnh này ở bài 27 30:00 28tech nodejs
                        return new Promise((resolve, reject) => {
                            let stream = cloudinary.uploader.upload_stream(
                                (error, result) => {
                                    if (result) {
                                        resolve(result);
                                    } else {
                                        reject(error);
                                    }
                                }
                            );
                        
                            streamifier.createReadStream(req.file.buffer).pipe(stream);
                        });
                    };
                
                    async function upload(req) {
                        let result = await streamUpload(req);
                            // console.log(result);
                            // req.body.thumbnail = result.secure_url;
                            // tương tự
                            req.body[req.file.fieldname] = result.secure_url; // -> ở đây thay vì sử dụng thumbnail thì ta dùng như kia để nhỡ có thay đổi thì ko sao, bởi vì khi console thử req thì sẽ có 1 thuộc tính là file.fieldname khi bên pug ở phần image có name là gì thì fieldname = name đó xem ở 28tech video bài 27 43ph 
                            next(); // chỉ gọi next ở đây nếu có file -> bản chất async await có tính chất chờ đợi nên nếu ko có next thì nó ko chạy tiếp được middleware sau 
                        }
                        
                        upload(req);// đây chỉ là hàm gọi nên để sau khi chạy hết thì gọi lại hàm
                    } else {
                        // chỉ gọi next ở đây nếu không có file
                        next();  // ->> bài 27 nodejs 28tech 52:00 -> giải thích về tính chất next và async await và tại sao lại chạy vào controller trước khi upload ảnh 
                    }


                    
                    // giải thích về async await ngắn gọn 
//                             Giải thích dễ hiểu về hai trường hợp dùng next() trong middleware upload ảnh:
// TH1: Dùng if...else (dòng 118 và 124)
// if (req.file) {
//     // Có file upload
//     async function upload(req) {
//         // Chờ upload ảnh lên cloud xong
//         next(); // Dòng 118: chỉ gọi next() khi upload xong
//     }
//     upload(req);
// } else {
//     // Không có file upload
//     next(); // Dòng 124: gọi next() luôn để chuyển sang middleware tiếp theo
// } 
                    // Ý nghĩa:
                    // Nếu có file: Chờ upload xong mới next() → Đảm bảo middleware sau chỉ chạy khi đã có link ảnh.
                    // Nếu không có file: next() luôn → Middleware sau chạy ngay.
                    // next() chỉ được gọi đúng 1 lần cho mỗi request, không bị lặp.
// ====================================================================================
// TH2: Không có if...else, chỉ gọi next() sau upload(req)
// async function upload(req) {
//     // ...chờ upload xong (nếu có file)...
// }
// upload(req);
// next();
//                     Ý nghĩa:
//                     upload(req) là hàm async, nhưng không có await ở ngoài, nên upload(req) chạy song song, không chờ upload xong đã gọi next().
//                     Kết quả: Middleware tiếp theo chạy NGAY, có thể chạy trước khi upload xong, dẫn đến lỗi (chưa có link ảnh, dữ liệu chưa đúng).
//                     Nếu upload(req) bị lỗi (ví dụ không có file), vẫn gọi next() nên có thể gây bug hoặc crash.








}