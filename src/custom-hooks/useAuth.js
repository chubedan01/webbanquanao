// import React, { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase.config';

// const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         setCurrentUser(null);
//       }
//       setIsLoading(false);
//     });

//     // Make sure to unsubscribe when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   // Use useEffect to log currentUser when it changes
//   useEffect(() => {
//     console.log('currentUser has changed:', currentUser);
//   }, [currentUser]);

//   if (isLoading) {
//     // Loading indicator
//     return <p>Loading...</p>;
//   }

//   // Render your component

//   return {
//     currentUser,
//     isLoading,
//   };
// };

// export default useAuth;

// import React, { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../firebase.config';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase.config';

// const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userDocRef = doc(db, 'users', user.uid);
//         const userDocSnapshot = await getDoc(userDocRef);

//         if (userDocSnapshot.exists()) {
//           // User document exists in Firestore, so set the user object with custom fields
//           const userData = userDocSnapshot.data();
//           setCurrentUser({
//             uid: user.uid,
//             email: user.email,
//             displayName: userData.displayName,
//             PhoneNumber: userData.PhoneNumber,
//             Address: userData.Address,
//             // Add other custom fields here
//           });
//         } else {
//           // Handle the case when the user document doesn't exist
//           setCurrentUser(user);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//       setIsLoading(false);
//     });

//     // Cleanup the subscription when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return {
//     currentUser,
//     isLoading,
//   };
// };


// đâu tien
import {useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'


 
const useAuth = () => {
const [isLoading, setIsLoading]  =useState(true);
const [currentUser, setCurrentUser] = useState(null);
  useEffect(() =>{
     onAuthStateChanged(auth, (user) =>{
        if (user){
          setCurrentUser(user);
        }else{
          setCurrentUser(null);
        }
        setIsLoading(false)
     })
    },[])

    // function updateEmail(email) {
    //   return currentUser.updateEmail(email)
    // }
  
    // function updatePassword(password) {
    //   return currentUser.updatePassword(password)
    // }
    return {
      currentUser,
      isLoading
     
    }
  
  }

  export default useAuth
// /* 
// Hook trên (useauth) được sử dụng để xử lý xác thực người dùng trong ứng dụng React. Nó sử dụng hook useEffect để điều khiển việc xử lý khi trạng thái xác thực thay đổi.

// Khi hook được gọi, nó khởi tạo một biến state (currentuser) bằng cách sử dụng useState, ban đầu được thiết lập là một đối tượng rỗng ({}). Sau đó, hook useEffect được sử dụng để lắng nghe sự thay đổi của trạng thái xác thực. Mỗi khi trạng thái xác thực thay đổi, callback được cung cấp cho hàm onAuthStateChanged của Firebase sẽ được gọi.

// Nếu người dùng đã đăng nhập, callback sẽ nhận được thông tin người dùng và gọi hàm setcurrentuser để cập nhật giá trị của biến state currentuser. Ngược lại, nếu không có người dùng đăng nhập, giá trị của currentuser sẽ được đặt là null.

// Cuối cùng, hook trả về một đối tượng có thuộc tính currentuser, giúp các component sử dụng hook này có thể truy cập và sử dụng thông tin người dùng hiện tại được lấy từ Firebase trong ứng dụng của mình.*/