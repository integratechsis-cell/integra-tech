import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Search, User as UserIcon, Shield, Plus, X, Trash2, Lock, Unlock, Key, Briefcase, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { SEO } from '../../components/common/SEO';

export const Staff: React.FC = () => {
  const { users, updateUserRole, createStudent, toggleUserStatus, resetUserPassword, deleteUser } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  
  // Form states for new user
  const [formData, setFormData] = useState({
    name: '',
    username: '', // Added to match the image, though backend might not use it directly or map to name
    email: '',
    password: '',
    role: 'editor'
  });

  const [passwordData, setPasswordData] = useState('');

  // Filter users to show only staff (not students/customers)
  // We assume 'user' is a customer, 'student' is a student.
  // We want to manage: admin, super_admin, editor, inventory, marketing.
  const staffRoles = ['admin', 'super_admin', 'editor', 'inventory', 'marketing'];
  
  const filteredUsers = users.filter(user => 
    (staffRoles.includes(user.role) || user.role === 'admin') && // Show admins and new roles
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const roleOptions = [
    { value: 'editor', label: 'Capacitación' },
    { value: 'inventory', label: 'Tienda' },
    { value: 'marketing', label: 'Ventas' },
    { value: 'admin', label: 'Administrador' },
    { value: 'super_admin', label: 'Super Admin' }
  ];

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    // Combine name and username if needed, or just use name
    // The image shows "Nombre completo" and "Nombre de usuario".
    // Backend expects 'full_name'. We can just use 'name'.
    
    try {
        await createStudent(formData.email, formData.password, formData.name, formData.role);
        setIsModalOpen(false);
        setFormData({ name: '', username: '', email: '', password: '', role: 'editor' });
    } catch (error) {
        // Error toast handled in context
    }
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

  const getRoleLabel = (role: string) => {
    const found = roleOptions.find(r => r.value === role);
    return found ? found.label : role;
  };

  const getRoleColor = (role: string) => {
    switch(role) {
        case 'super_admin': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'editor': return 'bg-green-100 text-green-800 border-green-200'; // Capacitación
        case 'inventory': return 'bg-orange-100 text-orange-800 border-orange-200'; // Tienda
        case 'marketing': return 'bg-pink-100 text-pink-800 border-pink-200'; // Ventas
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <SEO title="Gestión de Equipo" description="Administra roles y permisos del personal." />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Gestión de Equipo
            </h1>
            <p className="text-gray-500 text-sm mt-1">Administra los roles y accesos de los trabajadores.</p>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Nuevo Usuario</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-shadow"
          placeholder="Buscar por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${getRoleColor(user.role).split(' ')[0]} ${getRoleColor(user.role).split(' ')[1]}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 truncate max-w-[150px]" title={user.name}>{user.name}</h3>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]" title={user.email}>{user.email}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                  {getRoleLabel(user.role)}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Asignar Rol
                  </label>
                  <select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as any)}
                    className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-gray-50"
                  >
                    {roleOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                   <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setSelectedUser(user.id);
                                setIsPasswordModalOpen(true);
                            }}
                            className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
                            title="Cambiar contraseña"
                        >
                            <Key className="w-4 h-4" />
                        </button>
                   </div>
                   
                   <button
                      onClick={() => toggleUserStatus(user.id, !user.isBanned)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        user.isBanned 
                            ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {user.isBanned ? (
                        <>
                            <Lock className="w-3 h-3" /> Bloqueado
                        </>
                      ) : (
                        <>
                            <Unlock className="w-3 h-3" /> Activo
                        </>
                      )}
                    </button>

                    <button
                        onClick={() => {
                            if (confirm('¿Estás seguro de eliminar este miembro del equipo?')) {
                                deleteUser(user.id);
                            }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Eliminar miembro"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredUsers.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <UserCheck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No se encontraron trabajadores con ese criterio.</p>
            </div>
        )}
      </div>

      {/* Modal: Nuevo Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg leading-6 font-bold text-gray-900 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-blue-600" />
                        Nuevo usuario
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
                            <input
                                type="text"
                                required
                                placeholder="Ej. Carlos Pérez"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de usuario</label>
                            <input
                                type="text"
                                placeholder="Ej. carlos.p"
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="correo@integraltech.co"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña inicial</label>
                        <input
                            type="text" 
                            required
                            minLength={8}
                            placeholder="Min. 8 caracteres"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                         <p className="text-xs text-gray-500 mt-1">La contraseña será visible para que puedas copiarla y enviarla.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Rol</label>
                        <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white"
                            >
                                {roleOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                    </div>
                    
                    <div className="mt-5 sm:mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                        >
                            Crear usuario
                        </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cambiar Contraseña */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setIsPasswordModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Cambiar Contraseña</h3>
                    <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handlePasswordReset} className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Ingresa la nueva contraseña para el usuario.
                    </p>
                    <div>
                        <input
                            type="password"
                            required
                            minLength={6}
                            placeholder="Nueva contraseña"
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                            value={passwordData}
                            onChange={(e) => setPasswordData(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none sm:text-sm"
                        >
                            Actualizar Contraseña
                        </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
