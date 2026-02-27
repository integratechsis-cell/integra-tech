import React from 'react';
import { clsx } from 'clsx';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelectCategory('all')}
        className={clsx(
          'px-4 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === 'all'
            ? 'bg-brand-DEFAULT text-white shadow-md'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
        )}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize',
            selectedCategory === category
              ? 'bg-brand-DEFAULT text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
