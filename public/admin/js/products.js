// dùng để xử lý các logic của sản phẩm
// console.log("ok")
// change status -> thay đổi status của 1 sản phẩm  -> 28tech nodejs 23:40 bài 22
const buttonsCHangeStatus = document.querySelectorAll("[button-change-status]"); // chỉ khi lấy class tự định nghĩa thì mới dùng [] còn getAttribute thì ko dùng [] kể cả tự định nghĩa
if(buttonsCHangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status"); // id tự định nghĩa thì ta dùng # như bình thường 
    // đơn giản là formChangeStatus chỉ là lấy ra thẻ html có id là form-change-status
    const path = formChangeStatus.getAttribute("data-path"); // còn ở đây getAttribute("data-path") tức là đang lấy giá trị bên trong của thuộc tính data-path là ${prefixAdmin}/products/change-status  bên views\admin\pages\products\index.pug
    // console.log(path);


    console.log(buttonsCHangeStatus);
    buttonsCHangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            // console.log(statusCurrent);
            // console.log(id);



            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            // console.log(statusChange);


            // xử lý action -> 28tech nodejs 33:40 bài 22
            const actionLink = path + `/${statusChange}/${id}?_method=PATCH`;   // ta cần thêm đuôi action là ?_method=DELETE đằng sau router -> -> vào phần views/admin/products/index.pug để xem 
            // -> đây là đang tạo ra 1 URL động -> controllers/products.controller.js 
            
            // console.log(actionLink);
            formChangeStatus.action = actionLink;


            formChangeStatus.submit(); // js hỗ trợ hàm submit() // -> tương tự như sử dụng thẻ input bên trong thẻ form 
            // Đúng vậy, khi bạn gán giá trị cho formChangeStatus.action bằng actionLink chỉ là việc cập nhật URL đích mà form sẽ gửi dữ liệu tới khi thực hiện hành động submit. Lúc này, chưa có HTTP request nào được gửi lên server cho đến khi gọi formChangeStatus.submit() hoặc người dùng nhấn nút submit. Điều này cho phép bạn tùy chỉnh URL động trước khi kích hoạt gửi form.

        });
    });
}
// a(href="javascript:;" 
//     data-status = item.status
//     data-id = item.id
//     button-change-status 
//     class="badge badge-success") Hoạt động

//  -> khi dùng thẻ a có href là javascript:; là để khi click vào thẻ a thì nó đang băt sự kiện chứ ko phải load lại trang 
// end change status




// start form-change-multi -> thay status nhiều sản phẩm   -> 28tech nodejs 1:07:00 bài 22




// test thay vì sử dụng form + input thì dùng form + js
// const su = document.querySelectorAll("[button-changeMulti]");
// console.log(su);
// if(su.length > 0) {
//     const formChangeMulti = document.querySelector(".form-change-multi");
//     const path = formChangeMulti.getAttribute("data-path");
//     console.log(path)

//     su.forEach(button => {
//         button.addEventListener("click", () => {
//             const actionlink = path + `/products?_method=PATCH`;
//             formChangeMulti.action = actionlink;
//             formChangeMulti.submit();
//         })
//     })
// }








// button-edit ->   //- --------------- có thể sử dụng thẻ a như trong 1:15:00 để xử lý edit nhưng ở đây dùng thử thẻ form
const buttonsEdit = document.querySelectorAll("[button-edit]");
console.log(buttonsEdit);
if(buttonsEdit.length > 0) {
    const formEditItem = document.querySelector("#form-edit-item");
    const path = formEditItem.getAttribute("data-path");
    buttonsEdit.forEach(button => {
        // console.log(button);
        button.addEventListener('click', () => {
            // console.log(button);
            const id = button.getAttribute("data-id");

            const action_id = `${path}/${id}`;
            // const action_id = `${path}/${id}?_method=PATCH`;
            console.log(action_id);
            formEditItem.action = action_id;
            formEditItem.submit();
        })
    })
}












// delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button =>{
        button.addEventListener("click", () => {
            // console.log(button);
            // const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");  // hàm xác nhận với thông báo trả về dạng boolen nếu ấn ok là true và hủy là false 
            // if(isConfirm) {
                const id = button.getAttribute("data-id");

                // console.log(id);
                const action_s =`${path}/${id}?_method=DELETE`;
                // console.log(action_s);
                
                formDeleteItem.action = action_s;
                formDeleteItem.submit();
            // }
        });
    });
};

// end delete item