import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Star, RefreshCw, CheckCircle, Award, ArrowRight } from 'lucide-react';
import { MATCHING_GAME_DATA } from '../../data/curriculumData';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';
import { CharacterDialogue } from '../Characters';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const MatchPillarsGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  // Shuffle the right side pairs once
  const [shuffledPairs] = useState(() => {
    return [...MATCHING_GAME_DATA].sort(() => Math.random() - 0.5);
  });

  const handleSelectPillar = (id: string) => {
    playPopSound();
    if (matchedIds.includes(id)) return;
    setSelectedPillar(id);
    checkMatch(id, selectedPair);
  };

  const handleSelectPair = (id: string) => {
    playPopSound();
    if (matchedIds.includes(id)) return;
    setSelectedPair(id);
    checkMatch(selectedPillar, id);
  };

  const checkMatch = (pillarId: string | null, pairId: string | null) => {
    if (!pillarId || !pairId) return;

    if (pillarId === pairId) {
      // Correct Match!
      playSuccessSound();
      const newMatched = [...matchedIds, pillarId];
      setMatchedIds(newMatched);
      setFeedback({
        message: 'Masyaallah, hebat! Pasangan rukun Islam ini tepat sekali!',
        isCorrect: true,
      });
      speakIndonesian('Masyaallah, hebat! Kamu berhasil mencocokkannya.');
      setSelectedPillar(null);
      setSelectedPair(null);

      if (newMatched.length === MATCHING_GAME_DATA.length) {
        // Complete!
        playFanfareSound();
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
    } else {
      // Wrong Match
      playTryAgainSound();
      setMistakes((prev) => prev + 1);
      setFeedback({
        message: 'Belum tepat, Sahabat! Ayo perhatikan artinya dan coba sekali lagi.',
        isCorrect: false,
      });
      speakIndonesian('Belum tepat, Sahabat! Ayo coba sekali lagi.');
      setTimeout(() => {
        setSelectedPillar(null);
        setSelectedPair(null);
      }, 1000);
    }
  };

  const isAllMatched = matchedIds.length === MATCHING_GAME_DATA.length;
  const score = Math.max(60, 100 - mistakes * 8);

  const handleReset = () => {
    playPopSound();
    setMatchedIds([]);
    setSelectedPillar(null);
    setSelectedPair(null);
    setFeedback(null);
    setMistakes(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-teal-300 shadow-xl anim-screen-enter">
      {/* Header */}
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-300">
          Game 1: Cari Pasangan Rukun Islam
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Pasangkan Nama Rukun Islam & Artinya!
        </h2>
        <p className="text-slate-600 font-medium text-sm sm:text-base mt-1">
          Ketuk 1 kartu di kiri, lalu ketuk 1 kartu pasangannya di kanan.
        </p>
      </div>

      <CharacterDialogue
        speaker="Raka"
        characterType="raka"
        text="Ayo bantu Raka mencocokkan kelima Rukun Islam dengan keterangannya yang tepat!"
        className="mb-6"
      />

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: Pillar Names */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-700 text-center pb-1 border-b-2 border-emerald-200">
            Nama Rukun Islam
          </h3>
          {MATCHING_GAME_DATA.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedPillar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPillar(item.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border-3 text-left font-bold text-lg sm:text-xl transition-all btn-tactile flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-amber-300 border-amber-500 text-amber-950 scale-102 ring-4 ring-amber-200'
                    : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900'
                }`}
              >
                <span>{item.pillar}</span>
                {isMatched && <CheckCircle className="w-6 h-6 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Explanations/Pairs */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-700 text-center pb-1 border-b-2 border-sky-200">
            Artinya / Pasangannya
          </h3>
          {shuffledPairs.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedPair === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPair(item.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border-3 text-left font-bold text-base sm:text-lg transition-all btn-tactile flex items-center justify-between ${
                  isMatched
                    ? 'bg-sky-100 border-sky-400 text-sky-800 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-amber-300 border-amber-500 text-amber-950 scale-102 ring-4 ring-amber-200'
                    : 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900'
                }`}
              >
                <div>
                  <div>{item.pair}</div>
                  <span className="text-xs text-slate-500 font-normal">{item.hint}</span>
                </div>
                {isMatched && <CheckCircle className="w-6 h-6 text-sky-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`mt-6 p-4 rounded-2xl border-2 text-center font-bold text-lg transition-all ${
            feedback.isCorrect
              ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
              : 'bg-amber-100 border-amber-400 text-amber-900'
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* Completion Banner */}
      {isAllMatched && (
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 border-3 border-amber-500 text-center shadow-lg animate-pulse-subtle">
          <Award className="w-16 h-16 mx-auto text-amber-800 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            Alhamdulillah, Semua Pasangan Sesuai!
          </h3>
          <p className="text-amber-900 font-bold mt-1">
            Kamu mendapatkan <span className="text-emerald-700">+{score} Bintang</span> atas ketelitianmu!
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-amber-600 text-amber-900 font-bold inline-flex items-center gap-2 btn-tactile"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Coba Lagi</span>
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

      {/* Bottom Back Button */}
      {!isAllMatched && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm btn-tactile"
          >
            Kembali
          </button>
          <div className="flex items-center gap-1 text-emerald-700 font-bold">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{matchedIds.length} / 5 Pasangan Cocok</span>
          </div>
        </div>
      )}
    </div>
  );
};
