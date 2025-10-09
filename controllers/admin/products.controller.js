const Product = require("../../model/product.model");
const ProductCategory = require("../../model/products-category.model");
const Account = require("../../model/accounts.model");


const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTREE = require("../../helpers/createTree");




// controller dùng để hiển thị danh sách sản phẩm 
// [GET] /admin/products
module.exports.products = async (req,res) => {
    // đổi màu phím bấm
    // đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query); // thay đổi màu  
    
    // câu lệnh truy vấn //1t14ph bai 20 28tech nodejs 
    // console.log(req.query.status)
    let find = {
        deleted: false
        // title: "iPhone 9"
    };


    // phan status -> phần này để xử lý ban đầu khi mà điền trên thanh url thì nó sẽ hiển thị theo sau đó mới vào trong file js để xử lý phần click vào 
    // phần dưới chủ yếu là lấy giá trị trên thanh url 
    if(req.query.status) {
        find.status = req.query.status;
    }
    // req.query là một đối tượng trong Express.js chứa các tham số truy vấn (query parameters) được gửi qua URL.
    // Query parameters là các giá trị được gắn vào URL sau dấu ? và được chia tách bằng dấu &. Ví dụ: http://example.com/products?status=active    -->  req.query.status sẽ có giá trị "active".










    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        
        find.title = objectSearch.regex;
    }


    // phần này xem ở 28tech bài 21 phút thứ 9
    // let keyword = "";    
    // if(req.query.keyword){
    //     keyword = req.query.keyword;
    //     // sử dụng regex để tìm tất cả những sản phẩm mà ko cần fix cứng string
        
    //     // phần regex này xem ở phút thứ 30 - bài 21 - 28tech nodejs

    //     const regex = new RegExp(keyword, "i"); // -> string i được coi là một biến thêm string i đằng sau là để ko phân biệt giữa chữ hoa vả chữ thường. 

    //     //Thêm chuỗi 'i' vào regex là để không phân biệt chữ hoa và chữ thường khi thực hiện tìm kiếm. Cụ thể hơn, flag 'i' (case-insensitive) giúp cho việc tìm kiếm trở nên linh hoạt hơn, không quan tâm đến việc chữ cái trong từ khóa hoặc chuỗi cần tìm có viết hoa hay không.
    //     find.title = regex;
    // }




   

    // pagination -> phan trang
    const countProducts = await Product.countDocuments(find); // -> trong moongoos có hàm countDocument để đếm ra tất cả các bản ghi 
    let objectPagination = paginationHelper({
        limitItem: 7,
        currentPage: 1
    }, req.query, countProducts
    );

    // let objectPagination = {
    //     limitItem: 4,
    //     currentPage: 1
    // };

    // if (req.query.page) {
    //     objectPagination.currentPage = parseInt(req.query.page); // khi mà trả về thì đang là string nên phải dùng parseInt để convert sang numbernumber
    // };

    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    // // objectPagination.skip ở đây là đang tạo ra 1 key tên là skip trong object objectPagination 
    // // còn cách để tính như kia thì xem ở bài 21 28tech nodejs 1:13:00




    // // tính số lượng trang và tự động vẽ ra giao diện 
    // const countProducts = await Product.countDocuments(find); // -> trong moongoos có hàm countDocument để đếm ra tất cả các bản ghi 
    // // console.log(countProducts);
    // const totalPage = Math.ceil(countProducts/objectPagination.limitItem);// -> làm tròn lên dùng Math.ceil() -> 
    // objectPagination.totalPage = totalPage;
    // end pagination                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   




    // sort
    let sort1 = {};
    if(req.query.sortKey && req.query.sortValue) { // -> ở đây sortKey và sortValue và 2 biến tự đặt tên trên thanh url 
        sort1[req.query.sortKey] = req.query.sortValue; // -> truyền 1 key value trong object
        // sort1.price = "desc";
    } else {
        sort1.position = "desc";
    }
    // end sort

    const productsInADMIN = await Product.find(find).sort(sort1).limit(objectPagination.limitItem).skip(objectPagination.skip); // câu lệnh .skip ở đây là hàm có sẵn ví dụ skip(4) -> thì sẽ bỏ qua 4 giá trị -> dòng này đằng bên phải dấu = là các hàm và câu lệnh trong mongoosemongoose
    // thêm hàm sắp xếp và truyền key là position là một key được định nghĩa ở model-schema và này là sắp xếp theo vị trí, nếu muốn sắp xếp theo tên thì ta chỉ cần truyền vào key có sẵn trong model-schema là title vào nếu desc thì là sắp xếp theo giảm dần, asc thì là sắp xếp theo tăng dần 
    // câu lệnh .limit dùng để giới hạn những phần được hiển thị trong trang ví dụ ở đây là 7
    // console.log(productsInADMIN);

    for(const product of productsInADMIN) { // Đoạn code này lặp qua từng sản phẩm trong productsInADMIN để:         ->      Tìm user có _id trùng với account_id của sản phẩm (người tạo sản phẩm).     ->       Nếu tìm thấy user, gán tên đầy đủ của user (user.fullName) vào thuộc tính mới product.userFullName của sản phẩm. -> Mục đích: -> ,Để mỗi sản phẩm hiển thị được tên người tạo ra sản phẩm trên giao diện.
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        });
        if(user) {
            product.userFullName = user.fullName;
        }
    }

    // const filter1 = console.log(filterStatus)

    res.render("admin/pages/products/index.pug", {
        pageTitle_1: "Danh sách sản phẩm " ,
        productttInADMIN_1: productsInADMIN,
        filterStatus_1: filterStatus,
        // filter2: filter1
        keywordInSubmit_1: objectSearch.keyword,
        pagination_1: objectPagination // -> trả object objectPagination ra giao diện để giao diện gọi đến
    });
}

