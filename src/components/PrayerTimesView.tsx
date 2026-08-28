import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  MapPin, 
  Bell, 
  BellOff, 
  CheckCircle2, 
  Circle, 
  Compass, 
  Volume2, 
  Sparkles, 
  Moon, 
  Sun, 
  Sunset, 
  Sunrise, 
  Navigation,
  Check,
  AlertCircle
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/citiesVaktija';
import { calculatePrayerTimes, formatCountdown } from '../utils/prayerTimes';
import { CityInfo, NotificationSetting, PrayerTime } from '../types';
import { soundService } from '../utils/soundAndSpeech';

interface PrayerTimesViewProps {
  selectedCityName: string;
  onSelectCity: (city: CityInfo) => void;
  notifications: NotificationSetting;
  onUpdateNotifications: (settings: NotificationSetting) => void;
  prayedToday: Record<string, boolean>;
  onTogglePrayed: (prayerKey: string) => void;
  onOpenQibla: () => void;
  onOpenFocusMode: (prayerName?: string) => void;
}

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({
  selectedCityName,
  onSelectCity,
  notifications,
  onUpdateNotifications,
  prayedToday,
  onTogglePrayed,
  onOpenQibla,
  onOpenFocusMode
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [countdown, setCountdown] = useState<string>('--:--:--');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [isLocating, setIsLocating] = useState(false);
  const [customCity, setCustomCity] = useState<CityInfo | null>(null);
  const [notificationAlertSent, setNotificationAlertSent] = useState<string | null>(null);

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeCity = useMemo(() => {
    if (customCity && customCity.name === selectedCityName) return customCity;
    return POPULAR_CITIES.find(c => c.name === selectedCityName) || POPULAR_CITIES[0];
  }, [selectedCityName, customCity]);

  // Calculate prayer times
  const prayerTimes: PrayerTime[] = useMemo(() => {
    return calculatePrayerTimes(currentDate, activeCity.lat, activeCity.lng);
  }, [currentDate, activeCity]);

  // Find next prayer for countdown
  const nextPrayer = useMemo(() => {
    return prayerTimes.find(p => p.isNext) || prayerTimes[1]; // default Fajr
  }, [prayerTimes]);

  // Find latest/next non-prayed prayer for Započni namaz button
  const latestNonPrayedPrayer = useMemo(() => {
    // 1. First check if the current or next active prayer is not prayed
    const trackablePrayers = prayerTimes.filter(p => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(p.key));
    
    // Find first non-prayed prayer starting from current/next forward
    const currentOrNextIdx = trackablePrayers.findIndex(p => p.isCurrent || p.isNext);
    if (currentOrNextIdx !== -1) {
      for (let i = currentOrNextIdx; i < trackablePrayers.length; i++) {
        if (!prayedToday[trackablePrayers[i].key]) {
          return trackablePrayers[i];
        }
      }
    }
    
    // 2. Otherwise find any earliest unprayed prayer today (e.g. Fajr if missed)
    const anyUnprayed = trackablePrayers.find(p => !prayedToday[p.key]);
    if (anyUnprayed) return anyUnprayed;

    // 3. If all prayed, fallback to next prayer or Fajr
    return nextPrayer || trackablePrayers[0];
  }, [prayerTimes, prayedToday, nextPrayer]);

  // Update live countdown
  useEffect(() => {
    if (!nextPrayer) return;
    const { formatted } = formatCountdown(nextPrayer.dateObj);
    setCountdown(formatted);
  }, [currentDate, nextPrayer]);

  // Automated notification checker
  useEffect(() => {
    if (!notifications.soundEnabled && notificationPermission !== 'granted') return;

    const now = new Date();
    prayerTimes.forEach(prayer => {
      // Check if time is within 10 seconds of prayer
      const diffMs = Math.abs(prayer.dateObj.getTime() - now.getTime());
      const alertKey = `${prayer.key}-${now.toISOString().split('T')[0]}`;

      if (diffMs < 30000 && notificationAlertSent !== alertKey) {
        const isNotifEnabled = notifications[prayer.key as keyof NotificationSetting];
        if (isNotifEnabled) {
          setNotificationAlertSent(alertKey);
          
          // Sound chime
          if (notifications.soundEnabled) {
            soundService.playAdhanChime();
          }

          // Browser Push Notification
          if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
            try {
              new Notification(`Vrijeme je za ${prayer.name}`, {
                body: `Nastupilo je namasko vrijeme u gradu ${activeCity.name}. Klanjajte skrušeno i na vrijeme.`,
                icon: '/favicon.ico'
              });
            } catch {
              // Ignore
            }
          }
        }
      }
    });
  }, [currentDate, prayerTimes, notifications, notificationPermission, activeCity, notificationAlertSent]);

  // Request push notification permission
  const handleRequestNotifications = async () => {
    soundService.playClick();
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Vaš preglednik ne podržava sistemske notifikacije, ali zvučna obavještenja su aktivna.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        soundService.playSuccess();
        new Notification('Obavijesti za vaktiju su aktivirane!', {
          body: `Uspješno ste uključili obavještenja za namaz u gradu ${activeCity.name}.`,
        });
      }
    } catch {
      // Ignore
    }
  };

  // GPS Geolocation Handler
  const handleUseGPS = () => {
    soundService.playClick();
    if (!navigator.geolocation) {
      alert('Geolokacija nije podržana u vašem pregledniku.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const city: CityInfo = {
          name: 'Moja Lokacija (GPS)',
          country: 'GPS',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Sarajevo'
        };
        setCustomCity(city);
        onSelectCity(city);
        soundService.playSuccess();
      },
      () => {
        setIsLocating(false);
        alert('Nije moguće dohvatiti lokaciju. Provjerite dozvole u postavkama preglednika.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const getPrayerIcon = (key: string) => {
    switch (key) {
      case 'imsak': return <Moon className="w-4 h-4 text-indigo-300" />;
      case 'fajr': return <Sunrise className="w-4 h-4 text-amber-300" />;
      case 'sunrise': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'dhuhr': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'asr': return <Sun className="w-4 h-4 text-orange-400" />;
      case 'maghrib': return <Sunset className="w-4 h-4 text-rose-400" />;
      case 'isha': return <Moon className="w-4 h-4 text-indigo-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-24 animate-fadeIn">
      {/* City Selector & GPS Header */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#16302B]" />
            <span className="text-xs font-bold text-[#2C3333]">Izbor grada / Lokacija:</span>
          </div>

          <button
            id="gps-location-btn"
            onClick={handleUseGPS}
            disabled={isLocating}
            className="flex items-center space-x-1 text-xs text-[#1B4332] bg-[#E8F0EC] hover:bg-[#DDE9E2] px-2.5 py-1 rounded-xl border border-[#2D6A4F]/20 font-semibold transition-colors"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Tražim GPS...' : 'Moja GPS Lokacija'}</span>
          </button>
        </div>

        {/* City dropdown */}
        <select
          id="city-selector-dropdown"
          value={activeCity.name}
          onChange={(e) => {
            const found = POPULAR_CITIES.find(c => c.name === e.target.value);
            if (found) {
              soundService.playClick();
              onSelectCity(found);
            }
          }}
          className="w-full bg-[#FAF9F5] border border-[#E2E1D9] rounded-xl px-3 py-2.5 text-xs text-[#2C3333] font-semibold focus:outline-none focus:border-[#16302B] transition-colors"
        >
          {customCity && (
            <option value={customCity.name}>📍 {customCity.name}</option>
          )}
          {POPULAR_CITIES.map(city => (
            <option key={city.name} value={city.name}>
              {city.name} ({city.country})
            </option>
          ))}
        </select>
      </div>

      {/* Hero Countdown Card */}
      <div className="bg-[#16302B] rounded-3xl p-5 border border-[#16302B] shadow-sm relative overflow-hidden text-center text-white">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#234E45] border border-[#C29B38]/30 text-[#C29B38] text-xs font-semibold mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Sljedeći vakat: {nextPrayer?.name}</span>
        </div>

        <div className="my-2">
          <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {countdown}
          </span>
          <p className="text-xs text-[#DDD9CF] mt-1 font-medium">
            do namaza u <strong className="text-[#C29B38]">{nextPrayer?.time}</strong> sati
          </p>
        </div>

        {/* Započni Namaz Button */}
        <div className="mt-4 pt-3 border-t border-[#234E45] flex items-center justify-center">
          <button
            id="start-namaz-mode-btn"
            onClick={() => {
              soundService.playClick();
              onOpenFocusMode(latestNonPrayedPrayer?.name || nextPrayer?.name);
            }}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-[#C29B38] hover:bg-[#B58D3D] text-[#16302B] font-extrabold text-sm shadow-sm transition-all transform active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-[#16302B]" />
            <span>Započni namaz ({latestNonPrayedPrayer?.name})</span>
          </button>
        </div>
      </div>

      {/* Push Notification Toggle & Permissions Banner */}
      <div className="bg-white rounded-2xl p-3.5 border border-[#E2E1D9] shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-xl ${notifications.soundEnabled ? 'bg-[#E8F0EC] text-[#1B4332]' : 'bg-[#F5F4F0] text-[#636B69]'}`}>
            {notifications.soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-xs font-bold text-[#2C3333]">Automatska zvučna obavještenja</p>
            <p className="text-[11px] text-[#636B69] font-medium">
              {notificationPermission === 'granted' ? 'Sistemska i zvučna zvona aktivna' : 'Zvučni tonovi u aplikaciji'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {notificationPermission !== 'granted' && (
            <button
              onClick={handleRequestNotifications}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#16302B] hover:bg-[#234E45] text-white font-semibold transition-colors shadow-xs"
            >
              Dozvoli push
            </button>
          )}
          <button
            id="test-sound-chime-btn"
            onClick={() => {
              soundService.playAdhanChime();
            }}
            title="Testiraj ezan zvono"
            className="p-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EEE6] text-[#8A6016] border border-[#E2E1D9] text-xs flex items-center space-x-1 font-semibold"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#B58D3D]" />
            <span className="text-[10px]">Test</span>
          </button>
        </div>
      </div>

      {/* Prayer Times List / Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#636B69]">
            Dnevni Vakti & Evidencija Klanjanja
          </h3>
          <span className="text-[11px] text-[#1B4332] font-semibold">
            Označite obavljene namaze ✓
          </span>
        </div>

        {prayerTimes.map(prayer => {
          const isPrayed = prayedToday[prayer.key] || false;
          const isTrackable = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(prayer.key);

          return (
            <div
              key={prayer.key}
              id={`prayer-row-${prayer.key}`}
              onClick={() => {
                if (isTrackable) {
                  soundService.playClick();
                  onOpenFocusMode(prayer.name);
                }
              }}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                isTrackable ? 'cursor-pointer hover:scale-[1.005] active:scale-[0.995]' : ''
              } ${
                prayer.isCurrent
                  ? 'bg-[#E8F0EC] border-[#16302B] shadow-xs ring-1 ring-[#16302B]/20'
                  : prayer.isNext
                  ? 'bg-[#FEF7EA] border-[#B58D3D]/50 shadow-xs'
                  : 'bg-white border-[#E2E1D9] hover:border-[#C5C2B4] shadow-xs'
              }`}
            >
              {/* Left icon & name */}
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#F5F4F0] border border-[#E2E1D9]">
                  {getPrayerIcon(prayer.key)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-bold text-[#16302B] leading-none">{prayer.name}</h4>
                    {prayer.isCurrent && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#16302B] text-white">
                        SADA
                      </span>
                    )}
                    {prayer.isNext && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#C29B38] text-[#16302B]">
                        SLJEDEĆI
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#636B69] mt-1 font-medium">
                    {prayer.rekats}
                  </p>
                </div>
              </div>

              {/* Right time & actions */}
              <div className="flex items-center space-x-2">
                <span className="font-mono text-base font-extrabold text-[#16302B] tracking-wide">
                  {prayer.time}
                </span>

                {isTrackable && (
                  <button
                    id={`track-prayer-${prayer.key}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundService.playSuccess();
                      onTogglePrayed(prayer.key);
                    }}
                    title={isPrayed ? 'Namaz obavljen' : 'Označi kao klanjan'}
                    className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                      isPrayed
                        ? 'bg-[#E8F0EC] text-[#1B4332] border border-[#2D6A4F]/30'
                        : 'bg-[#F5F4F0] text-[#8A8875] hover:text-[#2C3333] border border-[#E2E1D9]'
                    }`}
                  >
                    {isPrayed ? (
                      <CheckCircle2 className="w-5 h-5 fill-[#E8F0EC] text-[#1B4332]" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
