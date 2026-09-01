export type TabType = 'lessons' | 'quizzes' | 'vaktija' | 'qibla' | 'focus' | 'duas';

export interface Lesson {
  id: string;
  categoryId: string;
  categoryTitle: string;
  title: string;
  subtitle: string;
  order: number;
  readTimeMinutes: number;
  summary: string;
  arabicSnippet?: string;
  arabicMeaning?: string;
  contentSections: LessonSection[];
  keyPoints: string[];
  illustrationType?: 'steps' | 'list' | 'table' | 'quote';
  relatedQuizId?: string;
}

export interface LessonSection {
  title: string;
  body: string[];
  arabic?: string;
  transliteration?: string;
  translation?: string;
  steps?: { stepNumber: number; title: string; description: string; note?: string }[];
  importantNote?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  referenceLessonId?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  badgeColor: string;
}

export interface PrayerTime {
  name: 'Zora (Imsak)' | 'Sabah (Fajr)' | 'Izlazak sunca' | 'Podne (Dhuhr)' | 'Ikindija (Asr)' | 'Akšam (Maghrib)' | 'Jacija (Isha)';
  key: 'imsak' | 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  time: string; // "04:45"
  dateObj: Date;
  isNext: boolean;
  isPast: boolean;
  isCurrent: boolean;
  rekats: string;
  description: string;
}

export interface CityInfo {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

export interface NotificationSetting {
  imsak: boolean;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  minutesBefore: number; // e.g. 0 for on-time, 15 for 15 min before
  soundEnabled: boolean;
}

export interface SurahOrDua {
  id: string;
  title: string;
  subtitle: string;
  category: 'namaska-dova' | 'kratka-sura' | 'asereta' | 'kuranske-dove' | 'svakodnevni-zikr' | 'jutarnji-zikr' | 'vecernji-zikr';
  arabic: string;
  transliteration: string;
  translation: string;
  benefits?: string;
  audioPromptText?: string;
  audioUrl?: string;
  audioUrls?: string[];
  adhkarType?: 0 | 1 | 2;
  order?: number;
}

export interface UserProgress {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  quizScores: Record<string, { score: number; total: number; date: string }>;
  prayedToday: Record<string, boolean>; // key: fajr, dhuhr, asr, maghrib, isha
  lastActiveDate: string;
  streakDays: number;
  tesbihCount: number;
  fontSize: 'normal' | 'large' | 'xlarge';
}
