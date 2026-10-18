import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { GUESS_PICTURE_QUESTIONS } from '../../data/curriculumData';
import { PostSceneIllustration } from '../Illustrations';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const GuessPictureGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = GUESS_PICTURE_QUESTIONS[index];

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null && feedback?.isCorrect) return;
    playPopSound();
    setSelectedAnswer(option);

    if (option === currentQ.correctAnswer) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: currentQ.explanation,
      });
      speakIndonesian(currentQ.explanation);
      setScore((prev) => prev + 25);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: 'Belum tepat, Sahabat! Perhatikan ciri-ciri gambarnya dan coba tebak lagi.',
      });
      speakIndonesian('Belum tepat, Sahabat! Ayo tebak sekali lagi.');
    }
  };

  const handleNext = () => {
    playPopSound();
    if (index + 1 < GUESS_PICTURE_QUESTIONS.length) {
      setIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 75, spread: 65 });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setIndex(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-amber-300 shadow-xl anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-bold border border-amber-300">
          Game 4: Tebak Gambar Rukun Islam
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Lihat Gambar, Tebak Ibadahnya!
        </h2>
        <div className="mt-1 text-sm font-bold text-amber-800">
          Gambar {index + 1} dari {GUESS_PICTURE_QUESTIONS.length}
        </div>
      </div>

      {!isFinished ? (
        <div key={index} className="space-y-6 anim-screen-slide-right">
          {/* Big Picture Card */}
          <div className="p-6 rounded-3xl bg-amber-50/80 border-3 border-amber-200 flex flex-col items-center justify-center text-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <PostSceneIllustration type={currentQ.imageType} size={190} />
            </div>
            <p className="mt-3 text-slate-700 font-bold text-base sm:text-lg max-w-md">
              {currentQ.caption}
            </p>
            <button
              onClick={() => {
                playPopSound();
                speakIndonesian(currentQ.caption);
              }}
              className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-xs font-bold shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Petunjuk</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrectBtn = feedback?.isCorrect && opt === currentQ.correctAnswer;
              const isWrongBtn = isSelected && opt !== currentQ.correctAnswer;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-2xl border-3 text-center font-extrabold text-base sm:text-lg transition-all btn-tactile ${
                    isCorrectBtn
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300'
                      : isWrongBtn
                      ? 'bg-amber-100 border-amber-400 text-amber-950'
                      : isSelected
                      ? 'bg-amber-200 border-amber-400 text-amber-900'
                      : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
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

          {/* Controls */}
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
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-200 border-3 border-amber-400 text-center shadow-lg">
          <Award className="w-16 h-16 mx-auto text-amber-600 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            Tebakanmu Tepat Semua!
          </h3>
          <p className="text-amber-900 font-bold mt-1">
            Mata dan ingatanmu sangat tajam dalam mengenali gambar ibadah (+{score} Bintang)!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-amber-600 text-amber-900 font-bold inline-flex items-center gap-2 btn-tactile"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Tebak Ulang</span>
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
