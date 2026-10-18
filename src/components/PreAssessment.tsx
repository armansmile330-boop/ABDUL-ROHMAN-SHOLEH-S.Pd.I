import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Award, ArrowRight, Star } from 'lucide-react';
import { PRE_ASSESSMENT_QUESTIONS } from '../data/curriculumData';
import { PostSceneIllustration } from './Illustrations';
import { CharacterDialogue } from './Characters';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../utils/audio';

interface PreAssessmentProps {
  studentName: string;
  onComplete: (score: number) => void;
}

export const PreAssessment: React.FC<PreAssessmentProps> = ({ studentName, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = PRE_ASSESSMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string, isCorrect: boolean) => {
    if (selectedOption !== null && feedback?.isCorrect) return;
    playPopSound();
    setSelectedOption(optId);

    if (isCorrect) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: currentQ.explanation,
      });
      speakIndonesian(currentQ.explanation);
      setCorrectCount((prev) => prev + 1);
    } else {
      playTryAgainSound();
      setFeedback({
        isCorrect: false,
        message: 'Belum tepat, Sahabat! Tidak apa-apa, ayo coba pilih jawaban lainnya.',
      });
      speakIndonesian('Belum tepat, Sahabat! Ayo pilih lagi ya.');
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIdx + 1 < PRE_ASSESSMENT_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 75, spread: 60 });
    }
  };

  const finalScore = Math.round((correctCount / PRE_ASSESSMENT_QUESTIONS.length) * 100);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 anim-screen-enter">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-teal-300 shadow-xl p-6 sm:p-8">
        {/* Top Header */}
        <div className="text-center mb-4">
          <span className="px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm font-extrabold border border-teal-300">
            Langkah 1: Asesmen Awal (Pre-Test)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 font-heading">
            Mari Cek Pengetahuan Awalmu!
          </h2>
          <p className="text-slate-600 font-medium text-sm mt-1">
            Jangan takut salah ya {studentName}, kita sedang belajar bersama!
          </p>
        </div>

        {!isFinished ? (
          <div key={currentIdx} className="space-y-6 anim-screen-slide-right">
            <CharacterDialogue
              speaker="Raka & Rara"
              characterType="both"
              text={`Halo ${studentName}! Jawablah 5 pertanyaan singkat ini sebelum kita membuka peta petualangan rukun Islam!`}
            />

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-teal-50/80 border-2 border-teal-200 text-center relative">
              <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                Pertanyaan {currentIdx + 1} dari {PRE_ASSESSMENT_QUESTIONS.length}
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-800 font-heading leading-snug">
                {currentQ.question}
              </p>

              <button
                onClick={() => {
                  playPopSound();
                  speakIndonesian(currentQ.question);
                }}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-teal-300 text-teal-700 text-xs font-bold shadow-sm hover:bg-teal-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bacakan Soal Ini</span>
              </button>
            </div>

            {/* Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrect = feedback?.isCorrect && opt.isCorrect;
                const isWrong = isSelected && !opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    className={`p-4 rounded-3xl border-3 text-center transition-all btn-tactile flex flex-col items-center justify-between min-h-[150px] ${
                      isCorrect
                        ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300 scale-102'
                        : isWrong
                        ? 'bg-amber-100 border-amber-400'
                        : isSelected
                        ? 'bg-teal-100 border-teal-400'
                        : 'bg-white hover:bg-teal-50 border-slate-200'
                    }`}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      <PostSceneIllustration type={opt.imageType} size={70} />
                    </div>
                    <span className="mt-2 font-extrabold text-base text-slate-800 font-heading">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`p-4 rounded-2xl border-2 text-center font-bold text-base sm:text-lg animate-pulse-subtle ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-amber-100 border-amber-400 text-amber-950'
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Next Button */}
            {feedback?.isCorrect && (
              <div className="text-center pt-2">
                <button
                  onClick={handleNext}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg inline-flex items-center gap-2 btn-tactile shadow-md animate-bounce"
                >
                  <span>Lanjutkan Soal Berikutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Pre-Assessment */
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-100 via-emerald-100 to-sky-100 border-3 border-teal-400 text-center shadow-lg anim-screen-zoom">
            <Award className="w-20 h-20 mx-auto text-teal-600 mb-2" />
            <h3 className="text-2xl sm:text-3xl font-black text-teal-950 font-heading">
              Asesmen Awal Selesai!
            </h3>
            <p className="text-teal-900 font-bold mt-1 text-base sm:text-lg">
              Hebat sekali {studentName}! Skor awalmu adalah{' '}
              <span className="text-emerald-700 font-black text-xl">{finalScore} / 100</span>
            </p>
            <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto font-medium">
              Sekarang pintu gerbang petualangan telah terbuka. Mari kita jelajahi 5 Pos Rukun Islam!
            </p>

            <button
              onClick={() => onComplete(finalScore)}
              className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xl inline-flex items-center gap-3 btn-tactile shadow-xl active:scale-95"
            >
              <span>BUKA PETA PETUALANGAN</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
