import React from 'react';
import { BookOpen, HelpCircle, Clock, Compass, Shield, BookMarked } from 'lucide-react';
import { TabType } from '../types';
import { soundService } from '../utils/soundAndSpeech';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  nextPrayerName?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  nextPrayerName
}) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'lessons', label: 'Ilmihal', icon: BookOpen },
    { id: 'quizzes', label: 'Provjere', icon: HelpCircle },
    { id: 'vaktija', label: 'Namaz', icon: Clock, badge: nextPrayerName },
    { id: 'qibla', label: 'Kibla', icon: Compass },
    { id: 'duas', label: 'Sure & Dove', icon: BookMarked }
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#F5F4F0]/95 backdrop-blur-md border-t border-[#E2E1D9] pb-safe safe-area-bottom px-2 py-1 transition-all"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-btn-${tab.id}`}
              onClick={() => {
                soundService.playClick();
                onTabChange(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 min-w-[54px] ${
                isActive
                  ? 'text-[#16302B] font-bold scale-105'
                  : 'text-[#636B69] hover:text-[#2C3333]'
              }`}
            >
              <div className={`relative p-1 rounded-lg transition-colors ${isActive ? 'bg-[#E8F0EC]' : ''}`}>
                <Icon className="w-5 h-5 transition-transform" />
                {tab.id === 'vaktija' && tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#B58D3D] animate-pulse" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 w-4 h-0.5 bg-[#16302B] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
