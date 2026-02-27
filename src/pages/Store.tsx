import React, { useState, useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { ProductCard } from '../components/store/ProductCard';
import { CategoryIcons } from '../components/store/CategoryIcons';
import { SearchBar } from '../components/store/SearchBar';
import { BrandCarousel } from '../components/store/BrandCarousel';
import { SEO } from '../components/common/SEO';

export const Store: React.FC = () => {
  const { products } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Improved matching logic:
      // 1. If 'all', show everything.
      // 2. If 'hardware', match loosely since imports are all 'hardware'.
      // 3. Try to match specific keywords from category IDs in product name or description.
      
      const productNameLower = product.name.toLowerCase();
      const productDescLower = product.description.toLowerCase();
      
      let matchesCategory = selectedCategory === 'all';

      if (!matchesCategory) {
        // Special mapping for our imported data which is all 'hardware'
        // We filter by checking if the product name contains the category keyword
        if (selectedCategory === 'board') matchesCategory = productNameLower.includes('board') || productNameLower.includes('placa');
        else if (selectedCategory === 'cpu') matchesCategory = productNameLower.includes('cpu') || productNameLower.includes('procesador');
        else if (selectedCategory === 'gpu') matchesCategory = productNameLower.includes('gpu') || productNameLower.includes('tarjeta') || productNameLower.includes('grafica');
        else if (selectedCategory === 'chasis') matchesCategory = productNameLower.includes('chasis') || productNameLower.includes('caja') || productNameLower.includes('torre');
        else if (selectedCategory === 'hdd' || selectedCategory === 'ssd') matchesCategory = productNameLower.includes('disco') || productNameLower.includes('ssd');
        else if (selectedCategory === 'fuente') matchesCategory = productNameLower.includes('fuente');
        else if (selectedCategory === 'ram') matchesCategory = productNameLower.includes('ram') || productNameLower.includes('memoria');
        else if (selectedCategory === 'pc') matchesCategory = productNameLower.includes('pc') || productNameLower.includes('computador');
        else if (selectedCategory === 'portatiles') matchesCategory = productNameLower.includes('portatil') || productNameLower.includes('laptop');
        else if (selectedCategory === 'monitores') matchesCategory = productNameLower.includes('monitor');
        else if (selectedCategory === 'mouse') matchesCategory = productNameLower.includes('mouse') || productNameLower.includes('raton');
        else if (selectedCategory === 'teclado') matchesCategory = productNameLower.includes('teclado');
        else if (selectedCategory === 'audio') matchesCategory = productNameLower.includes('audifono') || productNameLower.includes('diadema');
        else {
           // Default fallback: match category string in data
           matchesCategory = product.category.toLowerCase().includes(selectedCategory) ||
                             selectedCategory.includes(product.category.toLowerCase());
        }
      }

      const matchesSearch =
        productNameLower.includes(searchTerm.toLowerCase()) ||
        productDescLower.includes(searchTerm.toLowerCase());
        
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="min-h-screen relative">
      <SEO title="Tienda" description="Explora nuestro catálogo de productos tecnológicos." />
      
      {/* Categories Bar - Adapted for dark background */}
      <div className="bg-white/90 backdrop-blur shadow-sm mb-8">
        <CategoryIcons 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8 border-b border-white/20 pb-4">
          <div>
            <h2 className="text-2xl font-normal text-white">
              Destacados En La <span className="font-bold text-blue-400">Tienda</span>
            </h2>
          </div>
          <div className="w-full md:w-auto">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 backdrop-blur rounded-lg border border-white/10">
            <p className="text-xl text-gray-300">No se encontraron productos en esta categoría.</p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="mt-4 text-blue-400 font-bold hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>

      {/* Brands Footer */}
      <BrandCarousel />
    </div>
  );
};
