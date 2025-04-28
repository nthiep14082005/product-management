module.exports = (objectPagination, query, countProducts) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page); // khi mà trả về thì đang là string nên phải dùng parseInt để convert sang number
    };

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    // objectPagination.skip ở đây là đang tạo ra 1 key tên là skip trong object objectPagination 
    // còn cách để tính như kia thì xem ở bài 21 28tech nodejs 1:13:00




    // tính số lượng trang và tự động vẽ ra giao diện 
    // const countProducts = await Product.countDocuments(find); // -> trong moongoos có hàm countDocument để đếm ra tất cả các bản ghi 
    // console.log(countProducts);
    const totalPage = Math.ceil(countProducts/objectPagination.limitItem);// -> làm tròn lên dùng Math.ceil() -> 
    objectPagination.totalPage = totalPage;
    


    return objectPagination
};