import React from 'react';
import { useData } from '../contexts/DataContext';
import { CourseCard } from '../components/training/CourseCard';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const Training: React.FC = () => {
  const { courses } = useData();
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEO title="Capacitación" description="Cursos de formación profesional en tecnología y sistemas." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-brand-DEFAULT font-semibold text-sm tracking-widest uppercase mb-2 block">
            Capacitación Profesional
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-tight">
            Desarrolla tus Habilidades TIC con <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-DEFAULT to-purple-600">Integra Tech</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Cursos diseñados por expertos para impulsar tu carrera y mejorar la productividad de tu empresa. 
            Aprende desde fundamentos hasta análisis avanzado de datos.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <BookOpen className="w-5 h-5 text-brand-DEFAULT" />
              <span className="font-medium text-gray-700">Contenido Actualizado</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <GraduationCap className="w-5 h-5 text-brand-DEFAULT" />
              <span className="font-medium text-gray-700">Certificación Incluida</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-brand-DEFAULT" />
              <span className="font-medium text-gray-700">Instructores Expertos</span>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="transform transition duration-500 hover:scale-105">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-20 bg-brand-dark rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Necesitas capacitación personalizada para tu equipo?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Diseñamos programas a medida según las necesidades específicas de tu empresa.
              Contáctanos para una cotización especial.
            </p>
            <a 
              href="https://wa.me/573227579082?text=Hola,%20me%20interesa%20una%20capacitación%20personalizada%20para%20mi%20empresa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-dark bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg transition-all hover:shadow-xl"
            >
              Solicitar Cotización Empresarial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
