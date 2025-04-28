module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    };    
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        // sử dụng regex để tìm tất cả những sản phẩm mà ko cần fix cứng string
        
        // phần regex này xem ở phút thứ 30 - bài 21 - 28tech nodejs

        const regex = new RegExp(objectSearch.keyword, "i"); // -> string i được coi là một biến thêm string i đằng sau là để ko phân biệt giữa chữ hoa vả chữ thường. 

        //Thêm chuỗi 'i' vào regex là để không phân biệt chữ hoa và chữ thường khi thực hiện tìm kiếm. Cụ thể hơn, flag 'i' (case-insensitive) giúp cho việc tìm kiếm trở nên linh hoạt hơn, không quan tâm đến việc chữ cái trong từ khóa hoặc chuỗi cần tìm có viết hoa hay không.
        objectSearch.regex = regex;
    };
    // giờ ta cần trả về keywork và regex 
    // vì nếu như người ta ghi đúng keyword thì trả thẳng về giao diện , còn nếu ngta truyền vào 1 regex thì trả về regex
    return objectSearch;
}