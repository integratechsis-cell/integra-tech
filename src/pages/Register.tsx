import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Logo } from '../components/common/Logo';
import { SEO } from '../components/common/SEO';

const schema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
}).required();

type FormData = yup.InferType<typeof schema>;

export const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Add a small delay to ensure user sees feedback
      await registerUser(data.email, data.password, data.name);
      
      // Navigate after successful registration
      // The context will handle the toast
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      // Error handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SEO title="Registro" description="Crea una cuenta en Integra Tech para acceder a nuestros servicios y tienda." />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <div className="flex-shrink-0">
              <Logo width={200} height={70} />
            </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Únete a Integra Tech
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-brand-DEFAULT hover:text-brand-dark transition-colors">
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl border border-gray-100 sm:px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark via-brand-DEFAULT to-brand-light"></div>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                Nombre completo
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-DEFAULT focus:border-brand-DEFAULT sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400"
                  placeholder="Ej: Juan Pérez"
                  {...register('name')}
                />
              </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.name.message}</p>
                )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Correo electrónico
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-DEFAULT focus:border-brand-DEFAULT sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400"
                  placeholder="ejemplo@correo.com"
                  {...register('email')}
                />
              </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.email.message}</p>
                )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-DEFAULT focus:border-brand-DEFAULT sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400"
                  placeholder="••••••••"
                  {...register('password')}
                />
              </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.password.message}</p>
                )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <div className="relative rounded-md shadow-sm">
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-DEFAULT focus:border-brand-DEFAULT sm:text-sm transition-all duration-200 ease-in-out hover:border-gray-400"
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                />
              </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.confirmPassword.message}</p>
                )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-gradient-to-r from-brand-dark to-brand-DEFAULT hover:from-brand-DEFAULT hover:to-brand-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                   <span className="flex items-center">
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Creando cuenta...
                   </span>
                ) : 'Crear Cuenta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
