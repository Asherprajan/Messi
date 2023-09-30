// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import {  Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((state) => state.user.user);
 console.log(user);
  return user ? <Outlet/> : <Navigate to="/" replace />
};

export default PrivateRoute;
