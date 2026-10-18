import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Award, ArrowRight, RefreshCw } from 'lucide-react';
import { PostSceneIllustration } from '../Illustrations';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: 'Berapakah rakaat salat Subuh yang kita kerjakan pada pagi hari?',
    options: [
      { text: '2 Rakaat', illustration: 'number-2', isCorrect: true },
      { text: '3 Rakaat', illustration: 'number-3', isCorrect: false },
      { text: '4 Rakaat', illustration: 'number-4', isCorrect: false },
    ],
    explanation: 'Masyaallah benar! Salat Subuh memiliki 2 rakaat.',
  },
  {
    id: 2,
    question: 'Beras yang kita berikan kepada orang yang membutuhkan menjelang Idulfitri disebut...',
    options: [
      { text: 'Zakat Fitrah', illustration: 'zakat', isCorrect: true },
      { text: 'Hadiah Mainan', illustration: 'gift', isCorrect: false },
      { text: 'Uang Jajan', illustration: 'coins', isCorrect: false },
    ],
    explanation: 'Pintar! Menjelang Idulfitri kita membayar zakat fitrah dengan beras makanan pokok.',
  },
  {
    id: 3,
    question: 'Bulan suci yang penuh berkah tempat umat Islam berpuasa sebulan penuh adalah...',
    options: [
      { text: 'Bulan Syawal', illustration: 'calendar', isCorrect: false },
      { text: 'Bulan Ramadan', illustration: 'ramadan', isCorrect: true },
      { text: 'Bulan Muharram', illustration: 'star', isCorrect: false },
    ],
    explanation: 'Alhamdulillah benar! Puasa wajib dilaksanakan di bulan Ramadan.',
  },
];

export const MultipleChoiceGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = TRIVIA_QUESTIONS[currentIdx];

  const handleSelect = (index: number) => {
    if (selectedOption !== null && feedback?.isCorrect) return; // prevent spamming after correct
    playPopSound();
    setSelectedOption(index);
    const chosen = currentQ.options[index];

    if (chosen.isCorrect) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: currentQ.explanation,
      });
      speakIndonesian(currentQ.explanation);
      setScore((prev) => prev + 30);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: 'Belum tepat, Sahabat! Ayo amati pertanyaannya dan coba pilih lagi.',
      });
      speakIndonesian('Belum tepat, Sahabat! Coba pilih lagi ya.');
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIdx + 1 < TRIVIA_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setCurrentIdx(0);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-sky-300 shadow-xl anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-bold border border-sky-300">
          Game 3: Pilih Jawaban yang Benar
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Kuis Kartu Pilihan Bergambar
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-sky-700">
          <span>Pertanyaan {currentIdx + 1} dari {TRIVIA_QUESTIONS.length}</span>
        </div>
      </div>

      {!isFinished ? (
        <div key={currentIdx} className="space-y-6 anim-screen-slide-right">
          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-center relative">
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 font-heading leading-snug">
              {currentQ.question}
            </p>
            <button
              onClick={() => {
                playPopSound();
                speakIndonesian(currentQ.question);
              }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-300 text-sky-700 text-xs font-bold shadow-sm hover:bg-sky-100"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Pertanyaan</span>
            </button>
          </div>

          {/* Options 3 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentQ.options.map((opt, index) => {
              const isSelected = selectedOption === index;
              const isCorrectCard = feedback?.isCorrect && opt.isCorrect;
              const isWrongCard = isSelected && !opt.isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`p-4 rounded-3xl border-3 text-center transition-all btn-tactile flex flex-col items-center justify-between min-h-[160px] ${
                    isCorrectCard
                      ? 'bg-emerald-100 border-emerald-500 scale-102 ring-4 ring-emerald-300'
                      : isWrongCard
                      ? 'bg-amber-100 border-amber-400'
                      : isSelected
                      ? 'bg-sky-100 border-sky-400'
                      : 'bg-white hover:bg-sky-50 border-slate-200'
                  }`}
                >
                  <div className="w-20 h-20 flex items-center justify-center">
                    <PostSceneIllustration type={opt.illustration} size={80} />
                  </div>
                  <span className="mt-2 font-extrabold text-lg text-slate-800 font-heading">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border-2 text-center font-bold text-base sm:text-lg ${
                feedback.isCorrect
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                  : 'bg-amber-100 border-amber-400 text-amber-900'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm btn-tactile"
            >
              Kembali
            </button>
            {feedback?.isCorrect && (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base inline-flex items-center gap-2 btn-tactile shadow-md animate-bounce"
              >
                <span>Lanjutkan</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Finished Screen */
        <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-100 via-indigo-50 to-blue-100 border-3 border-sky-400 text-center shadow-lg">
          <Award className="w-16 h-16 mx-auto text-sky-600 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-sky-950 font-heading">
            Masyaallah, Kuis Kartu Berhasil!
          </h3>
          <p className="text-sky-800 font-bold mt-1">
            Kamu berhasil menjawab semua pertanyaan dengan pintar (+{score} Bintang)!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-sky-600 text-sky-900 font-bold inline-flex items-center gap-2 btn-tactile"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Main Lagi</span>
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
