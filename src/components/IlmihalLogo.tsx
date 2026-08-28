import React from 'react';

interface IlmihalLogoProps {
  className?: string;
  size?: number;
}

export const IlmihalLogo: React.FC<IlmihalLogoProps> = ({ className = 'w-10 h-10', size }) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-gradient-to-br from-[#1B4332] via-[#16302B] to-[#0F241E] border border-[#C29B38]/30 flex-shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-[82%] h-[82%] drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radiant Gold Gradients */}
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="35%" stopColor="#E5B94C" />
            <stop offset="70%" stopColor="#C29B38" />
            <stop offset="100%" stopColor="#966F1E" />
          </linearGradient>

          <linearGradient id="goldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="50%" stopColor="#F5D061" />
            <stop offset="100%" stopColor="#B38622" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#E5B94C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E5B94C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Subtle Radial Glow behind emblem */}
        <circle cx="50%" cy="42%" r="38" fill="url(#centerGlow)" />

        {/* 8-Pointed Islamic Star (Rub El Hizb) in the upper center */}
        <g transform="translate(50, 27) scale(0.95)">
          <path
            d="M -7 -7 L 0 -13 L 7 -7 L 13 0 L 7 7 L 0 13 L -7 7 L -13 0 Z"
            fill="url(#goldGrad1)"
          />
          <path
            d="M 0 -10 L 10 0 L 0 10 L -10 0 Z"
            fill="#16302B"
          />
          <circle cx="0" cy="0" r="3.5" fill="url(#goldGrad2)" />
        </g>

        {/* Crescent Moon embracing the star */}
        <path
          d="M 68 25 C 68 39.5 56 47 42 45 C 32 43.5 24 35 24 23 C 24 19 25 15.5 27 12 C 20 18 17 28 19 37 C 22 49 33 57 47 57 C 62 57 74 46 75 31 C 75.2 27.5 74.2 23.5 72.5 20 C 70 22 68.8 23.8 68 25 Z"
          fill="url(#goldGrad2)"
        />

        {/* Open Quran Book (Rihal / Pages) */}
        {/* Left Page Outer Wing */}
        <path
          d="M 48 55 C 37 50 24 51 14 55 C 13 55.4 12 56.5 12 58 L 12 75 C 23 70 36 70 47 75 C 47.7 75.3 48.3 75.3 49 75 L 48 55 Z"
          fill="url(#goldGrad1)"
        />

        {/* Right Page Outer Wing */}
        <path
          d="M 52 55 C 63 50 76 51 86 55 C 87 55.4 88 56.5 88 58 L 88 75 C 77 70 64 70 53 75 C 52.3 75.3 51.7 75.3 51 75 L 52 55 Z"
          fill="url(#goldGrad2)"
        />

        {/* Left Page Inner Details / Lines */}
        <path
          d="M 18 59 C 27 55 38 55 45 58.5 L 45 71 C 38 67.5 27 67.5 18 71 Z"
          fill="#16302B"
          opacity="0.85"
        />
        <line x1="22" y1="62" x2="41" y2="60.5" stroke="url(#goldGrad2)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="22" y1="65.5" x2="41" y2="64" stroke="url(#goldGrad2)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="25" y1="69" x2="38" y2="68" stroke="url(#goldGrad2)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Right Page Inner Details / Lines */}
        <path
          d="M 82 59 C 73 55 62 55 55 58.5 L 55 71 C 62 67.5 73 67.5 82 71 Z"
          fill="#16302B"
          opacity="0.85"
        />
        <line x1="78" y1="62" x2="59" y2="60.5" stroke="url(#goldGrad1)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="78" y1="65.5" x2="59" y2="64" stroke="url(#goldGrad1)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="75" y1="69" x2="62" y2="68" stroke="url(#goldGrad1)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Central Book Spine & Ribbon */}
        <path
          d="M 50 53 L 47.5 76 L 50 78 L 52.5 76 Z"
          fill="url(#goldGrad2)"
        />
        <path
          d="M 49 78 L 47 88 L 50 86 L 53 88 L 51 78 Z"
          fill="url(#goldGrad1)"
        />

        {/* Rehal Wooden Stand Base */}
        <path
          d="M 33 75 L 20 89 C 19 90 20 91.5 22 91.5 L 34 91.5 L 43 80 Z"
          fill="url(#goldGrad1)"
        />
        <path
          d="M 67 75 L 80 89 C 81 90 80 91.5 78 91.5 L 66 91.5 L 57 80 Z"
          fill="url(#goldGrad2)"
        />
        <path
          d="M 44 79 L 50 85 L 56 79 L 50 74 Z"
          fill="url(#goldGrad1)"
        />
      </svg>
    </div>
  );
};
