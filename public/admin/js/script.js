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
        // console.log(e); -> 28tech bai 22 , 1:45:00

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputsChecked); 28tech bai 22 1:47:30
    


        // bài 23 28tech nodejs -> 50:00
        const typeChangeDelte = e.target.elements.type_statuss.value;
        // hoặc 
        // const typeChangeDelte = e.target.querySelector("[name='type_statuss']").value;
        // console.log(typeChangeDelte);
        if(typeChangeDelte == "delete-all") {
            const isConfirm = confirm("Bạn có muốn xóa không?");
            if(!isConfirm) {
                return; // tương tự break; 
            };
        };





        if(inputsChecked.length > 0) {
            let id_array = [];

            // lấy ra ô input và insert id vào 
            const inputId_products = formChangeMulti.querySelector("input[name='id_pproducts']");

            inputsChecked.forEach(input => {
                const ids = input.getAttribute("value"); // hoac const id = input.value;



                // nếu mà typeChangeDelte là change-position thì ta sẽ lấy thêm vị trí của sản phẩm để lưu vào mảng id_array
                if(typeChangeDelte == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']"); //cái input.closet() này sẽ lấy được thẻ cha có tên là tr gần nhất của input đang được trỏ vào ví dụ đang lặp qua phần thử của thẻ checkbox thứ 1 rồi gọi vào hàm input.closet("tr") là nó sẽ lấy ra được thẻ cha gần nhất của ô input checkbox đó và lưu vào biến position và khi này gọi vào query thì nó sẽ lấy được thẻ input nhập position bởi vì mỗi một hàng sản phẩm hay còn gọi là tr thì trong pug định nghĩa dùng vòng lặp 
                    // console.log(position.value); // -> 28tech bai 23 phut thu 1:04:00 

                    const positionValue = position.value;
                    // hoặc
                    // const positionValue = position.getAttribute("value");

                    // console.log(`${ids} - ${positionValue}`);
                    id_array.push(`${ids}-${positionValue}`);
                }else {
                    id_array.push(ids);
                }
            });

            // bai28tech bai22 1:50:00
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





// show-alert

const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    // console.log(showAlert);
    const time = parseInt(showAlert.getAttribute("data-time")); // tại sao lại phải parseInt() vì khi lấy ra từ thuộc tính data-time thì nó sẽ trả về dạng string nên ta cần chuyển đổi sang dạng số nguyên để sử dụng trong hàm setTimeout()
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    
}

// end show-alert

















// upload image để preview ảnh trước khi submit
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImgagePreview = document.querySelector("[upload-image-preview]");


    uploadImageInput.addEventListener("change", (e)=> {
        console.log(e);
        // khi sử dụng e để hiển thị tất cả các thuộc tính của sự kiện thì nó sẽ hiển thị ra rất nhiều thuộc tính, trong đó có thuộc tính target là thẻ input mà ta đã click vào
        // Đúng, .target thường được sử dụng khi làm việc với các sự kiện (event) trong JavaScript.

        const file_check = e.target.files[0]; // lấy ra file đầu tiên trong mảng files sử dụng destructuring
        if(file_check) {
            uploadImgagePreview.src = URL.createObjectURL(file_check); // tạo một URL tạm thời cho file để hiển thị ảnh
            // bài 25 - 28tech - 17ph
        }

        // tiếp theo ta tạo 1 nút x và khi click vào nút x thì nó sẽ xóa ảnh đã upload đi,
        // thì sử dụng bắt sự kiện và khi click vào thì set .value của nó thành string rỗng tức là .value = "" cả phần ô input lẫn phần preview ảnh

    });

    // event close button khi preview ảnh 
    const closeButton = document.querySelector(".close-button");
    console.log(closeButton);
    if(closeButton) {
        closeButton.addEventListener("click", (eventButtonclose) => {
            eventButtonclose.preventDefault();
            uploadImageInput.value = "";
            uploadImgagePreview.src = "";
        });
    }

}
// end upload image để preview ảnh trước khi submit





































// Đúng, khi bạn dùng forEach để lặp qua danh sách phần tử và gán addEventListener cho từng phần tử, thì mỗi phần tử sẽ có một sự kiện độc lập. Nghĩa là:

// Mỗi phần tử trong danh sách sẽ tự lắng nghe sự kiện riêng của nó.
// Khi bạn thao tác (click, change, ...) trên một phần tử, chỉ sự kiện của phần tử đó được kích hoạt, không ảnh hưởng đến các phần tử khác.
// Bạn có thể xử lý logic riêng cho từng phần tử trong callback của addEventListener (ví dụ: lấy thuộc tính, thay đổi giao diện, ...).