import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Pause,
  Play,
  Radio,
  RotateCcw,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { DAILY_NAMAZ_PRESETS, NamazStructure } from '../data/namazPresets';
import {
  buildPrayerFlow,
  firstActionIndexForPart,
  firstFardIndex,
  PrayerAction,
  resolvePrayerActionContent,
} from '../data/prayerFlow';
import { soundService } from '../utils/soundAndSpeech';

interface NamazModeModalProps {
  initialPrayerName?: string;
  onClose: () => void;
  onRecordPrayer?: (prayerKey: string) => void;
}

type RecitationTab = 'transliteration' | 'arabic' | 'translation';
type FlowPhase = 'ready' | 'instruction' | 'movement' | 'recitation' | 'pause' | 'transition' | 'error';
type AudioState = 'idle' | 'loading' | 'playing' | 'error';

const findPreset = (name: string): NamazStructure => {
  const lower = name.toLocaleLowerCase('bs');
  if (lower.includes('sabah') || lower.includes('fajr')) return DAILY_NAMAZ_PRESETS.find(item => item.id === 'sabah')!;
  if (lower.includes('ikindija') || lower.includes('asr')) return DAILY_NAMAZ_PRESETS.find(item => item.id === 'ikindija')!;
  if (lower.includes('akšam') || lower.includes('aksam') || lower.includes('maghrib')) return DAILY_NAMAZ_PRESETS.find(item => item.id === 'aksam')!;
  if (lower.includes('jacija') || lower.includes('isha') || lower.includes('vitr')) return DAILY_NAMAZ_PRESETS.find(item => item.id === 'jacija')!;
  if (lower.includes('džuma') || lower.includes('dzuma') || lower.includes('petak')) return DAILY_NAMAZ_PRESETS.find(item => item.id === 'dzuma')!;
  return DAILY_NAMAZ_PRESETS.find(item => item.id === 'podne')!;
};

const phaseLabel: Record<FlowPhase, string> = {
  ready: 'Spremno',
  instruction: 'Govorna uputa',
  movement: 'Vrijeme za pokret',
  recitation: 'Učenje',
  pause: 'Kratka pauza',
  transition: 'Prijelaz između dijelova',
  error: 'Audio nije dostupan',
};

