import React, { useState } from 'react';
import { X, Gamepad2, Award, Star, ArrowRight } from 'lucide-react';
import { MatchPillarsGame } from './games/MatchPillarsGame';
import { SequencePillarsGame } from './games/SequencePillarsGame';
import { MultipleChoiceGame } from './games/MultipleChoiceGame';
import { GuessPictureGame } from './games/GuessPictureGame';
import { TrueFalseMissionGame } from './games/TrueFalseMissionGame';
import { TreasureChestGame } from './games/TreasureChestGame';
import { playPopSound } from '../utils/audio';

interface GameZoneProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordScore: (gameKey: string, score: number) => void;
  studentStars: number;
}

export const GameZoneModal: React.FC<GameZoneProps> = ({
  isOpen,
  onClose,
  onRecordScore,
  studentStars,
}) => {
  const [activeGame, setActiveGame] = useState<number | null>(null);

  if (!isOpen) return null;

  const games = [
    {
      id: 1,
      title: 'Cari Pasangan',
      subtitle: 'Cocokkan nama rukun & artinya',
      icon: '🔗',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 2,
      title: 'Susun 5 Rukun',
      subtitle: 'Urutkan dari nomor 1 sampai 5',
      icon: '🔢',
      color: 'from-sky-400 to-blue-500',
    },
    {
      id: 3,
      title: 'Pilih Jawaban',
      subtitle: 'Kuis kartu bergambar ceria',
      icon: '🎯',
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 4,
      title: 'Tebak Gambar',
      subtitle: 'Amati gambar & tebak ibadahnya',
      icon: '🖼️',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      id: 5,
      title: 'Benar / Belum Tepat',
      subtitle: 'Tentukan kebenaran pernyataan',
      icon: '⚖️',
      color: 'from-rose-400 to-pink-500',
    },
    {
      id: 6,
      title: 'Buka Peti Ilmu',
      subtitle: 'Buka peti rahasia penuh bintang',
      icon: '📦',
      color: 'from-yellow-400 to-amber-600',
    },
  ];

  const handleGameComplete = (gameId: number, score: number) => {
    onRecordScore(`game_${gameId}`, score);
    setActiveGame(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-purple-400 max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative my-auto max-h-[95vh] overflow-y-auto anim-screen-zoom">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Arena 6 Game Interaktif
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pilih game edukatif untuk mengasah pemahaman & mengumpulkan bintang!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 btn-tactile"
            title="Tutup Arena Game"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content: Game Selector or Active Game */}
        <div className="mt-4">
          {activeGame === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 anim-screen-enter">
              {games.map((g) => (
                <div
                  key={g.id}
                  onClick={() => {
                    playPopSound();
                    setActiveGame(g.id);
                  }}
                  className="p-5 rounded-3xl border-3 border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50/50 cursor-pointer transition-all btn-tactile flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{g.icon}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black">
                      Game {g.id}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-lg font-black text-slate-900 font-heading">
                      {g.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {g.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-purple-700">
                    <span>Mainkan Game</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div key={activeGame} className="anim-screen-slide-right">
              {activeGame === 1 && (
                <MatchPillarsGame
                  onComplete={(score) => handleGameComplete(1, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
              {activeGame === 2 && (
                <SequencePillarsGame
                  onComplete={(score) => handleGameComplete(2, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
              {activeGame === 3 && (
                <MultipleChoiceGame
                  onComplete={(score) => handleGameComplete(3, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
              {activeGame === 4 && (
                <GuessPictureGame
                  onComplete={(score) => handleGameComplete(4, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
              {activeGame === 5 && (
                <TrueFalseMissionGame
                  onComplete={(score) => handleGameComplete(5, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
              {activeGame === 6 && (
                <TreasureChestGame
                  onComplete={(score) => handleGameComplete(6, score)}
                  onBack={() => setActiveGame(null)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
