import React, { useState, useRef } from 'react';
import { useData } from '../../contexts/DataContext';
import { Product } from '../../types';
import * as XLSX from 'xlsx';
import { Plus, Edit, Trash2, Search, Download, Upload } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { ProductModal } from '../../components/admin/ProductModal';
import toast from 'react-hot-toast';

export const Products: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenModal = (product?: Product) => {
    setCurrentProduct(product || null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (productData: Partial<Product>) => {
    if (currentProduct) {
      await updateProduct({ ...currentProduct, ...productData } as Product);
    } else {
      await addProduct({ ...productData, id: Date.now().toString() } as Product);
    }
    setIsModalOpen(false);
  };

  const exportToExcel = () => {
    const dataToExport = products.map(product => ({
      ID: product.id,
      Nombre: product.name,
      Categoría: product.category,
      Precio: product.price,
      Stock: product.stock,
      Estado: product.isActive ? 'Activo' : 'Inactivo',
      Descripción: product.description,
      Imagen: product.image
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventario");
    XLSX.writeFile(wb, "Inventario_IntegraTech.xlsx");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        let successCount = 0;
        let failCount = 0;

        for (const row of data as any[]) {
          // Normalize keys to handle different casing or Spanish headers
          const normalizedRow: any = {};
          Object.keys(row).forEach(key => {
            normalizedRow[key.toLowerCase()] = row[key];
          });

          // Check for 'precio' or 'price' or potentially look for red color if we had access to styles (we don't easily here)
          // User said "el precio que esta en rojo es el del publico". 
          // We will assume the column is named 'Precio' or 'Price'.
          
          const name = normalizedRow['nombre'] || normalizedRow['name'] || normalizedRow['producto'];
          const price = normalizedRow['precio'] || normalizedRow['price'] || normalizedRow['valor'] || 0;
          const stock = normalizedRow['stock'] || normalizedRow['cantidad'] || 0;
          const category = normalizedRow['categoría'] || normalizedRow['categoria'] || normalizedRow['category'] || 'hardware';
          const description = normalizedRow['descripción'] || normalizedRow['descripcion'] || normalizedRow['description'] || '';
          // Generate a unique image based on product name
          const fallbackImage = `https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(name + " product white background")}&image_size=square_hd`;
          const image = normalizedRow['imagen'] || normalizedRow['image'] || normalizedRow['foto'] || fallbackImage;

          if (name && price > 0) {
             const newProduct: Product = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                name: String(name),
                description: String(description),
                price: Number(price),
                stock: Number(stock),
                category: category.toLowerCase(), // DataContext handles unknown categories gracefully usually, or we should map
                image: String(image),
                isActive: true
             };
             
             // Simple category validation/mapping
             const validCategories = ['hardware', 'perifericos', 'software', 'suministros', 'capacitacion'];
             if (!validCategories.includes(newProduct.category)) {
                newProduct.category = 'hardware'; // Default fallback
             }

             await addProduct(newProduct);
             successCount++;
          } else {
             failCount++;
          }
        }

        toast.success(`Importación completada: ${successCount} productos agregados.`);
        if (failCount > 0) {
           toast.error(`${failCount} filas no se pudieron importar (faltaba nombre o precio).`);
        }
        
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
        
      } catch (error) {
        console.error('Error importing file:', error);
        toast.error('Error al procesar el archivo Excel.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SEO title="Gestión de Productos" description="Administra el inventario de tu tienda." />
      
      {/* Hidden file input */}
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
        ref={fileInputRef}
      />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 sm:flex gap-2 w-full md:w-auto">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="col-span-2 sm:col-span-1 flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap"
            title="Importar productos desde Excel"
          >
            <Upload className="w-5 h-5 mr-2" />
            Importar
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
          >
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </button>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo
          </button>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex gap-4">
            <img className="h-20 w-20 rounded-lg object-cover flex-shrink-0" src={product.image} alt={product.name} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 truncate">{product.name}</h3>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                    {product.category}
                  </span>
                </div>
                <div className="flex gap-1 ml-2">
                   <button onClick={() => handleOpenModal(product)} className="p-1.5 text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100">
                      <Edit className="w-4 h-4" />
                   </button>
                   <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-red-600 bg-red-50 rounded-full hover:bg-red-100">
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
              
              <div className="mt-2 flex justify-between items-end">
                <div>
                   <p className="text-lg font-bold text-gray-900">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}</p>
                   <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                </div>
                <div className="text-right ml-4">
                   <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                   }`}>
                      Stock: {product.stock}
                   </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleOpenModal(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        product={currentProduct}
      />
    </div>
  );
};
