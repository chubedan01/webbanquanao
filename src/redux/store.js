import { configureStore } from "@reduxjs/toolkit";/*Trong Redux, `configureStore` là một chức năng được cung cấp bởi gói `@reduxjs/toolkit` nhằm đơn giản hóa việc thiết lập cửa hàng Redux với các phần mềm trung gian và công cụ nâng cao thường được sử dụng. Đó là một cách có chủ ý để định cấu hình và tạo cửa hàng Redux*/
import cartSlice from "./slicse/cartSlice";
const store = configureStore({
  reducer: {
    cart:cartSlice,
  },
}); 
export default store;

// Store gồm có:
// State: là dữ liệu hiện tại được lưu trên state.
// Reducer: là hàm biến đổi state cũ sang state mới.
// Dispatcher: quản lý middlewares và chuyển dữ liệu xuống reducer.
// Action = plain javascript object mô tả hành độn
/**
 * Reducer là một funtion nhận vào một state hiện tại và một action được truyền vào từ View  
 * biến đổi thành state mới 
 * mà state này có thể dự đoán được.
*/