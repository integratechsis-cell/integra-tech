import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Logo } from '../common/Logo';
import { clsx } from 'clsx';

export const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Capacitación', href: '/capacitacion' },
    { name: 'Tienda', href: '/tienda' },
    { name: 'Mis Cursos', href: '/mis-cursos' },
    // Show Admin Panel link for ANY role except 'user' and 'student'
    ...(['admin', 'super_admin', 'editor', 'inventory', 'marketing'].includes(user?.role || '') 
        ? [{ name: 'Admin Panel', href: '/admin' }] 
        : []),
  ];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname.startsWith('/admin')) return true;
    return location.pathname === path;
  };

  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10 transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="sr-only">Integra Tech</span>
              <div className="flex items-center gap-3 transform group-hover:scale-105 transition-transform duration-300">
                <div className="flex-shrink-0">
                  <Logo width={200} height={60} />
                </div>
              </div>
            </Link>
            <div className="hidden ml-12 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={clsx(
                    'text-sm font-medium transition-all duration-200 relative py-2',
                    isActive(link.href) 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  {link.name}
                  <span className={clsx(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform transition-transform duration-300",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/carrito" className="group -m-2 p-2 flex items-center relative text-gray-300 hover:text-white transition-colors">
              <ShoppingCart
                className="flex-shrink-0 h-6 w-6"
                aria-hidden="true"
              />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                  <span className="text-sm font-medium text-gray-300">Hola, <span className="text-white">{user.name}</span></span>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/registro"
                    className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/40 transform hover:-translate-y-0.5"
                  >
                    Registro
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:hidden">
              <button
                type="button"
                className="bg-white/10 p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 w-full bg-[#0f172a] shadow-2xl z-50 lg:hidden border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col py-4 px-4 space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={clsx(
                    'text-base font-medium block py-3 px-4 rounded-lg transition-all',
                    isActive(link.href) 
                      ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                 {user ? (
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg">
                        <span className="text-sm font-semibold text-white">Hola, {user.name}</span>
                        <button
                            onClick={() => {
                                logout();
                                setIsMenuOpen(false);
                            }}
                            className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" /> Salir
                        </button>
                    </div>
                 ) : (
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to="/login"
                            className="text-center py-3 px-4 border border-white/20 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                        <Link
                            to="/registro"
                            className="text-center py-3 px-4 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-500 transition-colors shadow-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Registro
                        </Link>
                    </div>
                 )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
