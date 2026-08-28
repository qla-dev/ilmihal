import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  VolumeX,
  RotateCcw, 
  Check, 
  CheckCircle2,
  Award,
  Layers,
  Radio,
  FileText,
  Languages,
  BookOpen
} from 'lucide-react';
import { soundService } from '../utils/soundAndSpeech';
import { SURAHS_AND_DUAS } from '../data/surahsAndDuas';
import { DAILY_NAMAZ_PRESETS, NamazStructure, NamazPart } from '../data/namazPresets';
import { NamazFooterCTA } from './NamazFooterCTA';

interface NamazModeModalProps {
  initialPrayerName?: string;
  onClose: () => void;
  onRecordPrayer?: (prayerKey: string) => void;
}

interface StepItem {
  id: string;
  title: string;
  subtitle?: string;
  instruction: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  audioText?: string;
  isMandatory?: boolean;
}

type RecitationTabType = 'transliteration' | 'arabic' | 'translation';

export const NamazModeModal: React.FC<NamazModeModalProps> = ({
  initialPrayerName = 'Podne (Dhuhr)',
  onClose,
  onRecordPrayer
}) => {
  // Find matching predefined namaz structure or fallback to Podne
  const findPreset = (name: string): NamazStructure => {
    const lower = name.toLowerCase();
    if (lower.includes('sabah') || lower.includes('fajr')) return DAILY_NAMAZ_PRESETS.find(p => p.id === 'sabah')!;
    if (lower.includes('ikindija') || lower.includes('asr')) return DAILY_NAMAZ_PRESETS.find(p => p.id === 'ikindija')!;
    if (lower.includes('akšam') || lower.includes('maghrib')) return DAILY_NAMAZ_PRESETS.find(p => p.id === 'aksam')!;
    if (lower.includes('jacija') || lower.includes('isha') || lower.includes('vitr')) return DAILY_NAMAZ_PRESETS.find(p => p.id === 'jacija')!;
    if (lower.includes('džuma') || lower.includes('petak')) return DAILY_NAMAZ_PRESETS.find(p => p.id === 'dzuma')!;
    return DAILY_NAMAZ_PRESETS.find(p => p.id === 'podne')!;
  };

  const [selectedPreset] = useState<NamazStructure>(() => findPreset(initialPrayerName));
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(0);

  // Active selected part (e.g. Farz or Sunnet)
  const currentPart: NamazPart = selectedPreset.parts[selectedPartIndex] || selectedPreset.parts[0];
  const totalRekats = currentPart.rekats;

  const [currentRekat, setCurrentRekat] = useState<number>(1);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(false);
  const [recitationTab, setRecitationTab] = useState<RecitationTabType>('transliteration');
  const [showTesbih, setShowTesbih] = useState<boolean>(false);

  // Tesbih state
  const [tesbihCount, setTesbihCount] = useState<number>(0);
  const [tesbihPhase, setTesbihPhase] = useState<'subhanallah' | 'elhamdulillah' | 'allahuekber'>('subhanallah');

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      soundService.stopSpeech();
    };
  }, []);

  const handleSelectPart = (partIdx: number) => {
    soundService.playClick();
    soundService.stopSpeech();
    setIsAudioPlaying(false);
    setSelectedPartIndex(partIdx);
    setCurrentRekat(1);
    setActiveStepIndex(0);
    setIsCompleted(false);
  };

  // Helper surahs/duas
  const subhaneke = SURAHS_AND_DUAS.find(s => s.id === 'subhaneke');
  const fatiha = SURAHS_AND_DUAS.find(s => s.id === 'fatiha');
  const ihlas = SURAHS_AND_DUAS.find(s => s.id === 'ihlas');
  const ettehijjatu = SURAHS_AND_DUAS.find(s => s.id === 'ettehijjatu');
  const salavati = SURAHS_AND_DUAS.find(s => s.id === 'salavati');
  const rabbena = SURAHS_AND_DUAS.find(s => s.id === 'rabbena-atina');
  const kunut = SURAHS_AND_DUAS.find(s => s.id === 'kunut-dova');

  // Hanafi fiqh rules steps generator
  const getStepsForRekat = (rekatNum: number, part: NamazPart): StepItem[] => {
    const isFirstRekat = rekatNum === 1;
    const isLastRekat = rekatNum === part.rekats;
    const isMiddleSitting = rekatNum === 2 && part.rekats > 2;

    const isGajriMuekkede = (selectedPreset.id === 'ikindija' || selectedPreset.id === 'jacija') && part.type === 'sunnet' && part.rekats === 4;

    const steps: StepItem[] = [];

    // Step 1: Iftitahi tekbir & Subhaneke
    if (isFirstRekat) {
      steps.push({
        id: 'tekbir-subhaneke',
        title: 'Iftitāhī tekbir & Subhāneke',
        subtitle: 'Početno stajanje (Kijām)',
        instruction: `Učinite nijjet u srcu za ${part.name} (${part.type.toUpperCase()}), podignite ruke naspram ušiju uz izgovor "Allāhu Ekber", svežite desnu ruku preko lijeve (na prsa/pojas) i u sebi proučite Subhāneke.`,
        arabic: subhaneke?.arabic,
        transliteration: subhaneke?.transliteration,
        translation: subhaneke?.translation,
        audioText: subhaneke?.arabic
      });

      steps.push({
        id: 'fatiha-surah-1',
        title: 'Eūza, Bismilla, Fatiha + Sura',
        subtitle: 'Učenje Kur\'ana na stajanju',
        instruction: 'Proučite u sebi Eūzu i Bismillu, zatim suru El-Fātiha, te jednu kraću suru (npr. El-Ihlās, El-Felek ili En-Nās).',
        arabic: fatiha?.arabic + '\n\n' + ihlas?.arabic,
        transliteration: `${fatiha?.transliteration}\n\n${ihlas?.transliteration}`,
        translation: `${fatiha?.translation}\n\n${ihlas?.translation}`,
        audioText: fatiha?.arabic
      });
    } else {
      // Rek'at 2, 3, 4
      const hasZamSura = part.hasZamSuraOnAllRekats || rekatNum <= 2;
      const needsSubhanekeOnThird = isGajriMuekkede && rekatNum === 3;

      if (needsSubhanekeOnThird) {
        steps.push({
          id: `subhaneke-3rd-${rekatNum}`,
          title: 'Subhāneke & Eūza-Bismilla',
          subtitle: 'Početak 3. rek\'ata (Gajri-muekkede)',
          instruction: 'Budući da je ovo gajri-muekkede sunnet, na početku 3. rek\'ata uči se Subhāneke, Eūza i Bismilla prije Fatihe.',
          arabic: subhaneke?.arabic,
          transliteration: subhaneke?.transliteration,
          translation: subhaneke?.translation,
          audioText: subhaneke?.arabic
        });
      }

      if (part.type === 'vitr' && rekatNum === 3) {
        steps.push({
          id: `fatiha-vitr-3`,
          title: 'Bismilla, Fatiha + Sura',
          subtitle: '3. Rek\'at Vitr-namaza',
          instruction: 'Proučite Bismillu, suru El-Fātiha i jednu suru (npr. Suru El-Ihlās).',
          arabic: fatiha?.arabic + '\n\n' + ihlas?.arabic,
          transliteration: `${fatiha?.transliteration}\n\n${ihlas?.transliteration}`,
          translation: `${fatiha?.translation}\n\n${ihlas?.translation}`,
          audioText: fatiha?.arabic
        });

        steps.push({
          id: `kunut-tekbir-3`,
          title: 'Vitr Tekbir & Kunut-dova (Vadžib)',
          subtitle: 'Dodatni tekbir prije rukū\'a',
          instruction: 'Nakon proučene sure, podignite ruke naspram ušiju uz izgovor "Allāhu Ekber", ponovo ih svežite i proučite Kunut-dovu prije odlaska na rukū\'.',
          arabic: kunut?.arabic,
          transliteration: kunut?.transliteration,
          translation: kunut?.translation,
          audioText: kunut?.arabic
        });
      } else {
        steps.push({
          id: `fatiha-surah-${rekatNum}`,
          title: hasZamSura ? 'Bismilla, Fatiha + Sura' : 'Bismilla i Fatiha (samo)',
          subtitle: hasZamSura ? 'Stajanje s Fatihom i surom' : 'Stajanje sa samom Fatihom',
          instruction: hasZamSura
            ? `Proučite Bismillu, Fatihu te jednu kraću suru (${part.type === 'sunnet' ? 'na sunnetu se sura uči na svim rek\'atima' : 'prva 2 rek\'ata farza'}).`
            : 'Na 3. i 4. rek\'atu farza uči se samo Bismilla i Fatiha (bez dodatne sure).',
          arabic: hasZamSura ? fatiha?.arabic + '\n\n' + ihlas?.arabic : fatiha?.arabic,
          transliteration: hasZamSura ? `${fatiha?.transliteration}\n\n${ihlas?.transliteration}` : fatiha?.transliteration,
          translation: hasZamSura ? `${fatiha?.translation}\n\n${ihlas?.translation}` : fatiha?.translation,
          audioText: fatiha?.arabic
        });
      }
    }

    // Rukū'
    steps.push({
      id: `ruku-${rekatNum}`,
      title: 'Rukū\' (Pregib)',
      subtitle: 'Pregibanje tijela pod uglom od 90°',
      instruction: 'Uz izgovor "Allāhu Ekber" pregnite se s ravnim leđima držeći ruke na koljenima. 3 puta ponovite: "Subhāne Rabbijel-\'Azīm". Zatim se uspravite uz: "Semi\'allāhu li men hamideh", te na uspravljanju: "Rabbenā lekel-hamd".',
      arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (٣×) ۝ سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا لَكَ الْحَمْدُ',
      transliteration: '3x na pregibu: Subhāne Rabbijel-\'Azīm.\nPri vraćanju u stajaći položaj: Semi\'allāhu li men hamideh, Rabbenā lekel-hamd.',
      translation: 'Neka je slavljen moj Uzvišeni Gospodar (3x).\nČuo Allah onoga ko Ga hvali, Gospodaru naš, Tebi hvala.',
      audioText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ'
    });

    // Dvije Sedžde
    steps.push({
      id: `sedzda-${rekatNum}`,
      title: 'Dvije Sedžde',
      subtitle: 'Spuštanje licem na tle',
      instruction: 'Uz izgovor "Allāhu Ekber" spustite se na sedždu (čelo, nos, dlanovi, koljena i prsti nogu na tlu) i 3 puta recite: "Subhāne Rabbijel-A\'lā". Kratko sjedite, pa uz "Allāhu Ekber" ponovite drugu sedždu (ponovo 3x Subhāne Rabbijel-A\'lā).',
      arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ (٣×)',
      transliteration: '3x na obje sedžde: Subhāne Rabbijel-A\'lā.',
      translation: 'Neka je slavljen moj Najviši Gospodar (3x).',
      audioText: 'سُبْحَانَ رَبِّيَ الْأَعْلَىٰ'
    });

    // Sittings
    if (isMiddleSitting) {
      steps.push({
        id: `sjedenje-prvo-${rekatNum}`,
        title: isGajriMuekkede ? 'Prvo sjedenje (Et-Tehijjātu + Salavati)' : 'Prvo sjedenje (Et-Tehijjātu)',
        subtitle: 'Sjedenje nakon 2. rek\'ata (Kā\'de-i ūlā)',
        instruction: isGajriMuekkede
          ? 'Nakon druge sedžde sjedite i proučite Et-Tehijjātu i Salavate (gajri-muekkede). Zatim uz "Allāhu Ekber" ustanite na 3. rek\'at.'
          : 'Nakon druge sedžde sjedite i proučite samo Et-Tehijjātu. Zatim uz "Allāhu Ekber" ustanite na 3. rek\'at.',
        arabic: isGajriMuekkede ? `${ettehijjatu?.arabic}\n\n${salavati?.arabic}` : ettehijjatu?.arabic,
        transliteration: isGajriMuekkede ? `${ettehijjatu?.transliteration}\n\n${salavati?.transliteration}` : ettehijjatu?.transliteration,
        translation: isGajriMuekkede ? `${ettehijjatu?.translation}\n\n${salavati?.translation}` : ettehijjatu?.translation,
        audioText: ettehijjatu?.arabic
      });
    } else if (isLastRekat) {
      steps.push({
        id: `sjedenje-zadnje-${rekatNum}`,
        title: 'Završno sjedenje & Selam (Kā\'de-i ehīre)',
        subtitle: 'Završetak namaza i predaja selama',
        instruction: 'Nakon druge sedžde sjedite i redom proučite: Et-Tehijjātu, Salavate i dove Rabbenā ātinā. Zatim predajte selam okrećući glavu prvo na desnu stranu uz "Es-selāmu \'alejkum ve rahmetullāh", a potom na lijevu stranu.',
        arabic: `${ettehijjatu?.arabic}\n\n${salavati?.arabic}\n\n${rabbena?.arabic}\n\nالسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ`,
        transliteration: `${ettehijjatu?.transliteration}\n\n${salavati?.transliteration}\n\n${rabbena?.transliteration}\n\nSelam: Es-selāmu \'alejkum ve rahmetullāh (na desnu, pa na lijevu stranu)`,
        translation: `${ettehijjatu?.translation}\n\n${salavati?.translation}\n\n${rabbena?.translation}`,
        audioText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ'
      });
    }

    return steps;
  };

  const currentSteps = getStepsForRekat(currentRekat, currentPart);
  const currentStep = currentSteps[activeStepIndex] || currentSteps[0];

  // Auto-play audio when navigating steps if autoSpeak is enabled
  useEffect(() => {
    if (autoSpeak && currentStep && (currentStep.audioText || currentStep.arabic) && !isCompleted) {
      const timeout = setTimeout(() => {
        handlePlayAudio(currentStep.audioText || currentStep.arabic || '');
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [activeStepIndex, currentRekat, autoSpeak, isCompleted]);

  // Audio handler
  const handlePlayAudio = (arabicText: string) => {
    if (isAudioPlaying) {
      soundService.stopSpeech();
      setIsAudioPlaying(false);
    } else {
      soundService.stopSpeech();
      setIsAudioPlaying(true);
      soundService.speak(
        arabicText, 
        'ar-SA', 
        0.85,
        () => setIsAudioPlaying(false),
        () => setIsAudioPlaying(true)
      );
    }
  };

  // Next Step / Rekat
  const handleNext = () => {
    soundService.playClick();
    soundService.stopSpeech();
    setIsAudioPlaying(false);

    if (activeStepIndex + 1 < currentSteps.length) {
      // Advance to next step in current rekat
      setActiveStepIndex(prev => prev + 1);
    } else {
      // Reached end of current rekat steps
      if (currentRekat < totalRekats) {
        soundService.playSuccess();
        setCurrentRekat(prev => prev + 1);
        setActiveStepIndex(0);
      } else {
        // Current part completed!
        soundService.playSuccess();
        setIsCompleted(true);
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Ignore
        }
      }
    }
  };

  // Prev Step / Rekat
  const handlePrev = () => {
    soundService.playClick();
    soundService.stopSpeech();
    setIsAudioPlaying(false);

    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    } else if (currentRekat > 1) {
      const prevRekat = currentRekat - 1;
      const prevSteps = getStepsForRekat(prevRekat, currentPart);
      setCurrentRekat(prevRekat);
      setActiveStepIndex(prevSteps.length - 1);
    }
  };

  // Tesbih tap
  const handleTesbihTap = () => {
    soundService.playTesbihClick();
    const nextCount = tesbihCount + 1;
    
    if (nextCount === 33) {
      soundService.playSuccess();
      setTesbihCount(0);
      setTesbihPhase('elhamdulillah');
    } else if (tesbihPhase === 'elhamdulillah' && nextCount === 33) {
      soundService.playSuccess();
      setTesbihCount(0);
      setTesbihPhase('allahuekber');
    } else if (tesbihPhase === 'allahuekber' && nextCount === 33) {
      soundService.playSuccess();
      setTesbihCount(33);
    } else {
      setTesbihCount(nextCount);
    }
  };

  const formatElapsed = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const hasRecitationContent = !!(currentStep.arabic || currentStep.transliteration || currentStep.translation);

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F4F0] flex flex-col text-[#2C3333]">
      {/* Top Header Bar */}
      <header className="flex-shrink-0 z-20 bg-[#F5F4F0] border-b border-[#E2E1D9] px-4 py-3 flex items-center justify-between shadow-2xs">
        <button
          id="namaz-mode-exit-btn"
          onClick={() => {
            soundService.playClick();
            soundService.stopSpeech();
            onClose();
          }}
          className="flex items-center space-x-1.5 text-xs text-[#636B69] hover:text-[#2C3333] px-3 py-1.5 rounded-xl bg-white border border-[#E2E1D9] shadow-2xs font-semibold cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Izađi</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16302B] animate-pulse" />
            <h1 className="text-xs font-bold text-[#16302B] uppercase tracking-wider">
              Namaz Mod • {selectedPreset.bosnianName}
            </h1>
          </div>
          <span className="text-[10px] text-[#8A8875] font-mono font-medium">
            {currentPart.name} ({currentPart.rekats} rek'ata) • {formatElapsed(elapsedSeconds)}
          </span>
        </div>

        <button
          id="namaz-reset-step-btn"
          onClick={() => {
            soundService.playClick();
            soundService.stopSpeech();
            setIsAudioPlaying(false);
            setCurrentRekat(1);
            setActiveStepIndex(0);
            setIsCompleted(false);
          }}
          title="Počni ispočetka"
          className="p-2 rounded-xl bg-white text-[#636B69] hover:text-[#16302B] border border-[#E2E1D9] shadow-2xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* Main Scrollable Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto w-full px-4 py-3 space-y-3.5 pb-6">
        
        {/* PREDEFINED FARZ & SUNNET PARTS SELECTOR (50/50 Equal Split like Rek'ats) */}
        <div className="bg-white rounded-2xl p-3 border border-[#E2E1D9] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-[#16302B]" />
              <span className="text-xs font-bold text-[#16302B]">
                Faza namaza ({selectedPreset.bosnianName}):
              </span>
            </div>
            <span className="text-[10px] text-[#636B69] bg-[#F5F4F0] px-2 py-0.5 rounded-md border border-[#E2E1D9] font-medium">
              {currentPart.rekats} rek'ata
            </span>
          </div>

          {/* Equal 50/50 flex layout (identical to rek'at pill buttons) */}
          <div className="flex space-x-2">
            {selectedPreset.parts.map((part, idx) => {
              const isSelected = selectedPartIndex === idx;
              return (
                <button
                  key={part.id}
                  id={`select-part-btn-${part.id}`}
                  onClick={() => handleSelectPart(idx)}
                  className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center space-y-0.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#16302B] text-white shadow-2xs'
                      : 'bg-[#FAF9F5] text-[#2C3333] hover:bg-[#F0EEE6] border border-[#E2E1D9]'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                      part.type === 'farz' 
                        ? (isSelected ? 'bg-[#2D6A4F] text-white' : 'bg-[#E8F0EC] text-[#1B4332]') 
                        : part.type === 'vitr'
                        ? (isSelected ? 'bg-[#8A6016] text-white' : 'bg-[#FEF7EA] text-[#8A6016]')
                        : (isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE8DE] text-[#636B69]')
                    }`}>
                      {part.type}
                    </span>
                    <span className={`text-xs font-extrabold ${isSelected ? 'text-[#C29B38]' : 'text-[#16302B]'}`}>
                      {part.rekats} r.
                    </span>
                  </div>
                  <span className="text-[11px] font-bold truncate max-w-[95%]">
                    {part.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* VIEW 1: NAMAZ COMPLETED CELEBRATION */}
        {isCompleted ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-[#E2E1D9] text-center shadow-xs">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F0EC] border-2 border-[#16302B]/20 flex items-center justify-center text-[#16302B] mb-3">
                <Award className="w-10 h-10 text-[#C29B38]" />
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20">
                {currentPart.name} uspješno završen
              </span>

              <h2 className="text-2xl font-bold text-[#16302B] mt-3">
                Allāh kabul olsun!
              </h2>
              <p className="text-xs text-[#636B69] mt-1 font-medium leading-relaxed">
                Neka Allah dž.š. primi vaš namaz i ibadete. Završili ste {currentPart.name} ({currentPart.rekats} rek'ata) za {formatElapsed(elapsedSeconds)}.
              </p>

              {/* Next Part action or Zabilježi */}
              <div className="space-y-2 mt-6">
                {selectedPartIndex + 1 < selectedPreset.parts.length ? (
                  <button
                    id="next-part-namaz-btn"
                    onClick={() => handleSelectPart(selectedPartIndex + 1)}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-[#16302B] hover:bg-[#1B4332] text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
                  >
                    <span>Nastavi na sljedeći dio ({selectedPreset.parts[selectedPartIndex + 1].name})</span>
                    <ChevronRight className="w-4 h-4 text-[#C29B38]" />
                  </button>
                ) : (
                  onRecordPrayer && (
                    <button
                      id="record-prayer-completed-btn"
                      onClick={() => {
                        soundService.playSuccess();
                        onRecordPrayer(selectedPreset.vakatKey);
                        alert(`Uspješno zabilježen ${selectedPreset.bosnianName}!`);
                      }}
                      className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-[#16302B] hover:bg-[#1B4332] text-white font-bold text-xs transition-all shadow-2xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C29B38]" />
                      <span>Zabilježi cijeli {selectedPreset.bosnianName} kao klanjan</span>
                    </button>
                  )
                )}

                <button
                  id="open-tesbih-btn"
                  onClick={() => {
                    soundService.playClick();
                    setShowTesbih(!showTesbih);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#FEF7EA] hover:bg-[#FDEED1] text-[#8A6016] border border-[#B58D3D]/30 font-bold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#B58D3D]" />
                  <span>{showTesbih ? 'Sakrij Tesbih' : 'Pokreni Digitalni Tesbih (33x)'}</span>
                </button>

                <button
                  onClick={() => {
                    soundService.playClick();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF9F5] text-[#2C3333] border border-[#E2E1D9] font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                >
                  <span>Zatvori vodič</span>
                </button>
              </div>
            </div>

            {/* Interactive Tesbih Widget */}
            {showTesbih && (
              <div className="bg-white rounded-3xl p-6 border border-[#E2E1D9] text-center shadow-xs space-y-4 animate-fadeIn">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20 uppercase tracking-widest">
                  {tesbihPhase === 'subhanallah' ? '1/3 • Subhānallāh' : tesbihPhase === 'elhamdulillah' ? '2/3 • El-hamdulillāh' : '3/3 • Allāhu Ekber'}
                </span>

                <div className="my-4">
                  <button
                    onClick={handleTesbihTap}
                    className="w-36 h-36 mx-auto rounded-full bg-[#16302B] p-1.5 shadow-sm transform active:scale-95 transition-all flex items-center justify-center cursor-pointer select-none border-4 border-[#C29B38]"
                  >
                    <div className="w-full h-full bg-[#16302B] rounded-full flex flex-col items-center justify-center text-white">
                      <span className="font-mono text-4xl font-extrabold">{tesbihCount}</span>
                      <span className="text-[10px] text-[#C29B38] font-bold uppercase mt-0.5">/ 33</span>
                    </div>
                  </button>
                  <p className="text-[11px] text-[#636B69] mt-2 font-medium">
                    Dodirnite krug za brojanje
                  </p>
                </div>

                <div className="p-3 bg-[#FAF9F5] rounded-2xl border border-[#E2E1D9] text-xs">
                  <p className="font-arabic text-xl text-[#16302B] py-0.5 font-bold" dir="rtl">
                    {tesbihPhase === 'subhanallah' ? 'سُبْحَانَ اللَّهِ' : tesbihPhase === 'elhamdulillah' ? 'الْحَمْدُ لِلَّهِ' : 'اللَّهُ أَكْبَرُ'}
                  </p>
                  <p className="text-[#4A5351] mt-0.5 font-medium">
                    {tesbihPhase === 'subhanallah' ? 'Slavljen neka je Allah' : tesbihPhase === 'elhamdulillah' ? 'Hvala Allahu' : 'Allah je Najveći'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* VIEW 2: STEP-BY-STEP PRAYER GUIDE (SEPARATED STEP VIEW) */
          <div className="space-y-3.5 animate-fadeIn">
            
            {/* Rek'at Selector Card (50/50 for 2 rek'ats, 33/33/33 for 3, 25% each for 4) */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#E2E1D9] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#16302B]">
                  Rek'ati ({currentPart.name}):
                </span>
                <span className="text-[10px] font-extrabold text-[#1B4332] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full border border-[#2D6A4F]/20">
                  {totalRekats} rek'ata ({currentPart.type.toUpperCase()})
                </span>
              </div>

              {/* Rek'at Horizontal Selector Tabs */}
              <div className="flex space-x-2">
                {Array.from({ length: totalRekats }, (_, i) => i + 1).map(step => {
                  const isActive = currentRekat === step;
                  const isPast = step < currentRekat;

                  return (
                    <button
                      key={step}
                      id={`select-rekat-tab-${step}`}
                      onClick={() => {
                        soundService.playClick();
                        soundService.stopSpeech();
                        setIsAudioPlaying(false);
                        setCurrentRekat(step);
                        setActiveStepIndex(0);
                      }}
                      className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        isActive
                          ? 'bg-[#16302B] text-white shadow-2xs'
                          : isPast
                          ? 'bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/20'
                          : 'bg-[#FAF9F5] text-[#636B69] hover:text-[#2C3333] border border-[#E2E1D9]'
                      }`}
                    >
                      {isPast && <Check className="w-3 h-3 text-[#1B4332]" />}
                      <span>{step}. Rek'at</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEPARATED SINGLE STEP CARD */}
            <div className="bg-white rounded-3xl p-5 border border-[#E2E1D9] shadow-2xs space-y-4">
              
              {/* Step Progress & Navigation Breadcrumbs inside this Rek'at */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E1D9]">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8A6016] bg-[#FEF7EA] px-2 py-0.5 rounded-md border border-[#B58D3D]/20">
                      {currentRekat}. REK'AT • KORAK {activeStepIndex + 1}/{currentSteps.length}
                    </span>
                  </div>
                  <h2 className="text-base font-extrabold text-[#16302B] mt-1.5 leading-snug">
                    {currentStep.title}
                  </h2>
                </div>

                {/* Speech Auto-Speak Toggle */}
                <button
                  id="toggle-auto-speak-btn"
                  onClick={() => {
                    soundService.playClick();
                    setAutoSpeak(!autoSpeak);
                  }}
                  title={autoSpeak ? 'Isključi automatski govor' : 'Uključi automatski govor'}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-all ${
                    autoSpeak
                      ? 'bg-[#E8F0EC] text-[#1B4332] border-[#2D6A4F]/30 shadow-2xs'
                      : 'bg-[#FAF9F5] text-[#8A8875] hover:text-[#2C3333] border-[#E2E1D9]'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${autoSpeak ? 'text-[#1B4332] animate-pulse' : ''}`} />
                  <span className="text-[10px] hidden sm:inline">{autoSpeak ? 'Auto-glas ON' : 'Auto-glas'}</span>
                </button>
              </div>

              {/* Step Progress Bar Dots */}
              <div className="flex space-x-1.5">
                {currentSteps.map((step, idx) => {
                  const isCurrent = activeStepIndex === idx;
                  const isDone = idx < activeStepIndex;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        soundService.playClick();
                        soundService.stopSpeech();
                        setIsAudioPlaying(false);
                        setActiveStepIndex(idx);
                      }}
                      className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#16302B] ring-2 ring-[#C29B38]/40'
                          : isDone
                          ? 'bg-[#2D6A4F]'
                          : 'bg-[#E2E1D9] hover:bg-[#D5D4CC]'
                      }`}
                      title={step.title}
                    />
                  );
                })}
              </div>

              {/* Physical Instruction Note */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E2E1D9] text-xs space-y-1">
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-[#16302B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>Uputstvo za položaj i radnju:</span>
                </div>
                <p className="text-[#3A4341] leading-relaxed font-medium">
                  {currentStep.instruction}
                </p>
              </div>

              {/* UNIFIED SWITCH TAB GROUP FOR RECITATION (Arapski / Izgovor / Prijevod / Sve) */}
              {hasRecitationContent && (
                <div className="bg-[#FAF9F5] rounded-2xl border border-[#E2E1D9] overflow-hidden shadow-2xs space-y-0">
                  
                  {/* Switch Tab Header & Audio Button */}
                  <div className="p-2.5 bg-white border-b border-[#E2E1D9] flex flex-wrap items-center justify-between gap-2">
                    {/* Switch Tabs */}
                    <div className="flex space-x-1 bg-[#F5F4F0] p-1 rounded-xl border border-[#E2E1D9]">
                      <button
                        id="tab-transliteration-btn"
                        onClick={() => {
                          soundService.playClick();
                          setRecitationTab('transliteration');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          recitationTab === 'transliteration'
                            ? 'bg-[#16302B] text-white shadow-2xs'
                            : 'text-[#636B69] hover:text-[#2C3333]'
                        }`}
                      >
                        Izgovor
                      </button>

                      <button
                        id="tab-arabic-btn"
                        onClick={() => {
                          soundService.playClick();
                          setRecitationTab('arabic');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          recitationTab === 'arabic'
                            ? 'bg-[#16302B] text-white shadow-2xs'
                            : 'text-[#636B69] hover:text-[#2C3333]'
                        }`}
                      >
                        Arapski
                      </button>

                      <button
                        id="tab-translation-btn"
                        onClick={() => {
                          soundService.playClick();
                          setRecitationTab('translation');
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          recitationTab === 'translation'
                            ? 'bg-[#16302B] text-white shadow-2xs'
                            : 'text-[#636B69] hover:text-[#2C3333]'
                        }`}
                      >
                        Prijevod
                      </button>
                    </div>

                    {/* Speech / Recitation Audio Button */}
                    {currentStep.arabic && (
                      <button
                        id="step-play-speech-btn"
                        onClick={() => handlePlayAudio(currentStep.audioText || currentStep.arabic || '')}
                        className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                          isAudioPlaying
                            ? 'bg-[#8A6016] text-white animate-pulse'
                            : 'bg-[#E8F0EC] hover:bg-[#DDE9E2] text-[#1B4332] border border-[#2D6A4F]/20'
                        }`}
                      >
                        {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C29B38]" />}
                        <span>{isAudioPlaying ? 'Zaustavi' : 'Slušaj'}</span>
                      </button>
                    )}
                  </div>

                  {/* Tab Body Content */}
                  <div className="p-3.5">
                    {/* 1. Transliteration Tab */}
                    {recitationTab === 'transliteration' && currentStep.transliteration && (
                      <div className="bg-white p-3.5 rounded-xl border border-[#E2E1D9]">
                        <p className="italic leading-relaxed text-[#2C3333] font-serif text-[13.5px] whitespace-pre-line">
                          {currentStep.transliteration}
                        </p>
                      </div>
                    )}

                    {/* 2. Arabic Tab */}
                    {recitationTab === 'arabic' && currentStep.arabic && (
                      <div className="bg-white p-4 rounded-xl border border-[#E2E1D9] text-right" dir="rtl">
                        <p className="font-arabic text-2xl text-[#16302B] leading-loose">
                          {currentStep.arabic}
                        </p>
                      </div>
                    )}

                    {/* 3. Translation Tab */}
                    {recitationTab === 'translation' && currentStep.translation && (
                      <div className="bg-white p-3.5 rounded-xl border border-[#E2E1D9]">
                        <p className="leading-relaxed text-[#3A4341] whitespace-pre-line text-xs font-medium">
                          {currentStep.translation}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>

            {/* Quick tips card */}
            <div className="bg-white rounded-2xl p-3.5 border border-[#E2E1D9] shadow-2xs space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#16302B]">
                <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>Savjet za skrušenost (Hušū')</span>
              </div>
              <p className="text-[11px] text-[#636B69] leading-relaxed">
                Pratite svaki korak s mirnoćom (Ta'dili erkan) i fokusom na značenje riječi koje učite pred Gospodarom.
              </p>
            </div>

          </div>
        )}

        </div>
      </main>

      {/* FIXED FOOTER CTA COMPONENT (Always accessible on screen) */}
      {!isCompleted && (
        <NamazFooterCTA
          currentRekat={currentRekat}
          totalRekats={totalRekats}
          activeStepIndex={activeStepIndex}
          totalSteps={currentSteps.length}
          partName={currentPart.name}
          canPrev={currentRekat > 1 || activeStepIndex > 0}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};
