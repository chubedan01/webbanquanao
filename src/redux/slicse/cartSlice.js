import {createSlice} from "@reduxjs/toolkit";
const initialState ={//// xac dinh trng thai ban dau cho gio hang 
  cartItems:[],//mang chua cac san phan 
  totalAmount:0,
  totalQuantity:0

}

/**
 *  CreateSlice: Redux Toolkit giới thiệu createSlice,
 *  một cách đơn giản để định nghĩa các "slice" của trạng thái ứng dụng cùng với các reducer, actions và selectors tương ứng.
 *  Điều này giúp giảm sự trùng lặp mã và làm cho việc quản lý trạng thái dễ dàng hơn.
 * 
 * 
 * 
 *  3. Một lát giỏ hàng được tạo bằng cách sử dụng hàm "createSlice" từ Redux Toolkit. 
 * Nó nhận vào một đối tượng có ba thuộc tính: 
 * - "name": Đặt thành "cart" để xác định slice này trong cửa hàng Redux. 
 * - "initialState": Đặt thành "initialstate" được xác định trước đó.
 * - "reducers": Chứa các hành động khác nhau có thể được gửi đi để sửa đổi trạng thái.
 */
const cartSlice = createSlice({
  name:"cart",
  initialState, // nhung gia tri ban dau ban muon khi ban vao thi nhung gia tri ban dau cua no se la
  reducers:{
    // ham them san pham vao gio hang
    // chua nhung cai cach giup ban lam viec voi slice
    addItem:(state,action)=>{ //sate la nhung cai ban da thiet lap san phi tren cua ham 
                              //action la nhung gia tri ben ngoai 
      const newItem =action.payload; /* la mot gia tri ben ngoai nao do */
      const existingItem =state.cartItems.find(  /*  Mục hiện có được tìm kiếm trong mảng "cartitems" bằng phương pháp "find" với chức năng gọi lại để kiểm tra xem ID của mục đó có khớp với ID của mục mới hay không.*/
        (item)=>item.id===newItem.id
      );
      state.totalQuantity++ // tong so 
      if(!existingItem){ /**Nếu không tìm thấy mục hiện có, một đối tượng mục mới sẽ được đẩy vào mảng "cartitems" với số lượng ban đầu là 1 và các chi tiết tương ứng từ mục mới. */
        state.cartItems.push({
          id:newItem.id,
          productsName: newItem.productsName,
          imgUrl:newItem.imgUrl,
          category:newItem.category,
          price:newItem.price,
          quantity:1,
          totalPrice: newItem.price,
        })
      }
      /*Nếu tìm thấy mặt hàng hiện có, số lượng và tổng giá của nó sẽ được cập nhật.*/
      else{
        existingItem.quantity++
        existingItem.totalPrice= (Number(existingItem.totalPrice)+ Number(newItem.price))
      }
      // function  formatCurrency(amount) {
      //   return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount);
      // }
      /**"Tổng số tiền" được tính bằng cách giảm mảng "cartitems" và cộng giá nhân với số lượng của từng mặt hàng. */
      state.totalAmount = state.cartItems.reduce((total, item) => total+ (Number(item.price) * Number(item.quantity)), 0);

    

        console.log(state.totalAmount)


    },

      // // Hàm xóa sản phẩm trong giỏ hàng
      // deleteItem: (state, action) => {
      //   const id = action.payload;
      //   const existingItem = state.cartItems.find(item => item.id === id);
      //   if (existingItem) {
      //     state.totalQuantity -= existingItem.quantity; // Giảm tổng số lượng sản phẩm
      //     state.cartItems = state.cartItems.filter(item => item.id !== id);
      //   }

      //   function formatCurrency(amount) {
      //     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      //   }
  
      //   // Tính lại tổng số tiền sau khi xóa sản phẩm
      //   state.totalAmount = formatCurrency(state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0));
      // },


    // ham delete san pham trong gio hang
    // Hàm xóa sản phẩm trong giỏ hàng
deleteItem: (state, action) => {
  const id = action.payload;
  const existingItem = state.cartItems.find(item => item.id === id);
  if (existingItem) {
    state.totalQuantity -= existingItem.quantity; // Giảm tổng số lượng sản phẩm
    state.cartItems = state.cartItems.filter(item => item.id !== id);
  }

  // function formatCurrency(amount) {
  //   return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  // }

  // Tính lại tổng số tiền sau khi xóa sản phẩm
  state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

  console.log(state.totalAmount)
}
   
  }
  
  
});
export const cartActions = cartSlice.actions
export default cartSlice.reducer