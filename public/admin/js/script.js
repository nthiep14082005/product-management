// Butoon Status -> xử lý khi click vào thì nó sẽ chuyển sang các status khác 

// xử lý chuyển đổi khi mà bấm vào button thì trang sẽ tự động chuyển sang -> tức là khi ấn vào thì nó sẽ thay đổi sản phẩm tương ứng , ví dụ khi ấn hoạt động thì nó chỉ hiển thị những sản phẩm hoạt động chứ ko xử lý phần đổi màu
// phần này dùng để thay đổi thanh url khi mà ta thay đổi url thì nó sẽ submit() ở trên URL luôn
const buttonStatus = document.querySelectorAll("[button-status]"); // button-status là thuộc tính tự định nghĩa nên phải để trong ngoặc vuông
// console.log(buttonStatus);
if(buttonStatus.length > 0){

    // kiến thức mới bài 20 28tech nodejs 1t29ph
    let urlWindow = new URL(window.location.href); // trong thằng new URL có sẵn những hàm để ta có thể thay đổi được url






    buttonStatus.forEach(button => {
        // console.log(button);
        button.addEventListener("click", () => {
            const statusButton = button.getAttribute("button-status");
            // console.log(statusButton);

            if(statusButton) { // nếu mà có status
                urlWindow.searchParams.set("status", statusButton); // hàm new URL có hàm searchParams tức là những phần sau dấu ? trên thanh url gọi là searchParams
            }else {
                urlWindow.searchParams.delete("status");
            }
            // console.log(urlWindow.href);
            window.location.href = urlWindow.href
            // window.location.href = ... chính là câu lệnh để chuyển hướng trang web sang 1 url khác
        });
    });
}
// End Button Status



// form-search bài 20 28tech nodejs 1t56phh -> phần search tên sản phẩm
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (event) => {
        let urlFormSearch = new URL(window.location.href);

        event.preventDefault(); // xóa mặc định trình duyệt để khi submit thì ko bị reload trang
        // console.log(event.target.elements.keyword.value);
        const keyword = event.target.elements.keyword.value; // -> lấy ra cái giá trị mà đã nhập vào ô input , còn submit ở đây là ấn nút tìm kiếm
        if(keyword) { // tức là kiểm tra nếu mà keyword ở trên mà có giá trị được nhập vào...
            urlFormSearch.searchParams.set("keyword", keyword); 
        }else {
            urlFormSearch.searchParams.delete("keyword");
        }
        console.log(urlFormSearch.href);
        window.location.href = urlFormSearch.href
    });
}

// End form-search










// pagination 28tech bai 21 nodejs 1t31ph

const buttonsPagination = document.querySelectorAll("[button-pagination]");
// console.log(buttonsPagination);
if(buttonsPagination) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button=> {
        button.addEventListener("click" , ()=> {
            const page = button.getAttribute("button-pagination");
            // console.log(page);'
            
            url.searchParams.set("page", page);

            window.location.href = url.href;
            
        });
    });
};



// End pagination












// checkbox multi

const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    // console.log(checkboxMulti);
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    // console.log(inputCheckAll);
    const inputIdProducts = checkboxMulti.querySelectorAll("input[name='id']");
    // console.log(inputIdProducts);



    // xử lý cho checkAll
    inputCheckAll.addEventListener("click" , () => {
        // console.log(inputCheckAll.checked); // trả về dạng boolen 
        if(inputCheckAll.checked) {
            inputIdProducts.forEach(input => {
                input.checked = true;
            });
        }else {
            inputIdProducts.forEach(input => {
                input.checked = false;
            });
        }
    });


    // xử lý cho check từng phần 
    inputIdProducts.forEach(input => {
        input.addEventListener("click" , ()=> {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked"); // -> thêm :checked tức là tìm ra những ô input đã được check = true
            const countCheckedLength = countChecked.length;
            const inputIdProductsLength = inputIdProducts.length;
            // console.log(countCheckedLength);
            // console.log(inputIdProductsLength);

            if(countCheckedLength == inputIdProductsLength) {
                inputCheckAll.checked = true;
            }else {
                inputCheckAll.checked = false;
            }
        });
    });


};

// end checkbox multi 





// form data change-multi -> 28tech bài 22 1:42:00
const formChangeMulti = document.querySelector("[data-form-change-multi]");
if(formChangeMulti) {
    // console.log(formChangeMulti);
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        // console.log(events);

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputsChecked);
    


        if(inputsChecked.length > 0) {
            let id_array = [];

            // lấy ra ô input và insert id vào 
            const inputId_products = formChangeMulti.querySelector("input[name='id_pproducts']");


            inputsChecked.forEach(input => {
                const ids = input.getAttribute("value"); // hoac const id = input.value;
                id_array.push(ids);
            });
            // console.log(id_array.join(", ")); // nếu chỉ để id_array thì nó sẽ chỉ hiển thị ra dạng mảng và bên trong ô input nó ko lưu được dạng mảng mà chỉ lưu được ở dạng string nên ta cần convert từ mảng sang string dùng .join(" ");
        
            inputId_products.value = id_array.join(", ");
            // console.log(inputId_products.value);

            formChangeMulti.submit();
        }else {
            alert("Vui lòng chọn ít nhất một bản ghi!!!");
        }
    });
}

// end form data change-multi




// delete multi
// const formDeleteMulti = document.querySelector("[data-form-delete-multi]");
// if(formDeleteMulti) {
//     // console.log(formDeleteMulti);
//     formDeleteMulti.addEventListener("submit", (e) => {
//         e.preventDefault();
//         // console.log(events);

//         const checkboxMulti = document.querySelector("[checkbox-multi]");
//         const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
//         // console.log(inputsChecked);
    


//         if(inputsChecked.length > 0) {
//             let id_array = [];

//             // lấy ra ô input và insert id vào 
//             const inputId_products = formDeleteMulti.querySelector("input[name='id_delete_products']");


//             inputsChecked.forEach(input => {
//                 const ids = input.getAttribute("value"); // hoac const id = input.value;
//                 id_array.push(ids);
//             });
//             // console.log(id_array.join(", ")); // nếu chỉ để id_array thì nó sẽ chỉ hiển thị ra dạng mảng và bên trong ô input nó ko lưu được dạng mảng mà chỉ lưu được ở dạng string nên ta cần convert từ mảng sang string dùng .join(" ");
        
//             inputId_products.value = id_array.join(", ");
//             // console.log(inputId_products.value);

//             formDeleteMulti.submit();
//         }else {
//             alert("Vui lòng chọn ít nhất một bản ghi!!!");
//         }
//     });
// }
// end delete multi 



// delete multi

const formDeleteMulti = document.querySelector("[data-form-delete-multi]");
if(formDeleteMulti) {
    formDeleteMulti.addEventListener("submit", (e)=> {
        e.preventDefault();
        // console.log(e);
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputsChecked);

        if(inputsChecked.length > 0) {
            const inputData = document.querySelector("input[name='id_delete_products']");
            // console.log(inputData);
            let id_array = [];

            inputsChecked.forEach(input => {
                const idsC = input.getAttribute("value");
                id_array.push(idsC);
            });
            // console.log(id_array.join(", "));
            inputData.value = id_array.join(", ");

            formDeleteMulti.submit();
        }else {
            alert("Vui lòng chọn ít nhất một bản ghi!!!");
        }
    });
}

// end delete multi 


