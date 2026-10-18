import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Award, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { POST_ASSESSMENT_QUESTIONS } from '../data/curriculumData';
import { PostSceneIllustration } from './Illustrations';
import { CharacterDialogue } from './Characters';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../utils/audio';

interface PostAssessmentProps {
  studentName: string;
  preTestScore: number | null;
  onComplete: (score: number) => void;
}

export const PostAssessment: React.FC<PostAssessmentProps> = ({
  studentName,
  preTestScore,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = POST_ASSESSMENT_QUESTIONS[currentIdx];

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
        message: 'Belum tepat, Sahabat! Ingat kembali apa yang telah kita pelajari di lima pos tadi.',
      });
      speakIndonesian('Belum tepat, Sahabat! Ayo pilih lagi ya.');
    }
  };

  const handleNext = () => {
    playPopSound();
    if (currentIdx + 1 < POST_ASSESSMENT_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsFinished(true);
      playFanfareSound();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const finalScore = Math.round((correctCount / POST_ASSESSMENT_QUESTIONS.length) * 100);
  const improvement = preTestScore !== null ? finalScore - preTestScore : 0;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 anim-screen-enter">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-emerald-400 shadow-xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-extrabold border border-emerald-300">
            Langkah 8: Asesmen Akhir (Post-Test)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 font-heading">
            Ujian Akhir Bintang Muslim!
          </h2>
          <p className="text-slate-600 font-medium text-sm mt-1">
            Mari buktikan seberapa banyak ilmu yang telah kamu serap dari lima pos belajar!
          </p>
        </div>

        {!isFinished ? (
          <div key={currentIdx} className="space-y-6 anim-screen-slide-right">
            <CharacterDialogue
              speaker="Raka & Rara"
              characterType="both"
              text={`Semangat ${studentName}! Jawab 5 pertanyaan ini dengan tenang dan penuh keyakinan!`}
            />

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 text-center relative">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Soal Ujian {currentIdx + 1} dari {POST_ASSESSMENT_QUESTIONS.length}
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-800 font-heading leading-snug">
                {currentQ.question}
              </p>

              <button
                onClick={() => {
                  playPopSound();
                  speakIndonesian(currentQ.question);
                }}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-emerald-300 text-emerald-700 text-xs font-bold shadow-sm hover:bg-emerald-50"
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
                        : 'bg-white hover:bg-emerald-50 border-slate-200'
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
                  <span>Lanjutkan Soal Ujian</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Post Assessment Score comparison */
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 border-3 border-emerald-500 text-center shadow-lg anim-screen-zoom">
            <Award className="w-20 h-20 mx-auto text-emerald-600 mb-2 animate-bounce" />
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 font-heading">
              Masyaallah! Asesmen Akhir Tuntas!
            </h3>

            {/* Score Comparison Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-5">
              <div className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-center shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Asesmen Awal
                </span>
                <span className="text-3xl font-black text-slate-700 mt-1 block">
                  {preTestScore !== null ? `${preTestScore}` : '-'}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Sebelum Belajar</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500 text-white border-2 border-emerald-600 text-center shadow-md">
                <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider block">
                  Asesmen Akhir
                </span>
                <span className="text-3xl font-black text-yellow-300 mt-1 block">
                  {finalScore}
                </span>
                <span className="text-[11px] text-emerald-100 font-bold">Setelah Petualangan</span>
              </div>
            </div>

            {/* Growth indicator */}
            {preTestScore !== null && (
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-200 text-emerald-900 text-xs sm:text-sm font-extrabold mb-4 border border-emerald-400">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>
                  {improvement >= 0
                    ? `Perkembangan Positif: Meningkat +${improvement} Poin!`
                    : 'Pemahamanmu semakin mantap dan terlatih!'}
                </span>
              </div>
            )}

            <p className="text-slate-700 text-sm font-bold max-w-md mx-auto">
              Satu langkah lagi! Mari kita lakukan refleksi dan niat pembiasaan baik dalam kehidupan sehari-hari.
            </p>

            <button
              onClick={() => onComplete(finalScore)}
              className="mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xl inline-flex items-center gap-3 btn-tactile shadow-xl active:scale-95"
            >
              <span>MENUJU HALAMAN REFLEKSI</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
