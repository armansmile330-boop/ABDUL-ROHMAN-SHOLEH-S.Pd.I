import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { isSoundEnabled, setSoundEnabled, playPopSound } from '../utils/audio';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const handleToggle = () => {
    playPopSound();
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm transition-all btn-tactile shadow-sm ${
        enabled
          ? 'bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-400 text-emerald-900'
          : 'bg-rose-100 hover:bg-rose-200 border-2 border-rose-400 text-rose-900'
      } ${className}`}
      title={enabled ? 'Matikan Suara Narasi' : 'Aktifkan Suara Narasi'}
    >
      {enabled ? (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700 animate-pulse" />
          <span className="hidden xs:inline">Suara: Aktif</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-rose-700" />
          <span className="hidden xs:inline">Suara: Mati</span>
        </>
      )}
    </button>
  );
};
