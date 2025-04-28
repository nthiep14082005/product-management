
// doi mau phim bam

module.exports = (query) => {
    // tạo ra phím bấm
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ];


    // đổi màu phím bấm
    if(query.status) { // 1t50ph bài 20 nodejs 28tech
        const indexRecord = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[indexRecord].class = "active"; // class active này được định nghĩa và có màu sẵn trong boostrap rồi
    } else {
        const indexRecord = filterStatus.findIndex(item => item.status == "");
        filterStatus[indexRecord].class = "active";
    }

    return filterStatus; // 33ph32s bài 21 28tech nodejs 
}