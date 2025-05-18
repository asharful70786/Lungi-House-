// src/main.jsx
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import UploadProduct from './UploadProduct';
import ProductDetails from './ProductDetails';
import ProductEdit from './ProductEdit';
import Login from './pages/login';
import Layout from './Layout';
import { AuthProvider } from './context/AuthContext';
import ContactUs from './pages/ContactUs';
import Location from './pages/Location';
import Cart from './pages/cart';
import AboutUs from './pages/Aboutus';
import Careers from './pages/carrier';
import Payments from './pages/Payment';
import ShippingFAQ from './pages/Shipping';
import TermsOfUse from './pages/Terms&Condition';
import PrivacyPolicy from './pages/Privacy';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Shared layout wrapper */}
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="upload" element={<UploadProduct />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path='contact' element={<ContactUs/>} />
            <Route path="edit/:id" element={<ProductEdit />} />
            <Route path="login" element={<Login />} />
            <Route path="location" element={<Location />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<AboutUs />} />
            <Route path='careers' element={<Careers/>} />
            <Route path='payements' element={<Payments/>} />
<Route path='Shipping' element={< ShippingFAQ/>} />
<Route path='Terms' element={<TermsOfUse/>} />
<Route path='privacy' element={<PrivacyPolicy/>} />
<Route path='careers' element={<Careers/>} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Route>
        </Routes>
         <Analytics />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
