import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { InvoicePreview } from '../components/invoice/InvoicePreview';
import { Invoice as InvoiceType } from '../types';
import { generatePDF } from '../utils/pdfGenerator';
import { SEO } from '../components/common/SEO';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Invoice: React.FC = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [invoiceData, setInvoiceData] = useState<InvoiceType | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.invoiceData) {
      setInvoiceData(location.state.invoiceData);
    } else {
      // If accessed directly without data, redirect to store or history
      // For now, let's just show empty state or redirect
      // navigate('/');
    }
  }, [location.state, navigate]);

  const handleDownload = async () => {
    if (!invoiceData) return;
    
    const toastId = toast.loading('Generando PDF...');
    try {
      await generatePDF('invoice-preview', `Factura-${invoiceData.invoiceNumber}`);
      toast.success('Factura descargada correctamente', { id: toastId });
    } catch (error) {
      toast.error('Error al generar el PDF', { id: toastId });
    }
  };

  if (!invoiceData) {
    return (
      <div className="bg-gray-50 min-h-screen py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-12 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No se encontró la factura</h2>
            <Link
              to="/tienda"
              className="inline-flex items-center text-brand-DEFAULT hover:text-brand-dark font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <SEO title="Factura" description="Descarga tu factura de compra." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8 text-center">
           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
             <CheckCircle className="h-10 w-10 text-green-600" />
           </div>
           <h1 className="text-3xl font-extrabold text-brand-dark mb-2">
             ¡Pago Exitoso!
           </h1>
           <p className="text-gray-600">
             Su transacción ha sido procesada correctamente. A continuación puede descargar su factura.
           </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full mb-8 flex justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium transition-colors"
            >
              Volver al Inicio
            </Link>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-DEFAULT hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-DEFAULT transition-colors"
            >
              <Download className="mr-2 h-5 w-5" />
              Descargar Factura PDF
            </button>
          </div>
          <div className="w-full overflow-auto flex justify-center">
             <InvoicePreview ref={previewRef} invoice={invoiceData} />
          </div>
        </div>
      </div>
    </div>
  );
};
