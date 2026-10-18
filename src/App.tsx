/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenState, StudentProfile } from './types';
import { PILLARS_DATA } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PreAssessment } from './components/PreAssessment';
import { AdventureMap } from './components/AdventureMap';
import { PostDetail } from './components/PostDetail';
import { PostAssessment } from './components/PostAssessment';
import { ReflectionScreen } from './components/ReflectionScreen';
import { CertificateModal } from './components/CertificateModal';
import { GameZoneModal } from './components/GameZoneModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PBLModuleModal } from './components/PBLModuleModal';
import { playStarSound, playSuccessSound } from './utils/audio';

const STORAGE_KEY_CURRENT = 'pilar_student_active_v1';
const STORAGE_KEY_HISTORY = 'pilar_student_history_v1';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [transitionClass, setTransitionClass] = useState<string>('anim-screen-enter');
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [activePostId, setActivePostId] = useState<number>(1);
  const [isGameZoneOpen, setIsGameZoneOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isPblModuleOpen, setIsPblModuleOpen] = useState(false);
  const [allHistory, setAllHistory] = useState<StudentProfile[]>([]);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (savedStudent) {
        const parsed = JSON.parse(savedStudent) as StudentProfile;
        setStudent(parsed);
        // If student already has a profile, take them to map or appropriate step
        if (parsed.name) {
          if (parsed.preTestScore === null) {
            setTransitionClass('anim-screen-enter');
            setScreen('pre-assessment');
          } else if (parsed.completedAt) {
            setTransitionClass('anim-screen-zoom');
            setScreen('certificate');
          } else {
            setTransitionClass('anim-screen-enter');
            setScreen('map');
          }
        }
      }

      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setAllHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.warn('Failed to load local storage data', e);
    }
  }, []);

  // Save student updates
  const saveStudent = (updated: StudentProfile) => {
    setStudent(updated);
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save student profile', e);
    }
  };

  // 1. Start adventure from Welcome screen
  const handleStartAdventure = (name: string, avatar: 'raka' | 'rara') => {
    const newStudent: StudentProfile = {
      name,
      avatar,
      stars: 10, // initial welcome stars!
      completedPosts: [],
      badgesEarned: [],
      preTestScore: null,
      postTestScore: null,
      gameScores: {},
      reflections: null,
      createdAt: new Date().toISOString(),
    };
    saveStudent(newStudent);
    setTransitionClass('anim-screen-slide-right');
    setScreen('pre-assessment');
  };

  // 2. Complete Pre-Assessment
  const handleCompletePreAssessment = (score: number) => {
    if (!student) return;
    const updated: StudentProfile = {
      ...student,
      preTestScore: score,
      stars: student.stars + 20,
    };
    saveStudent(updated);
    playStarSound();
    setTransitionClass('anim-screen-zoom');
    setScreen('map');
  };

  // 3. Select a post on the Map
  const handleSelectPost = (postId: number) => {
    setActivePostId(postId);
    setTransitionClass('anim-screen-slide-right');
    setScreen('post-detail');
  };

  // Navigate back to map from post or other places
  const handleReturnToMap = () => {
    setTransitionClass('anim-screen-slide-left');
    setScreen('map');
  };

  // 4. Complete a learning post & mini-game
  const handleCompletePost = (postId: number, starsEarned: number, badgeId: string) => {
    if (!student) return;
    const nextCompleted = student.completedPosts.includes(postId)
      ? student.completedPosts
      : [...student.completedPosts, postId];

    const nextBadges = student.badgesEarned.includes(badgeId)
      ? student.badgesEarned
      : [...student.badgesEarned, badgeId];

    const updated: StudentProfile = {
      ...student,
      stars: student.stars + starsEarned,
      completedPosts: nextCompleted,
      badgesEarned: nextBadges,
    };
    saveStudent(updated);
    playStarSound();
    setTransitionClass('anim-screen-slide-left');
    setScreen('map');
  };

  // 4b. Solve PBL Scenario
  const handleSolvePbl = (postId: number, starsEarned: number) => {
    if (!student) return;
    const currentSolved = student.pblSolvedPosts || [];
    if (currentSolved.includes(postId)) return;

    const nextSolved = [...currentSolved, postId];
    const updated: StudentProfile = {
      ...student,
      stars: student.stars + starsEarned,
      pblSolvedPosts: nextSolved,
    };
    saveStudent(updated);
    playStarSound();
  };

  // 5. Arena Games recording
  const handleRecordGameScore = (gameKey: string, score: number) => {
    if (!student) return;
    const updated: StudentProfile = {
      ...student,
      stars: student.stars + score,
      gameScores: {
        ...student.gameScores,
        [gameKey]: Math.max(score, student.gameScores[gameKey] || 0),
      },
    };
    saveStudent(updated);
    playStarSound();
  };

  // 6. Complete Post Assessment
  const handleCompletePostAssessment = (score: number) => {
    if (!student) return;
    const updated: StudentProfile = {
      ...student,
      postTestScore: score,
      stars: student.stars + 30,
    };
    saveStudent(updated);
    setTransitionClass('anim-screen-slide-right');
    setScreen('reflection');
  };

  // 7. Finish Reflection
  const handleFinishReflection = (reflectionData: {
    favoritePillar: string;
    habitCommitment: string[];
    feeling: string;
  }) => {
    if (!student) return;
    const finishedStudent: StudentProfile = {
      ...student,
      reflections: reflectionData,
      completedAt: new Date().toISOString(),
      stars: student.stars + 25,
    };
    saveStudent(finishedStudent);

    // Save to history list
    const updatedHistory = [finishedStudent, ...allHistory.filter((h) => h.createdAt !== finishedStudent.createdAt)];
    setAllHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn('Failed to save history', e);
    }

    setTransitionClass('anim-screen-zoom');
    setScreen('certificate');
  };

  // Reset student progress (from Teacher dashboard or Certificate restart)
  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    setStudent(null);
    setTransitionClass('anim-screen-enter');
    setScreen('welcome');
  };

  const handleNavClick = (target: ScreenState) => {
    if (target === 'map') {
      setTransitionClass('anim-screen-slide-left');
    } else {
      setTransitionClass('anim-screen-enter');
    }
    setScreen(target);
  };

  const activePost = PILLARS_DATA.find((p) => p.id === activePostId) || PILLARS_DATA[0];
  const screenKey = screen === 'post-detail' ? `post-detail-${activePostId}` : screen;

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/70 text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden">
      {/* Child-friendly Navigation Bar */}
      <Navbar
        student={student}
        currentScreen={screen}
        onNavigate={handleNavClick}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenGamesHub={() => setIsGameZoneOpen(true)}
        onOpenPblModule={() => setIsPblModuleOpen(true)}
      />

      {/* Main Dynamic View Area with smooth animated transition */}
      <main className="flex-1 pb-12 overflow-x-hidden">
        <div key={screenKey} className={transitionClass}>
          {screen === 'welcome' && (
            <WelcomeScreen
              defaultName={student?.name || ''}
              defaultAvatar={student?.avatar || 'raka'}
              onStart={handleStartAdventure}
              onOpenPblModule={() => setIsPblModuleOpen(true)}
            />
          )}

          {screen === 'pre-assessment' && student && (
            <PreAssessment
              studentName={student.name}
              onComplete={handleCompletePreAssessment}
            />
          )}

          {screen === 'map' && student && (
            <AdventureMap
              student={student}
              onSelectPost={handleSelectPost}
              onOpenGamesHub={() => setIsGameZoneOpen(true)}
              onOpenPblModule={() => setIsPblModuleOpen(true)}
              onStartPostAssessment={() => {
                setTransitionClass('anim-screen-slide-right');
                setScreen('post-assessment');
              }}
            />
          )}

          {screen === 'post-detail' && student && (
            <PostDetail
              post={activePost}
              student={student}
              onBackToMap={handleReturnToMap}
              onCompletePost={handleCompletePost}
              onSolvePbl={handleSolvePbl}
            />
          )}

          {screen === 'post-assessment' && student && (
            <PostAssessment
              studentName={student.name}
              preTestScore={student.preTestScore}
              onComplete={handleCompletePostAssessment}
            />
          )}

          {screen === 'reflection' && student && (
            <ReflectionScreen
              student={student}
              onFinishReflection={handleFinishReflection}
            />
          )}

          {screen === 'certificate' && student && (
            <CertificateModal
              student={student}
              onRestartAdventure={handleResetProgress}
            />
          )}
        </div>
      </main>

      {/* Arena 6 Game Interaktif Modal */}
      <GameZoneModal
        isOpen={isGameZoneOpen}
        onClose={() => setIsGameZoneOpen(false)}
        onRecordScore={handleRecordGameScore}
        studentStars={student?.stars || 0}
      />

      {/* Teacher Dashboard Portal */}
      <TeacherDashboard
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        currentStudent={student}
        allHistory={allHistory}
        onResetStudentProgress={handleResetProgress}
        onOpenPblModule={() => setIsPblModuleOpen(true)}
      />

      {/* Problem-Based Learning (PBL) Innovation Module Modal */}
      <PBLModuleModal
        isOpen={isPblModuleOpen}
        onClose={() => setIsPblModuleOpen(false)}
      />
    </div>
  );
}
