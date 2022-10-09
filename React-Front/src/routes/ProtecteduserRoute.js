import {
  Navigate
} from 'react-router-dom';
import React from 'react';
import Layout from "../pages/Layout";
import UserLogin from "../pages/UserLogin";


const ProtecteduserRoute = (
  
  {
  
  isAllowed=global.userlogininfo.statas,
  redirectPath = '/Userlogin',
  children,
}) => {
  console.log(isAllowed)
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Layout />;
};




export default ProtecteduserRoute;