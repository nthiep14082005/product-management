// module.exports.createTree = (array, ParentId="") => {
//     const tree = [];
//         array.forEach((itemArray) => {
//             if(itemArray.parent_id === ParentId) {
//                 const newItem = itemArray;
//                 const childrenItem = createTree(array, itemArray.id);
//                 if(childrenItem.length > 0) {
//                     newItem.newChildrenItem = childrenItem; // -> newChildrenItem thực chất là một thuộc tính tự định nghĩa của newItem 
//                 }
//                 tree.push(newItem);
//             }
//         })
//         return tree;
// }
// -> nếu viết như này trong file khác và exports sang bên controller thì sẽ bị lỗi nên phải viết như sau, không thể viết như trên bởi vì trong Node.js vì khi dùng module.exports.createTree = ..., hàm createTree sẽ không nhận diện được chính nó trong phần gọi đệ quy:
 // -----------> Phải khai báo biến trước, rồi mới export, để hàm có thể gọi lại chính nó khi đệ quy. 




 // -> duyệt 
//  à tức lần đầu nó duyệt thì nó đã duyệt được 2 giá trị là có ParentId = rỗng là điện thoại trước và thời trang sau
// thì khi này nó sẽ duyệt trong điện thoại hết để tìm ra các con và đánh số thứ tự, sau đó mới duyệt đến trong thời trang để tìm các con và đánh số thứ tự đúng không?

// Đúng chính xác!

// Lần đầu duyệt, hàm sẽ tìm tất cả các node có parent_id = "" (gốc), ví dụ: "Điện thoại" và "Thời trang".
// Sau đó, với mỗi node gốc, hàm sẽ duyệt tiếp các con của nó (ví dụ: "Điện thoại" → "iPhone", "Vivo").
// Biến đếm (count) sẽ tăng dần theo thứ tự duyệt: duyệt hết các con của "Điện thoại" trước, rồi mới sang "Thời trang" và các con của nó.
// Kết quả: thứ tự hiển thị sẽ là cha trước, rồi đến các con của cha đó, rồi mới sang cha tiếp theo và các con của cha đó.
// Tóm lại:

// Duyệt theo thứ tự: cha → các con → cha tiếp theo → các con tiếp theo.
// Biến đếm tăng dần theo thứ tự duyệt qua từng node trong cây.

 let count = 0;       // --------> thêm biến count để truyền vào index bên view 
 const createTree = (array, ParentId="") => {
    const tree = [];
        array.forEach((itemArray) => {
            if(itemArray.parent_id === ParentId) {
                count++;
                const newItem = itemArray;
                newItem.index = count;
                const childrenItem = createTree(array, itemArray.id);
                if(childrenItem.length > 0) {
                    newItem.newChildrenItem = childrenItem; // -> newChildrenItem thực chất là một thuộc tính tự định nghĩa của newItem 
                }
                tree.push(newItem);
            }
        })
        return tree;
}
module.exports.tree = (array, ParentId="") => {
    count = 0; // ------------> trước khi mỗi lần gọi lại hàm khi reload lại trang thì đặt lại biến count = 0; -> tức là mỗi lần hàm tree được gọi trong controller thì biến count sẽ được reset lại = 0
    const tree = createTree(array, ParentId="");
    return tree;
}




//     // sử dụng đệ quy để lấy ra sản phẩm sử dụng tree

// //     Hàm đi sâu đến node cuối cùng trước (đệ quy), xử lý xong node con rồi mới quay lại node cha để gán children. 
// //     Quá trình này lặp lại cho đến khi hoàn thành cây phân cấp.
// //     Bạn hiểu đúng về cách hoạt động của hàm này!
//     function createTree (array, parentId = "") {
//         const tree = [];
//         array.forEach((item) => {
//             if(item.parent_id === parentId) {
//                 const newItem = item;
//                 const children = createTree(array, item.id);
//                 // console.log(newItem, "------------", children);
//                 if(children.length > 0) {
//                     newItem.newChildren = children;
//                 }
//                 tree.push(newItem);
//             }
//         })
//         return tree;
//     }



//     const records = await ProductCategory.find(find);
//     // console.log(records);

//     const newRecords = createTree(records);
//     // console.log(newRecords);

