import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { SEO } from '../components/common/SEO';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <SEO title="Iniciar Sesión" description="Accede a tu cuenta de Integra Tech." />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
            <div className="flex-shrink-0">
              <Logo width={200} height={70} theme="light" />
            </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          O{' '}
          <Link to="/registro" className="font-medium text-gray-500 hover:text-gray-900 transition-colors">
            crea una cuenta gratis
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl border-t-4 border-blue-600 sm:px-10 relative">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
