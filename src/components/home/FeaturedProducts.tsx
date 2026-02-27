import React from 'react';
import { useData } from '../../contexts/DataContext';
import { ProductCard } from '../store/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products } = useData();
  const featured = products.slice(0, 4);

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-brand-DEFAULT font-semibold tracking-wider uppercase text-sm">Tienda Online</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              Equipos de alto rendimiento y suministros seleccionados por expertos.
            </p>
          </div>
          <Link
            to="/tienda"
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl text-brand-DEFAULT font-bold hover:bg-brand-DEFAULT hover:text-white hover:border-brand-DEFAULT transition-all shadow-sm hover:shadow-md group"
          >
            Ver Catálogo Completo
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <div key={product.id} className="h-full transform hover:-translate-y-1 transition-transform duration-300">
               <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
