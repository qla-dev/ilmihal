import React from 'react';
import { Search, WifiOff, Sparkles, Volume2, Bookmark, Moon } from 'lucide-react';
import { soundService } from '../utils/soundAndSpeech';
import ilmihalLogo from '../assets/images/ilmihal_gold_logo_1787949802724.jpg';

interface HeaderProps {
  streakDays: number;
  completedCount: number;
  totalLessons: number;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkedCount: number;
  cityName: string;
  nextPrayerText?: string;
  onOpenFocusMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  streakDays,
  completedCount,
  totalLessons,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkedCount,
  cityName,
  nextPrayerText,
  onOpenFocusMode
}) => {
  return (
    <header id="app-main-header" className="sticky top-0 z-30 bg-[#F5F4F0]/95 backdrop-blur-md border-b border-[#E2E1D9] px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs border border-[#C29B38]/30 flex items-center justify-center bg-[#16302B] flex-shrink-0">
            <img
              src={ilmihalLogo}
              alt="Ilmihal Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-bold tracking-tight text-[#16302B] font-sans">
                Ilmihal
              </h1>
            </div>
            <p className="text-[11px] text-[#636B69] truncate max-w-[170px] font-medium">
              {nextPrayerText ? `${nextPrayerText} (${cityName})` : 'Islamska Poduka & Vaktija'}
            </p>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-1.5">
          {/* Quick Namaz Mode Button */}
          <button
            id="header-quick-namaz-btn"
            onClick={() => {
              soundService.playClick();
              onOpenFocusMode();
            }}
            title="Započni namaz"
            className="p-2 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#8A6016] border border-[#E2E1D9] shadow-xs transition-all flex items-center space-x-1 text-xs"
          >
            <Sparkles className="w-4 h-4 text-[#B58D3D]" />
            <span className="hidden sm:inline text-[11px] font-bold">Namaz</span>
          </button>

          {/* Bookmarks */}
          <button
            id="header-bookmarks-btn"
            onClick={() => {
              soundService.playClick();
              onOpenBookmarks();
            }}
            title="Sačuvane lekcije"
            className="relative p-2 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#2C3333] hover:text-[#16302B] border border-[#E2E1D9] shadow-xs transition-all"
          >
            <Bookmark className="w-4 h-4 text-[#636B69]" />
            {bookmarkedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#16302B] text-[10px] font-bold text-white rounded-full flex items-center justify-center shadow-xs">
                {bookmarkedCount}
              </span>
            )}
          </button>

          {/* Search trigger */}
          <button
            id="header-search-btn"
            onClick={() => {
              soundService.playClick();
              onOpenSearch();
            }}
            title="Pretraži ilmihal"
            className="p-2 rounded-xl bg-[#E8F0EC] hover:bg-[#DDE9E2] text-[#1B4332] border border-[#2D6A4F]/20 shadow-xs transition-all"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
