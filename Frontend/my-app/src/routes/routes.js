// routes.js
import React from "react";
import { Routes, Route,} from "react-router-dom";
import Intro from "../pages/user/IntroPage";
import Home from "../pages/user/Home";
import PrivateRoute from "./PrivateComponent"
import AuthRoute from "./AuthRoutes";
import AdminLoginPage from "../pages/Admin/AdminLogin";
import Adminmain from "../pages/Admin/Adminmain";
import AdminAuthRoute from "./Adminauthroutes";
import MessOwners from "../pages/Admin/pages/MessOwners"
import AdminPrivateRoute from "./AdminProtected";
import UserList from "../pages/Admin/pages/Users";
import ListingPage from "../pages/user/Listmess";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthRoute/>}>
      <Route path="/" element={<Intro />} />
      </Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/home" element={<Home />} />
      <Route path="/list" element={<ListingPage/>}/>
      </Route>
      <Route element={<AdminPrivateRoute/>}>
   
      <Route path="/admindash" element={<Adminmain/>}/>
      <Route path="/messowners" element={<MessOwners/>}/>
      <Route path="/list-users" element={<UserList/>}/>

      </Route>
      <Route element={<AdminAuthRoute/>}>
      <Route path="/admin" element ={<AdminLoginPage/>}/>


      </Route>



       

      
        

    </Routes>
  );
};

export default AppRoutes;
