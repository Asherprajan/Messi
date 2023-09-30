// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const AdminAuthRoute = () => {

  const admin = useSelector((state) => state.admin.admin);
  return !admin ? <Outlet/> : <Navigate to="/admindash" replace />
};

export default AdminAuthRoute;
