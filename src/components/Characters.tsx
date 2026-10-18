import React from 'react';
import { Volume2 } from 'lucide-react';
import { speakIndonesian, playPopSound } from '../utils/audio';

interface CharacterProps {
  type: 'raka' | 'rara' | 'both';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  action?: 'idle' | 'wave' | 'celebrate';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterProps> = ({
  type = 'raka',
  size = 'md',
  action = 'idle',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const getAnimationClass = () => {
    if (action === 'wave') return 'animate-bounce';
    if (action === 'celebrate') return 'animate-pulse';
    return 'animate-float';
  };

  if (type === 'both') {
    return (
      <div className={`flex items-end justify-center -space-x-4 ${className}`}>
        <div className={`${sizeMap[size]} ${getAnimationClass()}`}>
          <RakaSVG />
        </div>
        <div className={`${sizeMap[size]} ${getAnimationClass()}`} style={{ animationDelay: '0.4s' }}>
          <RaraSVG />
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeMap[size]} ${getAnimationClass()} ${className}`}>
      {type === 'raka' ? <RakaSVG /> : <RaraSVG />}
    </div>
  );
};

export const RakaSVG = () => (
  <svg viewBox="0 0 160 180" className="w-full h-full filter drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDDFB7" />
        <stop offset="100%" stopColor="#F6C38A" />
      </linearGradient>
      <linearGradient id="peci" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="50%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="koko" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Body / Koko */}
    <path d="M40 120 C40 100, 120 100, 120 120 L135 180 L25 180 Z" fill="url(#koko)" filter="url(#softShadow)" />
    {/* Koko Collar */}
    <path d="M68 115 L80 135 L92 115 Z" fill="#E2E8F0" />
    <path d="M78 135 L82 135 L82 175 L78 175 Z" fill="#E2E8F0" opacity="0.6" />
    {/* Buttons */}
    <circle cx="80" cy="145" r="2.5" fill="#FCD34D" />
    <circle cx="80" cy="158" r="2.5" fill="#FCD34D" />
    <circle cx="80" cy="170" r="2.5" fill="#FCD34D" />

    {/* Neck */}
    <rect x="70" y="98" width="20" height="18" rx="4" fill="url(#skin)" />

    {/* Ears */}
    <circle cx="44" cy="78" r="9" fill="url(#skin)" />
    <circle cx="116" cy="78" r="9" fill="url(#skin)" />
    <circle cx="45" cy="78" r="4" fill="#F4B87C" />
    <circle cx="115" cy="78" r="4" fill="#F4B87C" />

    {/* Face Head */}
    <ellipse cx="80" cy="76" rx="36" ry="38" fill="url(#skin)" filter="url(#softShadow)" />

    {/* Hair peek */}
    <path d="M48 65 Q80 50 112 65 Q80 60 48 65 Z" fill="#292524" />

    {/* Peci / Songkok with Gold Accent */}
    <path d="M44 58 C44 32, 116 32, 116 58 C116 63, 44 63, 44 58 Z" fill="url(#peci)" />
    <path d="M44 55 Q80 58 116 55" stroke="url(#gold)" strokeWidth="3" fill="none" />

    {/* Cheeks Blush */}
    <ellipse cx="58" cy="86" rx="6" ry="3.5" fill="#F87171" opacity="0.45" />
    <ellipse cx="102" cy="86" rx="6" ry="3.5" fill="#F87171" opacity="0.45" />

    {/* Eyebrows */}
    <path d="M57 68 Q66 64 72 68" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M103 68 Q94 64 88 68" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />

    {/* Eyes - Big Friendly Sparkling Anime/3D style */}
    <ellipse cx="64" cy="77" rx="6.5" ry="7.5" fill="#1C1917" />
    <ellipse cx="96" cy="77" rx="6.5" ry="7.5" fill="#1C1917" />
    <circle cx="62.5" cy="74.5" r="2.8" fill="white" />
    <circle cx="66" cy="78.5" r="1.2" fill="white" />
    <circle cx="94.5" cy="74.5" r="2.8" fill="white" />
    <circle cx="98" cy="78.5" r="1.2" fill="white" />

    {/* Nose */}
    <path d="M80 80 Q81 84 79 84" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />

    {/* Smile */}
    <path d="M70 89 Q80 100 90 89" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" fill="#DC2626" />
    <path d="M74 91 Q80 94 86 91" fill="white" />

    {/* Waving Right Hand */}
    <g className="origin-bottom-left animate-pulse">
      <circle cx="128" cy="115" r="11" fill="url(#skin)" />
      <path d="M125 107 Q130 96 136 102 Q140 108 134 116 Z" fill="url(#skin)" />
    </g>
  </svg>
);

export const RaraSVG = () => (
  <svg viewBox="0 0 160 180" className="w-full h-full filter drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="raraSkin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FEE2E2" />
        <stop offset="100%" stopColor="#FED7AA" />
      </linearGradient>
      <linearGradient id="hijab" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="50%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#0E7490" />
      </linearGradient>
      <linearGradient id="hijabBand" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#FB7185" />
      </linearGradient>
      <linearGradient id="gamis" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>

    {/* Gamis dress */}
    <path d="M38 125 C38 105, 122 105, 122 125 L138 180 L22 180 Z" fill="url(#gamis)" />
    <path d="M72 135 L88 135 L85 180 L75 180 Z" fill="#FCE7F3" opacity="0.6" />

    {/* Back Hijab Shadow */}
    <path d="M35 70 C35 25, 125 25, 125 70 C125 120, 115 135, 80 135 C45 135, 35 120, 35 70 Z" fill="#0E7490" />

    {/* Main Hijab Body */}
    <path d="M38 65 C38 28, 122 28, 122 65 C122 110, 110 130, 80 130 C50 130, 38 110, 38 65 Z" fill="url(#hijab)" />

    {/* Hijab Inner Bonnet / Band */}
    <path d="M50 55 C65 42, 95 42, 110 55 C110 57, 50 57, 50 55 Z" fill="url(#hijabBand)" />
    {/* Cute Flower on Hijab */}
    <circle cx="106" cy="50" r="5" fill="#FDE047" />
    <circle cx="106" cy="50" r="2.5" fill="#F97316" />

    {/* Face Opening */}
    <ellipse cx="80" cy="80" rx="31" ry="34" fill="url(#raraSkin)" />

    {/* Cheeks Blush */}
    <ellipse cx="58" cy="88" rx="6" ry="3.5" fill="#FB7185" opacity="0.5" />
    <ellipse cx="102" cy="88" rx="6" ry="3.5" fill="#FB7185" opacity="0.5" />

    {/* Eyebrows */}
    <path d="M57 71 Q65 67 71 71" stroke="#500724" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M103 71 Q95 67 89 71" stroke="#500724" strokeWidth="2.2" strokeLinecap="round" />

    {/* Big Sparkly Eyes */}
    <ellipse cx="64" cy="79" rx="6.5" ry="7.5" fill="#1C1917" />
    <ellipse cx="96" cy="79" rx="6.5" ry="7.5" fill="#1C1917" />
    <circle cx="62" cy="76" r="3" fill="white" />
    <circle cx="66" cy="81" r="1.3" fill="white" />
    <circle cx="94" cy="76" r="3" fill="white" />
    <circle cx="98" cy="81" r="1.3" fill="white" />
    {/* Eyelashes */}
    <path d="M57 74 L54 71" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M103 74 L106 71" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" />

    {/* Nose */}
    <path d="M80 83 Q81 86 79 86" stroke="#FB923C" strokeWidth="1.8" strokeLinecap="round" />

    {/* Cheerful Smile */}
    <path d="M71 91 Q80 102 89 91" stroke="#BE123C" strokeWidth="2.8" strokeLinecap="round" fill="#F43F5E" />
    <path d="M75 93 Q80 96 85 93" fill="white" />

    {/* Hijab front drapery folds */}
    <path d="M60 114 Q80 128 100 114 Q80 132 60 114 Z" fill="#0891B2" opacity="0.7" />

    {/* Waving Hand */}
    <g className="origin-bottom-right animate-pulse">
      <circle cx="32" cy="120" r="10" fill="url(#raraSkin)" />
      <path d="M35 112 Q30 102 24 108 Q20 114 26 122 Z" fill="url(#raraSkin)" />
    </g>
  </svg>
);

interface CharacterDialogueProps {
  speaker?: 'Raka' | 'Rara' | 'Raka & Rara';
  characterType?: 'raka' | 'rara' | 'both';
  text: string;
  subtext?: string;
  autoSpeak?: boolean;
  className?: string;
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  speaker = 'Raka & Rara',
  characterType = 'both',
  text,
  subtext,
  className = '',
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeak = () => {
    playPopSound();
    setIsSpeaking(true);
    speakIndonesian(text, () => setIsSpeaking(false));
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-5 bg-white/95 backdrop-blur-sm border-3 border-emerald-300 rounded-3xl p-4 sm:p-5 shadow-lg ${className}`}>
      <div className="shrink-0 flex flex-col items-center">
        <CharacterAvatar type={characterType} size="md" action={isSpeaking ? 'celebrate' : 'idle'} />
        <span className="mt-1 text-xs font-bold uppercase tracking-wide px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          {speaker}
        </span>
      </div>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed font-body">
          {text}
        </p>
        {subtext && (
          <p className="text-sm text-slate-600 mt-1 font-medium">{subtext}</p>
        )}

        <button
          onClick={handleSpeak}
          className={`mt-2.5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold text-white transition-all transform active:scale-95 shadow-md ${
            isSpeaking ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
          title="Dengarkan Suara"
        >
          <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
          <span>{isSpeaking ? 'Sedang Membaca...' : 'Dengarkan Suara'}</span>
        </button>
      </div>
    </div>
  );
};
