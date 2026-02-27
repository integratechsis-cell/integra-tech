import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '../common/WhatsAppButton';
import { SEO } from '../common/SEO';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans relative">
       {/* Global Technological Background */}
       <div className="fixed inset-0 z-[-1] bg-[#0f172a]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f172a] to-[#0f172a]"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          {/* Glowing orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]"></div>
       </div>

      <SEO 
        title="Inicio" 
        description="Integra Tech - Soluciones tecnológicas integrales, venta de equipos, soporte técnico y capacitación profesional." 
      />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
