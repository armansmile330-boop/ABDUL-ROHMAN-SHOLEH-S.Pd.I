import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowUp, ArrowDown, Check, RefreshCw, Award, ArrowRight } from 'lucide-react';
import { SEQUENCE_GAME_PILLARS } from '../../data/curriculumData';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';
import { CharacterDialogue } from '../Characters';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const SequencePillarsGame: React.FC<Props> = ({ onComplete, onBack }) => {
  // Start with a scrambled list
  const [items, setItems] = useState(() => {
    return [...SEQUENCE_GAME_PILLARS].sort(() => Math.random() - 0.5);
  });
  const [checked, setChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    playPopSound();
    setChecked(false);
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
  };

  // Drag and drop support
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === dropIndex) return;

    const newItems = [...items];
    const draggedItem = newItems.splice(draggedIdx, 1)[0];
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedIdx(null);
    setChecked(false);
    playPopSound();
  };

  const handleCheckOrder = () => {
    playPopSound();
    setAttempts((prev) => prev + 1);

    // Verify if order is 1, 2, 3, 4, 5
    const correct = items.every((item, idx) => item.order === idx + 1);
    setChecked(true);

    if (correct) {
      setIsSuccess(true);
      playSuccessSound();
      playFanfareSound();
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      speakIndonesian('Masyaallah, urutan rukun Islam kamu sudah sempurna! 1 Syahadat, 2 Salat, 3 Zakat, 4 Puasa, 5 Haji.');
    } else {
      setIsSuccess(false);
      playTryAgainSound();
      speakIndonesian('Belum tepat, Sahabat! Coba periksa lagi urutannya dari nomor satu sampai lima.');
    }
  };

  const handleReset = () => {
    playPopSound();
    setItems([...SEQUENCE_GAME_PILLARS].sort(() => Math.random() - 0.5));
    setChecked(false);
    setIsSuccess(false);
  };

  const score = Math.max(70, 100 - (attempts - 1) * 10);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-emerald-300 shadow-xl anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-300">
          Game 2: Susun Lima Rukun Islam
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Urutkan Rukun Islam dari 1 sampai 5!
        </h2>
        <p className="text-slate-600 font-medium text-sm sm:text-base mt-1">
          Gunakan tombol Panah Atas / Bawah atau seret kartu agar urutannya berurutan dengan benar.
        </p>
      </div>

      <CharacterDialogue
        speaker="Rara"
        characterType="rara"
        text="Ayo susun dari nomor 1 Syahadat hingga nomor 5 Haji. Pastikan urutannya tidak tertukar ya!"
        className="mb-6"
      />

      {/* Cards List */}
      <div className="space-y-3">
        {items.map((item, index) => {
          const isCorrectPosition = checked && item.order === index + 1;
          const isWrongPosition = checked && item.order !== index + 1;

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`p-4 rounded-2xl border-3 transition-all flex items-center justify-between gap-3 ${
                isCorrectPosition
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md'
                  : isWrongPosition
                  ? 'bg-amber-100 border-amber-400 text-amber-950'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-slate-800'
              }`}
            >
              {/* Order slot badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-emerald-400 flex items-center justify-center font-extrabold text-emerald-700 text-lg shadow-sm">
                  {index + 1}
                </div>
                <span className="font-extrabold text-base sm:text-lg">{item.name}</span>
              </div>

              {/* Action Buttons for Mobile / Tap */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className={`p-2 rounded-xl border-2 font-bold transition-all ${
                    index === 0
                      ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'bg-white hover:bg-emerald-200 border-emerald-400 text-emerald-800 active:scale-95'
                  }`}
                  title="Pindah ke Atas"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className={`p-2 rounded-xl border-2 font-bold transition-all ${
                    index === items.length - 1
                      ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                      : 'bg-white hover:bg-emerald-200 border-emerald-400 text-emerald-800 active:scale-95'
                  }`}
                  title="Pindah ke Bawah"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Feedback */}
      {checked && !isSuccess && (
        <div className="mt-5 p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-900 font-bold text-center">
          Belum tepat, Sahabat! Ada yang masih tertukar. Ingat: 1. Syahadat, 2. Salat, 3. Zakat, 4. Puasa, 5. Haji. Ayo coba pindahkan lagi!
        </div>
      )}

      {/* Success Celebration */}
      {isSuccess && (
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 border-3 border-emerald-500 text-center shadow-lg animate-pulse-subtle">
          <Award className="w-16 h-16 mx-auto text-emerald-600 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 font-heading">
            Masyaallah, Hebat! Urutan Benar 100%!
          </h3>
          <p className="text-emerald-800 font-bold mt-1">
            Kamu telah menguasai urutan 5 Rukun Islam dengan sangat baik (+{score} Bintang)!
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-emerald-600 text-emerald-900 font-bold inline-flex items-center gap-2 btn-tactile"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Acak & Main Lagi</span>
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

      {/* Control buttons */}
      {!isSuccess && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm btn-tactile"
          >
            Kembali
          </button>
          <button
            onClick={handleCheckOrder}
            className="px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg inline-flex items-center gap-2 btn-tactile shadow-md"
          >
            <Check className="w-6 h-6" />
            <span>Periksa Urutan</span>
          </button>
        </div>
      )}
    </div>
  );
};
