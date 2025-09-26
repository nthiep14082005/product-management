// file này viết một function để random string để tạo một token

module.exports.generateRandomString = (length) => {
    const characters = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789";

    let result = "";

    for(let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};


// Đoạn này có tác dụng lấy ngẫu nhiên một ký tự từ chuỗi characters và nối vào chuỗi kết quả result.

// Giải thích chi tiết:

// Math.random() sinh ra một số thực ngẫu nhiên từ 0 đến nhỏ hơn 1.
// Math.random() * characters.length tạo ra một số thực ngẫu nhiên từ 0 đến nhỏ hơn độ dài chuỗi characters.
// Math.floor(...) làm tròn xuống để lấy chỉ số nguyên (index) của ký tự trong chuỗi.
// characters.charAt(...) lấy ký tự tại vị trí index vừa tính được.
// result += ... nối ký tự đó vào chuỗi kết quả.
// Tóm lại:
// Mỗi lần lặp, dòng này sẽ chọn ngẫu nhiên một ký tự trong characters và thêm vào result. Lặp lại nhiều lần sẽ tạo ra một chuỗi ngẫu nhiên.