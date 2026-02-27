import React, { forwardRef } from 'react';
import { Invoice } from '../../types';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoice }, ref) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div ref={ref} id="invoice-preview" className="bg-white p-8 md:p-12 max-w-4xl mx-auto shadow-lg text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 bg-brand-dark clip-path-hexagon flex items-center justify-center">
               <div className="w-8 h-8 bg-brand-light"></div>
            </div>
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">INTEGRA TECH</h1>
            <p className="text-sm text-gray-500">Sistemas & Soporte</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-900">FACTURA DE VENTA</h2>
          <p className="text-gray-600 mt-2">No. {invoice.invoiceNumber}</p>
          <p className="text-gray-600">Fecha: {formatDate(invoice.createdAt)}</p>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">De:</h3>
          <p className="font-bold text-gray-900">Integra Tech</p>
          <p className="text-gray-600">NIT: 900.123.456-7</p>
          <p className="text-gray-600">Dirección: Calle 123 # 45-67, Colombia</p>
          <p className="text-gray-600">Tel: +57 322 757 9082</p>
          <p className="text-gray-600">Email: integra.tech.sis@gmail.com</p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Para:</h3>
          <p className="font-bold text-gray-900">{invoice.customerInfo.name}</p>
          <p className="text-gray-600">{invoice.customerInfo.idType}: {invoice.customerInfo.idNumber}</p>
          <p className="text-gray-600">{invoice.customerInfo.address}</p>
          <p className="text-gray-600">Tel: {invoice.customerInfo.phone}</p>
          <p className="text-gray-600">{invoice.customerInfo.email}</p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 border-b-2 border-gray-200 font-bold text-gray-600 uppercase text-sm">Descripción</th>
              <th className="py-3 border-b-2 border-gray-200 font-bold text-gray-600 uppercase text-sm text-center">Cant.</th>
              <th className="py-3 border-b-2 border-gray-200 font-bold text-gray-600 uppercase text-sm text-right">Precio Unit.</th>
              <th className="py-3 border-b-2 border-gray-200 font-bold text-gray-600 uppercase text-sm text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="py-4 border-b border-gray-200">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </td>
                <td className="py-4 border-b border-gray-200 text-center">{item.quantity}</td>
                <td className="py-4 border-b border-gray-200 text-right">{formatPrice(item.price)}</td>
                <td className="py-4 border-b border-gray-200 text-right font-medium">{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-64 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span>
            <span>{formatPrice(invoice.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Impuestos (19%):</span>
            <span>{formatPrice(invoice.tax)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-200 pt-3">
            <span>Total:</span>
            <span>{formatPrice(invoice.total)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-900 mb-2">Gracias por su compra</p>
        <p>Esta factura se asimila en todos sus efectos a una letra de cambio de conformidad con el Art. 774 del Código de Comercio.</p>
        <p className="mt-4">Integra Tech - Soluciones Tecnológicas</p>
      </div>
    </div>
  );
});

InvoicePreview.displayName = 'InvoicePreview';