// -> req.query -> là những phần tử sau dấu hỏi chấm trên thanh url

// controller dùng để hiển thị 
// [PATCH] /admin/products/change-status/:status/:id -> khi sử dụng phương thức PATCH thì dùng cho khi ta thay đổi hoặc cập nhập sản phẩm trong database và khi đó thì html chỉ hỗ trợ phương thức post và get nên muốn dùng PATCH ta phải cài thêm một thư viện  ------> npm i method-override
module.exports.changeStatus = async (req,res) => {
    // khi ta muốn biết lấy được các giá trị của biến status hay id thì ta dùng req.params -> params là cái object chứa cái router động được nhập vào -> tức là những cái biến mà ta nhập có thể thay đổi được ở trên thanh url -> đó là params
    // console.log(req.params); // -> phút thứ 9 bài 22 28tech nodejs
    // res.send("ok");
// -> xử lý trươc phần này bên public/admin/js/products
    const statusC = req.params.status;
    const idC = req.params.id;
    // req.params chứa các tham số được định nghĩa trong URL động của route. -> dòng 26 của public/admin/js/products.js -> đang tạo ra URL động nên dùng params.id để lấy ra id động trên URL động 


    // console.log(req.body);





    await Product.updateOne({_id: idC}, {status: statusC}); // -> 42:00 bai 22 28tech nodejs
    // -> để update hay làm gì đó với bên database thì ta dùng async await để xử lý trực tiếp vào database 

    
    req.flash('success', 'Cập nhập trạng thái sản phẩm thành công');

    // ta có hàm có sẵn khi ta lên api reference trên expressjs có res.redirect("router"); sẽ tự động về lại 1 trang khi ta truyền router vào cho nó 
    // ngoài ra thì có một router đó là "back" -> ví dụ ta đang ở trang a mà ta click vào trang b thì nó sẽ quay về trang a , và nếu ta đang ở trang 2 mà khi click vào status thì nó sẽ thay đổi status và quay trở về lại trang 2 
// --------
    // res.redirect("/admin/products"): Lệnh này chuyển hướng người dùng trực tiếp đến URL cụ thể là "/admin/products". Khi được gọi, trang web của bạn sẽ tải lại giao diện tại đường dẫn này bất kể trang hiện tại của người dùng là gì.
    // -> // res.redirect("/admin/products");
// --------
    // res.redirect("back"): Lệnh này chuyển hướng người dùng quay trở lại trang mà họ vừa truy cập trước đó. 
    res.redirect("back");
    


    // res.send(`${statusC} - ${idC}`) // -> hiển thị status và id ra giao diện 
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
    // console.log(req.body);  28tech bai 22 , 1:52:30           // -> ở form data đã được gửi được tệp đóng gói lên network có status-type là inactive hoặc active và products-id là nhập vào 
    // -> nhưng khi console.log(req.body) thì lại trả về undefined 
    // req.body là một thuộc tính của đối tượng request trong Express dùng để chứa dữ liệu mà client gửi lên thông qua phần thân của HTTP request. Để dễ hiểu hơn, hãy nghĩ đến một form trên website
    //     Khi bạn điền thông tin vào form (như tên, email, số điện thoại,…) và nhấn nút submit, các thông tin bạn nhập vào đó sẽ được gói lại trong "phần thân" của HTTP request gửi đến server.
    //     Sau đó, Express sẽ nhận request này. Tuy nhiên, dữ liệu trong phần thân đó mặc định chỉ là một chuỗi (string) mà Express không hiểu trực tiếp.
    //     Để có thể dễ dàng sử dụng, chúng ta cần "bóc tách" dữ liệu đó thành một đối tượng JavaScript. Việc này được thực hiện bởi các middleware như express.urlencoded() (cho dữ liệu dạng form) hoặc express.json() (cho dữ liệu dạng JSON).
    //     Khi middleware xử lý xong, dữ liệu được chuyển thành một đối tượng và gán cho req.body. Khi đó, bạn có thể truy cập các trường dữ liệu mà người dùng đã nhập một cách dễ dàng thông qua req.body.<tên_trường>.
        // có thể hiểu đơn giản hơn là những cái form data khi được submit lên nó sẽ được lưu vào req.body vậy nên khi console.log(req.body) mà undefined thì cần cài thêm một thư viện body-parser
            // ---------------> khi này cần cài thêm một thư viện nữa là body-parser
    
    
    const type = req.body.type_statuss; // -> ví dụ type_statuss khi gửi form lên là inactive hoặc delete-all thì nó sẽ nhảy vào switch case
    const ids = req.body.id_pproducts.split(", "); // khi bên backend này thì cần convert về dạng array thì dùng .split(", ");
    console.log(req.body);
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            // console.log(ids);
            // for(const item of ids) {
            //     console.log(item);
            // }
            req.flash('success', `Cập nhập trạng thái thành công của ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            req.flash('success', `Cập nhập trạng thái thành công của ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({_id: { $in: ids}}, {deleted: true, deletedAt: new Date()});
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm`);

            break;
        case "change-position":
            // console.log(ids); // -> in ra hẳn cả mảng bao gồm cả []
            // for(const item of ids) { // -> chỉ in ra giá trị nếu dùng for of , for in là in ra index của nó , forEach là in ra giá trị giống for of
            //     console.log(item);
                    // let [id, position] = item.split("-");
                    // position = parseInt(position);
                    // await Product.updateOne({_id: id}, {position: position});
            // } 
            // hoặc 
            ids.forEach(async item => {
                // console.log(item.split("-")); // sử dụng split("-") ->>>Khi bạn truyền vào dấu gạch ngang "-" làm đối số, phương thức sẽ phân chia chuỗi ở mỗi vị trí xuất hiện của dấu "-".
                let [id_p, position_p] = item.split("-"); // -> sử dụng destructuring truyền tham số trực tiếp [id, position] 
                // console.log(position);
                // position = parseInt(position); // không cần convert 
                // console.log(position);


                await Product.updateOne({_id: id_p}, {position: position_p}); // bởi vì mỗi một sản phẩm là một position riêng nên cần dùng loop để mỗi lần update sản phẩm riêng chứ ko dùng updateMany là để update nhiều sản phẩm giống nhau
              });    
            req.flash('success', `Cập nhập vị trí thành công của ${ids.length} sản phẩm`);

        default:
            break;
    }
    
    
    // console.log(type, ids);
    
    res.redirect("back");



    // res.send(`${ids} - ${type}`) // -> hiển thị status và id ra giao diện 
}

module.exports.renderEditItems = async (req, res) => { // bài 25 - 28tech nodejs

    // dùng try catch bởi vì khi mà đang ở trong này mà người dùng nhập linh tinh id lên url thì server sẽ bị die luôn, bởi vậy nên phải dùng try catch để check xem    -> 1:38:00 -> 28tech bài 25
    // có thể dịch là thử truy cập vào trang, nếu lỗi có error thì bắt lỗi và redirect về trang sản phẩm 
    try {
        const id_items = req.params.id;
        const find = {
            // deleted: false,
            _id: id_items
        };
        // const products = await Product.find(find); // trong mongo thì hàm find sẽ trả về 1 mảng sản phẩm, còn fineOne là trả về 1 sản phẩm tức là chỉ 1 object sản phẩm đó
        // console.log(products[0]);
        const products = await Product.findOne(find);
        // console.log(products);
        // Nếu bạn định nghĩa một key khác (ví dụ: product: products) trong một hàm controller khác và truyền vào hàm res.render, thì chỉ view (pug) nào được render bởi chính hàm đó mới sử dụng được biến product.
        
        const record1 = await ProductCategory.find({deleted: false});
        const newRecord1 = createTREE.tree(record1);
        
        res.render("admin/pages/products/edit-items", {
            pageTitle_1: "Chỉnh sửa sản phẩm",
            product: products,
            category: newRecord1
        })
        // res.send(`${id_items}`);
        // res.send(`OK`);
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
module.exports.editItems = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // req.body.position = parseInt(req.body.position);

    // Tự động tăng position -> 28tech bài 24 - 0:35:00
    // if(req.body.position == "") {
    //     const countProducts = await Product.countDocuments(); // -> Tự động tăng nếu người dùng ko nhập vị trí, dựa trên hàm countDocuments() của mongoose
    //     req.body.position = countProducts + 1;
    // }else {
    req.body.position = parseInt(req.body.position);
    // }

    // console.log(req.file); 
    // if(req.file) { // -> ở đây là lưu ảnh vào file dưới local , còn nếu online thì xem ở bên router hoặc bài 27 - 28tech nodejs 42:00ph 
    //     req.body[req.file.fieldname] = `/uploads/${req.file.filename}`;  // -> convert thumbnail sang req.file.filename chứ ko phải là req.file.originalname
    // };

    try {
        await Product.updateOne({ _id: req.params.id}, req.body);
        req.flash('success', `Cập nhập sản phẩm thành công`);
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
        req.flash('error', `Cập nhập sản phẩm không thành công`);
    }
    
    res.redirect("back");
}


// [GET /admin/products/detail-item/:id -> Sử dụng get để lấy ra giao diện chi tiết sản phẩm 
module.exports.detailsItem = async (req,res) => {
    try {
        const find = {
            _id: req.params.id
        };
        const products = await Product.findOne(find);

        res.render("admin/pages/products/detail-items", {
            pageTitle_1: products.title,
            product: products
        });
        // console.log(product);

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};


// [DELETE] /admin/products/delete-product/:id  -> sử dụng DELETE
// module.exports.deleteProduct = async (req,res) => {
//     const id = req.params.id;

//     await Product.deleteOne({_id: id});

//     res.redirect("back");
// }



// [PATCH] /admin/products/delete-product/:id -> sử dụng PATCH 
module.exports.deleteProduct_PATCH = async (req,res) => {
    const id = req.params.id;

    await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()}); // thêm trường deletedAt cùng với object của deleted luôn 
    req.flash('success', `Xóa thành công sản phẩm`);

    res.redirect("back");
}

module.exports.changeDeleteMulti = async (req,res) => {
    const ids = req.body.id_delete_products.split(", ");    

    // console.log(ids);
    // res.send(`${ids}`)

    await Product.deleteMany({_id: {$in: ids}}, {deleted: true, deletedAt: new Date()});
    req.flash('success', `Xóa vĩnh viễn thành công ${ids.length} sản phẩm`);


    res.redirect("back");
}





// test thay vì sử dụng form + input thì dùng form + js
// module.exports.change_multi = async (req,res) => {
//     console.log(req.body);
//     res.send("haha");
// }



// [GET] /admin/products/create -> sử dụng để vẽ ra giao diện tạo sản phẩm mới
// -> khi ta truy cập vào đường dẫn /admin/products/create thì sẽ hiển thị ra giao diện tạo sản phẩm mới
module.exports.create = async (req,res) =>{

    let find = {
        deleted: false,

    }

    const record1 = await ProductCategory.find(find);
    const newRecord1 = createTREE.tree(record1);

    res.render("admin/pages/products/create", {
        pageTitle_1: "Thêm mới sản phẩm",
        category: newRecord1
    });
}
// [POST] /admin/products/create -> sử dụng để thêm sản phẩm mới vào database
// -> khi ta submit form thì sẽ gửi dữ liệu lên server và server sẽ xử lý dữ liệu đó và lưu vào database
module.exports.createPost = async (req,res) => {

    // // bai 25 - 28tech - 48ph -> validate dữ liệu , validate title -> đã chuyển sang file riêng
    // if(!req.body.title) {
    //     req.flash('Error', `Vui lòng nhập tiêu đề`);
    //     res.redirect("back");
    //     return; // khi return để nó dừng hết các đoạn code dưới để tránh trường hợp value rác vào database
    // }



    // console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // req.body.position = parseInt(req.body.position);

    // Tự động tăng position -> 28tech bài 24 - 0:35:00
    if(req.body.position == "") {
        const countProducts = await Product.countDocuments(); // -> Tự động tăng nếu người dùng ko nhập vị trí, dựa trên hàm countDocuments() của mongoose
        // console.log(countProducts);
        req.body.position = countProducts + 1;
    }else {
        req.body.position = parseInt(req.body.position);
    }
    // console.log(req.body);






    console.log(req.file); // -> bai 24 28tech 1:43:00 -> req.file là để xem trên form-data đã up lên file nào không, ví dụ ở bên fe kia đã up lên file ảnh nên nó sẽ hiển thị file ảnh và các thông tin của nó 
    // để hiển thị ảnh thì ta sẽ phải sử dụng đường dẫn như sau /upload/${req.file.filename} còn về tại sao mà không đi vào thư mục /public/upload/${req.file.filename} thì là do ta cài static: app.use(express.static("public")); nên nó sẽ bắt buộc phải đi trực tiếp từ /upload/${req.file.filename} bỏ qua public
    // hoặc ta có thể biết bằng cách khi console.log(req.file) thì để hiển thị ảnh lưu vào database thì ta sử dụng đường dẫn path và bỏ qua đường dẫn file đầu tiên -> lấy từ đường dẫn file từ thứ 2 trở đi 
    // if(req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;  // -> convert thumbnail sang req.file.filename chứ ko phải là req.file.originalname
    // };

    // http://localhost:3000/uploads/32618f5910de9b3d36405a3cc4a1fa67


    req.body.createdBy = { // -> ở đây là tạo 1 key tên là createdBy , thứ nhất trùng field model, thứ 2 là để tạo vào trong database 
        account_id: res.locals.userAdmin.id, // -> khi này bởi vì res.locals.userAdmin đã được lưu vào biến local nên có thể lấy ra được và trỏ vào id để lưu trữ vào trường createdBy trong model là account_id và createdAt thì đã được sinh ra tự động
    }


    // Đưa vào database -> nodejs bài 24- 28tech -> 38ph 
    const product = new Product(req.body); // -> Tạo mới 1 sản phẩm rồi lưu req.body vào nhưng chưa đưa vào database mà chỉ lưu trữ trong code model
    await product.save(); // -> dùng .save(); để lưu vào database
    req.flash('success', `Thêm thành công sản phẩm`);
    
    res.redirect(`${systemConfig.prefixAdmin}/products`);
    // res.redirect("back");
} 













// -> những chỗ truy vấn vào database thì phải thêm await hay còn là truoc model thi them await













