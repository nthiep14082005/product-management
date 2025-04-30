const Product = require("../../model/product.model");

const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

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
        limitItem: 4,
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




    const productsInADMIN = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip); // câu lệnh .skip ở đây là hàm có sẵn ví dụ skip(4) -> thì sẽ bỏ qua 4 giá trị -> dòng này đằng bên phải dấu = là các hàm và câu lệnh trong mongoosemongoose
    // câu lệnh .limit dùng để giới hạn những phần được hiển thị trong trang ví dụ ở đây là 7
    // console.log(productsInADMIN);



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
    // console.log(req.body);             // -> ở form data đã được gửi được tệp đóng gói lên network có status-type là inactive hoặc active và products-id là nhập vào 
    // -> nhưng khi console.log(req.body) thì lại trả về undefined 
    // req.body là một thuộc tính của đối tượng request trong Express dùng để chứa dữ liệu mà client gửi lên thông qua phần thân của HTTP request. Để dễ hiểu hơn, hãy nghĩ đến một form trên website
    //     Khi bạn điền thông tin vào form (như tên, email, số điện thoại,…) và nhấn nút submit, các thông tin bạn nhập vào đó sẽ được gói lại trong "phần thân" của HTTP request gửi đến server.
    //     Sau đó, Express sẽ nhận request này. Tuy nhiên, dữ liệu trong phần thân đó mặc định chỉ là một chuỗi (string) mà Express không hiểu trực tiếp.
    //     Để có thể dễ dàng sử dụng, chúng ta cần "bóc tách" dữ liệu đó thành một đối tượng JavaScript. Việc này được thực hiện bởi các middleware như express.urlencoded() (cho dữ liệu dạng form) hoặc express.json() (cho dữ liệu dạng JSON).
    //     Khi middleware xử lý xong, dữ liệu được chuyển thành một đối tượng và gán cho req.body. Khi đó, bạn có thể truy cập các trường dữ liệu mà người dùng đã nhập một cách dễ dàng thông qua req.body.<tên_trường>.
        // có thể hiểu đơn giản hơn là những cái form data khi được submit lên nó sẽ được lưu vào req.body vậy nên khi console.log(req.body) mà undefined thì cần cài thêm một thư viện body-parser
            // ---------------> khi này cần cài thêm một thư viện nữa là body-parser
    
    
    const type = req.body.type_statuss;
    const ids = req.body.id_pproducts.split(", "); // khi bên backend này thì cần convert về dạng array thì dùng .split(", ");
    
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
            break;
        default:
            break;
    }
    
    
    // console.log(type, ids);
    
    res.redirect("back");



    // res.send(`${ids} - ${type}`) // -> hiển thị status và id ra giao diện 
}


// [DELETE] /admin/products/delete-product/:id  -> sử dụng DELETE
// module.exports.deleteProduct = async (req,res) => {
//     const id = req.params.id;

//     await Product.deleteOne({_id: id});

//     res.redirect("back");
// }

// [PATCH] /admin/products/delete-product/:id -> sử dụng PATCH 

module.exports.deleteProduct_PATCH = async (req,res) => {
    const id = req.params.id;

    await Product.updateOne({_id: id},{deleted: true});

    res.redirect("back");
}




// test thay vì sử dụng form + input thì dùng form + js
// module.exports.change_multi = async (req,res) => {
//     console.log(req.body);
//     res.send("haha");
// }














// -> những chỗ truy vấn vào database thì phải thêm await hay còn là truoc model thi them await