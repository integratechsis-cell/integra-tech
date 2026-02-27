import React from 'react';
import { 
  Monitor, Laptop, Cpu, Box, Armchair, Fan, 
  CircuitBoard, MemoryStick, HardDrive, Headphones, 
  Keyboard, Mouse, Zap, Camera, Gamepad
} from 'lucide-react';

interface CategoryIconsProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const categories = [
  { id: 'pc', label: 'PC', icon: Monitor },
  { id: 'portatiles', label: 'PORTÁTILES', icon: Laptop },
  { id: 'gpu', label: 'GPU', icon: Cpu },
  { id: 'monitores', label: 'MONITORES', icon: Monitor },
  { id: 'chasis', label: 'CHASIS', icon: Box },
  { id: 'sillas', label: 'SILLAS', icon: Armchair },
  { id: 'cooling', label: 'COOLING', icon: Fan },
  { id: 'cpu', label: 'CPU', icon: Cpu },
  { id: 'simracing', label: 'SIMRACING', icon: Gamepad },
  { id: 'board', label: 'BOARD', icon: CircuitBoard },
  { id: 'ram', label: 'RAM', icon: MemoryStick },
  { id: 'hdd', label: 'HDD', icon: HardDrive },
  { id: 'audio', label: 'AUDIO', icon: Headphones },
  { id: 'teclado', label: 'TECLADO', icon: Keyboard },
  { id: 'mouse', label: 'MOUSE', icon: Mouse },
  { id: 'fuente', label: 'FUENTE', icon: Zap },
  { id: 'streaming', label: 'STREAMING', icon: Camera },
];

export const CategoryIcons: React.FC<CategoryIconsProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="w-full bg-white/90 backdrop-blur py-4 mb-0 overflow-x-auto border-b border-gray-200 scrollbar-hide">
      <div className="container mx-auto px-4 flex space-x-8 min-w-max justify-start md:justify-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center group transition-colors duration-200 ${
                isSelected ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <div className={`p-3 rounded-full mb-2 transition-all duration-200 ${
                isSelected ? 'bg-blue-100 scale-110' : 'bg-gray-100 group-hover:bg-blue-50 group-hover:scale-110'
              }`}>
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-center">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
