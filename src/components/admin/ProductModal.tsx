import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { X, Upload, Save, Tag } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Partial<Product>) => Promise<void>;
  product?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'hardware',
    stock: 0,
    image: '',
    isActive: true,
    isPromotion: false,
    discount: 0,
    costPrice: 0,
    profitMargin: 20 // Default margin
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        isPromotion: product.isPromotion || false,
        discount: product.discount || 0,
        costPrice: product.costPrice || 0,
        profitMargin: product.profitMargin || 20
      });
      setImagePreview(product.image);
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'hardware',
        stock: 0,
        image: '',
        isActive: true,
        isPromotion: false,
        discount: 0,
        costPrice: 0,
        profitMargin: 20
      });
      setImagePreview('');
    }
  }, [product, isOpen]);

  // Auto-calculate final price when cost or margin changes
  useEffect(() => {
      const cost = Number(formData.costPrice) || 0;
      const margin = Number(formData.profitMargin) || 0;
      if (cost > 0) {
          const finalPrice = cost + (cost * (margin / 100));
          setFormData(prev => ({ ...prev, price: Math.round(finalPrice) }));
      }
  }, [formData.costPrice, formData.profitMargin]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: url }));
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2" id="modal-title">
                {product ? <Tag className="w-5 h-5 text-blue-600" /> : <Save className="w-5 h-5 text-blue-600" />}
                {product ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Ej. Portátil Lenovo IdeaPad"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Grid: SKU (ID hidden/auto), Categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                   <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select
                    id="category"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  >
                    <option value="hardware">Hardware</option>
                    <option value="perifericos">Periféricos</option>
                    <option value="software">Software</option>
                    <option value="suministros">Suministros</option>
                    <option value="capacitacion">Capacitación</option>
                  </select>
                </div>
                
                 {/* Stock */}
                <div>
                  <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-1">
                    Stock inicial
                  </label>
                  <input
                    type="number"
                    id="stock"
                    required
                    min="0"
                    placeholder="0"
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  />
                </div>
              </div>

              {/* Grid: Costo, Margen, Precio Final */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div>
                  <label htmlFor="costPrice" className="block text-sm font-semibold text-gray-700 mb-1">
                    Costo (Estándar)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="costPrice"
                      required
                      min="0"
                      placeholder="0"
                      className="w-full pl-7 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border"
                      value={formData.costPrice || ''}
                      onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                   <label htmlFor="profitMargin" className="block text-sm font-semibold text-gray-700 mb-1">
                    Margen Ganancia ({formData.profitMargin}%)
                  </label>
                  <div className="flex items-center gap-2 h-10">
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="1"
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                      value={formData.profitMargin || 20}
                      onChange={(e) => setFormData({ ...formData, profitMargin: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-bold text-blue-800 mb-1">
                    Precio Final (Cliente)
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-blue-500 sm:text-sm font-bold">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      readOnly
                      className="w-full pl-7 border-blue-300 bg-white text-blue-900 font-bold rounded-lg shadow-sm sm:text-sm py-2 px-3 border"
                      value={formData.price}
                    />
                  </div>
                </div>
              </div>

              {/* Promoción */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="isPromotion" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-orange-500" />
                        ¿Activar Oferta Especial?
                    </label>
                    <input
                        type="checkbox"
                        id="isPromotion"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData.isPromotion}
                        onChange={(e) => setFormData({ ...formData, isPromotion: e.target.checked })}
                    />
                </div>
                
                {formData.isPromotion && (
                    <div className="mt-3">
                        <label htmlFor="discount" className="block text-xs font-medium text-gray-500 mb-1">
                            Porcentaje de Descuento (10% - 60%)
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                id="discount-range"
                                min="10"
                                max="60"
                                step="5"
                                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                                value={formData.discount || 0}
                                onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                            />
                            <span className="text-sm font-bold text-orange-600 w-12 text-right">
                                {formData.discount}%
                            </span>
                        </div>
                        <p className="text-xs text-orange-600 mt-1 text-right">
                            Precio oferta: $ {Math.round((formData.price || 0) * (1 - (formData.discount || 0) / 100)).toLocaleString()}
                        </p>
                    </div>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  required
                  rows={3}
                  placeholder="Describe el producto..."
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Imagen */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Imagen del producto
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                        <div className="relative inline-block">
                            <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md mx-auto" />
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, image: '' });
                                    setImagePreview('');
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 justify-center">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2"
                            >
                                <span>Elegir archivo</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                            </label>
                            <p className="pl-1">o arrastrar y soltar</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                        </>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {product ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
