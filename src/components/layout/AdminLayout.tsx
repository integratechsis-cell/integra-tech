import React, { useState } from 'react';
import { Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, ShoppingBag, GraduationCap, Users, LogOut, FileText, Menu, X, Briefcase } from 'lucide-react';
import { SEO } from '../common/SEO';
import { Logo } from '../common/Logo';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ... (auth check logic remains the same)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Temporary allow access if email contains 'admin' or name is SUPERADMIN
  // Also allow any role that has at least one permission
  const allowedRoles = ['admin', 'super_admin', 'inventory', 'marketing', 'editor'];
  // Added optional chaining for user.role to prevent potential crashes if role is undefined
  const hasAdminAccess = allowedRoles.includes(user.role || '') || 
    user.email.toLowerCase().includes('admin') || 
    user.name.toUpperCase().includes('ADMIN');

  if (!hasAdminAccess) {
     return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', roles: ['all'] },
    { path: '/admin/products', icon: ShoppingBag, label: 'Tienda', roles: ['inventory', 'admin', 'super_admin'] },
    { path: '/admin/ventas', icon: FileText, label: 'Ventas', roles: ['marketing', 'admin', 'super_admin'] },
    { path: '/admin/capacitacion', icon: GraduationCap, label: 'Capacitación', roles: ['editor', 'admin', 'super_admin'] },
    { path: '/admin/usuarios', icon: Users, label: 'Usuarios', roles: ['admin', 'super_admin'] },
    { path: '/admin/equipo', icon: Briefcase, label: 'Equipo', roles: ['super_admin'] },
  ];

  const getFilteredNavItems = () => {
     return navItems.filter(item => {
         const userRole = user.role || 'user';
         
         // Super Admin has full access
         if (userRole === 'super_admin') return true;

         // Admin has access to everything INCLUDING Team (Equipo)
         if (userRole === 'admin') return true;
         
         if (item.roles.includes('all')) return true;
         return item.roles.includes(userRole);
     });
  };

  const filteredItems = getFilteredNavItems();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      <SEO 
        title="Panel de Administración" 
        description="Gestiona tu tienda y cursos en Integra Tech." 
      />
      {/* Security: Prevent Indexing for Admin Panel */}
      <meta name="robots" content="noindex, nofollow" />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b flex flex-col items-center relative">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <div className="mb-4">
              <Logo width={180} height={70} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Admin Panel</h2>
          <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Integra Tech</span>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={logout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white shadow-sm px-4 sm:px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="mr-4 lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Administrador</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 sm:p-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};