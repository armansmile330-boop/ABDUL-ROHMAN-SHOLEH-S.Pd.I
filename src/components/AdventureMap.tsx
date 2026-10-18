import React from 'react';
import { Star, CheckCircle, Lock, Play, Award, Sparkles, Gamepad2, ArrowRight, Lightbulb } from 'lucide-react';
import { PILLARS_DATA } from '../data/curriculumData';
import { StudentProfile } from '../types';
import { PostSceneIllustration } from './Illustrations';
import { CharacterAvatar } from './Characters';
import { playPopSound } from '../utils/audio';

interface AdventureMapProps {
  student: StudentProfile;
  onSelectPost: (postId: number) => void;
  onOpenGamesHub: () => void;
  onOpenPblModule?: () => void;
  onStartPostAssessment: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  student,
  onSelectPost,
  onOpenGamesHub,
  onOpenPblModule,
  onStartPostAssessment,
}) => {
  const allCompleted = student.completedPosts.length >= 5;
  const pblSolvedCount = student.pblSolvedPosts?.length || 0;

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 anim-screen-enter">
      {/* Top Map Hero & Progress Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-3 border-emerald-300 p-5 sm:p-6 shadow-xl mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CharacterAvatar type={student.avatar} size="sm" action="wave" />
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Peta Petualangan Muslim Cilik
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
                Ayo Jelajahi 5 Pos Rukun Islam!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Pilih pos belajar di bawah ini. Selesaikan misi dan pecahkan kasus nyata untuk mengumpulkan bintang!
              </p>
            </div>
          </div>

          {/* Quick Actions / Arena Game & PBL button */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenPblModule && (
              <button
                onClick={() => {
                  playPopSound();
                  onOpenPblModule();
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 btn-tactile shadow-sm"
                title="Buka Penjelasan Model Problem-Based Learning"
              >
                <Lightbulb className="w-4 h-4 text-amber-700" />
                <span>Modul PBL</span>
              </button>
            )}

            <button
              onClick={() => {
                playPopSound();
                onOpenGamesHub();
              }}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm inline-flex items-center gap-2 btn-tactile shadow-md"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Arena 6 Game</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & PBL Status */}
        <div className="mt-4 pt-4 border-t-2 border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-extrabold text-emerald-800">
            <span>Kemajuan:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">
              {student.completedPosts.length} / 5 Pos Selesai
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{pblSolvedCount} / 5 Kasus PBL Terpecahkan</span>
            </span>
          </div>

          <div className="w-full sm:w-56 h-3.5 bg-slate-100 rounded-full overflow-hidden border border-emerald-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${(student.completedPosts.length / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Map Board with 5 Themed Stations */}
      <div className="relative bg-gradient-to-b from-sky-100 via-emerald-50 to-teal-100 rounded-3xl border-4 border-teal-300 p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[540px] anim-screen-slide-right">
        {/* Curving Adventure Path SVG in background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 800 600"
        >
          <path
            d="M 100 120 Q 400 60 700 160 T 400 340 T 100 480 T 700 520"
            fill="none"
            stroke="#10B981"
            strokeWidth="28"
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>

        {/* Floating Clouds & Trees decoration */}
        <div className="absolute top-4 left-6 text-3xl opacity-60">☁️</div>
        <div className="absolute top-10 right-12 text-3xl opacity-60">☁️</div>
        <div className="absolute bottom-6 left-10 text-2xl opacity-60">🌴</div>
        <div className="absolute bottom-8 right-8 text-2xl opacity-60">🌴</div>

        {/* 5 Posts Grid Layout */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((post) => {
            const isCompleted = student.completedPosts.includes(post.id);
            const isBadgeEarned = student.badgesEarned.includes(post.badgeId);

            return (
              <div
                key={post.id}
                onClick={() => {
                  playPopSound();
                  onSelectPost(post.id);
                }}
                className={`group relative bg-white/95 rounded-3xl border-4 transition-all duration-200 p-5 cursor-pointer card-tactile hover:-translate-y-2 ${
                  isCompleted
                    ? 'border-emerald-400 ring-2 ring-emerald-200 shadow-emerald-100'
                    : 'border-slate-200 hover:border-teal-400'
                }`}
              >
                {/* Station Number Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-2xl bg-teal-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                      {post.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Pos {post.number}
                    </span>
                  </div>

                  {isCompleted ? (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Selesai</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold border border-amber-300">
                      <Play className="w-3.5 h-3.5 fill-amber-600" />
                      <span>Mulai</span>
                    </div>
                  )}
                </div>

                {/* Illustration Scene */}
                <div className="w-full h-36 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-slate-100 group-hover:bg-teal-50/50 transition-colors">
                  <PostSceneIllustration type={post.gameType.replace('-match', '').replace('-time', '').replace('-share', '').replace('-actions', '').replace('-journey', '')} size={115} />
                </div>

                {/* Title & Subtitle */}
                <div className="mt-3">
                  <h3 className="text-xl font-black text-slate-900 font-heading group-hover:text-teal-700 transition-colors">
                    {post.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
                    {post.subtitle}
                  </p>
                </div>

                {/* PBL Scenario Indicator */}
                {post.pblScenario && (
                  <div className="mt-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-black border ${
                        student.pblSolvedPosts?.includes(post.id)
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        {student.pblSolvedPosts?.includes(post.id)
                          ? 'Kasus PBL Terpecahkan (+25★)'
                          : 'Tantangan Kasus PBL'}
                      </span>
                    </span>
                  </div>
                )}

                {/* Badge Indicator */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Award className={`w-4 h-4 ${isBadgeEarned ? 'text-amber-500' : 'text-slate-300'}`} />
                    <span className={isBadgeEarned ? 'text-amber-700' : 'text-slate-400'}>
                      {post.badgeName}
                    </span>
                  </div>

                  <span className="text-teal-600 font-black flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Buka Pos &rarr;
                  </span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Asesmen Akhir & Sertifikat unlock box */}
          <div
            onClick={() => {
              if (allCompleted) {
                playPopSound();
                onStartPostAssessment();
              }
            }}
            className={`relative rounded-3xl border-4 p-5 transition-all card-tactile flex flex-col justify-between ${
              allCompleted
                ? 'bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 border-amber-400 cursor-pointer hover:-translate-y-2 animate-pulse-subtle'
                : 'bg-slate-100/80 border-slate-300 opacity-80 cursor-not-allowed'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-9 h-9 rounded-2xl bg-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                  ★
                </span>
                {allCompleted ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300">
                    Terbuka!
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-extrabold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Terkunci
                  </span>
                )}
              </div>

              <div className="w-full h-28 flex items-center justify-center">
                <Award className={`w-20 h-20 ${allCompleted ? 'text-amber-600 animate-bounce' : 'text-slate-400'}`} />
              </div>

              <h3 className="text-xl font-black text-slate-900 font-heading mt-2">
                Asesmen Akhir & Piagam
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                {allCompleted
                  ? 'Selamat! Seluruh 5 pos selesai. Uji pemahamanmu dan raih Piagam Bintang Muslim!'
                  : 'Selesaikan kelima pos di atas terlebih dahulu untuk membuka ujian akhir.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60">
              {allCompleted ? (
                <button
                  onClick={onStartPostAssessment}
                  className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm inline-flex items-center justify-center gap-1.5 btn-tactile shadow-md"
                >
                  <span>Mulai Asesmen Akhir</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-center text-xs font-bold text-slate-500">
                  {5 - student.completedPosts.length} pos lagi yang harus diselesaikan
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
