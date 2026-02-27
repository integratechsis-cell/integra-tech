import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
}).required();

type FormData = yup.InferType<typeof schema>;

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectTo = '/' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const [isResetting, setIsResetting] = React.useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      try {
          setIsResetting(true);
          await api.forgotPassword(resetEmail);
          
          toast.success(
            <div className="flex flex-col gap-1">
              <span className="font-bold">¡Solicitud recibida!</span>
              <span className="text-sm">Si el correo {resetEmail} está registrado, recibirás un enlace de recuperación.</span>
            </div>,
            { duration: 5000 }
          );
          setIsResetModalOpen(false);
          setResetEmail('');
      } catch (error) {
          toast.error("Error al procesar solicitud");
      } finally {
          setIsResetting(false);
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate(redirectTo);
      }
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
              placeholder="ejemplo@correo.com"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
              placeholder="••••••••"
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <button 
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Iniciando Sesión...
                </span>
            ) : (
              <span className="flex items-center">
                <span className="mr-2">Iniciar Sesión</span>
                <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Reset Password Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity overflow-y-auto">
          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0" 
            onClick={() => setIsResetModalOpen(false)}
          ></div>

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[90%] sm:max-w-md p-6 sm:p-8 relative animate-fade-in-up border border-gray-100 z-10 mx-auto my-auto">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center sm:text-left">
              Recuperar Contraseña
            </h3>
            
            <p className="text-gray-600 mb-6 text-sm leading-relaxed text-center sm:text-left">
              Ingresa tu correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu contraseña de forma segura.
            </p>
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm text-sm"
                  placeholder="tu@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors border border-transparent hover:border-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isResetting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md transition-all transform active:scale-95 sm:hover:-translate-y-0.5 sm:hover:shadow-lg disabled:opacity-70 disabled:cursor-wait"
                >
                  {isResetting ? 'Enviando...' : 'Enviar Enlace'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
