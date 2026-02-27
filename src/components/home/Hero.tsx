import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-24 -translate-x-24 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="text-left z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6 animate-fade-in-up backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Líderes en Tecnología y Soporte
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
              Impulsa tu Futuro con <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Integra Tech
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg leading-relaxed animate-fade-in-up delay-200">
              Desde hardware de última generación hasta capacitación especializada. Somos tu socio estratégico para la transformación digital.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up delay-300">
              <Link
                to="/tienda"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
              >
                Explorar Tienda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/10 text-base font-bold rounded-xl text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-1"
              >
                Nuestros Servicios
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400 animate-fade-in-up delay-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Envíos Nacionales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Garantía Asegurada</span>
              </div>
            </div>
          </div>

          {/* Image / Visual */}
          <div className="relative h-64 sm:h-80 lg:h-auto z-0 animate-fade-in-up delay-200 mt-12 lg:mt-0">
             <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 transform rotate-2 hover:rotate-0 transition-all duration-500 border border-white/10 group">
                <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1531297420497-0b8f619ee67d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Tecnología Innovadora" 
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 text-white z-20">
                  <p className="font-bold text-lg">Innovación Constante</p>
                  <p className="text-sm text-gray-300">Equipos de alto rendimiento</p>
                </div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-6 -left-6 bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 flex items-center gap-4 animate-bounce-slow z-30">
                <div className="bg-green-500/20 p-3 rounded-full text-green-400">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Nuevos Productos</p>
                  <p className="text-lg font-bold text-white">+50 Items</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
