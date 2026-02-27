import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { api } from '../api/client';
import { InvoiceForm, InvoiceFormData } from '../components/invoice/InvoiceForm';
import { Invoice as InvoiceType } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building2, Lock, Loader, CheckCircle, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

// Payment Processing Modal
const PaymentModal: React.FC<{ 
  isOpen: boolean; 
  step: 'processing' | 'redirecting' | 'approving';
  paymentMethod: string;
}> = ({ isOpen, step, paymentMethod }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <div className="flex flex-col items-center text-center space-y-6">
          {step === 'processing' && (
            <>
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Procesando Pago Seguro</h3>
                <p className="text-gray-500 mt-2">Estamos encriptando tus datos...</p>
              </div>
            </>
          )}

          {step === 'redirecting' && (
            <>
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                {paymentMethod === 'pse' ? <Building2 className="w-10 h-10 text-blue-600" /> : 
                 paymentMethod === 'nequi' ? <Smartphone className="w-10 h-10 text-pink-600" /> : 
                 <CreditCard className="w-10 h-10 text-blue-600" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {paymentMethod === 'pse' ? 'Conectando con PSE...' : 
                   paymentMethod === 'nequi' ? 'Conectando con Nequi...' : 
                   'Verificando Tarjeta...'}
                </h3>
                <p className="text-gray-500 mt-2">Por favor no cierres esta ventana.</p>
              </div>
            </>
          )}

          {step === 'approving' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-bounce-slow">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">¡Pago Aprobado!</h3>
                <p className="text-gray-500 mt-2">Generando tu factura...</p>
              </div>
            </>
          )}
          
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-4 border-t w-full justify-center">
            <ShieldCheck className="w-4 h-4" />
            <span>Transacción 100% Segura y Encriptada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Checkout: React.FC = () => {
  const { cart, subtotal, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // WOMPI WIDGET INTEGRATION
  useEffect(() => {
      const loadWidget = async () => {
          if (total === 0) return;
          
          const amountInCents = Math.round(total * 100);
          const reference = `ORDER-${Math.floor(Math.random() * 1000000)}`;
          const currency = 'COP';
          const publicKey = 'pub_prod_mlswnpWAlICJ8Gs0rJeaq1DAM9C2fGgS';

          let integritySignature = '';
          try {
              const sigData = await api.getPaymentSignature(reference, amountInCents, currency);
              if (sigData && sigData.signature) {
                  integritySignature = sigData.signature;
              }
          } catch (e) { console.error(e); }

          const container = document.getElementById('wompi-container');
          if (container) {
              container.innerHTML = '';
              const script = document.createElement('script');
              script.src = 'https://checkout.wompi.co/widget.js';
              script.setAttribute('data-render', 'button');
              script.setAttribute('data-public-key', publicKey);
              script.setAttribute('data-currency', currency);
              script.setAttribute('data-amount-in-cents', amountInCents.toString());
              script.setAttribute('data-reference', reference);
              script.setAttribute('data-signature:integrity', integritySignature);
              script.setAttribute('data-redirect-url', 'https://www.google.com'); // Temp success URL
              
              const form = document.createElement('form');
              form.appendChild(script);
              container.appendChild(form);
          }
      };
      loadWidget();
  }, [total]);

  if (cart.length === 0) {
    navigate('/tienda');
    return null;
  }

  // Removed manual payment logic (handlePayment) to use Widget

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/carrito')}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-extrabold text-brand-dark">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Billing Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                1. Datos de Facturación
              </h2>
              <InvoiceForm 
                onSubmit={() => {}} 
                initialData={user ? { name: user.name, email: user.email } : undefined}
                hideSubmitButton={true}
                id="checkout-form"
              />
            </div>
            {/* Note: Payment method selection is handled by Wompi Widget now */}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 text-sm mb-6">
                <div className="max-h-60 overflow-y-auto space-y-2 mb-4 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2 py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-gray-900">{item.quantity}x</span>
                        <span className="text-gray-600 line-clamp-2">{item.name}</span>
                      </div>
                      <span className="font-medium whitespace-nowrap">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Impuestos (19%)</span>
                    <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(tax)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between font-bold text-xl text-brand-dark">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(total)}</span>
                </div>
              </div>

              {/* WOMPI WIDGET CONTAINER */}
              <div className="mt-6">
                  <div id="wompi-container" className="w-full flex justify-center">
                      <div className="animate-pulse bg-blue-600 h-12 w-full rounded-lg opacity-50 flex items-center justify-center text-white">
                          Cargando botón de pago...
                      </div>
                  </div>
              </div>
              
              <div className="mt-4 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs text-center">
                <div className="flex items-center gap-1">
                   <Lock className="h-3 w-3" />
                   <span className="font-medium">Pagos seguros y encriptados con SSL</span>
                </div>
                <p>Integra Tech no almacena los datos de tu tarjeta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
