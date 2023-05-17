import './style.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import Layout from "./pages/Layout";
import Layout2 from "./pages/Layout2";
//import Home from "./pages/Home";
import Institution from "./pages/Institution";
import UserLogin from "./pages/UserLogin";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import InstitutionLogin from "./pages/InstitutionLogin";
import InstitutionLogin2 from "./pages/InstitutionLogin2";
import User from './pages/User'
import ProtecteduserRoute from './routes/ProtecteduserRoute'
import ProtectedinsRoute from './routes/ProtectedinsRoute'
import './logininfo.js';
import Registe from './pages/registe'
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout2 />}/>
          
          <Route path="/Userlogin" element={<GoogleOAuthProvider clientId="100559822787-ffbh8kditc4o92h0jnghut5t882mr9pq.apps.googleusercontent.com">
          <UserLogin /></GoogleOAuthProvider>} />
          
          <Route path="/Institutionlogin" element={<InstitutionLogin2 />} />
          <Route path="/Registe" element={<Registe />} />
          <Route path="/user" element={
            <ProtecteduserRoute>
              
            <User></User> 
            </ProtecteduserRoute>}/>
          <Route path="/institution" element={
            <ProtectedinsRoute>
              <Institution />
            </ProtectedinsRoute>}/>
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

