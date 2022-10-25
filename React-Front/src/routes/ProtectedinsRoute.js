import {
    Navigate
  } from 'react-router-dom';
  import React from 'react';
  import Layout from "../pages/Layout";
  import InstitutionLogin from "../pages/InstitutionLogin";
  //import '../logininfo'
  
  const ProtectedInsRoute = (
    {
    isAllowed=global.inslogininfo.statas,
    redirectPath = '/Institutionlogin',
    children,
  }) => {
    console.log("isAllowed:"+isAllowed)
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children ? children : <Layout />;
  };
  
  
  
  
  export default ProtectedInsRoute;