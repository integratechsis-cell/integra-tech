import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { User as AppUser } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session
    const storedUser = localStorage.getItem('integra_tech_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem('integra_tech_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData } = await api.login(email, password);
      
      const appUser: AppUser = {
          id: userData.id,
          email: userData.email,
          name: userData.full_name,
          role: userData.role,
          isAuthenticated: true,
          createdAt: userData.created_at
      };

      setUser(appUser);
      localStorage.setItem('integra_tech_user', JSON.stringify(appUser));
      toast.success('Sesión iniciada correctamente');
    } catch (error: any) {
      toast.error(error.error || 'Error al iniciar sesión');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user: userData } = await api.register(email, password, name, 'user');
      
      const appUser: AppUser = {
          id: userData.id,
          email: userData.email,
          name: userData.full_name,
          role: userData.role,
          isAuthenticated: true,
          createdAt: new Date().toISOString()
      };

      setUser(appUser);
      localStorage.setItem('integra_tech_user', JSON.stringify(appUser));
      toast.success('Registro exitoso!');
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.error || 'Error al registrarse');
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('integra_tech_user');
      toast.success('Sesión cerrada');
    } catch (error: any) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      isAdmin: user?.role ? ['admin', 'super_admin', 'editor', 'inventory', 'marketing'].includes(user.role) : false,
      loading 
    }}>
      {!loading ? children : <div className="flex h-screen items-center justify-center">Cargando...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
