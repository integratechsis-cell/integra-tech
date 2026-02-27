import React from 'react';
import { services } from '../data/services';
import { Check } from 'lucide-react';

import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';

export const Services: React.FC = () => {
  return (
    <div className="relative">
      <SEO title="Servicios" description="Conoce nuestros servicios de soporte, mantenimiento y capacitación." />
      <div className="bg-transparent py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Nuestros Servicios</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Soluciones tecnológicas integrales diseñadas para impulsar tu crecimiento.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="flex flex-col md:flex-row gap-6 items-start bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-all text-white"
            >
              <div className="flex-shrink-0 bg-blue-500/20 p-6 rounded-2xl">
                <service.icon className="h-12 w-12 text-blue-400" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {service.id === 'capacitacion' && (
                  <Link
                    to="/capacitacion"
                    className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Ver Cursos Disponibles
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
