import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  ArrowLeft,
  Search,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ILMIHAL_CATEGORIES, ILMIHAL_LESSONS } from '../data/ilmihalLessons';
import { Category, Lesson } from '../types';
import { soundService } from '../utils/soundAndSpeech';
import { IslamicIcon } from './IslamicIcons';

interface LessonsViewProps {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  onSelectLesson: (lesson: Lesson) => void;
  onToggleBookmark: (lessonId: string, e: React.MouseEvent) => void;
  onStartQuiz: (quizId: string) => void;
  activeFilterCategoryId: string | null;
  onSelectCategoryFilter: (categoryId: string | null) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  completedLessonIds,
  bookmarkedLessonIds,
  onSelectLesson,
  onToggleBookmark,
  onStartQuiz,
  activeFilterCategoryId,
  onSelectCategoryFilter
}) => {
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected category object (if any)
  const currentCategory = activeFilterCategoryId 
    ? ILMIHAL_CATEGORIES.find(c => c.id === activeFilterCategoryId) || null 
    : null;

  // Filter lessons
  const filteredLessons = ILMIHAL_LESSONS.filter(lesson => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesText = 
        lesson.title.toLowerCase().includes(q) || 
        lesson.subtitle.toLowerCase().includes(q) || 
        lesson.summary.toLowerCase().includes(q) ||
        lesson.categoryTitle.toLowerCase().includes(q);
      if (!matchesText) return false;
    }

    if (showBookmarksOnly) {
      return bookmarkedLessonIds.includes(lesson.id);
    }

    if (activeFilterCategoryId) {
      return lesson.categoryId === activeFilterCategoryId;
    }

    return true;
  });

  const progressPercentage = Math.round((completedLessonIds.length / ILMIHAL_LESSONS.length) * 100);

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Progress & Quick Stats Card */}
      <div className="bg-[#16302B] rounded-2xl p-4 border border-[#16302B] shadow-sm relative overflow-hidden text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <h2 className="text-sm font-bold text-white">Vaš napredak u Ilmihalu</h2>
            </div>
            <p className="text-xs text-[#DDD9CF] mt-0.5">
              Savladano {completedLessonIds.length} od {ILMIHAL_LESSONS.length} lekcija
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-[#C29B38]">{progressPercentage}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#234E45] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C29B38] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Top Header Controls: Bookmarks toggle & Category Back button */}
      <div className="flex items-center justify-between px-1">
        {currentCategory || showBookmarksOnly ? (
          <button
            id="back-to-categories-btn"
            onClick={() => {
              soundService.playClick();
              setShowBookmarksOnly(false);
              onSelectCategoryFilter(null);
            }}
            className="flex items-center text-xs font-bold text-[#16302B] hover:text-[#1B4332] bg-white hover:bg-[#FAF9F5] px-3 py-1.5 rounded-xl border border-[#E2E1D9] shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Sve kategorije</span>
          </button>
        ) : (
          <span className="text-xs font-bold text-[#636B69] uppercase tracking-wider">
            Oblasti učenja
          </span>
        )}

        <button
          id="filter-bookmarks-toggle-btn"
          onClick={() => {
            soundService.playClick();
            setShowBookmarksOnly(!showBookmarksOnly);
            if (!showBookmarksOnly) {
              onSelectCategoryFilter(null);
            }
          }}
          className={`text-xs flex items-center space-x-1.5 px-3 py-1.5 rounded-xl transition-all font-semibold shadow-2xs ${
            showBookmarksOnly
              ? 'bg-[#FEF7EA] text-[#8A6016] border border-[#B58D3D]/30 ring-1 ring-[#B58D3D]/20'
              : 'bg-white text-[#636B69] hover:text-[#2C3333] hover:bg-[#FAF9F5] border border-[#E2E1D9]'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-[#B58D3D] text-[#B58D3D]' : ''}`} />
          <span>Sačuvano ({bookmarkedLessonIds.length})</span>
        </button>
      </div>

      {/* MAIN VIEW MODE 1: ALL CATEGORIES GRID (When no category is selected and not in bookmark mode) */}
      {!currentCategory && !showBookmarksOnly && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {ILMIHAL_CATEGORIES.map((category) => {
              const categoryLessons = ILMIHAL_LESSONS.filter(l => l.categoryId === category.id);
              const completedCount = categoryLessons.filter(l => completedLessonIds.includes(l.id)).length;

              return (
                <div
                  key={category.id}
                  id={`ilmihal-category-card-${category.id}`}
                  onClick={() => {
                    soundService.playClick();
                    onSelectCategoryFilter(category.id);
                  }}
                  className="group bg-white hover:bg-[#FAF9F5] rounded-2xl p-4 border border-[#E2E1D9] hover:border-[#16302B]/30 hover:shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F4F0] border border-[#E2E1D9] text-[#16302B] group-hover:bg-[#E8F0EC] group-hover:text-[#1B4332] group-hover:border-[#2D6A4F]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      <IslamicIcon name={category.id} className="w-6 h-6" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-[#16302B] group-hover:text-[#1B4332] transition-colors truncate">
                          {category.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#636B69] line-clamp-1 font-medium mt-0.5">
                        {category.badge} • {categoryLessons.length} lekcija
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    {completedCount === categoryLessons.length && categoryLessons.length > 0 ? (
                      <span className="w-6 h-6 rounded-full bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    ) : completedCount > 0 ? (
                      <span className="text-[11px] font-bold text-[#1B4332] bg-[#E8F0EC] px-2 py-0.5 rounded-md border border-[#2D6A4F]/20">
                        {completedCount}/{categoryLessons.length}
                      </span>
                    ) : null}
                    <ChevronRight className="w-5 h-5 text-[#8A8875] group-hover:text-[#16302B] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN VIEW MODE 2: LECTURE CARDS VIEW (When a category is active OR in Bookmarked mode) */}
      {(currentCategory || showBookmarksOnly) && (
        <div className="space-y-3">
          {/* Category Header Banner */}
          {currentCategory && (
            <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-2xs">
              <div className="flex items-start space-x-3">
                <div className="w-11 h-11 rounded-xl bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20 flex items-center justify-center flex-shrink-0">
                  <IslamicIcon name={currentCategory.id} className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[#16302B]">{currentCategory.title}</h2>
                    <span className="text-xs font-semibold text-[#636B69] bg-[#F5F4F0] px-2.5 py-0.5 rounded-md border border-[#E2E1D9]">
                      {filteredLessons.length} lekcija
                    </span>
                  </div>
                  <p className="text-xs text-[#636B69] mt-1.5 leading-relaxed font-normal">
                    {currentCategory.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {showBookmarksOnly && (
            <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-2xs">
              <div className="flex items-center space-x-2 text-[#8A6016]">
                <Bookmark className="w-5 h-5 fill-[#B58D3D]" />
                <h2 className="text-base font-bold text-[#16302B]">Sačuvane lekcije</h2>
              </div>
              <p className="text-xs text-[#636B69] mt-1">
                Pregled lekcija koje ste označili za ponavljanje i brzo čitanje.
              </p>
            </div>
          )}

          {/* Grid of Lecture Cards */}
          {filteredLessons.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#E2E1D9] shadow-2xs">
              <Bookmark className="w-10 h-10 mx-auto text-[#8A8875] mb-2 opacity-50" />
              <p className="text-[#636B69] text-sm">Nema pronađenih lekcija.</p>
              {showBookmarksOnly && (
                <p className="text-xs text-[#8A8875] mt-1">
                  Kliknite na ikonicu zabilješke na bilo kojoj lekciji da je sačuvate ovdje.
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredLessons.map((lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isBookmarked = bookmarkedLessonIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    id={`lesson-card-${lesson.id}`}
                    onClick={() => {
                      soundService.playClick();
                      onSelectLesson(lesson);
                    }}
                    className={`group relative bg-white hover:bg-[#FAF9F5] transition-all duration-200 rounded-2xl p-4 border cursor-pointer shadow-2xs flex flex-col justify-between ${
                      isCompleted
                        ? 'border-[#2D6A4F]/30 bg-[#FAF9F5]'
                        : 'border-[#E2E1D9] hover:border-[#16302B]/30 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Title & Subtitle + Bookmark button */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start space-x-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[#F5F4F0] border border-[#E2E1D9] text-[#16302B] group-hover:bg-[#E8F0EC] group-hover:text-[#1B4332] group-hover:border-[#2D6A4F]/20 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5">
                            <IslamicIcon name={lesson.id} className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-[#16302B] group-hover:text-[#1B4332] transition-colors leading-snug">
                              {lesson.title}
                            </h3>
                            <p className="text-xs text-[#636B69] mt-0.5 font-medium line-clamp-1">
                              {lesson.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Bookmark button */}
                        <button
                          id={`bookmark-btn-${lesson.id}`}
                          onClick={(e) => onToggleBookmark(lesson.id, e)}
                          title={isBookmarked ? 'Ukloni iz sačuvanih' : 'Sačuvaj lekciju'}
                          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                            isBookmarked
                              ? 'text-[#B58D3D] bg-[#FEF7EA] hover:bg-[#FDEED1]'
                              : 'text-[#8A8875] hover:text-[#2C3333] hover:bg-[#F5F4F0]'
                          }`}
                        >
                          {isBookmarked ? (
                            <BookmarkCheck className="w-4 h-4 fill-[#B58D3D]" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Arabic snippet if available */}
                      {lesson.arabicSnippet && (
                        <div className="mt-2.5 py-1.5 px-2.5 rounded-xl bg-[#F5F4F0] border border-[#E2E1D9] text-right">
                          <p className="font-arabic text-xs text-[#16302B] leading-relaxed truncate" dir="rtl">
                            {lesson.arabicSnippet}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata row */}
                    <div className="mt-3 pt-2.5 border-t border-[#E2E1D9] flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center text-[11px] text-[#636B69] font-medium">
                          <Clock className="w-3 h-3 mr-1 text-[#8A8875]" />
                          {lesson.readTimeMinutes} min
                        </span>
                        {isCompleted && (
                          <span className="flex items-center text-[10px] text-[#1B4332] font-semibold bg-[#E8F0EC] px-1.5 py-0.5 rounded border border-[#2D6A4F]/20">
                            <CheckCircle2 className="w-3 h-3 mr-0.5" />
                            Naučeno
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1">
                        {lesson.relatedQuizId && (
                          <button
                            id={`start-quiz-btn-${lesson.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              soundService.playClick();
                              onStartQuiz(lesson.relatedQuizId!);
                            }}
                            className="flex items-center text-[10px] text-[#8A6016] bg-[#FEF7EA] hover:bg-[#FDEED1] px-2 py-0.5 rounded-md border border-[#B58D3D]/30 font-semibold transition-colors"
                          >
                            <HelpCircle className="w-3 h-3 mr-1 text-[#B58D3D]" />
                            Kviz
                          </button>
                        )}
                        <ChevronRight className="w-4 h-4 text-[#8A8875] group-hover:text-[#16302B] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
