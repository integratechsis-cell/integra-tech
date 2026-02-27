import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CartSummary: React.FC = () => {
  const { subtotal, tax, total, cart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (cart.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Impuestos (19%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-DEFAULT hover:bg-brand-dark transition-colors shadow-sm hover:shadow-md"
      >
        Proceder al Pago
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>Precios incluyen IVA.</p>
        <p>Envíos calculados al finalizar la compra.</p>
      </div>
    </div>
  );
};
