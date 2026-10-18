import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Key, Award, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { TREASURE_CHEST_ITEMS } from '../../data/curriculumData';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const TreasureChestGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [chestIdx, setChestIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentChest = TREASURE_CHEST_ITEMS[chestIdx];

  const handleOpenChest = (answer: string) => {
    if (selectedAnswer !== null && isOpen) return;
    playPopSound();
    setSelectedAnswer(answer);

    if (answer === currentChest.correctAnswer) {
      setIsOpen(true);
      playSuccessSound();
      playFanfareSound();
      confetti({ particleCount: 70, spread: 60 });
      setFeedback({
        isCorrect: true,
        message: currentChest.rewardText,
      });
      speakIndonesian(currentChest.rewardText);
      setScore((prev) => prev + 20);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: 'Belum pas kuncinya, Sahabat! Ayo cari jawaban kunci yang tepat.',
      });
      speakIndonesian('Belum tepat kuncinya, ayo coba sekali lagi.');
    }
  };

  const handleNextChest = () => {
    playPopSound();
    if (chestIdx + 1 < TREASURE_CHEST_ITEMS.length) {
      setChestIdx((prev) => prev + 1);
      setIsOpen(false);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setChestIdx(0);
    setIsOpen(false);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-amber-400 shadow-xl anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-bold border border-amber-300">
          Game 6: Petualangan Buka Peti Ilmu
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Peti Rahasia Kebaikan #{chestIdx + 1}
        </h2>
        <div className="mt-1 text-sm font-bold text-amber-800">
          Peti {chestIdx + 1} dari {TREASURE_CHEST_ITEMS.length} ({currentChest.pillarName})
        </div>
      </div>

      {!isFinished ? (
        <div key={chestIdx} className="space-y-6 anim-screen-slide-right">
          {/* Animated Treasure Chest Graphic */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50 to-yellow-100 border-3 border-amber-300 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="w-40 h-36 flex items-center justify-center relative">
              <svg viewBox="0 0 160 140" className="w-full h-full filter drop-shadow-md" fill="none">
                <defs>
                  <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                  </linearGradient>
                  <linearGradient id="chestGold" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="50%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>

                {/* Chest Base */}
                <rect x="25" y="65" width="110" height="60" rx="8" fill="url(#chestWood)" stroke="#451A03" strokeWidth="4" />
                <rect x="23" y="65" width="16" height="60" fill="url(#chestGold)" />
                <rect x="121" y="65" width="16" height="60" fill="url(#chestGold)" />

                {/* Chest Lid - Closed or Open */}
                {isOpen ? (
                  <g className="origin-top animate-bounce" style={{ transformOrigin: '80px 45px' }}>
                    {/* Open Lid angled back */}
                    <path d="M20 25 Q80 5 140 25 L145 45 Q80 25 15 45 Z" fill="url(#chestWood)" stroke="#451A03" strokeWidth="4" />
                    {/* Glowing golden light coming out */}
                    <ellipse cx="80" cy="55" rx="45" ry="18" fill="#FEF08A" opacity="0.9" />
                    <circle cx="80" cy="50" r="14" fill="#FBBF24" className="animate-ping" />
                  </g>
                ) : (
                  <g>
                    {/* Closed Lid */}
                    <path d="M22 65 Q80 25 138 65 Z" fill="url(#chestWood)" stroke="#451A03" strokeWidth="4" />
                    <path d="M20 62 Q80 28 140 62" stroke="url(#chestGold)" strokeWidth="6" fill="none" />
                    {/* Big Keyhole Plate */}
                    <circle cx="80" cy="75" r="14" fill="url(#chestGold)" stroke="#92400E" strokeWidth="2" />
                    <circle cx="80" cy="72" r="4" fill="#451A03" />
                    <polygon points="78,72 82,72 84,81 76,81" fill="#451A03" />
                  </g>
                )}
              </svg>

              {isOpen && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Sparkles className="w-12 h-12 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              )}
            </div>

            <p className="mt-2 text-slate-800 font-extrabold text-lg sm:text-xl font-heading">
              {currentChest.question}
            </p>
            <button
              onClick={() => {
                playPopSound();
                speakIndonesian(currentChest.question);
              }}
              className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-xs font-bold shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Pertanyaan Peti</span>
            </button>
          </div>

          {/* Key Option Choices */}
          <div className="space-y-3">
            <span className="block text-center text-xs font-bold uppercase tracking-wider text-slate-500">
              Pilih Kunci Jawaban:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentChest.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = isOpen && opt === currentChest.correctAnswer;
                return (
                  <button
                    key={opt}
                    onClick={() => handleOpenChest(opt)}
                    className={`p-4 rounded-2xl border-3 text-center font-extrabold text-base transition-all btn-tactile flex items-center justify-center gap-2 ${
                      isCorrect
                        ? 'bg-amber-300 border-amber-600 text-amber-950 scale-102 ring-4 ring-amber-200'
                        : isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-800'
                    }`}
                  >
                    <Key className={`w-5 h-5 ${isCorrect ? 'text-amber-800 rotate-45' : 'text-amber-600'}`} />
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reward and Feedback Message */}
          {feedback && (
            <div
              className={`p-5 rounded-2xl border-2 text-center font-bold text-base sm:text-lg animate-pulse-subtle ${
                feedback.isCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-md'
                  : 'bg-amber-100 border-amber-400 text-amber-900'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm btn-tactile"
            >
              Kembali
            </button>
            {isOpen && (
              <button
                onClick={handleNextChest}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md animate-bounce"
              >
                <span>Buka Peti Berikutnya</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 border-3 border-amber-500 text-center shadow-lg">
          <Award className="w-16 h-16 mx-auto text-amber-800 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            Semua Peti Ilmu Berhasil Terbuka!
          </h3>
          <p className="text-amber-950 font-bold mt-1">
            Cahaya ilmu dan kemuliaan rukun Islam kini ada di dalam dadamu (+{score} Bintang)!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-amber-600 text-amber-900 font-bold inline-flex items-center gap-2 btn-tactile"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Buka Peti Lagi</span>
            </button>
            <button
              onClick={() => onComplete(score)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg inline-flex items-center gap-2 btn-tactile shadow-md"
            >
              <span>Lanjutkan Petualangan</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
