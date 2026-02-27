import React from 'react';
import { Shield, Users, Target } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <SEO title="Nosotros" description="Conoce más sobre Integra Tech, nuestra misión y visión." />
      <div className="bg-brand-dark py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">Sobre Integra Tech</h1>
        <p className="text-xl text-blue-100">Tu aliado estratégico en tecnología</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-6">Nuestra Historia</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Integra Tech nació con la visión de democratizar el acceso a servicios tecnológicos de alta calidad. 
              Nos especializamos en brindar soluciones integrales que van desde el soporte técnico y reparación de equipos, 
              hasta la capacitación en TIC y análisis de datos.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestro compromiso es ser el puente entre la tecnología y las necesidades reales de nuestros clientes, 
              ofreciendo un servicio cercano, profesional y eficiente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-brand-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Misión</h3>
            <p className="text-gray-600">
              Proveer soluciones tecnológicas innovadoras y accesibles que potencien la productividad y competitividad de nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-brand-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Visión</h3>
            <p className="text-gray-600">
              Ser reconocidos como líderes regionales en servicios de TI, destacándonos por nuestra calidad, ética y compromiso con la excelencia.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-brand-DEFAULT" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Valores</h3>
            <p className="text-gray-600">
              Integridad, Innovación, Responsabilidad y Pasión por el servicio son los pilares que guían cada una de nuestras acciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
