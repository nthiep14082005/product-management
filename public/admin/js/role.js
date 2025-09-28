// xử lý phần này + roles bên controller bắt đầu từ bài 31 - 28tech nodejs


// Permissions button submit form
//
//
const tablePermissions = document.querySelector("[table-permissions]");
// console.log(tablePermissions);
if(tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", (events) => {
        let arrayPermissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");
        // console.log(rows);
        rows.forEach(row => {
            const nameDATA = row.getAttribute("data-name");
            // console.log(nameDATA);
            const inputs = row.querySelectorAll("input");
            // console.log(inputs);
            if(nameDATA == "id") {
                inputs.forEach(input => {
                    const idC = input.value;
                    // console.log(idC);
                    // console.log(nameDATA);
                    arrayPermissions.push({
                        id: idC,
                        permissions: []
                    });
                });
            }
            else {
                inputs.forEach((value, index) => { // trong pug hay js thì giá trị đầu tiên đều là value và giá trị thứ 2 là index
                    const checked = value.checked;

                    // console.log(nameDATA);
                    // console.log(checked);
                    if(checked) {
                        arrayPermissions[index].permissions.push(nameDATA);
                    }
                });
            }
        });
        // console.log(arrayPermissions);



        // lấy ra mảng arrayPermissions để chèn vào ô input rồi gửi lên form sang controller
        if(arrayPermissions.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");

            // inputPermissions.value = arrayPermissions.join(",");
            inputPermissions.value = JSON.stringify(arrayPermissions);
            // vậy nếu trường hợp là 1 mảng chuỗi + số hoặc một mảng số thì chỉ cần join để chuyển từ mảng sang chuỗi rồi push vào ô input là được, còn nếu mảng obbject các đối tượng có keyvalue và có cả mảng trong đối tượng, có cả chuỗi, số trong đối tượng đó thì cần phải dùng JSON để chuyển sang chuỗi JSON...
                    // 3. Tóm lại:
                            // Dùng join: Khi mảng chứa giá trị đơn giản (chuỗi hoặc số).
                            // Dùng JSON.stringify: Khi mảng chứa đối tượng phức tạp hoặc cần giữ nguyên cấu trúc dữ liệu.

            formChangePermissions.submit();
            
        }
    });
}
//
//
// END Permissions


// xử lý checked checkbox Permissions data default

const dataRecords = document.querySelector("[data-records]");
// console.log(dataRecords);
if(dataRecords) {
    const records = dataRecords.getAttribute("data-records");
    const converStringToArray = JSON.parse(records);
    // console.log(converStringToArray);

    const tablePermissions = document.querySelector("[table-permissions]");

    converStringToArray.forEach((record, index)=> {
        const permissions1 = record.permissions;
        // console.log(permissions1);

        permissions1.forEach(value => {
            // console.log(value);
            // console.log(index);
                // -----------------------------------------------------------
            const rows = tablePermissions.querySelector(`[data-name="${value}"]`); // ------------> chú ý đoạn này 
            // console.log(rows);
            const input = rows.querySelectorAll("input")[index]; // -> chú ý đoạn này tại sao phải lấy index

            input.checked = true;
        });
    });

}

// end xử lý checked checkbox Permissions data default