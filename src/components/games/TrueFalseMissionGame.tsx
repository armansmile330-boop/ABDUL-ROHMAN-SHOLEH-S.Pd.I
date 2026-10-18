import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Check, HelpCircle, Award, ArrowRight, RefreshCw, Volume2 } from 'lucide-react';
import { TRUE_FALSE_MISSIONS } from '../../data/curriculumData';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../../utils/audio';
import { CharacterDialogue } from '../Characters';

interface Props {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const TrueFalseMissionGame: React.FC<Props> = ({ onComplete, onBack }) => {
  const [index, setIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentMission = TRUE_FALSE_MISSIONS[index];

  const handleAnswer = (choice: boolean) => {
    if (userChoice !== null && feedback?.isCorrect) return;
    playPopSound();
    setUserChoice(choice);

    if (choice === currentMission.isTrue) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: currentMission.correctMsg + ' ' + currentMission.explanation,
      });
      speakIndonesian(currentMission.correctMsg + ' ' + currentMission.explanation);
      setScore((prev) => prev + 20);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: 'Belum tepat, Sahabat! Pikirkan kembali: ' + currentMission.explanation,
      });
      speakIndonesian('Belum tepat, Sahabat! Ayo coba lagi.');
    }
  };

  const handleNext = () => {
    playPopSound();
    if (index + 1 < TRUE_FALSE_MISSIONS.length) {
      setIndex((prev) => prev + 1);
      setUserChoice(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 80, spread: 65 });
    }
  };

  const handleRestart = () => {
    playPopSound();
    setIndex(0);
    setUserChoice(null);
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white/95 rounded-3xl border-3 border-purple-300 shadow-xl anim-screen-enter">
      <div className="text-center mb-4">
        <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold border border-purple-300">
          Game 5: Misi Benar atau Belum Tepat
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 font-heading">
          Tentukan: Benar atau Belum Tepat?
        </h2>
        <div className="mt-1 text-sm font-bold text-purple-700">
          Misi {index + 1} dari {TRUE_FALSE_MISSIONS.length}
        </div>
      </div>

      {!isFinished ? (
        <div key={index} className="space-y-6 anim-screen-slide-right">
          <CharacterDialogue
            speaker="Raka"
            characterType="raka"
            text="Baca baik-baik pernyataannya, lalu tentukan apakah pernyataan itu Benar atau Belum Tepat!"
          />

          {/* Statement Box */}
          <div className="p-6 rounded-3xl bg-purple-50 border-3 border-purple-200 text-center relative shadow-sm">
            <span className="text-xs uppercase font-bold text-purple-600 tracking-wider">
              Pernyataan #{index + 1}
            </span>
            <p className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-800 font-heading leading-snug">
              &ldquo;{currentMission.statement}&rdquo;
            </p>
            <button
              onClick={() => {
                playPopSound();
                speakIndonesian(currentMission.statement);
              }}
              className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-300 text-purple-700 text-xs font-bold shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Kalimat Ini</span>
            </button>
          </div>

          {/* Large Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className={`p-6 rounded-3xl border-4 text-center font-extrabold text-xl sm:text-2xl transition-all btn-tactile flex items-center justify-center gap-3 ${
                userChoice === true && feedback?.isCorrect
                  ? 'bg-emerald-200 border-emerald-600 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                  : userChoice === true && !feedback?.isCorrect
                  ? 'bg-amber-100 border-amber-400 text-amber-950'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-400 text-emerald-900'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <span>BENAR</span>
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className={`p-6 rounded-3xl border-4 text-center font-extrabold text-xl sm:text-2xl transition-all btn-tactile flex items-center justify-center gap-3 ${
                userChoice === false && feedback?.isCorrect
                  ? 'bg-emerald-200 border-emerald-600 text-emerald-950 scale-102 ring-4 ring-emerald-300'
                  : userChoice === false && !feedback?.isCorrect
                  ? 'bg-amber-100 border-amber-400 text-amber-950'
                  : 'bg-sky-50 hover:bg-sky-100 border-sky-400 text-sky-900'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center">
                <HelpCircle className="w-6 h-6 stroke-[3]" />
              </div>
              <span>BELUM TEPAT</span>
            </button>
          </div>

          {/* Feedback Display */}
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

          {/* Footer Controls */}
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
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 border-3 border-purple-400 text-center shadow-lg">
          <Award className="w-16 h-16 mx-auto text-purple-600 mb-2" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-950 font-heading">
            Semua Misi Berhasil Dijalankan!
          </h3>
          <p className="text-purple-900 font-bold mt-1">
            Kamu anak yang teliti dan memahami ajaran Islam dengan sangat baik (+{score} Bintang)!
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border-2 border-purple-600 text-purple-900 font-bold inline-flex items-center gap-2 btn-tactile"
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
