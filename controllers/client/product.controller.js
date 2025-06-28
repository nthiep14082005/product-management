// [GET] /products



const Product = require("../../model/product.model");




module.exports.product = async (req, res) => {
    // Tạo biến find riêng để dễ mở rộng điều kiện truy vấn
    const find = {
        status: "active",
        deleted: "false"
    };
    const productts = await Product.find(find).sort({position: "desc"});
    // console.log(productts);

    // tính toán số price new
    const newProducts = productts.map(item => {
        item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        return item;
    });

    res.render("client/pages/products/index", {
        pageTitle: "Danh sach san pham",
        producttt: newProducts
    });
}

module.exports.detail = async (req,res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
        const products = await Product.findOne(find);
        // console.log(product);
        res.render("client/pages/products/detail", {
            pageTitle: products.title,
            product: products
        });
    } catch (error) {
        res.redirect(`/products`);
    }

}