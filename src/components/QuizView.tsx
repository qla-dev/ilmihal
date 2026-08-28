import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Flame,
  ChevronRight,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { QUIZ_CATEGORIES } from '../data/quizzes';
import { QuizCategory, QuizQuestion } from '../types';
import { soundService } from '../utils/soundAndSpeech';
import { IslamicIcon } from './IslamicIcons';

interface QuizViewProps {
  onSaveQuizScore: (quizId: string, score: number, total: number) => void;
  savedScores: Record<string, { score: number; total: number; date: string }>;
  initialQuizId?: string | null;
  onNavigateToLesson?: (lessonId: string) => void;
}

const QUIZ_FILTER_TABS = [
  { id: 'all', title: 'Sve provjere', iconName: 'Sparkles' },
  { id: 'quiz-iman', title: 'Imanski šarti', iconName: 'DomeAllah' },
  { id: 'quiz-islam', title: 'Islamski šarti', iconName: 'Pillars' },
  { id: 'quiz-namaz', title: 'Namaz & Taharet', iconName: 'NamazJug' },
  { id: 'quiz-post', title: 'Post & Ramazan', iconName: 'PostSun' },
  { id: 'quiz-zekat', title: 'Zekat & Imovina', iconName: 'ZekatHand' },
  { id: 'quiz-poslanik', title: 'Poslanik Muhammed', iconName: 'ProphetCalligraphy' },
];

