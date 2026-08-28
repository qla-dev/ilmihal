import React, { useState } from 'react';
import { 
  BookMarked, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Heart, 
  Share2,
  Search
} from 'lucide-react';
import { SURAHS_AND_DUAS } from '../data/surahsAndDuas';
import { SurahOrDua } from '../types';
import { soundService } from '../utils/soundAndSpeech';

export const SurahsAndDuasView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = SURAHS_AND_DUAS.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePlayAudio = (item: SurahOrDua) => {
    if (playingId === item.id) {
      soundService.stopSpeech();
      setPlayingId(null);
    } else {
      soundService.stopSpeech();
      setPlayingId(item.id);
      // Speak Arabic
      soundService.speak(item.arabic, 'ar-SA', 0.82);
      // Auto cancel state after duration estimate
      setTimeout(() => {
        setPlayingId(null);
      }, 12000);
    }
  };

  const handleCopy = (item: SurahOrDua) => {
    soundService.playClick();
    const text = `${item.title}\n\n${item.arabic}\n\n${item.transliteration}\n\nPrijevod:\n${item.translation}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* Header Info */}
      <div className="bg-[#16302B] rounded-2xl p-4 border border-[#16302B] shadow-xs text-white">
        <div className="flex items-center space-x-2 mb-1">
          <BookMarked className="w-4 h-4 text-[#C29B38]" />
          <h2 className="text-sm font-bold text-white">Sure, Dove & Zikrovi</h2>
        </div>
        <p className="text-xs text-[#DDD9CF]">
          Učenje sa arapskim tekstom, transkripcijom, prijevodom i audio izgovorom za namaz i svakodnevni život.
        </p>

        {/* Search inside duas */}
        <div className="mt-3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pretraži suru ili dovu po nazivu..."
            className="w-full bg-[#0E201C] border border-[#234E45] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8A8875] focus:outline-none focus:border-[#C29B38]"
          />
          <Search className="w-4 h-4 text-[#8A8875] absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <button
          onClick={() => {
            soundService.playClick();
            setActiveCategory('all');
          }}
          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap shadow-xs ${
            activeCategory === 'all'
              ? 'bg-[#16302B] text-white border border-[#16302B]'
              : 'bg-white text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
          }`}
        >
          Sve ({SURAHS_AND_DUAS.length})
        </button>
        <button
          onClick={() => {
            soundService.playClick();
            setActiveCategory('namaska-dova');
          }}
          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap shadow-xs ${
            activeCategory === 'namaska-dova'
              ? 'bg-[#16302B] text-white border border-[#16302B]'
              : 'bg-white text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
          }`}
        >
          Namaske Dove
        </button>
        <button
          onClick={() => {
            soundService.playClick();
            setActiveCategory('kratka-sura');
          }}
          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap shadow-xs ${
            activeCategory === 'kratka-sura'
              ? 'bg-[#16302B] text-white border border-[#16302B]'
              : 'bg-white text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
          }`}
        >
          Kratke Sure
        </button>
        <button
          onClick={() => {
            soundService.playClick();
            setActiveCategory('svakodnevni-zikr');
          }}
          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap shadow-xs ${
            activeCategory === 'svakodnevni-zikr'
              ? 'bg-[#16302B] text-white border border-[#16302B]'
              : 'bg-white text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
          }`}
        >
          Zikrovi
        </button>
      </div>

      {/* List of Surahs & Duas */}
      <div className="space-y-3">
        {filteredItems.map(item => {
          const isPlaying = playingId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              id={`dua-card-${item.id}`}
              className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-xs space-y-3"
            >
              {/* Header: title + actions */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#16302B]">{item.title}</h3>
                  <p className="text-[11px] text-[#1B4332] font-semibold">{item.subtitle}</p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handlePlayAudio(item)}
                    title={isPlaying ? 'Zaustavi učenje' : 'Preslušaj izgovor'}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                      isPlaying
                        ? 'bg-[#C29B38] text-[#16302B] animate-pulse'
                        : 'bg-[#FAF9F5] hover:bg-[#F5F4F0] text-[#16302B] border border-[#E2E1D9]'
                    }`}
                  >
                    {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#B58D3D]" />}
                    <span>{isPlaying ? 'Zaustavi' : 'Učenje'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    title="Kopiraj tekst"
                    className="p-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F5F4F0] text-[#636B69] border border-[#E2E1D9]"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#1B4332]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Arabic text */}
              <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9] text-right">
                <p className="font-arabic text-2xl text-[#16302B] leading-loose font-bold" dir="rtl">
                  {item.arabic}
                </p>
              </div>

              {/* Transliteration */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#636B69]">
                  Transkripcija (Izgovor):
                </span>
                <p className="text-xs font-mono text-[#8A6016] bg-[#FEF7EA] p-2 rounded-lg border border-[#B58D3D]/30 leading-relaxed font-semibold">
                  {item.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#636B69]">
                  Prijevod na bosanski:
                </span>
                <p className="text-xs text-[#4A5351] italic leading-relaxed font-medium">
                  {item.translation}
                </p>
              </div>

              {item.benefits && (
                <p className="text-[11px] text-[#1B4332] pt-1.5 border-t border-[#E2E1D9] font-medium">
                  ✨ <strong>Vrijednost:</strong> {item.benefits}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
