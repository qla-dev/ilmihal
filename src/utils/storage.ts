import { NotificationSetting, UserProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'ilmihal_user_progress_v1';
const NOTIFICATION_STORAGE_KEY = 'ilmihal_notifications_v1';
const SELECTED_CITY_KEY = 'ilmihal_selected_city_v1';

export const DEFAULT_NOTIFICATIONS: NotificationSetting = {
  imsak: false,
  fajr: true,
  dhuhr: true,
  asr: true,
  maghrib: true,
  isha: true,
  minutesBefore: 0,
  soundEnabled: true
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessonIds: [],
  bookmarkedLessonIds: [],
  quizScores: {},
  prayedToday: {},
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDays: 1,
  tesbihCount: 0,
  fontSize: 'normal'
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Check if daily reset needed for prayedToday
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      // Calculate streak
      const lastDate = new Date(parsed.lastActiveDate);
      const currentDate = new Date(today);
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      let newStreak = parsed.streakDays || 1;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      const updated = {
        ...parsed,
        prayedToday: {},
        lastActiveDate: today,
        streakDays: newStreak
      };
      saveUserProgress(updated);
      return updated;
    }

    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadNotificationSettings(): NotificationSetting {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATIONS;
    return { ...DEFAULT_NOTIFICATIONS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_NOTIFICATIONS;
  }
}

export function saveNotificationSettings(settings: NotificationSetting) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function loadSelectedCity(): string {
  if (typeof window === 'undefined') return 'Sarajevo';
  try {
    return localStorage.getItem(SELECTED_CITY_KEY) || 'Sarajevo';
  } catch {
    return 'Sarajevo';
  }
}

export function saveSelectedCity(cityName: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SELECTED_CITY_KEY, cityName);
  } catch {
    // Ignore
  }
}
