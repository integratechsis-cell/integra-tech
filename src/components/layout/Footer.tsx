import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <Logo width={200} height={70} theme="dark" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Soluciones tecnológicas integrales para empresas y particulares. 
              Soporte, capacitación y suministros de alta calidad.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61587131641840" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/tienda" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Tienda
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Capacitación TIC</li>
              <li className="text-gray-400 text-sm">Análisis de Datos</li>
              <li className="text-gray-400 text-sm">Mantenimiento Hardware</li>
              <li className="text-gray-400 text-sm">Desarrollo Software</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-DEFAULT shrink-0" />
                <span className="text-gray-400 text-sm">
                  <a href="https://wa.me/573227579082" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    +57 322 757 9082
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-DEFAULT shrink-0" />
                <span className="text-gray-400 text-sm">
                  <a href="mailto:integra.tech.sis@gmail.com" className="hover:text-white">
                    integra.tech.sis@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-DEFAULT shrink-0" />
                <span className="text-gray-400 text-sm">
                  Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Integra Tech. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
