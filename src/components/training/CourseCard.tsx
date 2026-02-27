import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { ShoppingCart, CheckCircle, Video, PlayCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

interface CourseCardProps {
  course: Product;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { grades } = useData();
  const navigate = useNavigate();

  const isEnrolled = user && grades.some(g => g.userId === user.id && g.courseId === course.id);

  const handleBuyNow = () => {
    addToCart(course, 1);
    toast.success(`${course.name} agregado al carrito`);
    navigate('/carrito');
  };

  const handleContinue = () => {
    // navigate(`/curso/${course.id}`); // Previous logic
    navigate('/mis-cursos'); // New logic requested by user
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
      <Link to={isEnrolled ? '/mis-cursos' : `/curso/${course.id}`} className="relative h-48 overflow-hidden block cursor-pointer">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className="bg-brand-DEFAULT text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {course.specifications?.['Nivel'] || 'Curso'}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
           <div className="bg-white/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Video className="w-6 h-6 text-brand-DEFAULT" />
           </div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={isEnrolled ? '/mis-cursos' : `/curso/${course.id}`} className="hover:underline">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-DEFAULT transition-colors">
            {course.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {course.description}
        </p>

        <div className="space-y-2 mb-6">
          {course.specifications && Object.entries(course.specifications).map(([key, value]) => (
            <div key={key} className="flex items-center text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="font-medium mr-1">{key}:</span> {value}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 uppercase">Precio</span>
              <div className="text-2xl font-bold text-brand-dark">
                {formatPrice(course.price)}
              </div>
            </div>
          </div>
          
          {isEnrolled ? (
            <button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Continuar Aprendiendo</span>
              <PlayCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-2 bg-brand-DEFAULT hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Comprar Curso</span>
              <ShoppingCart className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
