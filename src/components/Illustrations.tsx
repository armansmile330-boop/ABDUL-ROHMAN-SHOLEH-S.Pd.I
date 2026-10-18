import React from 'react';

interface IllustrationProps {
  type: string;
  className?: string;
  size?: number;
}

export const PostSceneIllustration: React.FC<IllustrationProps> = ({ type, className = '', size = 180 }) => {
  switch (type) {
    case 'syahadat':
    case 'number-1':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="scrollBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="dome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="goldAcc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Mosque in background */}
          <path d="M60 140 L60 90 Q100 50 140 90 L140 140 Z" fill="url(#dome)" opacity="0.3" />
          <circle cx="100" cy="50" r="6" fill="url(#goldAcc)" opacity="0.8" />
          {/* Golden Gate / Gerbang Syahadat */}
          <path d="M40 170 L40 70 Q100 20 160 70 L160 170" stroke="url(#goldAcc)" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M30 175 L170 175" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
          {/* Scroll / Piagam Syahadat */}
          <rect x="55" y="80" width="90" height="75" rx="10" fill="url(#scrollBg)" stroke="#D97706" strokeWidth="4" />
          {/* Wooden Rollers */}
          <rect x="50" y="75" width="100" height="10" rx="5" fill="#78350F" />
          <rect x="50" y="150" width="100" height="10" rx="5" fill="#78350F" />
          {/* Arabic Calligraphy Lines representation */}
          <path d="M70 100 Q100 95 130 100" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          <path d="M75 115 Q100 110 125 115" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
          <path d="M80 130 Q100 125 120 130" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          {/* Sparkles */}
          <circle cx="45" cy="50" r="5" fill="#FBBF24" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="155" cy="45" r="4" fill="#FBBF24" />
          <circle cx="100" cy="20" r="5" fill="#FBBF24" />
        </svg>
      );

    case 'salat':
    case 'number-2':
    case 'prayer-mat':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="matBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="clockFace" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
          </defs>
          {/* Sajadah / Prayer Rug */}
          <path d="M50 170 L70 90 L130 90 L150 170 Z" fill="url(#matBg)" stroke="#0369A1" strokeWidth="4" />
          {/* Rug Arch & Tassels */}
          <path d="M80 125 Q100 100 120 125" stroke="#BAE6FD" strokeWidth="4" fill="none" />
          <path d="M45 174 L155 174" stroke="#FDE047" strokeWidth="5" strokeDasharray="6 4" strokeLinecap="round" />
          {/* Clock representing 5 Times */}
          <circle cx="140" cy="65" r="38" fill="url(#clockFace)" stroke="#F59E0B" strokeWidth="6" />
          <circle cx="140" cy="65" r="4" fill="#1E293B" />
          {/* Clock hands */}
          <path d="M140 65 L140 42" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <path d="M140 65 L158 65" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
          {/* 5 stars representing 5 prayers */}
          <circle cx="140" cy="35" r="2.5" fill="#F59E0B" />
          <circle cx="168" cy="65" r="2.5" fill="#F59E0B" />
          <circle cx="140" cy="95" r="2.5" fill="#F59E0B" />
          <circle cx="112" cy="65" r="2.5" fill="#F59E0B" />
          {/* Mosque Silhouette small */}
          <path d="M25 155 Q35 125 45 155 Z" fill="#60A5FA" opacity="0.6" />
          {/* Gentle sun rays */}
          <circle cx="50" cy="45" r="14" fill="#FDE047" />
        </svg>
      );

    case 'zakat':
    case 'number-3':
    case 'rice-charity':
    case 'heart-charity':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="bag" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="heart" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          {/* Rice Sack / Karung Beras Zakat */}
          <path d="M60 170 Q45 130 55 100 Q70 85 100 85 Q130 85 145 100 Q155 130 140 170 Z" fill="url(#bag)" stroke="#D97706" strokeWidth="5" />
          {/* Sack Tie String */}
          <ellipse cx="100" cy="95" rx="36" ry="6" fill="#B45309" />
          <path d="M100 95 L95 110 M100 95 L105 112" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
          {/* Rice grains peek */}
          <ellipse cx="85" cy="88" rx="4" ry="7" fill="white" stroke="#E2E8F0" />
          <ellipse cx="100" cy="85" rx="4" ry="7" fill="white" stroke="#E2E8F0" />
          <ellipse cx="115" cy="88" rx="4" ry="7" fill="white" stroke="#E2E8F0" />
          {/* Rice Label Text Symbol */}
          <rect x="75" y="125" width="50" height="30" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <text x="100" y="145" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="bold">BERAS</text>
          {/* Loving Caring Heart / Helping hand above */}
          <path d="M145 45 C145 35, 130 30, 120 42 C110 30, 95 35, 95 45 C95 62, 120 72, 120 78 C120 72, 145 62, 145 45 Z" fill="url(#heart)" />
          {/* Gold coins popping */}
          <circle cx="50" cy="80" r="12" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
          <text x="50" y="85" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">Rp</text>
        </svg>
      );

    case 'ramadan':
    case 'number-4':
    case 'ramadan-crescent':
    case 'ramadan-iftar':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="moon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="fanous" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
          </defs>
          {/* Night Sky Halo */}
          <circle cx="100" cy="100" r="80" fill="#312E81" opacity="0.15" />
          {/* Big Golden Crescent Moon */}
          <path d="M70 40 C115 40, 150 75, 150 120 C150 150, 130 170, 105 178 C135 160, 145 110, 110 75 C90 55, 75 50, 70 40 Z" fill="url(#moon)" />
          {/* Ramadan Lantern (Fanous) */}
          <g transform="translate(45, 60)">
            <line x1="30" y1="0" x2="30" y2="25" stroke="#F59E0B" strokeWidth="3" />
            <polygon points="20,25 40,25 35,35 25,35" fill="#D97706" />
            <path d="M22 35 L15 65 L45 65 L38 35 Z" fill="url(#fanous)" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="30" cy="50" r="7" fill="#FDE047" className="animate-pulse" />
            <polygon points="17,65 43,65 37,75 23,75" fill="#D97706" />
          </g>
          {/* Date Fruit / Kurma on plate */}
          <ellipse cx="140" cy="155" rx="30" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          <ellipse cx="132" cy="150" rx="8" ry="5" fill="#78350F" />
          <ellipse cx="145" cy="150" rx="8" ry="5" fill="#92400E" />
          <ellipse cx="140" cy="144" rx="7" ry="4" fill="#78350F" />
          {/* Twinkling Stars */}
          <circle cx="150" cy="50" r="4" fill="#FDE047" />
          <circle cx="40" cy="40" r="3" fill="#FDE047" />
          <circle cx="95" cy="25" r="3" fill="#FDE047" />
        </svg>
      );

    case 'haji':
    case 'number-5':
    case 'kabah':
    case 'kabah-flag':
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="goldKiswah" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="marble" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {/* Marble Floor of Mataf */}
          <ellipse cx="100" cy="165" rx="80" ry="24" fill="url(#marble)" stroke="#CBD5E1" strokeWidth="3" />
          {/* People doing Tawaf (gentle dots) */}
          <circle cx="40" cy="160" r="3" fill="#10B981" />
          <circle cx="65" cy="175" r="3" fill="#0EA5E9" />
          <circle cx="135" cy="175" r="3" fill="#10B981" />
          <circle cx="160" cy="160" r="3" fill="#0EA5E9" />
          {/* The Holy Ka'bah Cube */}
          {/* Front/Right face */}
          <path d="M100 65 L155 85 L155 145 L100 125 Z" fill="#1E293B" />
          {/* Left face */}
          <path d="M45 85 L100 65 L100 125 L45 145 Z" fill="#0F172A" />
          {/* Top roof */}
          <path d="M100 45 L155 65 L100 85 L45 65 Z" fill="#334155" />
          {/* Golden Kiswah Band (Tirai Emas) */}
          <path d="M45 92 L100 73 L155 92 L155 100 L100 81 L45 100 Z" fill="url(#goldKiswah)" />
          {/* Golden Door (Bab al-Ka'bah) */}
          <rect x="115" y="98" width="16" height="28" fill="url(#goldKiswah)" rx="2" transform="skewY(10)" />
          {/* Hajar Aswad corner glow */}
          <circle cx="100" cy="125" r="4" fill="#CBD5E1" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Minarets in background */}
          <path d="M25 140 L25 50 L32 40 L32 140 Z" fill="#94A3B8" opacity="0.4" />
          <path d="M175 140 L175 50 L168 40 L168 140 Z" fill="#94A3B8" opacity="0.4" />
        </svg>
      );

    case 'masjid':
    default:
      return (
        <svg viewBox="0 0 200 200" width={size} height={size} className={className} fill="none">
          <defs>
            <linearGradient id="masjidDome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="masjidWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {/* Mosque Main Body */}
          <rect x="50" y="100" width="100" height="75" rx="6" fill="url(#masjidWall)" stroke="#CBD5E1" strokeWidth="4" />
          {/* Arched Doors */}
          <path d="M85 175 L85 130 Q100 115 115 130 L115 175 Z" fill="#047857" />
          <path d="M60 175 L60 145 Q70 135 80 145 L80 175 Z" fill="#0D9488" opacity="0.6" />
          <path d="M120 175 L120 145 Q130 135 140 145 L140 175 Z" fill="#0D9488" opacity="0.6" />
          {/* Golden Big Dome */}
          <path d="M55 100 Q100 30 145 100 Z" fill="url(#masjidDome)" stroke="#F59E0B" strokeWidth="4" />
          <circle cx="100" cy="25" r="7" fill="#F59E0B" />
          {/* Minarets */}
          <rect x="28" y="70" width="16" height="105" rx="4" fill="url(#masjidWall)" stroke="#CBD5E1" strokeWidth="3" />
          <path d="M26 70 Q36 45 46 70 Z" fill="#10B981" />
          <rect x="156" y="70" width="16" height="105" rx="4" fill="url(#masjidWall)" stroke="#CBD5E1" strokeWidth="3" />
          <path d="M154 70 Q164 45 174 70 Z" fill="#10B981" />
        </svg>
      );
  }
};
