import React, { useState } from 'react';
import { ArrowLeft, Volume2, Award, Play, CheckCircle, Sparkles, BookOpen } from 'lucide-react';
import { PillarPost, StudentProfile } from '../types';
import { PostSceneIllustration } from './Illustrations';
import { CharacterDialogue } from './Characters';
import { PBLCaseSection } from './PBLCaseSection';
import {
  Post1MiniGame,
  Post2MiniGame,
  Post3MiniGame,
  Post4MiniGame,
  Post5MiniGame,
} from './games/PostMiniGames';
import { playPopSound, speakIndonesian } from '../utils/audio';

interface PostDetailProps {
  post: PillarPost;
  student: StudentProfile;
  onBackToMap: () => void;
  onCompletePost: (postId: number, starsEarned: number, badgeId: string) => void;
  onSolvePbl?: (postId: number, starsEarned: number) => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  student,
  onBackToMap,
  onCompletePost,
  onSolvePbl,
}) => {
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const isCompleted = student.completedPosts.includes(post.id);

  const handleSpeakFullExplanation = () => {
    playPopSound();
    const narration = `${post.name}. ${post.meaning}. ${post.explanation}. Contoh sehari-hari: ${post.dailyLifeExample}`;
    speakIndonesian(narration);
  };

  const handleSpeakArabic = () => {
    playPopSound();
    if (post.arabicTransliteration) {
      speakIndonesian(post.arabicTransliteration);
    }
  };

  const handleGameWin = (stars: number) => {
    onCompletePost(post.id, stars, post.badgeId);
    setIsPlayingGame(false);
  };

  const renderMiniGame = () => {
    switch (post.id) {
      case 1:
        return <Post1MiniGame onWin={handleGameWin} onBack={() => setIsPlayingGame(false)} />;
      case 2:
        return <Post2MiniGame onWin={handleGameWin} onBack={() => setIsPlayingGame(false)} />;
      case 3:
        return <Post3MiniGame onWin={handleGameWin} onBack={() => setIsPlayingGame(false)} />;
      case 4:
        return <Post4MiniGame onWin={handleGameWin} onBack={() => setIsPlayingGame(false)} />;
      case 5:
        return <Post5MiniGame onWin={handleGameWin} onBack={() => setIsPlayingGame(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 anim-screen-enter">
      {/* Top Navigation bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            playPopSound();
            onBackToMap();
          }}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-extrabold text-sm inline-flex items-center gap-2 border-2 border-slate-200 btn-tactile shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Lencana Diraih!
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            Pos Ke-{post.number} dari 5
          </span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-emerald-300 p-6 sm:p-8 shadow-2xl space-y-6 anim-screen-slide-right">
        {/* Post Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-2 border-slate-100">
          <div className="w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center bg-emerald-50 rounded-3xl border-3 border-emerald-200 shadow-inner">
            <PostSceneIllustration
              type={post.gameType.replace('-match', '').replace('-time', '').replace('-share', '').replace('-actions', '').replace('-journey', '')}
              size={135}
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Rukun Islam Ke-{post.number}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              {post.name}
            </h2>
            <p className="text-base sm:text-lg font-bold text-teal-700 mt-1">
              {post.subtitle}
            </p>
            <p className="text-slate-600 text-sm mt-2 font-medium leading-relaxed">
              {post.meaning}
            </p>

            {/* Audio Button */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <button
                onClick={handleSpeakFullExplanation}
                className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 btn-tactile shadow-md"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Penjelasan Materi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Special Arabic Box for Pos 1 Syahadat */}
        {post.arabic && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-3 border-emerald-300 text-center shadow-inner">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Lafaz Dua Kalimat Syahadat
            </span>
            <div className="my-3 font-arabic text-2xl sm:text-3xl text-emerald-950 font-bold leading-loose dir-rtl px-2">
              {post.arabic}
            </div>
            <p className="text-xs sm:text-sm font-semibold italic text-emerald-800 max-w-xl mx-auto">
              &ldquo;{post.arabicTransliteration}&rdquo;
            </p>
            <button
              onClick={handleSpeakArabic}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-emerald-400 text-emerald-800 text-xs font-bold shadow-sm hover:bg-emerald-100"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan Pelafalan</span>
            </button>
          </div>
        )}

        {/* Detailed Explanation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Explanation Box */}
          <div className="p-5 rounded-2xl bg-sky-50/70 border-2 border-sky-200">
            <h4 className="font-extrabold text-sky-900 text-base font-heading flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-600" />
              <span>Mengenal Lebih Dekat</span>
            </h4>
            <p className="mt-2 text-slate-700 text-sm font-medium leading-relaxed">
              {post.explanation}
            </p>
          </div>

          {/* Daily Life Example Box */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
            <h4 className="font-extrabold text-amber-900 text-base font-heading flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Contoh Pengamalan Sehari-hari</span>
            </h4>
            <p className="mt-2 text-slate-700 text-sm font-medium leading-relaxed">
              {post.dailyLifeExample}
            </p>
          </div>
        </div>

        {/* PBL Authentic Problem Section */}
        {post.pblScenario && (
          <PBLCaseSection
            scenario={post.pblScenario}
            postNumber={post.number}
            isSolved={student.pblSolvedPosts?.includes(post.id) || false}
            onSolve={(stars) => onSolvePbl?.(post.id, stars)}
          />
        )}

        {/* Character Dialogue Guide */}
        <CharacterDialogue
          speaker="Rara"
          characterType="rara"
          text={`Hebat sekali ${student.name}! Sekarang, yuk mainkan misi tantangan di pos ini untuk membuka Lencana ${post.badgeName}!`}
        />

        {/* Mini Game Section */}
        {!isPlayingGame ? (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-center shadow-lg">
            <Award className="w-12 h-12 mx-auto text-amber-300 mb-2" />
            <h3 className="text-2xl font-black font-heading">
              Misi Interaktif Pos {post.number}
            </h3>
            <p className="text-teal-100 text-sm font-medium max-w-md mx-auto mt-1">
              Selesaikan tantangan seru ini untuk membuktikan pemahamanmu dan raih +30 Bintang!
            </p>

            <button
              onClick={() => {
                playPopSound();
                setIsPlayingGame(true);
              }}
              className="mt-4 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-lg inline-flex items-center gap-2 btn-tactile shadow-xl active:scale-95"
            >
              <Play className="w-6 h-6 fill-amber-950" />
              <span>MAIN MISI POS INI</span>
            </button>
          </div>
        ) : (
          <div className="mt-4 anim-screen-slide-right">
            {renderMiniGame()}
          </div>
        )}
      </div>
    </div>
  );
};