export const NamazModeModal: React.FC<NamazModeModalProps> = ({
  initialPrayerName = 'Podne (Dhuhr)',
  onClose,
  onRecordPrayer,
}) => {
  const [selectedPreset, setSelectedPreset] = useState(() => findPreset(initialPrayerName));
  const fullFlow = useMemo(() => buildPrayerFlow(selectedPreset), [selectedPreset]);
  const [sessionFlow, setSessionFlow] = useState<PrayerAction[]>(() => buildPrayerFlow(findPreset(initialPrayerName)));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGuided, setIsGuided] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBosnianInstructionAudioEnabled, setIsBosnianInstructionAudioEnabled] = useState(true);
  const [phase, setPhase] = useState<FlowPhase>('ready');
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [recitationTab, setRecitationTab] = useState<RecitationTab>('transliteration');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [tesbihCount, setTesbihCount] = useState(0);
  const controllerToken = useRef(0);
  const waitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveWait = useRef<((completed: boolean) => void) | null>(null);
  const recorded = useRef(false);
  const onRecordPrayerRef = useRef(onRecordPrayer);
  onRecordPrayerRef.current = onRecordPrayer;

  const currentAction = sessionFlow[currentIndex] ?? sessionFlow[0];
  const content = useMemo(
    () => currentAction ? resolvePrayerActionContent(currentAction) : null,
    [currentAction],
  );
  const workflowParts = useMemo(() => [
    ...selectedPreset.parts.map((part, index) => ({ ...part, index, isPostSalahZikr: false })),
    { id: 'post-salah-zikr', name: 'Zikr poslije namaza', index: selectedPreset.parts.length, isPostSalahZikr: true, rekats: 0, type: 'zikr' },
  ], [selectedPreset.parts]);
  const selectedPartIndex = currentAction?.partName === 'Zikr poslije namaza'
    ? selectedPreset.parts.length
    : currentAction?.kind === 'section-transition'
    ? Math.min(currentAction.partIndex + 1, selectedPreset.parts.length - 1)
    : currentAction?.partIndex ?? 0;

  const clearWait = useCallback(() => {
    if (waitTimer.current) clearTimeout(waitTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    waitTimer.current = null;
    countdownTimer.current = null;
    setRemainingSeconds(0);
    resolveWait.current?.(false);
    resolveWait.current = null;
  }, []);

  const cancelController = useCallback(() => {
    controllerToken.current += 1;
    clearWait();
    soundService.stopPlayback();
    setAudioState('idle');
  }, [clearWait]);

  const haltForAudioError = useCallback(() => {
    // Increment the token before pausing guided mode so the effect cleanup
    // cannot overwrite this visible error state with its normal idle reset.
    cancelController();
    setAudioState('error');
    setPhase('error');
    setIsGuided(false);
  }, [cancelController]);

  const waitFor = useCallback((milliseconds: number, token: number) => new Promise<boolean>(resolve => {
    if (milliseconds <= 0 || token !== controllerToken.current) {
      resolve(milliseconds <= 0);
      return;
    }
    setRemainingSeconds(Math.ceil(milliseconds / 1000));
    const endAt = Date.now() + milliseconds;
    resolveWait.current = resolve;
    countdownTimer.current = setInterval(() => {
      setRemainingSeconds(Math.max(0, Math.ceil((endAt - Date.now()) / 1000)));
    }, 250);
    waitTimer.current = setTimeout(() => {
      if (countdownTimer.current) clearInterval(countdownTimer.current);
      countdownTimer.current = null;
      waitTimer.current = null;
      resolveWait.current = null;
      setRemainingSeconds(0);
      resolve(token === controllerToken.current);
    }, milliseconds);
  }), []);

  const playRecitations = useCallback(async (actionItem: PrayerAction, token: number) => {
    const resolved = resolvePrayerActionContent(actionItem).recitations;
    for (const recitation of resolved) {
      if (token !== controllerToken.current) return false;
      let result: 'ended' | 'cancelled' | 'error';
      if (recitation.audioUrls.length) {
        result = await soundService.playAudioUrls(recitation.audioUrls, state => {
          if (token === controllerToken.current) setAudioState(state);
        });
        if (result === 'error' && token === controllerToken.current) {
          result = await soundService.speakArabicRecitation(recitation.arabic, state => {
            if (token === controllerToken.current) setAudioState(state);
          });
        }
      } else {
        result = await soundService.speakArabicRecitation(recitation.arabic, state => {
          if (token === controllerToken.current) setAudioState(state);
        });
      }
      if (result === 'cancelled' || token !== controllerToken.current) return false;
      if (result === 'error') {
        // A missing Arabic browser voice is not a completed recitation.
        // Keep this step open so the user can retry it instead of advancing.
        haltForAudioError();
        return false;
      }
    }
    return true;
  }, [haltForAudioError]);

  const completePrayer = useCallback(() => {
    cancelController();
    setIsGuided(false);
    setIsCompleted(true);
    setPhase('ready');
    setAudioState('idle');
    soundService.playSuccess();
    const completedFard = sessionFlow.some(item => item.kind === 'action' && item.partType === 'farz');
    if (!recorded.current && completedFard) {
      recorded.current = true;
      onRecordPrayerRef.current?.(selectedPreset.vakatKey);
    }
    void confetti({ particleCount: 70, spread: 65, origin: { y: 0.72 }, colors: ['#16302B', '#C29B38', '#FFFFFF'] });
  }, [cancelController, selectedPreset.vakatKey, sessionFlow]);

  useEffect(() => {
    if (!isGuided || !currentAction || isCompleted) return;
    const token = ++controllerToken.current;

    const run = async () => {
      setAudioState('idle');
      setPhase(currentAction.kind === 'section-transition' ? 'transition' : 'instruction');
      const instructionResult = isBosnianInstructionAudioEnabled
        ? await soundService.speakAsync(currentAction.instruction, 'bs-BA', 0.95, state => {
          if (token === controllerToken.current) setAudioState(state);
        })
        : 'ended' as const;
      if (instructionResult === 'cancelled' || token !== controllerToken.current) return;
      if (instructionResult === 'error') {
        haltForAudioError();
        return;
      }

      if (currentAction.movementDelayMs > 0) {
        setPhase(currentAction.kind === 'section-transition' ? 'transition' : 'movement');
        if (!await waitFor(currentAction.movementDelayMs, token)) return;
      }
      if (currentAction.recitations.length) {
        setPhase('recitation');
        if (!await playRecitations(currentAction, token)) return;
      }
      if (currentAction.transitionDelayMs > 0) {
        setPhase('pause');
        if (!await waitFor(currentAction.transitionDelayMs, token)) return;
      }
      if (token !== controllerToken.current) return;
      if (currentIndex >= sessionFlow.length - 1) completePrayer();
      else setCurrentIndex(index => index + 1);
    };

    void run();
    return () => {
      if (controllerToken.current === token) cancelController();
    };
  }, [cancelController, completePrayer, currentAction, currentIndex, haltForAudioError, isBosnianInstructionAudioEnabled, isCompleted, isGuided, playRecitations, sessionFlow.length, waitFor]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isGuided && !isCompleted) setElapsedSeconds(value => value + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted, isGuided]);

  useEffect(() => () => cancelController(), [cancelController]);

  const resetSession = useCallback((flow = fullFlow) => {
    cancelController();
    setSessionFlow(flow);
    setCurrentIndex(0);
    setIsGuided(false);
    setIsCompleted(false);
    setPhase('ready');
    setElapsedSeconds(0);
    setTesbihCount(0);
    recorded.current = false;
  }, [cancelController, fullFlow]);

  const selectPrayer = (preset: NamazStructure) => {
    cancelController();
    const nextFlow = buildPrayerFlow(preset);
    setSelectedPreset(preset);
    setSessionFlow(nextFlow);
    setCurrentIndex(0);
    setIsGuided(false);
    setIsCompleted(false);
    setElapsedSeconds(0);
    recorded.current = false;
  };

  const goTo = (nextIndex: number) => {
    cancelController();
    setIsCompleted(false);
    setPhase('ready');
    setCurrentIndex(Math.max(0, Math.min(nextIndex, sessionFlow.length - 1)));
  };

  const selectPart = (partIndex: number) => {
    const start = partIndex === selectedPreset.parts.length
      ? fullFlow.findIndex(item => item.kind === 'action' && item.partName === 'Zikr poslije namaza')
      : firstActionIndexForPart(fullFlow, partIndex);
    if (start >= 0) resetSession(fullFlow.slice(start));
  };

  const skipSunnah = () => {
    const start = firstFardIndex(fullFlow);
    if (start < 0) return;
    const resume = isGuided;
    cancelController();
    setSessionFlow(fullFlow.slice(start));
    setCurrentIndex(0);
    setIsCompleted(false);
    setPhase('ready');
    setIsGuided(resume);
  };

  const toggleGuided = () => {
    if (isCompleted) {
      resetSession();
      setIsGuided(true);
      return;
    }
    if (isGuided) {
      cancelController();
      setIsGuided(false);
      setPhase('ready');
    } else {
      setIsGuided(true);
    }
  };

  const toggleListen = async () => {
    if (!currentAction?.recitations.length) return;
    if (audioState === 'playing' || audioState === 'loading') {
      cancelController();
      setIsGuided(false);
      return;
    }
    cancelController();
    setIsGuided(false);
    const token = controllerToken.current;
    setPhase('recitation');
    const played = await playRecitations(currentAction, token);
    if (played && token === controllerToken.current) {
      setAudioState('idle');
      setPhase('ready');
    }
  };

  const close = () => {
    cancelController();
    onClose();
  };

  const formatElapsed = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const fardPartIndex = selectedPreset.parts.findIndex(part => part.type === 'farz');
  const canSkipToFard = fardPartIndex >= 0 && selectedPartIndex < fardPartIndex;
  const completedFard = sessionFlow.some(item => item.kind === 'action' && item.partType === 'farz');
  const progress = sessionFlow.length ? ((currentIndex + 1) / sessionFlow.length) * 100 : 0;

  if (!currentAction) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#F7F6F1] text-[#2C3333]">
      <header className="shrink-0 border-b border-[#E2E1D9] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-3">
          <button id="namaz-mode-exit-btn" onClick={close} className="rounded-xl border border-[#E2E1D9] bg-[#FAF9F5] p-2 text-[#16302B]" aria-label="Zatvori vodič"><X className="h-5 w-5" /></button>
          <div className="text-center">
            <p className="text-sm font-extrabold text-[#16302B]">Namaz vodič · {selectedPreset.bosnianName}</p>
            <p className="mt-0.5 text-[10px] font-bold text-[#8A6016]">{isGuided ? `${phaseLabel[phase]}${remainingSeconds ? ` · ${remainingSeconds}s` : ''}` : 'Ručno upravljanje'} · {formatElapsed(elapsedSeconds)}</p>
          </div>
          <button id="namaz-reset-step-btn" onClick={() => resetSession()} className="rounded-xl border border-[#E2E1D9] bg-[#FAF9F5] p-2 text-[#16302B]" aria-label="Ponovo pokreni"><RotateCcw className="h-5 w-5" /></button>
        </div>
        <div className="h-1 bg-[#E2E1D9]"><div className="h-full bg-[#C29B38] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-md space-y-3 px-4 py-4 pb-40">
          <div className="rounded-2xl border border-[#E2E1D9] bg-white p-3 shadow-xs">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#636B69]">Izaberi namaz</p>
            <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
              {DAILY_NAMAZ_PRESETS.map(preset => (
                <button key={preset.id} onClick={() => selectPrayer(preset)} className={`shrink-0 snap-start rounded-xl border px-3 py-2 text-xs font-bold ${preset.id === selectedPreset.id ? 'border-[#16302B] bg-[#16302B] text-white' : 'border-[#E2E1D9] bg-[#FAF9F5] text-[#4A5351]'}`}>
                  {preset.id === 'jacija' ? 'Jacija + Vitr' : preset.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E1D9] bg-white p-3 shadow-xs">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#636B69]">Dijelovi redoslijedom</p>
              {canSkipToFard && <button id="skip-sunnah-btn" onClick={skipSunnah} className="flex items-center gap-1 rounded-lg bg-[#FEF7EA] px-2 py-1 text-[10px] font-extrabold text-[#8A6016]"><SkipForward className="h-3 w-3" /> Idi na farz</button>}
            </div>
            <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
              {workflowParts.map(part => (
                <button key={part.id} onClick={() => selectPart(part.index)} className={`shrink-0 snap-start rounded-xl border px-3 py-2 text-left ${part.index === selectedPartIndex ? 'border-[#C29B38] bg-[#FEF7EA]' : 'border-[#E2E1D9] bg-[#FAF9F5]'}`}>
                  <span className="block text-[11px] font-extrabold text-[#16302B]">{part.name}</span>
                  <span className="text-[9px] font-bold text-[#636B69]">{part.isPostSalahZikr ? 'Nakon selama · ZIKR' : `${part.rekats} rek'ata · ${part.type.toUpperCase()}`}</span>
                </button>
              ))}
            </div>
          </div>

          {isCompleted ? (
            <div className="rounded-3xl border border-[#C29B38]/40 bg-white p-7 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#1B4332]" />
              <h2 className="mt-3 text-2xl font-extrabold text-[#16302B]">Namaz je završen</h2>
              <p className="mt-2 text-sm text-[#636B69]">Neka Allah primi {selectedPreset.bosnianName}. {completedFard ? 'Završetak je zabilježen u postojećoj dnevnoj evidenciji.' : 'Ovaj odabrani dio nije promijenio evidenciju farz-namaza.'}</p>
              <div className="mt-6 rounded-2xl bg-[#FEF7EA] p-4">
                <p className="text-xs font-bold text-[#8A6016]">Digitalni tesbih poslije namaza</p>
                <button onClick={() => { soundService.playTesbihClick(); setTesbihCount(value => (value + 1) % 34); }} className="mx-auto mt-3 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-[#C29B38] bg-[#16302B] text-white active:scale-95">
                  <span className="font-mono text-4xl font-extrabold">{tesbihCount}</span><span className="text-[10px] font-bold text-[#C29B38]">/ 33</span>
                </button>
              </div>
            </div>
          ) : currentAction.kind === 'section-transition' ? (
            <div className="rounded-3xl border border-[#C29B38]/40 bg-[#16302B] p-7 text-center text-white shadow-sm">
              <Clock3 className="mx-auto h-10 w-10 text-[#C29B38]" />
              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C29B38]">Prijelaz između dijelova</p>
              <h2 className="mt-2 text-2xl font-extrabold">{currentAction.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#DDD9CF]">{currentAction.instruction}</p>
              {isGuided && <p className="mt-5 font-mono text-4xl font-extrabold text-[#C29B38]">{remainingSeconds || 15}</p>}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E2E1D9] bg-white p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3 border-b border-[#E2E1D9] pb-3">
                <div>
                  <span className="rounded-md border border-[#B58D3D]/20 bg-[#FEF7EA] px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#8A6016]">Korak {currentIndex + 1} od {sessionFlow.length}</span>
                  <p className="mt-2 text-[11px] font-bold text-[#2D6A4F]">{currentAction.partName} · {currentAction.subtitle}</p>
                  <h2 className="mt-1 text-xl font-extrabold text-[#16302B]">{currentAction.title}</h2>
                </div>
                {isGuided && <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#E8F0EC] px-2 py-1 text-[9px] font-extrabold text-[#1B4332]"><Radio className="h-3 w-3 animate-pulse" /> AUTO</span>}
              </div>

              <div className="mt-4 rounded-2xl border border-[#E2E1D9] bg-[#FAF9F5] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#16302B]"><Sparkles className="h-3.5 w-3.5 text-[#C29B38]" /> Uputstvo za položaj i radnju</p>
                  <button
                    id="bosnian-instruction-audio-toggle"
                    type="button"
                    aria-label={isBosnianInstructionAudioEnabled ? 'Isključi glasovne upute' : 'Uključi glasovne upute'}
                    aria-pressed={isBosnianInstructionAudioEnabled}
                    title={isBosnianInstructionAudioEnabled ? 'Isključi glasovne upute' : 'Uključi glasovne upute'}
                    onClick={() => setIsBosnianInstructionAudioEnabled(enabled => !enabled)}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors active:scale-95 ${isBosnianInstructionAudioEnabled ? 'border-[#16302B] bg-[#16302B] text-white' : 'border-[#D6D5CD] bg-white text-[#636B69]'}`}
                  >
                    {isBosnianInstructionAudioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#3A4341]">{currentAction.instruction}</p>
                {isGuided && remainingSeconds > 0 && <div className="mt-3"><div className="mb-1 flex justify-between text-[10px] font-bold text-[#8A6016]"><span>{phaseLabel[phase]}</span><span>{remainingSeconds}s</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#E2E1D9]"><div className="h-full animate-pulse rounded-full bg-[#C29B38]" style={{ width: `${Math.min(100, Math.max(8, remainingSeconds / 3 * 100))}%` }} /></div></div>}
              </div>

              {content && content.arabic && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#E2E1D9] bg-[#FAF9F5]">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E1D9] bg-white p-2.5">
                    <div className="flex rounded-xl border border-[#E2E1D9] bg-[#F5F4F0] p-1">
                      {(['transliteration', 'arabic', 'translation'] as RecitationTab[]).map(tab => <button key={tab} onClick={() => setRecitationTab(tab)} className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${recitationTab === tab ? 'bg-[#16302B] text-white' : 'text-[#636B69]'}`}>{tab === 'transliteration' ? 'Izgovor' : tab === 'arabic' ? 'Arapski' : 'Prijevod'}</button>)}
                    </div>
                    <button id="step-play-speech-btn" onClick={() => void toggleListen()} className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${audioState === 'playing' || audioState === 'loading' ? 'border-[#8A6016] bg-[#8A6016] text-white' : 'border-[#2D6A4F]/20 bg-[#E8F0EC] text-[#1B4332]'}`}>
                      {audioState === 'playing' || audioState === 'loading' ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-[#C29B38]" />}
                      {audioState === 'loading' ? 'Učitavanje' : audioState === 'playing' ? 'Zaustavi' : audioState === 'error' ? 'Pokušaj ponovo' : 'Slušaj'}
                    </button>
                  </div>
                  <div className="p-4">
                    {recitationTab === 'arabic' && <p dir="rtl" className="whitespace-pre-line text-right font-arabic text-2xl font-bold leading-loose text-[#16302B]">{content.arabic}</p>}
                    {recitationTab === 'transliteration' && <p className="whitespace-pre-line font-serif text-sm italic leading-relaxed text-[#2C3333]">{content.transliteration}</p>}
                    {recitationTab === 'translation' && <p className="whitespace-pre-line text-sm leading-relaxed text-[#3A4341]">{content.translation}</p>}
                    <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-[#8A8875]">{content.hasRealAudio ? 'Kur’anski dijelovi koriste postojeći Mishary Alafasy audio; ostalo koristi arapski TTS.' : 'Arapski TTS fallback · samo arapski tekst'}</p>
                    {audioState === 'error' && <p className="mt-2 text-[10px] font-bold leading-relaxed text-[#A34720]">Arapsko učenje nije pokrenuto. Vodič je zaustavljen na ovom koraku — pokušaj ponovo ili provjeri da preglednik/sistem ima omogućen arapski glas.</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 border-t border-[#E2E1D9] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-md space-y-2">
          {!isCompleted ? <>
            <button id="toggle-guided-prayer-btn" onClick={toggleGuided} className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-extrabold ${isGuided ? 'bg-[#FEF7EA] text-[#8A6016]' : 'bg-[#C29B38] text-[#16302B]'}`}>{isGuided ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{isGuided ? 'Pauziraj automatski vodič' : currentIndex === 0 ? 'Start · Pokreni automatski vodič' : 'Nastavi automatski vodič'}</button>
            <div className="grid grid-cols-2 gap-2">
              <button id="namaz-footer-prev-btn" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)} className="flex items-center justify-center gap-1 rounded-xl border border-[#E2E1D9] bg-white py-2.5 text-xs font-bold text-[#2C3333] disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Prethodno</button>
              <button id="namaz-footer-next-btn" onClick={() => currentIndex >= sessionFlow.length - 1 ? completePrayer() : goTo(currentIndex + 1)} className="flex items-center justify-center gap-1 rounded-xl bg-[#16302B] py-2.5 text-xs font-bold text-white">{currentIndex >= sessionFlow.length - 1 ? <Check className="h-4 w-4" /> : null}{currentIndex >= sessionFlow.length - 1 ? 'Završi namaz' : 'Sljedeći korak'}{currentIndex < sessionFlow.length - 1 ? <ChevronRight className="h-4 w-4 text-[#C29B38]" /> : null}</button>
            </div>
          </> : <button onClick={close} className="w-full rounded-2xl bg-[#16302B] py-3 text-sm font-extrabold text-white">Zatvori vodič</button>}
        </div>
      </footer>
    </div>
  );
};
