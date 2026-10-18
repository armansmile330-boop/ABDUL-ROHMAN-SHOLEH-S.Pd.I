import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, ArrowRight, Volume2, Award } from 'lucide-react';
import { StudentProfile } from '../types';
import { CharacterDialogue } from './Characters';
import { playSuccessSound, playPopSound, playFanfareSound, speakIndonesian } from '../utils/audio';

interface ReflectionProps {
  student: StudentProfile;
  onFinishReflection: (reflectionData: {
    favoritePillar: string;
    habitCommitment: string[];
    feeling: string;
  }) => void;
}

export const ReflectionScreen: React.FC<ReflectionProps> = ({ student, onFinishReflection }) => {
  const [favoritePillar, setFavoritePillar] = useState('Salat');
  const [selectedHabits, setSelectedHabits] = useState<string[]>([
    'Rajin salat 5 waktu bersama ayah dan ibu',
  ]);
  const [feeling, setFeeling] = useState('Sangat Bahagia & Bersemangat');

  const habitsList = [
    { text: 'Rajin salat 5 waktu bersama ayah dan ibu', icon: '🕌' },
    { text: 'Suka berbagi makanan & sedekah koin ke kotak amal', icon: '🤲' },
    { text: 'Belajar berpuasa dan bersabar di bulan Ramadan', icon: '🌙' },
    { text: 'Selalu berucap jujur dan santun kepada orang tua & guru', icon: '🌸' },
  ];

  const handleToggleHabit = (text: string) => {
    playPopSound();
    if (selectedHabits.includes(text)) {
      if (selectedHabits.length > 1) {
        setSelectedHabits(selectedHabits.filter((h) => h !== text));
      }
    } else {
      setSelectedHabits([...selectedHabits, text]);
    }
  };

  const handleComplete = () => {
    playSuccessSound();
    playFanfareSound();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    speakIndonesian(
      'Alhamdulillah, petualanganmu selesai! Teruslah belajar, beribadah, dan berbuat baik setiap hari!'
    );

    onFinishReflection({
      favoritePillar,
      habitCommitment: selectedHabits,
      feeling,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 anim-screen-enter">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-teal-300 shadow-xl p-6 sm:p-8 space-y-6 anim-screen-slide-right">
        <div className="text-center">
          <span className="px-4 py-1 rounded-full bg-teal-100 text-teal-800 text-xs sm:text-sm font-extrabold border border-teal-300">
            Langkah 9: Refleksi & Pembiasaan Saleh
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2 font-heading">
            Catatan Hati Anak Saleh
          </h2>
          <p className="text-slate-600 font-medium text-sm mt-1">
            Ilmu yang baik adalah ilmu yang kita amalkan setiap hari bersama bimbingan guru dan orang tua.
          </p>
        </div>

        <CharacterDialogue
          speaker="Raka & Rara"
          characterType="both"
          text={`Masyaallah ${student.name}! Kamu telah menuntaskan seluruh pos belajar. Mari kita tentukan kebiasaan baik yang ingin kita mulai hari ini!`}
        />

        {/* Question 1: Favorite Pillar */}
        <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
          <label className="block text-slate-900 font-extrabold text-base mb-3 font-heading">
            1. Pos Rukun Islam manakah yang paling kamu sukai petualangannya?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {['1. Syahadat', '2. Salat', '3. Zakat', '4. Puasa', '5. Haji'].map((p) => {
              const isSelected = favoritePillar === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setFavoritePillar(p);
                  }}
                  className={`p-2.5 rounded-xl border-2 font-extrabold text-xs sm:text-sm transition-all btn-tactile ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-700 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-emerald-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Habit Commitment */}
        <div className="p-5 rounded-2xl bg-sky-50 border-2 border-sky-200">
          <label className="block text-slate-900 font-extrabold text-base mb-1 font-heading">
            2. Kebiasaan baik apa yang ingin kamu lakukan di rumah dan di sekolah?
          </label>
          <p className="text-xs text-slate-500 mb-3 font-medium">
            (Bisa memilih lebih dari satu dengan mengetuk kotaknya)
          </p>

          <div className="space-y-2.5">
            {habitsList.map((h) => {
              const isChecked = selectedHabits.includes(h.text);
              return (
                <button
                  key={h.text}
                  type="button"
                  onClick={() => handleToggleHabit(h.text)}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all btn-tactile flex items-center gap-3 ${
                    isChecked
                      ? 'bg-sky-100 border-sky-500 text-sky-950 ring-2 ring-sky-300'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-sky-50'
                  }`}
                >
                  <span className="text-2xl">{h.icon}</span>
                  <span className="flex-1">{h.text}</span>
                  {isChecked ? (
                    <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-300 bg-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Feeling Picker */}
        <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
          <label className="block text-slate-900 font-extrabold text-base mb-3 font-heading">
            3. Bagaimana perasaanmu setelah belajar 5 Rukun Islam hari ini?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { label: 'Sangat Bahagia & Ceria', emoji: '🤩' },
              { label: 'Bersemangat Beribadah', emoji: '🤲' },
              { label: 'Bangga Jadi Anak Muslim', emoji: '⭐' },
            ].map((f) => {
              const isSelected = feeling === f.label;
              return (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => {
                    playPopSound();
                    setFeeling(f.label);
                  }}
                  className={`p-3 rounded-2xl border-2 font-extrabold text-sm transition-all btn-tactile flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-amber-400 border-amber-600 text-amber-950 ring-2 ring-amber-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  <span className="text-xl">{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Concluding Blessing Message */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-emerald-300 text-center">
          <p className="text-base sm:text-lg font-black text-emerald-950 font-heading">
            &ldquo;Alhamdulillah, petualanganmu selesai! Teruslah belajar, beribadah, dan berbuat baik setiap hari.&rdquo;
          </p>
          <p className="text-xs text-emerald-800 font-bold mt-1">
            Semoga Allah senantiasa membimbingmu menjadi anak yang beriman, saleh, dan berbakti.
          </p>
        </div>

        {/* Finish Button */}
        <div className="text-center pt-2">
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black text-xl inline-flex items-center justify-center gap-3 btn-tactile shadow-xl active:scale-95"
          >
            <Award className="w-7 h-7 text-yellow-300" />
            <span>BUKA PIAGAM SERTIFIKAT JUARA</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
