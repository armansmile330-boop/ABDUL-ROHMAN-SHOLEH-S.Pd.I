export type ScreenState =
  | 'welcome'
  | 'pre-assessment'
  | 'map'
  | 'post-detail'
  | 'post-game'
  | 'games-hub'
  | 'post-assessment'
  | 'reflection'
  | 'certificate';

export interface PBLScenario {
  problemTitle: string;
  situation: string;
  dilemmaQuestion: string;
  clues: string[];
  options: {
    id: string;
    text: string;
    isBestSolution: boolean;
    feedback: string;
  }[];
  learningOutcome: string;
}

export interface StudentProfile {
  name: string;
  avatar: 'raka' | 'rara';
  stars: number;
  completedPosts: number[]; // [1, 2, 3, 4, 5]
  pblSolvedPosts?: number[]; // [1, 2, 3, 4, 5]
  badgesEarned: string[]; // ['syahadat', 'salat', 'zakat', 'ramadan', 'haji']
  preTestScore: number | null;
  postTestScore: number | null;
  gameScores: Record<string, number>;
  reflections: {
    favoritePillar: string;
    habitCommitment: string[];
    feeling: string;
  } | null;
  createdAt: string;
  completedAt?: string;
}

export interface PillarPost {
  id: number;
  number: number;
  name: string;
  subtitle: string;
  arabic?: string;
  arabicTransliteration?: string;
  meaning: string;
  explanation: string;
  dailyLifeExample: string;
  pblScenario: PBLScenario;
  badgeId: string;
  badgeName: string;
  badgeIcon: string;
  themeColor: {
    primary: string;
    bgLight: string;
    border: string;
    text: string;
    accent: string;
  };
  gameType: 'syahadat-match' | 'salat-time' | 'zakat-share' | 'ramadan-actions' | 'haji-journey';
}

export interface QuizQuestion {
  id: number;
  question: string;
  audioPrompt?: string;
  options: {
    id: string;
    text: string;
    imageType: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface BadgeInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  iconName: string;
}
