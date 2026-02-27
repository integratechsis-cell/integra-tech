import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="bg-brand-dark relative overflow-hidden py-24">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-DEFAULT rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[128px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          ¿Listo para transformar tu negocio?
        </h2>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Agenda una consulta gratuita con nuestros expertos y descubre cómo la tecnología puede impulsar tu crecimiento.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/573227579082"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-dark font-bold rounded-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Contactar por WhatsApp
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="mailto:integra.tech.sis@gmail.com"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-1 backdrop-blur-sm"
          >
            <Mail className="mr-2 h-5 w-5" />
            Enviar Correo
          </a>
        </div>
      </div>
    </section>
  );
};