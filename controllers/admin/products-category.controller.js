// bat dau bai 28 - nodejs - 28tech 1:15:00ph  -> để lưu được sản phẩm vào database thì đầu tiên phải tạo model vào sau khi tạo xong thì exports ra và trong controller thì sử dụng bằng cách gọi const Product = require(... đường dẫn của model cần lưu vào database ...)









const ProductCategory = require("../../model/products-category.model");
const systemConfig = require("../../config/system");
const createTREE = require("../../helpers/createTree");


// [GET] /admin/products-category
module.exports.productsCategory = async (req, res) => {
    let find = {
        deleted: false,
    }

    // function createTree(array, ParentId="") {
    //     const tree = [];
    //     array.forEach((itemArray) => {
    //         if(itemArray.parent_id === ParentId) {
    //             const newItem = itemArray;
    //             const childrenItem = createTree(array, itemArray.id);
    //             if(childrenItem.length > 0) {
    //                 newItem.newChildrenItem = childrenItem; // -> newChildrenItem thực chất là một thuộc tính tự định nghĩa của newItem 
    //             }
    //             tree.push(newItem);
    //         }
    //     })
    //     return tree;
    // }
    
    const records1 = await ProductCategory.find(find);
    const newRecords1 = createTREE.tree(records1);
    

    res.render("admin/pages/products-category/index", {
        pageTitle_1: "Danh sách quản lý sản phẩm",
        record1: newRecords1
    });
}

// [GET] /admin/products-category/create

module.exports.create = async (req, res) => {

    let find = {
        deleted: false,
    };

    


















    // sử dụng đệ quy để lấy ra sản phẩm sử dụng tree

//     Hàm đi sâu đến node cuối cùng trước (đệ quy), xử lý xong node con rồi mới quay lại node cha để gán children. 
//     Quá trình này lặp lại cho đến khi hoàn thành cây phân cấp.
//     Bạn hiểu đúng về cách hoạt động của hàm này!
    function createTree (array, parentId = "") {
        const tree = [];
        array.forEach((item) => {
            if(item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(array, item.id);
                // console.log(newItem, "------------", children);
                if(children.length > 0) {
                    newItem.newChildren = children;
                }
                tree.push(newItem);
            }
        })
        return tree;
    }



    const records = await ProductCategory.find(find);
    // console.log(records);

    const newRecords = createTree(records);
    // console.log(newRecords);










    





    res.render("admin/pages/products-category/create", {
        pageTitle_1: "Tạo danh sách quản lý sản phẩm",
        record: newRecords
    });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
        // console.log(req.body);

        try {
            // Tự động tăng position -> 28tech bài 24 - 0:35:00
            if(req.body.position == "") {
                const countProducts = await ProductCategory.countDocuments(); // -> Tự động tăng nếu người dùng ko nhập vị trí, dựa trên hàm countDocuments() của mongoose
                // console.log(countProducts);
                req.body.position = countProducts + 1;
            }else {
                req.body.position = parseInt(req.body.position);
            }



            // Đưa vào database -> nodejs bài 24- 28tech -> 38ph 
            const record = new ProductCategory(req.body); // -> Tạo mới 1 sản phẩm rồi lưu req.body vào nhưng chưa đưa vào database mà chỉ lưu trữ trong code model
            await record.save(); // -> dùng .save(); để lưu vào database
            
            res.redirect(`${systemConfig.prefixAdmin}/products-category`);
        } catch (error) {
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
        }
}