import React from 'react';

const brands = [
  { name: 'ASUS', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
  { name: 'INTEL', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
  { name: 'SAMSUNG', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'LENOVO', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
  { name: 'HP', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
  { name: 'DELL', url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
  { name: 'LOGITECH', url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg' },
  { name: 'HYPERX', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/HyperX_logo.svg' },
];

export const BrandCarousel: React.FC = () => {
  return (
    <div className="bg-white py-8 border-t border-gray-100 mt-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest text-center mb-6">Marcas Destacadas</h3>
        <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="h-8 flex items-center justify-center">
              {/* Fallback to text if image fails or for simplicity */}
              <span className="text-xl font-black text-gray-400 hover:text-brand-dark transition-colors cursor-pointer">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
