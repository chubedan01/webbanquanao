import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEmailMatched, setIsEmailMatched] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        checkEmailMatch(user.email);
      } else {
        setCurrentUser(null);
        setIsEmailMatched(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkEmailMatch = (email) => {
    // Kiểm tra xem email người dùng đăng nhập có trùng với email cần kiểm tra hay không
    if (email === 'nhan01@gmail.com') {
      setIsEmailMatched(true);
    } else {
      setIsEmailMatched(false);
    }
  };

  return {
    currentUser,
    isEmailMatched,
  };
};

export default useAuth;