export const QuizView: React.FC<QuizViewProps> = ({
  onSaveQuizScore,
  savedScores,
  initialQuizId,
  onNavigateToLesson
}) => {
  const [activeQuizCategoryFilter, setActiveQuizCategoryFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(() => {
    if (initialQuizId) {
      return QUIZ_CATEGORIES.find(c => c.id === initialQuizId) || null;
    }
    return null;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ question: QuizQuestion; selectedIdx: number; isCorrect: boolean }[]>([]);

  // Start / Reset Quiz
  const handleStartQuiz = (category: QuizCategory) => {
    soundService.playClick();
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setCurrentStreak(0);
    setMaxStreak(0);
    setIsQuizCompleted(false);
    setUserAnswers([]);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted || !selectedCategory) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !selectedCategory || isAnswerSubmitted) return;

    const currentQuestion = selectedCategory.questions[currentQuestionIndex];
    const isCorrect = selectedOptionIndex === currentQuestion.correctIndex;

    setIsAnswerSubmitted(true);

    if (isCorrect) {
      soundService.playSuccess();
      setScore(prev => prev + 1);
      setCurrentStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      soundService.playError();
      setCurrentStreak(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion,
        selectedIdx: selectedOptionIndex,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (!selectedCategory) return;
    soundService.playClick();

    if (currentQuestionIndex + 1 < selectedCategory.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Finished!
      setIsQuizCompleted(true);
      onSaveQuizScore(selectedCategory.id, score, selectedCategory.questions.length);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  };

  // Filter quizzes according to active category tab
  const displayedQuizzes = QUIZ_CATEGORIES.filter(quiz => {
    if (activeQuizCategoryFilter === 'all') return true;
    return quiz.id === activeQuizCategoryFilter;
  });

  // If in category selection mode or completed
  if (!selectedCategory || isQuizCompleted) {
    if (isQuizCompleted && selectedCategory) {
      const percentage = Math.round((score / selectedCategory.questions.length) * 100);
      return (
        <div className="space-y-4 pb-24 animate-fadeIn max-w-md mx-auto">
          {/* Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E2E1D9] text-center shadow-xs relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F0EC] border-2 border-[#16302B]/20 flex items-center justify-center text-[#16302B] mb-3">
              <Award className="w-10 h-10 text-[#C29B38]" />
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20">
              Provjera Završena
            </span>

            <h2 className="text-2xl font-bold text-[#16302B] mt-3">
              {percentage >= 80 ? 'Mašallah! Odličan rezultat!' : percentage >= 50 ? 'Dobro urađeno!' : 'Vrijedi ponoviti gradivo!'}
            </h2>
            <p className="text-xs text-[#636B69] mt-1 font-medium">
              Tačno ste odgovorili na {score} od {selectedCategory.questions.length} pitanja ({percentage}%)
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-[#FAF9F5] rounded-2xl p-3 border border-[#E2E1D9]">
                <span className="text-xs text-[#636B69] font-medium">Osvojeni bodovi</span>
                <p className="text-xl font-bold text-[#16302B]">{score}/{selectedCategory.questions.length}</p>
              </div>
              <div className="bg-[#FAF9F5] rounded-2xl p-3 border border-[#E2E1D9]">
                <span className="text-xs text-[#636B69] font-medium">Najduži niz (Streak)</span>
                <p className="text-xl font-bold text-[#8A6016] flex items-center justify-center">
                  <Flame className="w-5 h-5 mr-1 text-[#B58D3D]" />
                  {maxStreak}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 mt-6">
              <button
                id="retry-quiz-btn"
                onClick={() => handleStartQuiz(selectedCategory)}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#2C3333] border border-[#E2E1D9] font-semibold text-xs transition-all shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ponovi provjeru</span>
              </button>
              <button
                id="back-to-quizzes-btn"
                onClick={() => {
                  soundService.playClick();
                  setSelectedCategory(null);
                  setIsQuizCompleted(false);
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#16302B] hover:bg-[#1B4332] text-white font-semibold text-xs transition-all shadow-2xs"
              >
                <span>Ostale provjere</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#636B69] uppercase tracking-wider px-1">
              Pregled odgovora
            </h3>

            {userAnswers.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-4 border transition-all shadow-2xs ${
                  item.isCorrect
                    ? 'border-[#2D6A4F]/30 bg-[#FAF9F5]'
                    : 'border-rose-200 bg-rose-50/40'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332] flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#16302B]">{item.question.question}</p>
                    <p className="text-[11px] text-[#4A5351] mt-1">
                      Vaš odgovor: <span className={item.isCorrect ? 'text-[#1B4332] font-semibold' : 'text-rose-700 font-semibold'}>
                        {item.question.options[item.selectedIdx]}
                      </span>
                    </p>
                    {!item.isCorrect && (
                      <p className="text-[11px] text-[#1B4332] mt-0.5 font-semibold">
                        Tačan odgovor: <strong>{item.question.options[item.question.correctIndex]}</strong>
                      </p>
                    )}
                    <p className="text-[11px] text-[#4A5351] mt-1.5 italic bg-white p-2 rounded-lg border border-[#E2E1D9]">
                      💡 {item.question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Category List View with Horizontal Slider Filter
    return (
      <div className="space-y-4 pb-24 animate-fadeIn">
        {/* Banner */}
        <div className="bg-[#16302B] rounded-2xl p-4 border border-[#16302B] shadow-xs text-white">
          <div className="flex items-center space-x-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#C29B38]" />
            <h2 className="text-sm font-bold text-white">Interaktivne Ilmihal Provjere</h2>
          </div>
          <p className="text-xs text-[#DDD9CF] leading-relaxed">
            Provjeri i učvrsti svoje znanje kroz pažljivo kreirana pitanja sa detaljnim objašnjenjima za svaki odgovor.
          </p>
        </div>

        {/* SLIDER CATEGORY FILTER BAR */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-[#636B69] uppercase tracking-wider">
              Kategorije provjera
            </span>
            <span className="text-[11px] text-[#8A8875] font-medium">
              {displayedQuizzes.length} provjer{displayedQuizzes.length === 1 ? 'a' : 'e'}
            </span>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4">
            {QUIZ_FILTER_TABS.map(tab => {
              const isSelected = activeQuizCategoryFilter === tab.id;
              const count = tab.id === 'all' 
                ? QUIZ_CATEGORIES.length 
                : QUIZ_CATEGORIES.filter(q => q.id === tab.id).length;

              if (count === 0 && tab.id !== 'all') return null;

              return (
                <button
                  key={tab.id}
                  id={`quiz-cat-pill-${tab.id}`}
                  onClick={() => {
                    soundService.playClick();
                    setActiveQuizCategoryFilter(tab.id);
                  }}
                  className={`flex-shrink-0 flex items-center space-x-1.5 text-xs px-3.5 py-2 rounded-xl font-medium transition-all shadow-2xs ${
                    isSelected
                      ? 'bg-[#16302B] text-white shadow-xs'
                      : 'bg-white text-[#2C3333] hover:bg-[#FAF9F5] border border-[#E2E1D9]'
                  }`}
                >
                  <IslamicIcon name={tab.id} className="w-4 h-4" />
                  <span>{tab.title}</span>
                  <span className={`text-[10px] ${isSelected ? 'opacity-80' : 'text-[#8A8875]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="space-y-3">
          {displayedQuizzes.map(category => {
            const saved = savedScores[category.id];
            const scorePercent = saved ? Math.round((saved.score / saved.total) * 100) : null;

            return (
              <div
                key={category.id}
                id={`quiz-card-${category.id}`}
                onClick={() => handleStartQuiz(category)}
                className="group bg-white hover:bg-[#FAF9F5] rounded-2xl p-4 border border-[#E2E1D9] hover:border-[#16302B]/30 hover:shadow-xs transition-all duration-200 cursor-pointer relative overflow-hidden shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20">
                      {category.questions.length} pitanja
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF9F5] text-[#636B69] border border-[#E2E1D9]">
                      {category.difficulty === 'easy' ? 'Početni nivo' : 'Srednji nivo'}
                    </span>
                  </div>

                  {scorePercent !== null && (
                    <span className="text-xs font-bold text-[#1B4332] bg-[#E8F0EC] px-2 py-0.5 rounded-md border border-[#2D6A4F]/20">
                      Najbolji: {scorePercent}%
                    </span>
                  )}
                </div>

                <div className="flex items-start space-x-3 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F4F0] border border-[#E2E1D9] text-[#16302B] group-hover:bg-[#E8F0EC] group-hover:text-[#1B4332] group-hover:border-[#2D6A4F]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <IslamicIcon name={category.id} className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#16302B] group-hover:text-[#1B4332] transition-colors truncate">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#636B69] mt-0.5 line-clamp-2 font-medium">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E2E1D9] flex items-center justify-between text-xs text-[#1B4332] font-semibold">
                  <span>Pokreni provjeru</span>
                  <ChevronRight className="w-4 h-4 text-[#8A8875] group-hover:text-[#16302B] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz in Progress
  const currentQuestion = selectedCategory.questions[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex) / selectedCategory.questions.length) * 100);

  return (
    <div className="space-y-4 pb-24 animate-fadeIn max-w-md mx-auto">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between">
        <button
          id="exit-quiz-btn"
          onClick={() => {
            soundService.playClick();
            setSelectedCategory(null);
          }}
          className="text-xs text-[#636B69] hover:text-[#2C3333] font-semibold flex items-center bg-white px-3 py-1.5 rounded-xl border border-[#E2E1D9] shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Izađi</span>
        </button>

        <span className="text-xs font-bold text-[#16302B]">
          Pitanje {currentQuestionIndex + 1} od {selectedCategory.questions.length}
        </span>

        {currentStreak > 1 && (
          <span className="flex items-center text-xs font-bold text-[#8A6016] bg-[#FEF7EA] px-2.5 py-1 rounded-full border border-[#B58D3D]/30 animate-pulse">
            <Flame className="w-3.5 h-3.5 mr-1 text-[#B58D3D]" />
            {currentStreak} u nizu!
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#E2E1D9] h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#16302B] h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-5 border border-[#E2E1D9] shadow-xs">
        <span className="text-[11px] font-semibold text-[#1B4332] bg-[#E8F0EC] px-2.5 py-0.5 rounded-md border border-[#2D6A4F]/20">
          {currentQuestion.category}
        </span>

        <h2 className="text-lg font-bold text-[#16302B] mt-2.5 leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5 mt-5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = idx === currentQuestion.correctIndex;

            let buttonStyle = 'bg-white hover:bg-[#FAF9F5] text-[#2C3333] border-[#E2E1D9]';
            if (isSelected) {
              buttonStyle = 'bg-[#FAF9F5] border-[#16302B] ring-1 ring-[#16302B] text-[#16302B] font-bold';
            }

            if (isAnswerSubmitted) {
              if (isCorrect) {
                buttonStyle = 'bg-[#E8F0EC] border-[#2D6A4F] text-[#1B4332] font-bold';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-800 font-bold';
              } else {
                buttonStyle = 'bg-white border-[#E2E1D9] text-[#8A8875] opacity-50';
              }
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${idx}`}
                disabled={isAnswerSubmitted}
                onClick={() => {
                  soundService.playClick();
                  handleSelectOption(idx);
                }}
                className={`w-full text-left p-3.5 rounded-2xl border text-sm transition-all flex items-center justify-between ${buttonStyle}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-[#16302B] text-white' : 'bg-[#F5F4F0] text-[#636B69]'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-[#1B4332] flex-shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {isAnswerSubmitted && (
          <div className="mt-4 p-3.5 bg-[#FAF9F5] rounded-2xl border border-[#E2E1D9] text-xs text-[#2C3333] space-y-1 animate-fadeIn">
            <div className="flex items-center space-x-1.5 font-bold text-[#16302B]">
              <HelpCircle className="w-4 h-4 text-[#C29B38]" />
              <span>Objašnjenje:</span>
            </div>
            <p className="text-[#4A5351] leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5">
          {!isAnswerSubmitted ? (
            <button
              id="submit-answer-btn"
              disabled={selectedOptionIndex === null}
              onClick={handleSubmitAnswer}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-xs ${
                selectedOptionIndex === null
                  ? 'bg-[#E2E1D9] text-[#8A8875] cursor-not-allowed'
                  : 'bg-[#16302B] hover:bg-[#1B4332] text-white cursor-pointer active:scale-[0.99]'
              }`}
            >
              Potvrdi odgovor
            </button>
          ) : (
            <button
              id="next-question-btn"
              onClick={handleNextQuestion}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#16302B] hover:bg-[#1B4332] text-white transition-all shadow-xs flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              <span>
                {currentQuestionIndex + 1 === selectedCategory.questions.length
                  ? 'Pogledaj rezultate'
                  : 'Sljedeće pitanje'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
