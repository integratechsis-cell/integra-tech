import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { SEO } from '../components/common/SEO';
import { Play, CheckCircle, Clock, BarChart, BookOpen, ShoppingCart, Lock, Video } from 'lucide-react';
import toast from 'react-hot-toast';

export const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, grades } = useData();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'modules'>('overview');

  const course = courses.find(c => c.id === courseId);
  const isEnrolled = user && grades.some(g => g.userId === user.id && g.courseId === courseId);

  if (!course) {
    // If courses are still loading (empty array), we might want to show a loader
    // But since we don't have a loading state from useData yet, we'll assume if courses is empty, it's loading.
    if (courses.length === 0) {
       return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         </div>
       );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Curso no encontrado</h2>
          <p className="text-gray-500 mt-2">No pudimos encontrar el curso que buscas.</p>
          <Link to="/capacitacion" className="text-blue-600 hover:underline mt-4 block">
            Volver a capacitación
          </Link>
        </div>
      </div>
    );
  }

  const handleStartLearning = () => {
    if (!user) {
      // toast.error('Debes iniciar sesión para acceder al curso'); // Removed to avoid confusion as we redirect to login page
      navigate('/login');
      return;
    }
    
    if (isEnrolled) {
      navigate(`/curso/${courseId}/learn`);
    } else {
      addToCart(course, 1);
      toast.success('Curso agregado al carrito');
      navigate('/carrito');
    }
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
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO title={course.name} description={course.description} />
      
      {/* Hero Section */}
      <div className="bg-[#1c1d1f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-400 mb-4">
                <Link to="/capacitacion" className="hover:text-blue-300">Capacitación</Link>
                <span>/</span>
                <span className="text-gray-300">{course.specifications?.['Nivel'] || 'General'}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {course.name}
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 max-w-3xl leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-500/20 p-1 rounded">
                    <span className="text-yellow-400 font-bold">4.8</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                  </div>
                  <span className="text-gray-400">(120 reseñas)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{course.specifications?.['Duración'] || 'Flexible'}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <BarChart className="w-4 h-4" />
                  <span>{course.specifications?.['Nivel'] || 'Todos los niveles'}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-gray-400">Última actualización:</span>
                  <span>Febrero 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <img 
                   src="https://ui-avatars.com/api/?name=Integra+Tech&background=0D8ABC&color=fff" 
                   alt="Instructor" 
                   className="w-10 h-10 rounded-full border-2 border-white/20"
                 />
                 <div>
                   <p className="text-sm text-gray-400">Creado por</p>
                   <p className="font-medium text-blue-400 hover:underline cursor-pointer">Integra Tech Academy</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lo que aprenderás</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Dominar las herramientas fundamentales',
                  'Aplicar conocimientos en proyectos reales',
                  'Mejorar tu productividad profesional',
                  'Obtener certificación verificable',
                  'Acceso a comunidad de estudiantes',
                  'Recursos descargables de por vida'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contenido del curso</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-sm text-gray-600">
                  <span>{course.modules?.length || 0} módulos</span>
                  <span>• {course.specifications?.['Duración'] || '10h'} duración total</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {course.modules?.map((module, index) => (
                    <div key={module.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isEnrolled ? (
                             <Play className="w-4 h-4 text-blue-600" />
                          ) : (
                             <Lock className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="font-medium text-gray-900">{module.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{module.duration || '15:00'}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 ml-7">{module.description}</p>
                    </div>
                  ))}
                  {(!course.modules || course.modules.length === 0) && (
                    <div className="p-8 text-center text-gray-500">
                      No hay módulos disponibles públicamente aún.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Card */}
          <div className="lg:w-1/3">
             <div className="sticky top-24">
               <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                 <div className="relative aspect-video">
                    {course.modules && course.modules[0]?.videoUrl ? (
                      <div className="absolute inset-0 bg-black flex items-center justify-center group cursor-pointer" onClick={() => toast('Vista previa no disponible en este demo')}>
                         <div className="absolute inset-0 bg-black/40"></div>
                         <img src={course.image} className="w-full h-full object-cover opacity-50" alt="Preview" />
                         <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-black fill-current ml-1" />
                         </div>
                         <div className="absolute bottom-4 text-white font-bold text-sm">Vista Previa del Curso</div>
                      </div>
                    ) : (
                      <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                    )}
                 </div>
                 
                 <div className="p-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                       {isEnrolled ? '¡Ya estás inscrito!' : formatPrice(course.price)}
                    </div>
                    
                    {!isEnrolled && (
                       <p className="text-gray-500 text-sm mb-6 line-through">
                          {formatPrice(course.price * 1.2)}
                       </p>
                    )}

                    <button
                      onClick={handleStartLearning}
                      className={`w-full py-4 px-4 rounded-lg font-bold text-lg mb-4 transition-all transform hover:-translate-y-0.5 shadow-md ${
                        isEnrolled 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {isEnrolled ? 'Ir al Curso' : 'Añadir al carrito'}
                    </button>
                    
                    {!isEnrolled && (
                      <button 
                        onClick={() => {
                          addToCart(course, 1);
                          navigate('/checkout');
                        }}
                        className="w-full py-3 px-4 rounded-lg font-bold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors mb-6"
                      >
                        Comprar ahora
                      </button>
                    )}

                    <p className="text-xs text-center text-gray-500 mb-4">
                       Garantía de reembolso de 30 días
                    </p>

                    <div className="space-y-3 text-sm text-gray-600">
                       <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4" />
                          <span>Acceso de por vida</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4" />
                          <span>Certificado de finalización</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <Video className="w-4 h-4" />
                          <span>Acceso en dispositivos móviles</span>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
