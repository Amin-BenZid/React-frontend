import React, { useEffect } from "react";
import Register from "./Component/User/Register";
import Login from "./Component/User/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import ProductPage from "./Component/Shop/ProductPage";
import AddProduct from "./Component/Shop/AddProduct";
import AdminPage from "./Component/Admin/AdminPage";
import Eror404 from "./Component/MainParts/Eror404";
import { useSelector } from "react-redux";
import EditProduct from "./Component/Shop/EditProduct";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "./Component/User/loginSlice";

function App() {
  const { isAuth } = useSelector((state) => state.login);
  var key = localStorage.getItem("authorization");
  const token = localStorage.getItem("authorization");

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const dispatch = useDispatch();
  let navigate = useNavigate();

  if (key !== null) {
    // userId from token
    const token = localStorage.getItem("authorization");
    var decoded = jwt_decode(token);
    const dispatch = useDispatch();
  }
  return (
    <div>
      {isAuth ? (
        decoded !== undefined ? (
          decoded.userIsAdmin === true ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/find/:id/*" element={<ProductPage />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="*" element={<Eror404 />} />
            </Routes>
          ) : (
            // only loged in users got this routes
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find/:id/*" element={<ProductPage />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/products/edit/:id/*" element={<EditProduct />} />
              <Route path="*" element={<Eror404 />} />
            </Routes>
          )
        ) : (
          // only loged in users got this routes
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find/:id/*" element={<ProductPage />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/products/edit/:id/*" element={<EditProduct />} />
            <Route path="*" element={<Eror404 />} />
          </Routes>
        )
      ) : (
        //evry user not logedin got this routes
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find/:id/*" element={<ProductPage />} />
          <Route path="*" element={<Eror404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
