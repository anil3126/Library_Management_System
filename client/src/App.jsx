import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import OTP from "./pages/OTP.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice.js";
import { fetchAllUsers } from "./store/slices/userSlice.js";
import { fetchAllBooks } from "./store/slices/bookSlice.js";
import { fetchUserBorrowedBooks } from "./store/slices/borrowSlice.js";

const App = () => {

  const { user, isAuthenticated } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser());
    dispatch(fetchAllBooks())

    if(isAuthenticated && user?.role === "User"){
      dispatch(fetchUserBorrowedBooks())
    }

    if(isAuthenticated && user?.role === "Admin"){
      dispatch(fetchAllUsers())
    }
    
  } ,[isAuthenticated])

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/otp-verification/:email" element={<OTP />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark"/>
    </Router>
  )
  
};

export default App;
