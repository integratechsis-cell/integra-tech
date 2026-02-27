import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', theme = 'dark' }) => {
  const isLight = theme === 'light';
  
  return (
    <div className={`flex flex-col items-center justify-center font-sans ${className} select-none transform scale-90`}>
      {/* Top Line */}
      <div className="flex items-center tracking-tight leading-none">
        <span 
          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#2f66a7] to-[#93a6d2]"
          style={{ fontSize: '1.8em', textShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
        >
          INTEGRA
        </span>
        <span 
          className={`font-normal text-transparent bg-clip-text ml-2 ${isLight ? 'bg-gradient-to-r from-gray-600 to-gray-400' : 'bg-gradient-to-r from-[#e5e7eb] to-[#9ca3af]'}`}
          style={{ fontSize: '1.8em' }}
        >
          TECH
        </span>
      </div>

      {/* Divider Line */}
      <div className={`w-full h-[1.5px] my-0.5 rounded-full opacity-80 ${isLight ? 'bg-gradient-to-r from-transparent via-gray-400 to-transparent' : 'bg-gradient-to-r from-transparent via-[#8a93a1] to-transparent'}`}></div>

      {/* Subtitle */}
      <div 
        className={`font-medium tracking-wide ${isLight ? 'text-gray-500' : 'text-gray-400'}`}
        style={{ fontSize: '0.75em', letterSpacing: '0.1em' }}
      >
        Sistemas & Soporte
      </div>
    </div>
  );
};
