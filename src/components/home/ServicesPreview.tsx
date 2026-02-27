import React from 'react';
import { services } from '../../data/services';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ServicesPreview: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
       {/* Background pattern */}
       <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-blue-400 font-bold tracking-wider uppercase text-sm">¿Qué ofrecemos?</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-2 mb-6">
            Soluciones Integrales
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Diseñamos estrategias tecnológicas adaptadas a cada etapa de tu crecimiento empresarial y personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group bg-[#1e293b]/50 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-white/5 hover:border-blue-500/30 hover:-translate-y-2 flex flex-col items-start text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>

              <div className="bg-blue-500/10 p-4 rounded-xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="h-8 w-8 text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed group-hover:text-gray-300">
                {service.description}
              </p>
              
              <Link
                to="/servicios"
                className="inline-flex items-center text-sm font-bold text-white hover:text-blue-400 transition-colors group/link"
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
