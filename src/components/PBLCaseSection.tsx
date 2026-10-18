import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, Sparkles, CheckCircle2, Volume2, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';
import { PBLScenario } from '../types';
import { playSuccessSound, playTryAgainSound, playPopSound, playFanfareSound, speakIndonesian } from '../utils/audio';

interface PBLCaseSectionProps {
  scenario: PBLScenario;
  postNumber: number;
  isSolved: boolean;
  onSolve: (stars: number) => void;
}

export const PBLCaseSection: React.FC<PBLCaseSectionProps> = ({
  scenario,
  postNumber,
  isSolved: initialSolved,
  onSolve,
}) => {
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [showClues, setShowClues] = useState(false);
  const [isSolved, setIsSolved] = useState(initialSolved);

  const handleSpeakProblem = () => {
    playPopSound();
    const narration = `${scenario.problemTitle}. Situasi: ${scenario.situation}. Pertanyaan Masalah: ${scenario.dilemmaQuestion}`;
    speakIndonesian(narration);
  };

  const handleSelectSolution = (optId: string) => {
    if (isSolved) return;
    playPopSound();
    setSelectedOptId(optId);

    const chosen = scenario.options.find((o) => o.id === optId);
    if (!chosen) return;

    if (chosen.isBestSolution) {
      playSuccessSound();
      playFanfareSound();
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      setFeedback({
        isSuccess: true,
        text: chosen.feedback,
      });
      speakIndonesian(chosen.feedback);
      setIsSolved(true);
      onSolve(25); // +25 bonus stars for solving the PBL authentic problem!
    } else {
      playTryAgainSound();
      setFeedback({
        isSuccess: false,
        text: chosen.feedback,
      });
      speakIndonesian(chosen.feedback);
    }
  };

  return (
    <div className="rounded-3xl border-3 border-amber-400 bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-yellow-50/90 p-5 sm:p-7 shadow-lg relative overflow-hidden anim-screen-enter">
      {/* Top Banner Tag: PBL Model Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-black tracking-wide flex items-center gap-1 shadow-sm">
            <Lightbulb className="w-3.5 h-3.5" />
            Model Problem-Based Learning (PBL)
          </span>
          <span className="text-xs font-bold text-amber-900 hidden sm:inline">
            Fase 1–4: Penyelidikan Kasus Nyata
          </span>
        </div>

        {isSolved ? (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Masalah Terpecahkan (+25★)
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
            Misi Penyelidikan Aktif
          </span>
        )}
      </div>

      {/* Problem Title & Audio Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-amber-200/80 pb-3">
        <h3 className="text-lg sm:text-xl font-black text-amber-950 font-heading flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{scenario.problemTitle}</span>
        </h3>

        <button
          onClick={handleSpeakProblem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Volume2 className="w-4 h-4 text-amber-700" />
          <span>Dengarkan Kasus</span>
        </button>
      </div>

      {/* Situation Story Description */}
      <div className="mt-3.5 p-4 rounded-2xl bg-white/90 border border-amber-200 shadow-sm text-slate-800">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          Kisah Nyata / Situasi Sehari-hari:
        </p>
        <p className="text-sm sm:text-base font-medium leading-relaxed">
          &ldquo;{scenario.situation}&rdquo;
        </p>

        {/* Dilemma question highlight */}
        <div className="mt-3 p-3 rounded-xl bg-amber-100/80 border-l-4 border-amber-500">
          <p className="text-xs sm:text-sm font-black text-amber-950">
            Pertanyaan Masalah: {scenario.dilemmaQuestion}
          </p>
        </div>
      </div>

      {/* Clues Accordion (Fase 3: Investigasi) */}
      <div className="mt-3">
        <button
          onClick={() => {
            playPopSound();
            setShowClues(!showClues);
          }}
          className="text-xs font-extrabold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 underline underline-offset-4"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{showClues ? 'Tutup Petunjuk Penyelidikan' : 'Buka Petunjuk Penyelidikan (Clues)'}</span>
        </button>

        {showClues && (
          <div className="mt-2 p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 space-y-1.5 anim-screen-enter">
            <span className="text-[11px] font-black uppercase text-amber-900 block">
              Fakta Ajaran Islam untuk Memecahkan Masalah:
            </span>
            {scenario.clues.map((clue, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-medium text-amber-950">
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <span>{clue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Solution Choices (Fase 4: Menyajikan Solusi) */}
      <div className="mt-4">
        <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2">
          Pilihlah Solusi Tindakan Islami yang Paling Tepat:
        </span>

        <div className="space-y-2.5">
          {scenario.options.map((opt) => {
            const isSelected = selectedOptId === opt.id;
            const isCorrect = isSolved && opt.isBestSolution;
            const isWrong = isSelected && !opt.isBestSolution;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectSolution(opt.id)}
                disabled={isSolved}
                className={`w-full p-3.5 rounded-2xl border-3 text-left font-bold text-xs sm:text-sm transition-all btn-tactile flex items-start gap-3 ${
                  isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                    : isWrong
                    ? 'bg-rose-100 border-rose-400 text-rose-950'
                    : isSelected
                    ? 'bg-amber-200 border-amber-500 text-amber-950'
                    : 'bg-white hover:bg-amber-100/60 border-slate-200 text-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                    isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isWrong
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {isCorrect ? '✓' : isWrong ? '✕' : opt.id.slice(-1).toUpperCase()}
                </div>
                <span className="flex-1 leading-snug">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Immediate Pedagogical Feedback */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded-2xl border-2 text-center font-bold text-xs sm:text-sm animate-pulse-subtle ${
            feedback.isSuccess
              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm'
              : 'bg-rose-100 border-rose-400 text-rose-950'
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Problem Solved Outcome Card */}
      {isSolved && (
        <div className="mt-4 p-3.5 rounded-2xl bg-emerald-100/90 border-2 border-emerald-400 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs text-emerald-950 font-medium">
            <strong>Capaian Pembelajaran PBL:</strong> {scenario.learningOutcome}
          </div>
        </div>
      )}
    </div>
  );
};
