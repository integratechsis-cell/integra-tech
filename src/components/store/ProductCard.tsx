import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} agregado al carrito`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Fake old price for demo (20% more)
  // const oldPrice = product.price * 1.2; (Removed old logic)
  const brand = product.name.split(' ')[0];

  // Calculate discount percentage if available or default
  const discountPercent = product.discount || 20; 
  const oldPrice = product.isPromotion 
    ? product.price / (1 - (discountPercent / 100)) 
    : 0; // No old price if not promotion

  return (
    <div className="bg-[#1e293b]/50 backdrop-blur-sm group relative border border-white/5 hover:border-blue-500/30 transition-all duration-300 p-4 flex flex-col h-full rounded-2xl hover:shadow-lg hover:shadow-blue-500/10">
      {/* Promo Badge - Only show if isPromotion is true */}
      {product.isPromotion && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg shadow-blue-600/20 animate-pulse">
            Promo -{discountPercent}%
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square mb-4 overflow-hidden bg-white/5 rounded-xl flex items-center justify-center p-4 border border-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        {/* Brand */}
        <div className="mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-2">
            {/* Fake Brand Logo Circle */}
            <span className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center text-[10px] text-blue-400 font-bold border border-blue-500/20">
              {brand.charAt(0)}
            </span>
            {brand}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white uppercase leading-tight mb-4 line-clamp-2 h-10 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="mt-auto mb-4">
          <span className="text-[10px] text-gray-500 block mb-0.5 uppercase tracking-wider">Precio Online</span>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.isPromotion && (
              <span className="text-xs text-gray-500 line-through decoration-gray-500">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20 hover:shadow-blue-600/30 transform hover:-translate-y-0.5"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {product.stock > 0 ? 'Añadir' : 'Agotado'}
          </span>
        </button>
      </div>
    </div>
  );
};
