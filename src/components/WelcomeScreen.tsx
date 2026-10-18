import React, { useState } from 'react';
import { Play, HelpCircle, Sparkles, Volume2, Check, Lightbulb } from 'lucide-react';
import { CharacterAvatar } from './Characters';
import { PostSceneIllustration } from './Illustrations';
import { playPopSound, playSuccessSound, speakIndonesian } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: (name: string, avatar: 'raka' | 'rara') => void;
  defaultName?: string;
  defaultAvatar?: 'raka' | 'rara';
  onOpenPblModule?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  defaultName = '',
  defaultAvatar = 'raka',
  onOpenPblModule,
}) => {
  const [name, setName] = useState(defaultName);
  const [avatar, setAvatar] = useState<'raka' | 'rara'>(defaultAvatar);
  const [showInstructions, setShowInstructions] = useState(false);
  const [nameError, setNameError] = useState(false);

  const welcomeNarration =
    "Assalamu'alaikum, Sahabat Muslim! Selamat datang di Petualangan 5 Pilar Islam! Ayo kita mengenal lima rukun Islam melalui permainan seru!";

  const handleSpeakWelcome = () => {
    playPopSound();
    speakIndonesian(welcomeNarration);
  };

  const handleStartAdventure = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      playPopSound();
      setNameError(true);
      speakIndonesian('Siapa namamu, Sahabat? Tuliskan namamu di kolom nama ya!');
      return;
    }

    playSuccessSound();
    speakIndonesian(`Assalamu'alaikum ${trimmed}! Ayo kita mulai petualangan seru mengenal Rukun Islam!`);
    onStart(trimmed, avatar);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col justify-center items-center py-6 px-4">
      {/* Container Card */}
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-3xl border-4 border-emerald-300 shadow-2xl p-6 sm:p-8 relative overflow-hidden anim-screen-enter">
        {/* Decorative background Islamic arch glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-emerald-100 to-transparent rounded-full opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold border border-emerald-300">
            PAI Kelas 1 SD • Bab 4
          </span>
          {onOpenPblModule && (
            <button
              onClick={() => {
                playPopSound();
                onOpenPblModule();
              }}
              className="px-3.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs sm:text-sm font-extrabold border-2 border-amber-400 flex items-center gap-1.5 shadow-sm transition-all active:scale-95 btn-tactile"
              title="Buka Pedoman Model Problem-Based Learning"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
              <span>Model Inovasi PBL</span>
            </button>
          )}
          <span className="px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-xs sm:text-sm font-extrabold border border-sky-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Misi Seru Anak Saleh
          </span>
        </div>

        {/* Hero Mosque & Characters Gateway */}
        <div className="relative my-2 flex flex-col items-center">
          {/* Mosque in the background center */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 opacity-70 mb-[-30px]">
            <PostSceneIllustration type="masjid" size={130} />
          </div>

          {/* Raka and Rara standing happily */}
          <div className="flex items-end justify-center -space-x-4 z-10">
            <CharacterAvatar type="raka" size="lg" action="wave" />
            <CharacterAvatar type="rara" size="lg" action="wave" />
          </div>
        </div>

        {/* Main Title and Greetings */}
        <div className="text-center mt-3 mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 font-heading tracking-tight">
            PETUALANGAN 5 PILAR ISLAM
          </h2>
          <p className="text-base sm:text-xl font-extrabold text-teal-700 mt-1 font-heading">
            Misi Seru Mengenal Rukun Islam Sejak Dini
          </p>

          {/* Speech Dialogue Box for welcoming text */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 inline-block max-w-xl text-center shadow-sm">
            <p className="text-sm sm:text-base font-bold text-emerald-950 font-body">
              &ldquo;Assalamu’alaikum, Sahabat Muslim! Selamat datang di Petualangan 5 Pilar Islam! Ayo kita mengenal lima rukun Islam melalui permainan seru!&rdquo;
            </p>
            <button
              onClick={handleSpeakWelcome}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Sambutan</span>
            </button>
          </div>
        </div>

        {/* Form Inputs: Name & Avatar */}
        <div className="max-w-md mx-auto space-y-4">
          {/* Avatar selector */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                playPopSound();
                setAvatar('raka');
              }}
              className={`p-2.5 rounded-2xl border-3 flex items-center gap-2 transition-all btn-tactile ${
                avatar === 'raka'
                  ? 'bg-emerald-100 border-emerald-500 scale-105 ring-4 ring-emerald-200'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <span className="text-2xl">👦</span>
              <span className="font-extrabold text-sm text-slate-800">Karakter Raka</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPopSound();
                setAvatar('rara');
              }}
              className={`p-2.5 rounded-2xl border-3 flex items-center gap-2 transition-all btn-tactile ${
                avatar === 'rara'
                  ? 'bg-pink-100 border-pink-500 scale-105 ring-4 ring-pink-200'
                  : 'bg-slate-50 border-slate-200 opacity-70'
              }`}
            >
              <span className="text-2xl">👧</span>
              <span className="font-extrabold text-sm text-slate-800">Karakter Rara</span>
            </button>
          </div>

          {/* Student Name Input */}
          <div>
            <label className="block text-center font-extrabold text-slate-700 text-sm mb-1.5">
              Siapakah Namamu, Sahabat Hebat?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
              }}
              placeholder="Ketik namamu di sini (contoh: Ahmad / Aisyah)"
              maxLength={25}
              className={`w-full px-5 py-3.5 rounded-2xl border-3 text-center text-lg sm:text-xl font-extrabold text-slate-800 focus:outline-none transition-all shadow-inner bg-slate-50 ${
                nameError
                  ? 'border-rose-400 bg-rose-50 ring-4 ring-rose-200 placeholder:text-rose-400'
                  : 'border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200'
              }`}
            />
            {nameError && (
              <p className="text-rose-600 text-xs font-bold text-center mt-1">
                Tuliskan namamu terlebih dahulu ya!
              </p>
            )}
          </div>

          {/* Big Launch Button */}
          <button
            onClick={handleStartAdventure}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-xl sm:text-2xl shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all btn-tactile flex items-center justify-center gap-3 active:scale-95"
          >
            <Play className="w-7 h-7 fill-white" />
            <span>MULAI PETUALANGAN</span>
          </button>

          {/* Secondary Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                playPopSound();
                setShowInstructions(true);
              }}
              className="text-emerald-700 hover:text-emerald-900 font-extrabold text-sm inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Petunjuk Bermain</span>
            </button>

            {onOpenPblModule && (
              <button
                onClick={() => {
                  playPopSound();
                  onOpenPblModule();
                }}
                className="text-amber-800 hover:text-amber-950 font-extrabold text-sm inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2"
              >
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Panduan Model Inovasi PBL</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl border-4 border-emerald-400 max-w-lg w-full p-6 shadow-2xl relative anim-screen-zoom">
            <div className="text-center mb-4">
              <span className="text-3xl">🧭</span>
              <h3 className="text-2xl font-black text-emerald-950 font-heading mt-1">
                Petunjuk Petualangan Belajar
              </h3>
            </div>

            <div className="space-y-3 text-slate-700 text-sm font-medium">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </span>
                <p>
                  <strong>Ikuti Asesmen Awal:</strong> Menjawab 5 pertanyaan seru sebelum menjelajah.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-sky-50 border border-sky-200">
                <span className="w-6 h-6 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </span>
                <p>
                  <strong>Jelajahi 5 Pos:</strong> Kunjungi Pos Syahadat, Salat, Zakat, Puasa Ramadan, dan Haji.
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </span>
                <p>
                  <strong>Pecahkan Kasus Nyata (PBL):</strong> Bantu sahabat memecahkan masalah sehari-hari dengan petunjuk islami dan mainkan mini-game di tiap pos!
                </p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  4
                </span>
                <p>
                  <strong>Dapatkan Piagam Juara:</strong> Tuntaskan Asesmen Akhir & Refleksi untuk mencetak Sertifikat Bintang Muslim Cilik!
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  playPopSound();
                  setShowInstructions(false);
                }}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base btn-tactile inline-flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                <span>Saya Mengerti!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
