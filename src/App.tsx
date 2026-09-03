import React, { useState, useEffect, useMemo } from 'react';
import { TabType, Lesson, CityInfo, NotificationSetting, UserProgress } from './types';
import { ILMIHAL_LESSONS } from './data/ilmihalLessons';
import { POPULAR_CITIES } from './data/citiesVaktija';
import { calculatePrayerTimes } from './utils/prayerTimes';
import { 
  loadUserProgress, 
  saveUserProgress, 
  loadNotificationSettings, 
  saveNotificationSettings,
  loadSelectedCity,
  saveSelectedCity,
  DEFAULT_PROGRESS
} from './utils/storage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LessonsView } from './components/LessonsView';
import { LessonDetailModal } from './components/LessonDetailModal';
import { QuizView } from './components/QuizView';
import { PrayerTimesView } from './components/PrayerTimesView';
import { QiblaCompass } from './components/QiblaCompass';
import { NamazModeModal } from './components/NamazModeModal';
import { SurahsAndDuasView } from './components/SurahsAndDuasView';
import { SearchModal } from './components/SearchModal';
import { soundService } from './utils/soundAndSpeech';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('lessons');
  const [userProgress, setUserProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [notifications, setNotifications] = useState<NotificationSetting>(loadNotificationSettings);
  const [selectedCityName, setSelectedCityName] = useState<string>('Sarajevo');
  
  // Modals & Active Selections
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [focusPrayerName, setFocusPrayerName] = useState<string>('Namaz');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilterCategoryId, setActiveFilterCategoryId] = useState<string | null>(null);

  // Initialize persistence on mount
  useEffect(() => {
    const loadedProgress = loadUserProgress();
    setUserProgress(loadedProgress);
    const loadedCity = loadSelectedCity();
    setSelectedCityName(loadedCity);
  }, []);

  // Update user progress helper
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setUserProgress(prev => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  };

  // City change handler
  const handleSelectCity = (city: CityInfo) => {
    setSelectedCityName(city.name);
    saveSelectedCity(city.name);
  };

  // Notification settings change
  const handleUpdateNotifications = (newSettings: NotificationSetting) => {
    setNotifications(newSettings);
    saveNotificationSettings(newSettings);
  };

  // Bookmark toggle
  const handleToggleBookmark = (lessonId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    updateProgress(prev => {
      const isBookmarked = prev.bookmarkedLessonIds.includes(lessonId);
      const updated = isBookmarked
        ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
        : [...prev.bookmarkedLessonIds, lessonId];
      return { ...prev, bookmarkedLessonIds: updated };
    });
  };

  // Lesson complete toggle
  const handleToggleComplete = (lessonId: string) => {
    updateProgress(prev => {
      const isCompleted = prev.completedLessonIds.includes(lessonId);
      const updated = isCompleted
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];
      return { ...prev, completedLessonIds: updated };
    });
  };

  // Prayer tracking toggle
  const handleTogglePrayed = (prayerKey: string) => {
    updateProgress(prev => {
      const current = prev.prayedToday[prayerKey] || false;
      return {
        ...prev,
        prayedToday: {
          ...prev.prayedToday,
          [prayerKey]: !current
        }
      };
    });
  };

  // Guided prayer completion is idempotent; it must never uncheck an already-recorded prayer.
  const handleRecordPrayed = (prayerKey: string) => {
    updateProgress(prev => ({
      ...prev,
      prayedToday: { ...prev.prayedToday, [prayerKey]: true }
    }));
  };

  // Quiz score save
  const handleSaveQuizScore = (quizId: string, score: number, total: number) => {
    updateProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizId]: {
          score,
          total,
          date: new Date().toISOString()
        }
      }
    }));
  };

  // Font size change
  const handleChangeFontSize = (fontSize: 'normal' | 'large' | 'xlarge') => {
    updateProgress(prev => ({ ...prev, fontSize }));
  };

  // Calculate current next prayer for top header
  const activeCity = useMemo(() => {
    return POPULAR_CITIES.find(c => c.name === selectedCityName) || POPULAR_CITIES[0];
  }, [selectedCityName]);

  const nextPrayerText = useMemo(() => {
    const prayers = calculatePrayerTimes(new Date(), activeCity.lat, activeCity.lng);
    const next = prayers.find(p => p.isNext) || prayers[1];
    return next ? `${next.name}: ${next.time}` : undefined;
  }, [activeCity]);

  // Start specific quiz from lesson
  const handleStartQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setActiveTab('quizzes');
  };

  // Open Focus Mode with specific prayer
  const handleOpenFocus = (prayerName?: string) => {
    if (prayerName) setFocusPrayerName(prayerName);
    setIsFocusModeOpen(true);
  };

  // Navigate to lesson from quiz explanation
  const handleNavigateToLesson = (lessonId: string) => {
    const lesson = ILMIHAL_LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#2C3333] flex flex-col font-sans select-none">
      {/* Top Application Header */}
      <Header
        streakDays={userProgress.streakDays}
        completedCount={userProgress.completedLessonIds.length}
        totalLessons={ILMIHAL_LESSONS.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => {
          setActiveTab('lessons');
        }}
        bookmarkedCount={userProgress.bookmarkedLessonIds.length}
        cityName={selectedCityName}
        nextPrayerText={nextPrayerText}
        onOpenFocusMode={() => handleOpenFocus()}
      />

      {/* Main Content Area Container */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-3">
        {activeTab === 'lessons' && (
          <LessonsView
            completedLessonIds={userProgress.completedLessonIds}
            bookmarkedLessonIds={userProgress.bookmarkedLessonIds}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            onToggleBookmark={handleToggleBookmark}
            onStartQuiz={handleStartQuiz}
            activeFilterCategoryId={activeFilterCategoryId}
            onSelectCategoryFilter={(catId) => setActiveFilterCategoryId(catId)}
          />
        )}

        {activeTab === 'quizzes' && (
          <QuizView
            onSaveQuizScore={handleSaveQuizScore}
            savedScores={userProgress.quizScores}
            initialQuizId={activeQuizId}
            onNavigateToLesson={handleNavigateToLesson}
          />
        )}

        {activeTab === 'vaktija' && (
          <PrayerTimesView
            selectedCityName={selectedCityName}
            onSelectCity={handleSelectCity}
            notifications={notifications}
            onUpdateNotifications={handleUpdateNotifications}
            prayedToday={userProgress.prayedToday}
            onTogglePrayed={handleTogglePrayed}
            onOpenQibla={() => setActiveTab('qibla')}
            onOpenFocusMode={handleOpenFocus}
          />
        )}

        {activeTab === 'qibla' && (
          <QiblaCompass
            selectedCityName={selectedCityName}
            onSelectCity={handleSelectCity}
          />
        )}

        {activeTab === 'focus' && (
          <NamazModeModal
            initialPrayerName={focusPrayerName}
            onClose={() => setActiveTab('vaktija')}
            onRecordPrayer={handleRecordPrayed}
          />
        )}

        {activeTab === 'duas' && (
          <SurahsAndDuasView />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'quizzes') {
            setActiveQuizId(null);
          }
        }}
        nextPrayerName={nextPrayerText}
      />

      {/* Lesson Reader Modal */}
      {selectedLesson && (
        <LessonDetailModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          isCompleted={userProgress.completedLessonIds.includes(selectedLesson.id)}
          isBookmarked={userProgress.bookmarkedLessonIds.includes(selectedLesson.id)}
          onToggleComplete={handleToggleComplete}
          onToggleBookmark={(id) => handleToggleBookmark(id)}
          onStartQuiz={handleStartQuiz}
          fontSize={userProgress.fontSize}
          onChangeFontSize={handleChangeFontSize}
        />
      )}

      {/* Fullscreen Interactive Namaz Mode Modal */}
      {isFocusModeOpen && (
        <NamazModeModal
          initialPrayerName={focusPrayerName}
          onClose={() => setIsFocusModeOpen(false)}
          onRecordPrayer={handleRecordPrayed}
        />
      )}

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={(lesson) => setSelectedLesson(lesson)}
      />
    </div>
  );
}
