import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataContext';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Store } from './pages/Store';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ResetPassword } from './pages/ResetPassword';
import { Invoice } from './pages/Invoice';
import { Training } from './pages/Training';
import { CoursePlayer } from './pages/CoursePlayer';
import { CourseDetails } from './pages/CourseDetails';
import { Checkout } from './pages/Checkout';
import { MyLearning } from './pages/MyLearning';

// Admin Pages
import { Dashboard } from './pages/admin/Dashboard';
import { Products as AdminProducts } from './pages/admin/Products';
import { Courses as AdminCourses } from './pages/admin/Courses';
import { Users as AdminUsers } from './pages/admin/Users';
import { Staff } from './pages/admin/Staff';
import { Sales as AdminSales } from './pages/admin/Sales';

import { Toaster } from 'react-hot-toast';

import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <DataProvider>
          <CartProvider>
            <Router>
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="ventas" element={<AdminSales />} />
                  <Route path="capacitacion" element={<AdminCourses />} />
                  <Route path="usuarios" element={<AdminUsers />} />
                  <Route path="equipo" element={<Staff />} />
                </Route>

                {/* Course Routes - Player is standalone, Details uses PublicLayout */}
                <Route path="/curso/:courseId/learn" element={<CoursePlayer />} />

                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/nosotros" element={<About />} />
                  <Route path="/servicios" element={<Services />} />
                  <Route path="/tienda" element={<Store />} />
                  <Route path="/capacitacion" element={<Training />} />
                  <Route path="/curso/:courseId" element={<CourseDetails />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/mis-cursos" element={<MyLearning />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/factura" element={<Invoice />} />
                  {/* Catch all redirect to home */}
                  <Route path="*" element={<Home />} />
                </Route>
              </Routes>
              <Toaster position="bottom-right" />
            </Router>
          </CartProvider>
        </DataProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
