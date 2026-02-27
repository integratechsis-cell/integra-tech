import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { FileText, Download, Filter, Calendar, CreditCard, User, Clock, ChevronDown, Eye, X } from 'lucide-react';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SEO } from '../../components/common/SEO';

export const Sales: React.FC = () => {
  const { orders } = useData();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!orders) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  const handleExport = () => {
    // Flatten data for Excel
    const dataToExport = orders.map(order => ({
      ID: order.id,
      Fecha: new Date(order.created_at).toLocaleDateString(),
      Cliente: order.shipping_address?.name || 'N/A',
      Email: order.shipping_address?.email || 'N/A',
      Total: order.total,
      Estado: order.status,
      MetodoPago: order.payment_method
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "Reporte_Ventas.xlsx");
  };

  const generatePDF = (order: any) => {
    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Helper to format currency consistently as COP with no decimals and dots for thousands
        const formatCurrency = (value: number) => {
            return new Intl.NumberFormat('es-CO', { 
                style: 'currency', 
                currency: 'COP', 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
            }).format(value);
        };
        
        // Colors - "Industrias Borcelle" Blue Theme
        const deepBlue: [number, number, number] = [20, 35, 80];      // #142350 - Dark Navy (Headers/Footer)
        const mediumBlue: [number, number, number] = [40, 80, 160];   // #2850A0 - Primary Blue
        const brightBlue: [number, number, number] = [60, 130, 240];  // #3C82F0 - Highlight Blue
        const lightBlue: [number, number, number] = [220, 235, 255];  // #DCEBFF - Very light background
        const grayText: [number, number, number] = [80, 80, 80];
        const white: [number, number, number] = [255, 255, 255];

        // --- GEOMETRIC HEADER (Top Right) ---
        // 1. Large Light Blue Diagonal
        doc.setFillColor(brightBlue[0], brightBlue[1], brightBlue[2]);
        doc.triangle(pageWidth - 100, 0, pageWidth, 0, pageWidth, 90, 'F');
        
        // 2. Medium Blue Overlay
        doc.setFillColor(mediumBlue[0], mediumBlue[1], mediumBlue[2]);
        doc.triangle(pageWidth - 60, 0, pageWidth, 0, pageWidth, 50, 'F');

        // 3. Dark Blue Accent
        doc.setFillColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.triangle(pageWidth - 30, 0, pageWidth, 0, pageWidth, 25, 'F');
        
        // 4. White "Cut" Line (Negative Space effect)
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(1.5);
        doc.line(pageWidth - 100, 0, pageWidth, 90);

        // --- GEOMETRIC FOOTER (Bottom Right) ---
        // 1. Large Light Blue
        doc.setFillColor(brightBlue[0], brightBlue[1], brightBlue[2]);
        doc.triangle(pageWidth - 120, pageHeight, pageWidth, pageHeight, pageWidth, pageHeight - 100, 'F');

        // 2. Medium Blue Overlay
        doc.setFillColor(mediumBlue[0], mediumBlue[1], mediumBlue[2]);
        doc.triangle(pageWidth - 80, pageHeight, pageWidth, pageHeight, pageWidth, pageHeight - 70, 'F');

        // 3. Dark Blue Anchor
        doc.setFillColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.triangle(pageWidth - 100, pageHeight, pageWidth, pageHeight, pageWidth - 40, pageHeight - 40, 'F'); // Corner piece

        // --- LOGO & BRANDING (Top Left) ---
        // Replicating "INTEGRA TECH - Sistemas & Soporte" from the website (Logo.tsx)
        const logoX = 15;
        const logoY = 25;
        
        // INTEGRA (Blue Gradient simulation - using primary blue)
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(mediumBlue[0], mediumBlue[1], mediumBlue[2]);
        doc.text('INTEGRA', logoX, logoY);
        
        // TECH (Gray/Dark)
        const integraWidth = doc.getTextWidth('INTEGRA');
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]); // Dark Navy/Gray
        doc.text('TECH', logoX + integraWidth + 2, logoY);

        // Subtitle: Sistemas & Soporte
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        doc.text('Sistemas & Soporte', logoX + 2, logoY + 6);

        // INVOICE TITLE
        doc.setFontSize(36);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text('FACTURA DE VENTA', 15, 55);

        // --- CLIENT & ISSUER INFO ---
        const infoY = 80;
        
        // Left Column: CLIENT
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text('DATOS DEL CLIENTE', 15, infoY);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        doc.text(order.shipping_address?.name || 'Cliente General', 15, infoY + 7);
        // Ensure address is split if too long
        const addressLines = doc.splitTextToSize(order.shipping_address?.address || 'Dirección no registrada', 80);
        doc.text(addressLines, 15, infoY + 12);
        
        // Adjust Y position based on address length
        const addressHeight = addressLines.length * 5; 
        doc.text(order.shipping_address?.phone || 'Tel: N/A', 15, infoY + 12 + addressHeight);
        doc.text(order.shipping_address?.email || '', 15, infoY + 17 + addressHeight);

        // Right Column: ISSUER
        const rightColX = pageWidth / 2 + 10;
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text('DATOS DEL EMISOR', rightColX, infoY);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        doc.text('Integra Tech S.A.S', rightColX, infoY + 7);
        // doc.text('Calle 123 # 45-67, Bogotá', rightColX, infoY + 12); // Removed as requested
        doc.text('NIT: 900.123.456-7', rightColX, infoY + 12);
        doc.text('integra.tech.sis@gmail.com', rightColX, infoY + 17);
        doc.text('Cel/WhatsApp: 322 757 9082', rightColX, infoY + 22);

        // --- TABLE ---
        const tableColumn = ["PRODUCTO / SERVICIO", "CANTIDAD", "PRECIO", "SUBTOTAL"];
        const tableRows: any[] = [];

        const items = order.order_items || [];
        items.forEach((item: any) => {
            const price = parseFloat(item.price_at_purchase || 0);
            const totalItem = price * item.quantity;
            
            const productData = [
                item.products?.name || item.product_name || 'Producto eliminado',
                item.quantity,
                formatCurrency(price),
                formatCurrency(totalItem)
            ];
            tableRows.push(productData);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 130,
            theme: 'grid',
            headStyles: { 
                fillColor: deepBlue, 
                textColor: white,
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
                cellPadding: 8
            },
            bodyStyles: { 
                fontSize: 10, 
                cellPadding: 8,
                textColor: grayText,
                valign: 'middle',
                lineColor: [230, 230, 230]
            },
            columnStyles: {
                0: { halign: 'left' }, 
                1: { halign: 'center' }, 
                2: { halign: 'right' },
                3: { halign: 'right' }
            },
            styles: {
                lineWidth: 0.1,
                lineColor: [230, 230, 230]
            },
            alternateRowStyles: {
                fillColor: [255, 255, 255]
            }
        });

        // --- TOTALS SECTION ---
        const finalY = (doc as any).lastAutoTable.finalY + 15;
        const summaryX = pageWidth - 90;

        // Subtotals
        doc.setFontSize(10);
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        
        doc.text('Subtotal', summaryX, finalY);
        doc.text(formatCurrency(order.subtotal || (order.total * 0.81)), pageWidth - 15, finalY, { align: 'right' });
        
        doc.text('Impuestos (19%)', summaryX, finalY + 7);
        doc.text(formatCurrency(order.tax || (order.total * 0.19)), pageWidth - 15, finalY + 7, { align: 'right' });
        
        // Total Bold
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text('TOTAL', summaryX, finalY + 18);
        doc.text(formatCurrency(order.total), pageWidth - 15, finalY + 18, { align: 'right' });

        // --- FOOTER CONDITIONS (Bottom Left) ---
        const footerY = pageHeight - 55;
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text('CONDICIONES Y GARANTÍA', 15, footerY);
        
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        
        const terms = [
            "Forma de pago: Contado / Transferencia / Tarjeta.",
            "Garantía de Hardware: 12 meses por defectos de fábrica.",
            "Software y Licencias: No tienen devolución.",
            "Para garantías presentar esta factura y empaques originales.",
            "Esta factura se asimila a una Letra de Cambio (Art. 774 C.Co)."
        ];
        
        let currentTermY = footerY + 6;
        terms.forEach(term => {
            doc.text(`• ${term}`, 15, currentTermY);
            currentTermY += 4.5;
        });
        
        // Contact Icons/Text (Simulated)
        const contactY = pageHeight - 15;
        doc.setFontSize(8);
        doc.setTextColor(deepBlue[0], deepBlue[1], deepBlue[2]);
        doc.text("integra.tech.sis@gmail.com  |  www.integratech.com  |  322 757 9082", 15, contactY);
        doc.text("Bogotá, Colombia", 15, contactY + 4);

        doc.save(`Factura_IntegraTech_${order.id.slice(0, 8)}.pdf`);
    } catch (error) {
        console.error("Error generando PDF:", error);
        alert("Error al generar el PDF. Por favor revisa la consola para más detalles.");
    }
  };

  // Filter orders by date
  const filteredOrders = orders.filter(order => {
    if (!startDate && !endDate) return true;
    const orderDate = new Date(order.created_at);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    // Set end date to end of day
    end.setHours(23, 59, 59);
    return orderDate >= start && orderDate <= end;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <SEO title="Reporte de Ventas" description="Administración de ventas y facturación." />
      
      {/* Header & Filters */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Filtrar por fechas de transacciones</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="relative">
               <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <input 
                 type="date" 
                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
               />
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative">
               <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
               <input 
                 type="date" 
                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                 value={endDate}
                 onChange={(e) => setEndDate(e.target.value)}
               />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 bg-white">
              <Filter className="w-4 h-4" />
              Filtros
              <ChevronDown className="w-3 h-3" />
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm font-medium hover:bg-green-200"
            >
              <Download className="w-4 h-4" />
              Descargar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-semibold text-gray-700">Transacciones</h3>
          <span className="text-sm text-gray-500">{filteredOrders.length} resultados</span>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="grid grid-cols-12 gap-4 p-4 text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">
            <div className="col-span-2">Estado</div>
            <div className="col-span-3">Monto y Cliente</div>
            <div className="col-span-4">Datos del pago</div>
            <div className="col-span-2">Hora y fecha</div>
            <div className="col-span-1"></div>
          </div>

          {filteredOrders.length === 0 ? (
             <div className="p-8 text-center text-gray-500">No se encontraron transacciones en este rango de fechas.</div>
          ) : (
             filteredOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors text-sm">
                
                {/* Estado */}
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                    order.status === 'paid' ? 'bg-green-100 text-green-700' : 
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status === 'paid' ? 'Pagada' : order.status === 'pending' ? 'Pendiente' : 'Error'}
                  </span>
                </div>

                {/* Monto y Cliente */}
                <div className="col-span-3">
                  <div className="font-bold text-blue-600 text-base">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(order.total)}
                  </div>
                  <div className="text-gray-500 text-xs truncate" title={order.shipping_address?.email}>
                    {order.shipping_address?.email || 'N/A'}
                  </div>
                </div>

                {/* Datos del pago */}
                <div className="col-span-4">
                  <div className="flex items-center gap-2 text-gray-700 font-mono text-xs">
                     <CreditCard className="w-3 h-3 text-gray-400" />
                     <span>#{order.id.slice(0, 12)}...</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Ref: {order.items?.[0]?.product_name ? `Compra ${order.items[0].product_name.slice(0, 15)}...` : 'Compra General'}
                  </div>
                </div>

                {/* Fecha */}
                <div className="col-span-2 text-gray-600 text-xs">
                  {new Date(order.created_at).toLocaleDateString('es-CO', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Acciones */}
                <div className="col-span-1 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-gray-400 hover:text-blue-600 font-medium text-xs flex items-center justify-end gap-1"
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Detalles de pago</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Header Card */}
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(selectedOrder.total)}
                </div>
                <div className="text-blue-600 text-sm">
                  de {selectedOrder.shipping_address?.email}
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Estado</span>
                  <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                    selectedOrder.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedOrder.status === 'paid' ? 'Pagada' : 'Error'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Fecha</span>
                  <span className="text-gray-900 font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {new Date(selectedOrder.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Transacción #</span>
                  <span className="text-gray-900 font-mono text-sm">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-gray-500">Medio de pago</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{selectedOrder.payment_method || 'Wompi'}</span>
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Buyer Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4">Información del comprador</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-900 font-medium">{selectedOrder.shipping_address?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nombres y apellidos</span>
                    <span className="text-gray-900 font-medium">{selectedOrder.shipping_address?.name}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-gray-500">Dirección</span>
                     <span className="text-gray-900 font-medium">{selectedOrder.shipping_address?.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-4">
                 <button 
                   onClick={() => generatePDF(selectedOrder)}
                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                 >
                   <FileText className="w-4 h-4" />
                   Descargar Factura PDF
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
