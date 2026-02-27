import React from 'react';
import { useData } from '../../contexts/DataContext';
import { ShoppingBag, GraduationCap, Users, AlertTriangle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const Dashboard: React.FC = () => {
  const { products, courses, users } = useData();

  const stats = [
    {
      label: 'Total Productos',
      value: products.length,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      label: 'Cursos Activos',
      value: courses.length,
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      label: 'Usuarios Registrados',
      value: users.length,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      label: 'Bajo Stock',
      value: products.filter(p => p.stock < 5).length,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <SEO title="Dashboard" description="Resumen general de la tienda y cursos." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className={`${stat.color} p-4 rounded-full text-white mr-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimos Productos</h3>
          <div className="space-y-4">
            {products.slice(-5).map(product => (
              <div key={product.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 10 ? 'bg-green-100 text-green-800' : 
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock} en stock
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cursos Populares</h3>
          <div className="space-y-4">
            {courses.slice(0, 5).map(course => (
              <div key={course.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600 mr-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  ${course.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};