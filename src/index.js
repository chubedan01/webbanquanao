import React from "react";
import ReactDOM from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";// cung cap kha nang dinh tuyen cho toan app
import store from "./redux/store";
import { Provider } from "react-redux";// giup ket noi vao redux bang reduxjs
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/*de cung cap kha nang cho toan app nen ta phai bao no lai*/}
     <Provider store={store}> {/* de dam bao o bat cu dau trong app cuxng co the ket noi toi cai store */}
     <ToastContainer /* thu vien de hien thanh thong bao da mua hang */
      position="top-right"
      autoClose={2000}
      closeOnClick
      pauseOnHover
      theme="dark"/>
      <App/>
     </Provider>
    
      <ToastContainer />
      
    </BrowserRouter>
    
  </React.StrictMode>
);
