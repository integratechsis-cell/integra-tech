import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <SEO title="Carrito de Compras" description="Revisa los productos en tu carrito de compras." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-brand-dark mb-8">Carrito de Compras</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado productos. Explora nuestra tienda para encontrar lo que necesitas.
            </p>
            <Link
              to="/tienda"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-DEFAULT hover:bg-brand-dark transition-colors shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver a la tienda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Productos ({cart.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                 <Link
                    to="/tienda"
                    className="inline-flex items-center text-brand-DEFAULT hover:text-brand-dark font-medium transition-colors"
                 >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continuar comprando
                 </Link>
              </div>
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
