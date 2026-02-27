import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Course, Grade } from '../../types';
import { Plus, Edit, Trash2, X, Search, GraduationCap, Upload } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const Courses: React.FC = () => {
  const { courses, users, addCourse, updateCourse, deleteCourse, assignGrade } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Course Form Data
  const [formData, setFormData] = useState<Partial<Course>>({
    name: '',
    description: '',
    price: 0,
    category: 'capacitacion',
    stock: 100, // Unlimited or high number for digital/virtual
    image: '',
    isActive: true,
    specifications: {
      'Duración': '',
      'Modalidad': 'Virtual',
      'Nivel': 'Básico'
    },
    modules: []
  });

  const handleAddModule = () => {
    const newModule = {
      id: Date.now().toString(),
      title: '',
      description: '',
      videoUrl: '',
      duration: ''
    };
    setFormData({
      ...formData,
      modules: [...(formData.modules || []), newModule]
    });
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = [...(formData.modules || [])];
    updatedModules.splice(index, 1);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleModuleChange = (index: number, field: string, value: string) => {
    const updatedModules = [...(formData.modules || [])];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleVideoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'video/mp4') {
        alert('Solo se permiten archivos MP4');
        return;
      }
      const url = URL.createObjectURL(file);
      const updatedModules = [...(formData.modules || [])];
      updatedModules[index] = {
        ...updatedModules[index],
        videoUrl: url,
        videoFile: file
      };
      setFormData({ ...formData, modules: updatedModules });
    }
  };

  // Grade Form Data
  const [gradeData, setGradeData] = useState<{ userId: string; grade: number; feedback: string }>({
    userId: '',
    grade: 0,
    feedback: ''
  });

  const handleOpenModal = (course?: Course) => {
    if (course) {
      setCurrentCourse(course);
      setFormData(course);
    } else {
      setCurrentCourse(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'capacitacion',
        stock: 100,
        image: '',
        isActive: true,
        specifications: {
          'Duración': '',
          'Modalidad': 'Virtual',
          'Nivel': 'Básico'
        }
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenGradeModal = (course: Course) => {
    setCurrentCourse(course);
    setGradeData({ userId: '', grade: 0, feedback: '' });
    setIsGradeModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCourse) {
      await updateCourse({ ...formData, id: currentCourse.id } as Course);
    } else {
      await addCourse({ ...formData, id: Date.now().toString() } as Course);
    }
    setIsModalOpen(false);
  };

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCourse && gradeData.userId) {
      const newGrade: Grade = {
        userId: gradeData.userId,
        courseId: currentCourse.id,
        grade: gradeData.grade,
        feedback: gradeData.feedback,
        assignedAt: new Date().toISOString()
      };
      await assignGrade(newGrade);
      setIsGradeModalOpen(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SEO title="Gestión de Cursos" description="Administra los cursos de capacitación y calificaciones." />
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Curso
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded object-cover" src={course.image} alt="" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <p>Duración: {course.specifications?.['Duración']}</p>
                    <p>Nivel: {course.specifications?.['Nivel']}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(course.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleOpenGradeModal(course)} className="text-green-600 hover:text-green-900 mr-4" title="Calificar Estudiantes">
                    <GraduationCap className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleOpenModal(course)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteCourse(course.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{currentCourse ? 'Editar Curso' : 'Nuevo Curso'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Curso</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  required
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duración</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.specifications?.['Duración'] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, 'Duración': e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modalidad</label>
                  <select
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.specifications?.['Modalidad'] || 'Virtual'}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, 'Modalidad': e.target.value }
                    })}
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nivel</label>
                  <select
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.specifications?.['Nivel'] || 'Básico'}
                    onChange={(e) => setFormData({
                      ...formData,
                      specifications: { ...formData.specifications, 'Nivel': e.target.value }
                    })}
                  >
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
                <input
                  type="url"
                  required
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Módulos del Curso</h4>
                  <button
                    type="button"
                    onClick={handleAddModule}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar Módulo
                  </button>
                </div>
                
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {formData.modules?.map((module, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                      <button
                        type="button"
                        onClick={() => handleRemoveModule(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <input
                            type="text"
                            placeholder="Título del Módulo"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={module.title}
                            onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              accept="video/mp4"
                              className="hidden"
                              id={`video-upload-${index}`}
                              onChange={(e) => handleVideoUpload(index, e)}
                            />
                            <label
                              htmlFor={`video-upload-${index}`}
                              className="cursor-pointer flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full justify-center"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              {module.videoFile ? 'Cambiar Video' : (module.videoUrl ? 'Reemplazar Video' : 'Examinar Video (MP4)')}
                            </label>
                          </div>
                          {(module.videoFile || module.videoUrl) && (
                            <p className="mt-1 text-xs text-gray-500 truncate">
                              {module.videoFile ? module.videoFile.name : (module.videoUrl ? 'Video cargado' : '')}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <input
                            type="text"
                            placeholder="Duración (ej: 10 min)"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={module.duration}
                            onChange={(e) => handleModuleChange(index, 'duration', e.target.value)}
                          />
                           <input
                            type="text"
                            placeholder="Descripción breve"
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={module.description}
                            onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!formData.modules || formData.modules.length === 0) && (
                     <p className="text-sm text-gray-500 text-center py-4">No hay módulos agregados.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Calificar Estudiante - {currentCourse?.name}</h3>
              <button onClick={() => setIsGradeModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estudiante</label>
                <select
                  required
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={gradeData.userId}
                  onChange={(e) => setGradeData({ ...gradeData, userId: e.target.value })}
                >
                  <option value="">Seleccionar estudiante...</option>
                  {users.filter(u => u.role === 'student' || u.role === 'user').map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Calificación (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={gradeData.grade}
                  onChange={(e) => setGradeData({ ...gradeData, grade: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Retroalimentación</label>
                <textarea
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                  value={gradeData.feedback}
                  onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                  placeholder="Comentarios opcionales..."
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsGradeModalOpen(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Calificar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
