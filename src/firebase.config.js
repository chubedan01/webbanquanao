import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOVnqf0_x-AYXhK1zKIv-8UeuR_b0sDVo",
  authDomain: "webbanquanao-49c27.firebaseapp.com",
  projectId: "webbanquanao-49c27",
  storageBucket: "webbanquanao-49c27.appspot.com",
  messagingSenderId: "977646655389",
  appId: "1:977646655389:web:b39caa028eb644d0114174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db =getFirestore(app);
export const storage = getStorage(app);
export default app;
