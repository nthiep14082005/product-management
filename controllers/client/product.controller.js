// [GET] /products



const Product = require("../../model/product.model");




module.exports.product = async (req, res) => {
    const productts = await Product.find({
        status: "active",
        deleted: "false"
    });
    console.log(productts);

    // tính toán số price new
    // products.forEach(item => { // có thể dùng map hoặc forEach()
    //     item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0); // xem lại hàm toFixed()
    // })
    //hoặc sử dụng map thì sẽ là tạo ra một mảng mới 
    const newProducts = productts.map(item => { // có thể dùng map hoặc forEach()
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0); // xem lại hàm toFixed()
        return item;
    })


    res.render("client/pages/products/index", { ////////////// 
        pageTitle: "Danh sach san pham",
        producttt: newProducts
    })
}

