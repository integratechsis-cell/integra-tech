import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { SEO } from '../components/common/SEO';
import { Play, Clock, Award, BookOpen, CheckCircle, BarChart2 } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';

export const MyLearning: React.FC = () => {
  const { user, loading } = useAuth();
  const { courses, grades } = useData();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    if (user && courses.length > 0) {
      // Find all enrollments for this user
      const userEnrollments = grades.filter(g => g.userId === user.id);
      
      // Map to course objects
      const myCourses = userEnrollments.map(enrollment => {
        const course = courses.find(c => c.id === enrollment.courseId);
        if (!course) return null;
        
        // Calculate progress from local storage
        const storedProgress = localStorage.getItem(`course_progress_${course.id}`);
        const completedModules = storedProgress ? JSON.parse(storedProgress) : [];
        const totalModules = course.modules?.length || 0;
        const progress = totalModules > 0 
          ? Math.round((completedModules.length / totalModules) * 100) 
          : 0;

        return {
          ...course,
          progress,
          grade: enrollment.grade
        };
      }).filter(Boolean);

      setEnrolledCourses(myCourses);
    }
  }, [user, courses, grades]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <SEO title="Mis Cursos" description="Accede a tus cursos comprados." />
        
        {/* Left Side - Welcome/Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 text-white flex-col justify-center px-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 max-w-lg">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Tu futuro comienza <span className="text-blue-300">aquí</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Accede a tu panel de estudiante para continuar con tus cursos, ver tus certificados y seguir tu progreso en tiempo real.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Aprendizaje Continuo</h3>
                  <p className="text-sm text-blue-200">Acceso 24/7 a todos tus materiales.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Certificaciones</h3>
                  <p className="text-sm text-blue-200">Descarga tus diplomas al instante.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <BarChart2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Seguimiento de Progreso</h3>
                  <p className="text-sm text-blue-200">Visualiza tu avance módulo a módulo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-16 py-12 bg-white">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo</h2>
              <p className="mt-2 text-gray-600">Ingresa tus credenciales para acceder a tus cursos.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
               <LoginForm redirectTo="/mis-cursos" />
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              ¿Aún no tienes una cuenta?{' '}
              <Link to="/registro" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Mis Cursos" description="Gestiona tu aprendizaje y accede a tus cursos." />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mi Aprendizaje</h1>
            <p className="mt-2 text-gray-600">Bienvenido de nuevo, {user.name}. Continúa donde lo dejaste.</p>
          </div>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/curso/${course.id}`}
                      className="bg-white/20 backdrop-blur-sm border border-white/50 text-white rounded-full p-3 hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </Link>
                  </div>
                  {course.grade !== null && course.grade !== undefined && (
                     <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                       <Award className="w-3 h-3" />
                       Nota: {course.grade}
                     </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={course.name}>
                    {course.name}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.specifications?.['Duración'] || 'Flexible'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.modules?.length || 0} módulos</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progreso</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Link 
                    to={`/curso/${course.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {course.progress > 0 ? 'Continuar Curso' : 'Iniciar Curso'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes cursos inscritos</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Explora nuestro catálogo de cursos y comienza tu viaje de aprendizaje hoy mismo.
            </p>
            <Link 
              to="/capacitacion" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Explorar Cursos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
