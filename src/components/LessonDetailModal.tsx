import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  HelpCircle, 
  ArrowLeft,
  Share2,
  Check,
  Type
} from 'lucide-react';
import { Lesson } from '../types';
import { soundService } from '../utils/soundAndSpeech';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleComplete: (lessonId: string) => void;
  onToggleBookmark: (lessonId: string) => void;
  onStartQuiz: (quizId: string) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  isCompleted,
  isBookmarked,
  onToggleComplete,
  onToggleBookmark,
  onStartQuiz,
  fontSize,
  onChangeFontSize
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!lesson) return null;

  const fontClass = {
    normal: 'text-sm leading-relaxed',
    large: 'text-base leading-relaxed',
    xlarge: 'text-lg leading-relaxed'
  }[fontSize];

  const handlePlayArabic = (arabicText?: string) => {
    if (!arabicText) return;
    if (isPlayingAudio) {
      soundService.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      soundService.speak(arabicText, 'ar-SA', 0.85);
      setTimeout(() => setIsPlayingAudio(false), 8000);
    }
  };

  const handleShare = () => {
    const text = `${lesson.title} - ${lesson.subtitle}\n\n${lesson.summary}\n\nIlmihal App`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F4F0] overflow-y-auto animate-fadeIn text-[#2C3333]">
      {/* Top sticky bar */}
      <div className="sticky top-0 z-20 bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#E2E1D9] px-4 py-3 flex items-center justify-between">
        <button
          id="lesson-modal-back-btn"
          onClick={() => {
            soundService.playClick();
            soundService.stopSpeech();
            onClose();
          }}
          className="p-2 rounded-xl bg-white text-[#2C3333] hover:text-[#16302B] border border-[#E2E1D9] shadow-xs transition-colors flex items-center space-x-1 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 text-[#16302B]" />
          <span className="text-xs font-semibold pr-1">Nazad</span>
        </button>

        <div className="flex items-center space-x-1.5">
          {/* Text size selector */}
          <div className="flex items-center bg-white rounded-xl p-0.5 border border-[#E2E1D9] shadow-xs">
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-2 py-1 text-xs rounded-lg transition-colors font-bold ${fontSize === 'normal' ? 'bg-[#16302B] text-white' : 'text-[#636B69]'}`}
              title="Standardni font"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-2 py-1 text-sm rounded-lg transition-colors font-bold ${fontSize === 'large' ? 'bg-[#16302B] text-white' : 'text-[#636B69]'}`}
              title="Veći font"
            >
              A+
            </button>
            <button
              onClick={() => onChangeFontSize('xlarge')}
              className={`px-2 py-1 text-base rounded-lg transition-colors font-bold ${fontSize === 'xlarge' ? 'bg-[#16302B] text-white' : 'text-[#636B69]'}`}
              title="Najveći font"
            >
              A++
            </button>
          </div>

          {/* Bookmark */}
          <button
            id="lesson-modal-bookmark-btn"
            onClick={() => {
              soundService.playClick();
              onToggleBookmark(lesson.id);
            }}
            className={`p-2 rounded-xl border transition-colors shadow-xs ${
              isBookmarked
                ? 'bg-[#FEF7EA] text-[#8A6016] border-[#B58D3D]/40'
                : 'bg-white text-[#636B69] border-[#E2E1D9]'
            }`}
          >
            {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-[#B58D3D] text-[#8A6016]" /> : <Bookmark className="w-5 h-5" />}
          </button>

          {/* Share / Copy */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-white text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9] shadow-xs transition-colors"
            title="Kopiraj sažetak"
          >
            {copied ? <Check className="w-5 h-5 text-[#1B4332]" /> : <Share2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-xl mx-auto w-full px-4 py-5 space-y-6 pb-28">
        {/* Category & Title */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20">
              {lesson.categoryTitle}
            </span>
            <span className="text-xs text-[#636B69] font-medium">
              {lesson.readTimeMinutes} min čitanja
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#16302B] tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-sm text-[#4A5351] mt-1 font-semibold">
            {lesson.subtitle}
          </p>
        </div>

        {/* Highlighted Arabic Snippet with Audio */}
        {lesson.arabicSnippet && (
          <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-xs relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C29B38]" />
                Arapski tekst & Dova
              </span>
              <button
                onClick={() => handlePlayArabic(lesson.arabicSnippet)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  isPlayingAudio
                    ? 'bg-[#C29B38] text-[#16302B] animate-pulse'
                    : 'bg-[#FAF9F5] hover:bg-[#F5F4F0] text-[#16302B] border border-[#E2E1D9]'
                }`}
              >
                {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B58D3D]" />}
                <span>{isPlayingAudio ? 'Zaustavi' : 'Preslušaj izgovor'}</span>
              </button>
            </div>

            <p className="font-arabic text-2xl text-[#16302B] text-right leading-loose py-2 tracking-wide font-bold" dir="rtl">
              {lesson.arabicSnippet}
            </p>

            {lesson.arabicMeaning && (
              <p className="text-xs text-[#4A5351] mt-2 pt-2 border-t border-[#E2E1D9] italic font-medium">
                "{lesson.arabicMeaning}"
              </p>
            )}
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-5">
          {lesson.contentSections.map((section, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#16302B] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#16302B] mr-2" />
                {section.title}
              </h3>

              {section.body.map((paragraph, pIdx) => (
                <p key={pIdx} className={`${fontClass} text-[#2C3333] font-normal`}>
                  {paragraph}
                </p>
              ))}

              {/* Arabic & Transliteration in section */}
              {section.arabic && (
                <div className="my-3 p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9]">
                  <p className="font-arabic text-xl text-[#16302B] text-right leading-relaxed mb-2 font-bold" dir="rtl">
                    {section.arabic}
                  </p>
                  {section.transliteration && (
                    <p className="text-xs font-mono text-[#8A6016] bg-[#FEF7EA] p-2 rounded-lg border border-[#B58D3D]/30 mb-1 font-semibold">
                      {section.transliteration}
                    </p>
                  )}
                  {section.translation && (
                    <p className="text-xs text-[#4A5351] italic font-medium">
                      Prijevod: {section.translation}
                    </p>
                  )}
                </div>
              )}

              {/* Steps (e.g. Abdest or Namaz steps) */}
              {section.steps && section.steps.length > 0 && (
                <div className="space-y-2.5 mt-3">
                  {section.steps.map(step => (
                    <div key={step.stepNumber} className="flex items-start space-x-3 p-3 rounded-xl bg-[#FAF9F5] border border-[#E2E1D9]">
                      <div className="w-6 h-6 rounded-full bg-[#16302B] text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {step.stepNumber}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#16302B]">{step.title}</h4>
                        <p className="text-xs text-[#4A5351] mt-0.5 leading-relaxed font-medium">{step.description}</p>
                        {step.note && (
                          <p className="text-[11px] text-[#8A6016] mt-1 italic font-semibold">{step.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.importantNote && (
                <div className="p-3 bg-[#FEF7EA] border border-[#B58D3D]/30 rounded-xl text-xs text-[#8A6016] leading-relaxed font-medium">
                  ⚠️ <strong className="text-[#6D4C13] font-bold">Važna napomena:</strong> {section.importantNote}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Points */}
        <div className="bg-[#FAF9F5] rounded-2xl p-4 border border-[#E2E1D9] shadow-xs">
          <h3 className="text-sm font-bold text-[#16302B] mb-2 uppercase tracking-wider">
            📌 Ključne poruke za zapamtiti:
          </h3>
          <ul className="space-y-1.5 text-xs text-[#4A5351]">
            {lesson.keyPoints.map((point, kIdx) => (
              <li key={kIdx} className="flex items-start space-x-2 font-medium">
                <span className="text-[#1B4332] font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions: Complete Button & Quiz Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            id="lesson-toggle-complete-btn"
            onClick={() => {
              soundService.playSuccess();
              onToggleComplete(lesson.id);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-xs ${
              isCompleted
                ? 'bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/30 hover:bg-[#D8E6DE]'
                : 'bg-[#16302B] hover:bg-[#234E45] text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 text-[#C29B38]" />
            <span>{isCompleted ? 'Označi ponovo za učenje' : 'Označi kao savladano'}</span>
          </button>

          {lesson.relatedQuizId && (
            <button
              id="lesson-launch-quiz-btn"
              onClick={() => {
                soundService.playClick();
                soundService.stopSpeech();
                onStartQuiz(lesson.relatedQuizId!);
                onClose();
              }}
              className="flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-white hover:bg-[#FAF9F5] text-[#16302B] border border-[#E2E1D9] transition-all shadow-xs"
            >
              <HelpCircle className="w-5 h-5 text-[#B58D3D]" />
              <span>Provjeri znanje</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
