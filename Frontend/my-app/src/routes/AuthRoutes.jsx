// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const user = useSelector((state) => state.user.user);
  return !user ? <Outlet/> : <Navigate to="/home" replace />
};

export default AuthRoute;
