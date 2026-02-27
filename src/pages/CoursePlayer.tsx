import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Certificate } from '../components/course/Certificate';
import { 
  Play, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Share2, 
  MoreVertical, 
  Star, 
  Users,
  Clock,
  Award,
  X,
  Circle
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import toast from 'react-hot-toast';

export const CoursePlayer: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses } = useData();
  const course = courses.find(c => c.id === courseId);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize completed modules from local storage
  useEffect(() => {
    if (courseId) {
      const stored = localStorage.getItem(`course_progress_${courseId}`);
      if (stored) {
        setCompletedModules(JSON.parse(stored));
      }
    }
  }, [courseId]);

  // Save progress
  useEffect(() => {
    if (courseId) {
      localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(completedModules));
    }
  }, [completedModules, courseId]);

  if (!course) {
    return <div className="text-white text-center py-20">Curso no encontrado</div>;
  }

  const modules = course.modules || [];
  const progressPercentage = modules.length > 0 
    ? Math.round((completedModules.length / modules.length) * 100) 
    : 0;

  const handleModuleComplete = (moduleId: string) => {
    if (completedModules.includes(moduleId)) {
      setCompletedModules(prev => prev.filter(id => id !== moduleId));
    } else {
      setCompletedModules(prev => [...prev, moduleId]);
      toast.success('¡Módulo completado!');
    }
  };

  const handleModuleClick = (index: number) => {
    setCurrentModuleIndex(index);
  };

  const currentModule = modules[currentModuleIndex];
  const isCourseCompleted = progressPercentage === 100;

  const getVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = currentModule?.videoUrl ? getVideoId(currentModule.videoUrl) : null;
  const isYouTube = !!videoId;
  const isVideoFile = currentModule?.videoUrl && !isYouTube;

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white overflow-hidden font-sans">
      <SEO title={`Curso: ${course.name}`} description={course.description} />
      
      {/* Top Bar */}
      <header className="flex-shrink-0 h-16 bg-[#2d2f31] border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/capacitacion" className="font-bold text-xl text-white hover:text-gray-300">
            integra<span className="text-gray-400">tech</span>
          </Link>
          <div className="h-6 w-px bg-gray-600 mx-2"></div>
          <h1 className="text-sm md:text-base font-medium truncate max-w-md md:max-w-xl">
            {course.name}
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="md:hidden">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2 text-gray-300 hover:text-white"
             >
               {isSidebarOpen ? <X className="w-6 h-6" /> : <MoreVertical className="w-6 h-6" />}
             </button>
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>Deja una reseña</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="hidden md:block text-xs text-gray-400">{progressPercentage}% completado</span>
            <button className="p-2 hover:bg-gray-700 rounded-full border border-white/20">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#1c1d1f] scrollbar-thin scrollbar-thumb-gray-600">
          {/* Video Player */}
          <div className="w-full bg-black aspect-video relative group flex items-center justify-center">
            {isYouTube ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : isVideoFile ? (
              <video
                width="100%"
                height="100%"
                controls
                src={currentModule?.videoUrl}
                className="w-full h-full object-contain"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <div className="text-center p-8">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mx-auto mb-4">
                    <Play className="w-8 h-8 text-white fill-current ml-1" />
                 </div>
                 <h3 className="text-xl font-bold">{currentModule?.title || 'Selecciona un módulo'}</h3>
                 <p className="text-gray-400 mt-2">{currentModule?.description || 'El contenido aparecerá aquí'}</p>
              </div>
            )}
          </div>

          {/* Course Tabs */}
          <div className="px-4 md:px-8 py-6">
            <div className="flex gap-6 border-b border-gray-700 mb-6 overflow-x-auto">
              {['overview', 'certificate'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-bold capitalize whitespace-nowrap ${
                    activeTab === tab 
                      ? 'text-white border-b-2 border-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'overview' ? 'Descripción general' : 'Certificado'}
                </button>
              ))}
            </div>

            {/* Overview Content */}
            {activeTab === 'overview' && (
              <div className="max-w-4xl animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {currentModule?.title || course.name}
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {currentModule?.description || course.description}
                </p>

                <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.specifications?.['Duración'] || '20 horas'} total</span>
                  </div>
                   <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>{modules.length} Módulos</span>
                  </div>
                </div>
              </div>
            )}

            {/* Certificate Content */}
            {activeTab === 'certificate' && (
              <div className="max-w-4xl animate-fade-in-up">
                {isCourseCompleted ? (
                   <Certificate course={course} />
                ) : (
                  <div className="text-center py-12 border border-dashed border-gray-700 rounded-xl">
                    <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Certificado Bloqueado</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Debes completar el 100% del curso para desbloquear tu certificado. 
                      Actualmente llevas un <span className="text-blue-400 font-bold">{progressPercentage}%</span>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#1c1d1f] shadow-xl flex flex-col animate-slide-in-right">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-white">Contenido del curso</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {modules.map((module, idx) => {
                  const isCompleted = completedModules.includes(module.id);
                  const isActive = currentModuleIndex === idx;
                  return (
                    <div 
                      key={module.id} 
                      className={`flex items-start gap-3 px-4 py-4 border-b border-gray-800 cursor-pointer ${
                        isActive ? 'bg-[#2d2f31]' : 'hover:bg-[#2d2f31]'
                      }`}
                      onClick={() => {
                        handleModuleClick(idx);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleModuleComplete(module.id)}
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            isCompleted ? 'bg-blue-600 border-blue-600' : 'border-gray-500'
                          }`}
                        >
                          {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        </button>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                          {idx + 1}. {module.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar Content */}
        <aside className="w-80 md:w-96 bg-[#1c1d1f] border-l border-gray-700 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-[#1c1d1f]">
            <h3 className="font-bold text-white">Contenido del curso</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
              <div className="bg-[#1c1d1f]">
                {modules.length > 0 ? (
                  modules.map((module, idx) => {
                    const isCompleted = completedModules.includes(module.id);
                    const isActive = currentModuleIndex === idx;

                    return (
                      <div 
                        key={module.id} 
                        className={`flex items-start gap-3 px-4 py-4 border-b border-gray-800 cursor-pointer group transition-colors ${
                          isActive ? 'bg-[#2d2f31]' : 'hover:bg-[#2d2f31]'
                        }`}
                        onClick={() => handleModuleClick(idx)}
                      >
                        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleModuleComplete(module.id)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isCompleted 
                                ? 'bg-blue-600 border-blue-600' 
                                : 'border-gray-500 hover:border-gray-400'
                            }`}
                          >
                            {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                          </button>
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {idx + 1}. {module.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            {module.videoUrl ? <Play className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                            <span>{module.duration || '5 min'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No hay contenido disponible para este curso aún.
                  </div>
                )}
              </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

