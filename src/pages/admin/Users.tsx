import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Search, User as UserIcon, Shield, Plus, X, BookOpen, Check, Trash2, Lock, Unlock, Key, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEO } from '../../components/common/SEO';

export const Users: React.FC = () => {
  const { users, courses, grades, updateUserRole, createStudent, enrollUserInCourse, unenrollUserFromCourse, toggleUserStatus, resetUserPassword, deleteUser, refreshData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Default role for new users
  });

  const [passwordData, setPasswordData] = useState('');

  const filteredUsers = users.filter(user =>
    (user.role === 'user' || user.role === 'student') && // Show only customers and students
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    // Only create students here
    try {
        await createStudent(formData.email, formData.password, formData.name, 'student');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '', role: 'student' });
    } catch (error) {
        toast.error('Error al crear estudiante');
    }
  };

  const handleEnrollment = async (courseId: string) => {
    if (selectedUser) {
      await enrollUserInCourse(selectedUser, courseId);
    }
  };

  const handleUnenrollment = async (courseId: string) => {
    if (selectedUser) {
      await unenrollUserFromCourse(selectedUser, courseId);
    }
  };

  const handleToggleStatus = async (user: any) => {
    await toggleUserStatus(user.id, !user.isBanned);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && passwordData.length >= 6) {
      await resetUserPassword(selectedUser, passwordData);
      setIsPasswordModalOpen(false);
      setPasswordData('');
    } else {
      toast.error('La contraseña debe tener al menos 6 caracteres');
    }
  };

  const getUserEnrollments = (userId: string) => {
    // This is a bit inefficient (filtering all grades/enrollments), but works for now.
    // Ideally, enrollments should be a separate list in DataContext or fetched per user.
    // Assuming 'grades' contains all enrollments (even without grade) based on DataContext implementation
    return grades.filter(g => g.userId === userId).map(g => g.courseId);
  };

  return (
    <div>
      <SEO title="Gestión de Usuarios" description="Administra usuarios, roles y estudiantes." />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={async () => {
              try {
                await refreshData();
                toast.success('Datos actualizados');
              } catch (error) {
                toast.error('Error al actualizar datos');
              }
            }}
            className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            title="Actualizar lista de usuarios"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="sm:hidden">Actualizar</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Estudiante
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cursos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'student' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : null}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getUserEnrollments(user.id).length > 0 ? (
                        <span className="font-medium text-blue-600">
                          {getUserEnrollments(user.id).length} Cursos
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.isBanned ? 'Inactivo' : 'Activo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(user)}
                      className={`p-1.5 rounded-full ${user.isBanned ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                      title={user.isBanned ? 'Desbloquear usuario' : 'Bloquear usuario'}
                    >
                      {user.isBanned ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user.id);
                        setIsPasswordModalOpen(true);
                      }}
                      className="p-1.5 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      title="Cambiar contraseña"
                    >
                      <Key className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
                            deleteUser(user.id);
                        }
                      }}
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as 'user' | 'student')}
                      className="block pl-3 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="user">Usuario</option>
                      <option value="student">Estudiante</option>
                    </select>
                    
                    {user.role === 'student' && (
                      <button
                        onClick={() => {
                          setSelectedUser(user.id);
                          setIsEnrollModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        title="Gestionar Cursos"
                      >
                        <BookOpen className="w-4 h-4" />
                        Cursos
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Cambiar Contraseña</h2>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Ingresa la nueva contraseña para el usuario seleccionado.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={passwordData}
                  onChange={(e) => setPasswordData(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors mt-4"
              >
                Actualizar Contraseña
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Crear Nuevo Estudiante</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Crear Estudiante
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Enrollments Modal */}
      {isEnrollModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gestionar Cursos del Estudiante</h2>
              <button onClick={() => setIsEnrollModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {courses.map(course => {
                const isEnrolled = getUserEnrollments(selectedUser).includes(course.id);
                return (
                  <div key={course.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-gray-50 gap-4">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.specifications?.['Nivel']} - {course.specifications?.['Duración']}</p>
                    </div>
                    {isEnrolled ? (
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                          <Check className="w-4 h-4" /> Inscrito
                        </span>
                        <button
                          onClick={() => handleUnenrollment(course.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          title="Eliminar inscripción"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEnrollment(course.id)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200"
                      >
                        Inscribir
                      </button>
                    )}
                  </div>
                );
              })}
              {courses.length === 0 && (
                <p className="text-center text-gray-500 py-4">No hay cursos disponibles.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
