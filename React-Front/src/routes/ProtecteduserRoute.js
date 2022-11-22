import {
  Navigate
} from 'react-router-dom';
import React from 'react';
import Layout from "../pages/Layout2";
import UserLogin from "../pages/UserLogin";
function ProtecteduserRoute(props){
  const isAllowed=localStorage.getItem("isLogIn");
  //global.userlogininfo.statas
  const redirectPath = "/UserLogin"
  console.log(isAllowed)
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return props.children ? props.children : <Layout />;
}

// const ProtecteduserRoute = (
  
//   {
  
//   isAllowed=global.userlogininfo.statas,
//   redirectPath = '/Userlogin',
//   children,
// }) => {
//   console.log(isAllowed)
//   if (!isAllowed) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children ? children : <Layout />;
// };




export default ProtecteduserRoute;