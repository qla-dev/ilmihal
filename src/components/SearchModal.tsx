import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { ILMIHAL_LESSONS } from '../data/ilmihalLessons';
import { SURAHS_AND_DUAS } from '../data/surahsAndDuas';
import { Lesson, SurahOrDua } from '../types';
import { soundService } from '../utils/soundAndSpeech';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onSelectDua?: (dua: SurahOrDua) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectDua
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim() || query.length < 2) return { lessons: [], duas: [] };

    const q = query.toLowerCase();

    const matchedLessons = ILMIHAL_LESSONS.filter(l => {
      const inTitle = l.title.toLowerCase().includes(q);
      const inSubtitle = l.subtitle.toLowerCase().includes(q);
      const inSummary = l.summary.toLowerCase().includes(q);
      const inSections = l.contentSections.some(s => 
        s.title.toLowerCase().includes(q) || s.body.some(b => b.toLowerCase().includes(q))
      );
      return inTitle || inSubtitle || inSummary || inSections;
    });

    const matchedDuas = SURAHS_AND_DUAS.filter(d => {
      return (
        d.title.toLowerCase().includes(q) ||
        d.transliteration.toLowerCase().includes(q) ||
        d.translation.toLowerCase().includes(q)
      );
    });

    return { lessons: matchedLessons, duas: matchedDuas };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#16302B]/40 backdrop-blur-xs flex flex-col p-4 animate-fadeIn">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-[#E2E1D9] shadow-md flex flex-col max-h-[85vh] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E2E1D9] flex items-center space-x-2 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#16302B] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pretraži imanske šarte, abdest, namaze, sure..."
            autoFocus
            className="w-full bg-transparent text-sm text-[#2C3333] placeholder-[#8A8875] focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#636B69] hover:text-[#2C3333]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => {
              soundService.playClick();
              onClose();
            }}
            className="text-xs text-[#636B69] hover:text-[#2C3333] px-2 py-1 font-bold"
          >
            Zatvori
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {query.trim().length < 2 ? (
            <div className="text-center py-8 text-[#8A8875] text-xs space-y-2 font-medium">
              <Search className="w-8 h-8 mx-auto opacity-40 text-[#16302B]" />
              <p>Unesite pojam za pretragu (npr. "abdest", "sabah", "meleki", "fatiha")</p>
            </div>
          ) : searchResults.lessons.length === 0 && searchResults.duas.length === 0 ? (
            <div className="text-center py-8 text-[#636B69] text-xs font-medium">
              Nema pronađenih rezultata za "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Lessons Results */}
              {searchResults.lessons.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B4332]">
                    Lekcije u Ilmihalu ({searchResults.lessons.length})
                  </span>
                  {searchResults.lessons.map(lesson => (
                    <div
                      key={lesson.id}
                      onClick={() => {
                        soundService.playClick();
                        onSelectLesson(lesson);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-[#FAF9F5] hover:bg-[#F5F4F0] border border-[#E2E1D9] cursor-pointer flex items-center justify-between transition-colors shadow-xs"
                    >
                      <div>
                        <span className="text-[10px] text-[#1B4332] font-bold">{lesson.categoryTitle}</span>
                        <h4 className="text-xs font-bold text-[#16302B]">{lesson.title}</h4>
                        <p className="text-[11px] text-[#636B69] line-clamp-1 font-medium">{lesson.summary}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8A8875] flex-shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              )}

              {/* Duas Results */}
              {searchResults.duas.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A6016]">
                    Sure i Dove ({searchResults.duas.length})
                  </span>
                  {searchResults.duas.map(dua => (
                    <div
                      key={dua.id}
                      className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E2E1D9] shadow-xs"
                    >
                      <h4 className="text-xs font-bold text-[#16302B]">{dua.title}</h4>
                      <p className="text-sm font-arabic text-[#16302B] text-right truncate font-bold py-0.5" dir="rtl">{dua.arabic}</p>
                      <p className="text-[11px] text-[#636B69] italic line-clamp-1 font-medium">{dua.translation}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
