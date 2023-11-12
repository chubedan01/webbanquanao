# lam viec voi redux thong qua hooks 
# component 
- là một đoạn mã độc lập và có thể tái sử dụng
-redux chi nen ket noi voi nhung cai xu li logic cua app
nhung phan nao render ui thi han che ket noi
# khi lam viec tren reducer voi cac mang hoac object neu muon thay doi thi phai tao mot state moi roi tra ve cac state cu va state moi 
- useSelector()
  trong Redux, `useSelector` là một hook được cung cấp bởi thư viện Reac-redux, cho phép bạn trích xuất dữ liệu từ kho lưu trữ Redux trong thành phần React. Nó đăng ký thành phần với bất kỳ thay đổi nào trong dữ liệu đã chọn và kích hoạt kết xuất lại khi dữ liệu cập nhật.

- useDispatch()
Trong Redux, `useDispatch` là một hook được cung cấp bởi thư viện `react-redux` cho phép bạn truy cập vào hàm `dispatch`, được sử dụng để gửi các hành động đến cửa hàng Redux.



1.setup redux store
- reducers & Root rudece// 
moi app bao gom nhieu state lien quan den use gio hang....
rootreducer la thang tong hop tat ca cac reducer lai 
ham combineReducer: ham tong hop cac reducer o cac ..

- Action creators
tao ra nhung action co san 
action creator la mot object mot cai js quy dinh cac type cua 
- Store
tao mot cai store bang crateStore cua redux 

2. Setup redux provider
- Alow redux store to be acsessible from anywhere of the app

setup redux o file cao nhat de cac phan deu co the truy cap

3. Connect to redux store from component 
- using the two hooks hehe 
