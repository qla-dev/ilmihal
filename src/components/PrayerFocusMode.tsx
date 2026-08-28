import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, 
  VolumeX, 
  Volume2, 
  ShieldCheck, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  ChevronRight, 
  ArrowLeft,
  BellOff,
  Waves,
  CloudRain
} from 'lucide-react';
import { soundService } from '../utils/soundAndSpeech';

interface PrayerFocusModeProps {
  initialPrayerName?: string;
  onClose: () => void;
  onRecordPrayer?: (prayerKey: string) => void;
}

type AmbientSoundType = 'silence' | 'stream' | 'rain';

export const PrayerFocusMode: React.FC<PrayerFocusModeProps> = ({
  initialPrayerName = 'Namaz',
  onClose,
  onRecordPrayer
}) => {
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ambientType, setAmbientType] = useState<AmbientSoundType>('stream');
  const [currentRekatStep, setCurrentRekatStep] = useState(1);
  const [totalRekats, setTotalRekats] = useState(4);
  const [activeTab, setActiveTab] = useState<'focus-timer' | 'prayer-guide' | 'tesbih'>('focus-timer');

  // Tesbih State
  const [tesbihCount, setTesbihCount] = useState(0);
  const [tesbihPhase, setTesbihPhase] = useState<'subhanallah' | 'elhamdulillah' | 'allahuekber'>('subhanallah');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            soundService.stopFocusAmbiance();
            soundService.playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, secondsRemaining]);

  const handleStartTimer = () => {
    soundService.playClick();
    setIsActive(true);
    soundService.startFocusAmbiance(ambientType);
  };

  const handlePauseTimer = () => {
    soundService.playClick();
    setIsActive(false);
    soundService.stopFocusAmbiance();
  };

  const handleResetTimer = (minutes: number) => {
    soundService.playClick();
    setIsActive(false);
    soundService.stopFocusAmbiance();
    setSelectedDurationMinutes(minutes);
    setSecondsRemaining(minutes * 60);
  };

  const handleToggleAmbiance = (type: AmbientSoundType) => {
    soundService.playClick();
    setAmbientType(type);
    if (isActive) {
      soundService.startFocusAmbiance(type);
    }
  };

  // Tesbih tap handler
  const handleTesbihTap = () => {
    soundService.playTesbihClick();
    const nextCount = tesbihCount + 1;
    
    if (nextCount === 33) {
      soundService.playSuccess();
      setTesbihCount(0);
      setTesbihPhase('elhamdulillah');
    } else if (nextCount === 66 || (tesbihPhase === 'elhamdulillah' && nextCount === 33)) {
      soundService.playSuccess();
      setTesbihCount(0);
      setTesbihPhase('allahuekber');
    } else if (tesbihPhase === 'allahuekber' && nextCount === 33) {
      soundService.playSuccess();
      setTesbihCount(33); // Finished!
    } else {
      setTesbihCount(nextCount);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F4F0] flex flex-col overflow-y-auto animate-fadeIn text-[#2C3333]">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-[#F5F4F0]/90 backdrop-blur-md border-b border-[#E2E1D9] px-4 py-3 flex items-center justify-between">
        <button
          id="focus-mode-close-btn"
          onClick={() => {
            soundService.playClick();
            soundService.stopFocusAmbiance();
            onClose();
          }}
          className="flex items-center space-x-1.5 text-xs text-[#636B69] hover:text-[#2C3333] px-2.5 py-1.5 rounded-xl bg-white border border-[#E2E1D9] shadow-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Izađi iz fokusa</span>
        </button>

        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-[#16302B] animate-pulse mr-1" />
          <span className="text-xs font-bold text-[#16302B] uppercase tracking-wider">
            Režim Skrušenosti & Fokusa
          </span>
        </div>

        <div className="w-8" />
      </div>

      <div className="max-w-md mx-auto w-full px-4 py-4 space-y-4 pb-20">
        {/* Navigation Mode Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-2xl border border-[#E2E1D9] shadow-xs">
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('focus-timer');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'focus-timer'
                ? 'bg-[#16302B] text-white shadow-xs'
                : 'text-[#636B69] hover:text-[#2C3333]'
            }`}
          >
            Fokus Tajmer
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('prayer-guide');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'prayer-guide'
                ? 'bg-[#16302B] text-white shadow-xs'
                : 'text-[#636B69] hover:text-[#2C3333]'
            }`}
          >
            Vodič Namaza
          </button>
          <button
            onClick={() => {
              soundService.playClick();
              setActiveTab('tesbih');
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'tesbih'
                ? 'bg-[#16302B] text-white shadow-xs'
                : 'text-[#636B69] hover:text-[#2C3333]'
            }`}
          >
            Digitalni Tesbih
          </button>
        </div>

        {/* TAB 1: FOCUS TIMER */}
        {activeTab === 'focus-timer' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Main Timer Display */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E1D9] text-center shadow-xs relative overflow-hidden">
              <span className="text-xs font-semibold text-[#1B4332] uppercase tracking-widest bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#2D6A4F]/20">
                {isActive ? 'Fokus sesija u toku' : 'Spremno za namaz bez ometanja'}
              </span>

              <div className="my-6">
                <div className="font-mono text-6xl font-extrabold text-[#16302B] tracking-tight">
                  {formatTime(secondsRemaining)}
                </div>
                <p className="text-xs text-[#636B69] mt-2 font-medium">
                  {isActive
                    ? 'Vanjski zvukovi i ometanja su utišani. Posvetite se ibadetu.'
                    : 'Izaberite trajanje i pokrenite skrušeni fokus.'}
                </p>
              </div>

              {/* Play / Pause / Reset Controls */}
              <div className="flex items-center justify-center space-x-3">
                {!isActive ? (
                  <button
                    id="focus-timer-start-btn"
                    onClick={handleStartTimer}
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#16302B] hover:bg-[#234E45] text-white font-bold text-sm shadow-xs transition-all active:scale-95"
                  >
                    <Play className="w-5 h-5 fill-current text-[#C29B38]" />
                    <span>Pokreni Tišinu & Fokus</span>
                  </button>
                ) : (
                  <button
                    id="focus-timer-pause-btn"
                    onClick={handlePauseTimer}
                    className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#8A6016] hover:bg-[#6D4C13] text-white font-bold text-sm shadow-xs transition-all active:scale-95"
                  >
                    <Pause className="w-5 h-5 fill-current" />
                    <span>Pauziraj tajmer</span>
                  </button>
                )}

                <button
                  id="focus-timer-reset-btn"
                  onClick={() => handleResetTimer(selectedDurationMinutes)}
                  title="Resetuj tajmer"
                  className="p-3.5 rounded-2xl bg-[#FAF9F5] hover:bg-[#F5F4F0] text-[#2C3333] border border-[#E2E1D9] transition-colors shadow-xs"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {/* Duration Presets */}
              <div className="flex justify-center space-x-2 mt-6 pt-4 border-t border-[#E2E1D9]">
                {[10, 15, 20, 30].map(mins => (
                  <button
                    key={mins}
                    onClick={() => handleResetTimer(mins)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors ${
                      selectedDurationMinutes === mins
                        ? 'bg-[#16302B] text-white border border-[#16302B]'
                        : 'bg-[#FAF9F5] text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
                    }`}
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Sound Dampener / Masking */}
            <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#16302B] flex items-center">
                  <Volume2 className="w-4 h-4 text-[#1B4332] mr-1.5" />
                  Utišavanje & Suptilni Zvuk Smirenja
                </span>
                <span className="text-[10px] text-[#8A8875] font-medium">Offline Web Audio</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleToggleAmbiance('stream')}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col items-center space-y-1 transition-all ${
                    ambientType === 'stream'
                      ? 'bg-[#E8F0EC] border-[#16302B] text-[#16302B] font-bold'
                      : 'bg-[#FAF9F5] border-[#E2E1D9] text-[#636B69]'
                  }`}
                >
                  <Waves className="w-4 h-4" />
                  <span>Potok / Voda</span>
                </button>

                <button
                  onClick={() => handleToggleAmbiance('rain')}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col items-center space-y-1 transition-all ${
                    ambientType === 'rain'
                      ? 'bg-[#E8F0EC] border-[#16302B] text-[#16302B] font-bold'
                      : 'bg-[#FAF9F5] border-[#E2E1D9] text-[#636B69]'
                  }`}
                >
                  <CloudRain className="w-4 h-4" />
                  <span>Tiha Kiša</span>
                </button>

                <button
                  onClick={() => handleToggleAmbiance('silence')}
                  className={`p-2.5 rounded-xl border text-xs flex flex-col items-center space-y-1 transition-all ${
                    ambientType === 'silence'
                      ? 'bg-[#E8F0EC] border-[#16302B] text-[#16302B] font-bold'
                      : 'bg-[#FAF9F5] border-[#E2E1D9] text-[#636B69]'
                  }`}
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Potpuna Tišina</span>
                </button>
              </div>
            </div>

            {/* Mute Other Apps / System DND Instructions */}
            <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] space-y-2 shadow-xs">
              <h3 className="text-xs font-bold text-[#8A6016] flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#B58D3D]" />
                Kako utišati ostale aplikacije (Ne Uznemiravaj / Do Not Disturb)
              </h3>
              <p className="text-xs text-[#636B69] leading-relaxed font-medium">
                Da vas poruke i pozivi drugih aplikacija ne bi prekidali tokom namaza:
              </p>
              <ul className="text-[11px] text-[#636B69] space-y-1 pl-2">
                <li>• <strong>Android:</strong> Spustite brzi meni s vrha ekrana i uključite <span className="text-[#16302B] font-semibold">"Ne uznemiravaj" (Do Not Disturb)</span>.</li>
                <li>• <strong>iPhone / iOS:</strong> Otvorite Kontrolni centar i aktivirajte <span className="text-[#16302B] font-semibold">"Focus / Ne uznemiravaj"</span> ili prebacite fizički prekidač na tihi mod.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: STEP BY STEP PRAYER ASSISTANT */}
        {activeTab === 'prayer-guide' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Rekat Selector */}
            <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2C3333]">Broj rek'ata namaza:</span>
                <div className="flex space-x-1.5">
                  {[2, 3, 4].map(num => (
                    <button
                      key={num}
                      onClick={() => {
                        soundService.playClick();
                        setTotalRekats(num);
                        setCurrentRekatStep(1);
                      }}
                      className={`w-8 h-8 rounded-xl font-bold text-xs transition-colors ${
                        totalRekats === num
                          ? 'bg-[#16302B] text-white'
                          : 'bg-[#FAF9F5] text-[#636B69] border border-[#E2E1D9]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress of Rekats */}
              <div className="flex space-x-1.5">
                {Array.from({ length: totalRekats }, (_, i) => i + 1).map(step => (
                  <button
                    key={step}
                    onClick={() => {
                      soundService.playClick();
                      setCurrentRekatStep(step);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      currentRekatStep === step
                        ? 'bg-[#16302B] text-white border border-[#16302B] shadow-xs'
                        : step < currentRekatStep
                        ? 'bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20'
                        : 'bg-[#FAF9F5] text-[#8A8875] border border-[#E2E1D9]'
                    }`}
                  >
                    {step}. Rek'at
                  </button>
                ))}
              </div>
            </div>

            {/* Current Rek'at Guide Content */}
            <div className="bg-white rounded-3xl p-5 border border-[#E2E1D9] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1B4332] uppercase tracking-wider">
                  Vodič za {currentRekatStep}. Rek'at:
                </span>
                <span className="text-xs text-[#636B69] font-medium">
                  {currentRekatStep === 1 ? 'Početak namaza' : currentRekatStep === totalRekats ? 'Završni rek\'at' : 'Srednji rek\'at'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {currentRekatStep === 1 && (
                  <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9] space-y-1">
                    <p className="font-bold text-[#16302B]">1. Iftitāhī tekbir & Subhāneke</p>
                    <p className="text-[#4A5351]">Podignuti ruke u visini ušiju/ramena i izgovoriti "Allāhu Ekber", vezati ruke i proučiti <em>Subhāneke</em>.</p>
                  </div>
                )}

                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9] space-y-1">
                  <p className="font-bold text-[#16302B]">
                    {currentRekatStep === 1 ? '2. Eūza, Bismilla i Fatiha' : '1. Bismilla i Fatiha'}
                  </p>
                  <p className="text-[#4A5351]">Proučiti Fatihu te jednu kraću suru (Ihlas, Felek ili Nas).</p>
                </div>

                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9] space-y-1">
                  <p className="font-bold text-[#16302B]">Rukū' (Pregib)</p>
                  <p className="text-[#4A5351]">Pregnuti se i 3 puta reći: <em>Subhāne Rabbijel-'Azīm</em>. Vratiti se uspravno uz <em>Semi'allāhu li men hamideh, Rabbenā lekel-hamd</em>.</p>
                </div>

                <div className="p-3 bg-[#FAF9F5] rounded-xl border border-[#E2E1D9] space-y-1">
                  <p className="font-bold text-[#16302B]">Dvije Sedžde</p>
                  <p className="text-[#4A5351]">Pasti na sedždu (3x <em>Subhāne Rabbijel-A'lā</em>), kratko sjesti i ponoviti drugu sedždu.</p>
                </div>

                {(currentRekatStep === 2 || currentRekatStep === totalRekats) && (
                  <div className="p-3 bg-[#E8F0EC] rounded-xl border border-[#2D6A4F]/20 space-y-1">
                    <p className="font-bold text-[#1B4332]">
                      {currentRekatStep === totalRekats ? 'Završno sjedenje (Kā\'de-i ehīre)' : 'Prvo sjedenje'}
                    </p>
                    <p className="text-[#16302B]">
                      {currentRekatStep === totalRekats
                        ? 'Proučiti Ettehijjātu, Salavate i dove Rabbenā ātinā, a zatim predati selam na desnu pa lijevu stranu.'
                        : 'Proučiti Ettehijjātu i ustati na sljedeći rek\'at.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Step Navigation Button */}
              <div className="pt-2">
                {currentRekatStep < totalRekats ? (
                  <button
                    onClick={() => {
                      soundService.playClick();
                      setCurrentRekatStep(prev => prev + 1);
                    }}
                    className="w-full py-3 rounded-xl bg-[#16302B] hover:bg-[#234E45] text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <span>Pređi na {currentRekatStep + 1}. Rek'at</span>
                    <ChevronRight className="w-4 h-4 text-[#C29B38]" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundService.playSuccess();
                      alert('Mašallah! Završili ste vodič za klanjanje namaza.');
                      setActiveTab('tesbih');
                    }}
                    className="w-full py-3 rounded-xl bg-[#16302B] hover:bg-[#234E45] text-white font-bold text-xs flex items-center justify-center space-x-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1 text-[#C29B38]" />
                    <span>Namaz završen - Pokreni Tesbih</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL TESBIH */}
        {activeTab === 'tesbih' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-[#E2E1D9] text-center shadow-xs relative overflow-hidden">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20 uppercase tracking-widest">
                {tesbihPhase === 'subhanallah' ? '1/3 • Subhānallāh' : tesbihPhase === 'elhamdulillah' ? '2/3 • El-hamdulillāh' : '3/3 • Allāhu Ekber'}
              </span>

              {/* Big Interactive Bead Tap Circle */}
              <div className="my-6">
                <button
                  id="tesbih-tap-button"
                  onClick={handleTesbihTap}
                  className="w-44 h-44 mx-auto rounded-full bg-[#16302B] p-1.5 shadow-sm transform active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none border-4 border-[#C29B38]"
                >
                  <div className="w-full h-full bg-[#16302B] rounded-full flex flex-col items-center justify-center">
                    <span className="font-mono text-5xl font-black text-white">
                      {tesbihCount}
                    </span>
                    <span className="text-xs text-[#C29B38] font-bold uppercase tracking-wider mt-1">
                      / 33
                    </span>
                  </div>
                </button>
                <p className="text-xs text-[#636B69] mt-2 font-medium">
                  Dodirnite krug za brojanje (vibracija i zvuk na svaki zikr)
                </p>
              </div>

              {/* Meaning Arabic & Translation */}
              <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E2E1D9] text-xs">
                <p className="font-arabic text-2xl text-[#16302B] py-1 font-bold" dir="rtl">
                  {tesbihPhase === 'subhanallah' ? 'سُبْحَانَ اللَّهِ' : tesbihPhase === 'elhamdulillah' ? 'الْحَمْدُ لِلَّهِ' : 'اللَّهُ أَكْبَرُ'}
                </p>
                <p className="text-[#4A5351] mt-0.5 font-medium">
                  {tesbihPhase === 'subhanallah' ? 'Slavljen neka je Allah' : tesbihPhase === 'elhamdulillah' ? 'Hvala Allahu' : 'Allah je Najveći'}
                </p>
              </div>

              {/* Reset button */}
              <div className="mt-4 pt-3 border-t border-[#E2E1D9] flex justify-center">
                <button
                  onClick={() => {
                    soundService.playClick();
                    setTesbihCount(0);
                    setTesbihPhase('subhanallah');
                  }}
                  className="text-xs text-[#636B69] hover:text-[#2C3333] font-semibold flex items-center space-x-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Resetuj brojač</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
