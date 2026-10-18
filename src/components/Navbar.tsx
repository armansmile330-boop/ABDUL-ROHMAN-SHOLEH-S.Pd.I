import React from 'react';
import { Star, Award, Compass, Gamepad2, GraduationCap, ArrowLeft, Lightbulb } from 'lucide-react';
import { StudentProfile, ScreenState } from '../types';
import { AudioToggle } from './AudioToggle';
import { playPopSound } from '../utils/audio';

interface NavbarProps {
  student: StudentProfile | null;
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  onOpenTeacher: () => void;
  onOpenGamesHub: () => void;
  onOpenPblModule: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  currentScreen,
  onNavigate,
  onOpenTeacher,
  onOpenGamesHub,
  onOpenPblModule,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-3 border-emerald-200 px-3 sm:px-6 py-2.5 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand / Return to Map */}
        <div className="flex items-center gap-2">
          {student && currentScreen !== 'welcome' && currentScreen !== 'map' && (
            <button
              onClick={() => {
                playPopSound();
                onNavigate('map');
              }}
              className="p-2 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-2 border-emerald-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile"
              title="Kembali ke Peta Petualangan"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Peta</span>
            </button>
          )}

          <div
            onClick={() => {
              if (student) {
                playPopSound();
                onNavigate('map');
              }
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white shadow-md flex items-center justify-center text-white text-xl font-black">
              🕌
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-emerald-950 leading-tight font-heading group-hover:text-emerald-700 transition-colors">
                Petualangan 5 Pilar
              </h1>
              <p className="text-[10px] sm:text-xs font-bold text-emerald-600 hidden xs:block">
                PAI Kelas 1 SD
              </p>
            </div>
          </div>
        </div>

        {/* Center: Student greeting & achievements (when logged in) */}
        {student && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Stars pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border-2 border-amber-300 shadow-sm">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="font-black text-xs sm:text-sm text-amber-900">
                {student.stars}
              </span>
            </div>

            {/* Badges count pill */}
            <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border-2 border-teal-300 shadow-sm">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <span className="font-black text-xs sm:text-sm text-teal-900">
                {student.badgesEarned.length}/5
              </span>
            </div>

            {/* Student avatar & name */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-sm">
                {student.avatar === 'raka' ? '👦' : '👧'}
              </span>
              <span className="text-xs font-bold text-emerald-950 truncate max-w-[100px]">
                {student.name}
              </span>
            </div>
          </div>
        )}

        {/* Right: Sound toggle, Game Zone, Teacher Dashboard */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {student && (
            <button
              onClick={() => {
                playPopSound();
                onOpenGamesHub();
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile"
              title="Arena 6 Game Interaktif"
            >
              <Gamepad2 className="w-4 h-4 text-purple-700" />
              <span className="hidden md:inline">Arena Game</span>
            </button>
          )}

          <AudioToggle />

          {/* Model PBL button */}
          <button
            onClick={() => {
              playPopSound();
              onOpenPblModule();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile"
            title="Panduan Model Inovasi PBL (Problem-Based Learning)"
          >
            <Lightbulb className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">Model PBL</span>
          </button>

          {/* Teacher button */}
          <button
            onClick={() => {
              playPopSound();
              onOpenTeacher();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300 font-bold text-xs inline-flex items-center gap-1.5 btn-tactile"
            title="Menu Guru / Catatan Asesmen"
          >
            <GraduationCap className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
