import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Award, Download } from 'lucide-react';
import { Course } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface CertificateProps {
  course: Course;
}

export const Certificate: React.FC<CertificateProps> = ({ course }) => {
  const { user } = useAuth();
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Certificado_${course.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-xl border border-gray-700 mt-8">
      <Award className="w-16 h-16 text-yellow-500 mb-4 animate-bounce-slow" />
      <h3 className="text-2xl font-bold text-white mb-2">¡Felicitaciones!</h3>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        Has completado el curso <span className="text-blue-400 font-bold">{course.name}</span>.
        Ya puedes descargar tu certificado de finalización.
      </p>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all"
      >
        <Download className="w-5 h-5" />
        Descargar Certificado
      </button>

      {/* Hidden Certificate Template for PDF Generation */}
      <div className="fixed top-0 left-[-9999px]">
        <div
          ref={certificateRef}
          className="w-[1123px] h-[794px] bg-white p-12 flex flex-col items-center justify-center text-center relative overflow-hidden border-[20px] border-double border-gray-200"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          
          {/* Ornamental Border Corner */}
          <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-yellow-600"></div>
          <div className="absolute top-8 right-8 w-24 h-24 border-t-4 border-r-4 border-yellow-600"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 border-b-4 border-l-4 border-yellow-600"></div>
          <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-yellow-600"></div>

          <div className="w-24 h-24 mb-6">
             {/* Simple Logo Placeholder */}
             <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900 fill-current">
                <circle cx="50" cy="50" r="45" />
                <text x="50" y="55" fontSize="40" textAnchor="middle" fill="white" fontWeight="bold">IT</text>
             </svg>
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4 uppercase tracking-widest">Certificado</h1>
          <h2 className="text-2xl text-gray-600 mb-12 uppercase tracking-wider">de Finalización</h2>

          <p className="text-xl text-gray-500 italic mb-4">Se otorga el presente reconocimiento a:</p>
          
          <div className="text-5xl font-bold text-blue-900 mb-2 border-b-2 border-gray-300 pb-4 min-w-[600px]">
            {user?.name || 'Estudiante'}
          </div>

          <p className="text-xl text-gray-500 italic mt-8 mb-4">Por haber completado satisfactoriamente el curso de:</p>
          
          <h3 className="text-4xl font-bold text-gray-800 mb-8 max-w-4xl leading-tight">
            {course.name}
          </h3>

          <div className="flex gap-12 mt-8 text-gray-600">
             <div>
               <p className="font-bold text-lg">Duración</p>
               <p>{course.specifications?.['Duración'] || 'N/A'}</p>
             </div>
             <div>
               <p className="font-bold text-lg">Fecha</p>
               <p>{new Date().toLocaleDateString()}</p>
             </div>
             <div>
               <p className="font-bold text-lg">Modalidad</p>
               <p>{course.specifications?.['Modalidad'] || 'Virtual'}</p>
             </div>
          </div>

          <div className="mt-16 flex gap-32">
            <div className="text-center">
              <div className="w-48 border-b border-gray-400 mb-2"></div>
              <p className="font-bold text-gray-700">Director Académico</p>
            </div>
            <div className="text-center">
              <div className="w-48 border-b border-gray-400 mb-2"></div>
              <p className="font-bold text-gray-700">Integra Tech</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
