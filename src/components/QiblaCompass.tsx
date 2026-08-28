import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Compass, MapPin, Navigation, Sparkles, AlertCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { POPULAR_CITIES } from '../data/citiesVaktija';
import { calculateQibla, QiblaResult } from '../utils/qiblaCalc';
import { CityInfo } from '../types';
import { soundService } from '../utils/soundAndSpeech';

interface QiblaCompassProps {
  selectedCityName: string;
  onSelectCity: (city: CityInfo) => void;
}

export const QiblaCompass: React.FC<QiblaCompassProps> = ({
  selectedCityName,
  onSelectCity
}) => {
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasOrientationSensor, setHasOrientationSensor] = useState<boolean>(false);
  const [permissionRequested, setPermissionRequested] = useState<boolean>(false);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const lastVibratedAligned = useRef<boolean>(false);

  const activeCity = useMemo(() => {
    return POPULAR_CITIES.find(c => c.name === selectedCityName) || POPULAR_CITIES[0];
  }, [selectedCityName]);

  const qiblaData: QiblaResult = useMemo(() => {
    return calculateQibla(activeCity.lat, activeCity.lng);
  }, [activeCity]);

  // Request iOS permission if needed
  const requestOrientationPermission = async () => {
    soundService.playClick();
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission!();
        if (response === 'granted') {
          setPermissionRequested(true);
        }
      } catch (err) {
        console.error('Error requesting orientation permission:', err);
      }
    } else {
      setPermissionRequested(true);
    }
  };

  // Device orientation listener
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading for iOS, alpha for Android
      let heading = 0;
      if ('webkitCompassHeading' in e && typeof (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading === 'number') {
        heading = (e as unknown as { webkitCompassHeading: number }).webkitCompassHeading;
        setHasOrientationSensor(true);
      } else if (e.alpha !== null) {
        // Standard alpha (0 to 360)
        heading = (360 - e.alpha) % 360;
        setHasOrientationSensor(true);
      }

      setDeviceHeading(Math.round(heading));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation, true);
      window.addEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
        window.removeEventListener('deviceorientationabsolute' as unknown as keyof WindowEventMap, handleOrientation, true);
      }
    };
  }, []);

  // Total current compass angle (Sensor heading + manual adjustment if testing)
  const currentHeading = (deviceHeading + manualOffset) % 360;

  // Relative angle to Qibla: where the needle should point
  // 0 deg relative means the top of phone points directly at Kaaba
  const relativeQiblaAngle = (qiblaData.bearingDegrees - currentHeading + 360) % 360;

  // Is Aligned within +- 4 degrees
  const isAligned = relativeQiblaAngle <= 4 || relativeQiblaAngle >= 356;

  // Haptic feedback when aligned
  useEffect(() => {
    if (isAligned && !lastVibratedAligned.current) {
      soundService.vibrate([60, 40, 60]);
      lastVibratedAligned.current = true;
    } else if (!isAligned) {
      lastVibratedAligned.current = false;
    }
  }, [isAligned]);

  return (
    <div className="space-y-4 pb-24 animate-fadeIn max-w-md mx-auto">
      {/* City & Coordinates Header */}
      <div className="bg-white rounded-2xl p-4 border border-[#E2E1D9] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-[#16302B]" />
            <span className="text-xs font-bold text-[#2C3333]">Lokacija za proračun Kible:</span>
          </div>

          <span className="text-xs font-bold text-[#8A6016] bg-[#FEF7EA] px-2 py-0.5 rounded-md border border-[#B58D3D]/30">
            {qiblaData.bearingDegrees}° {qiblaData.compassDirectionText}
          </span>
        </div>

        <select
          id="qibla-city-select"
          value={activeCity.name}
          onChange={(e) => {
            const found = POPULAR_CITIES.find(c => c.name === e.target.value);
            if (found) {
              soundService.playClick();
              onSelectCity(found);
            }
          }}
          className="w-full bg-[#FAF9F5] border border-[#E2E1D9] rounded-xl px-3 py-2 text-xs text-[#2C3333] font-semibold focus:outline-none focus:border-[#16302B]"
        >
          {POPULAR_CITIES.map(city => (
            <option key={city.name} value={city.name}>
              {city.name} ({city.country}) – {calculateQibla(city.lat, city.lng).bearingDegrees}°
            </option>
          ))}
        </select>

        <div className="flex items-center justify-between text-[11px] text-[#636B69] pt-1 border-t border-[#E2E1D9] font-medium">
          <span>Udaljenost do Kabe (Mekka):</span>
          <span className="font-bold text-[#16302B]">{qiblaData.distanceKm.toLocaleString()} km</span>
        </div>
      </div>

      {/* Main Interactive Compass Display */}
      <div className={`relative rounded-3xl p-6 border transition-all duration-300 text-center shadow-xs overflow-hidden ${
        isAligned
          ? 'bg-[#16302B] text-white border-[#16302B]'
          : 'bg-white text-[#2C3333] border-[#E2E1D9]'
      }`}>
        {/* Alignment status banner */}
        <div className="mb-4">
          {isAligned ? (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#C29B38] text-[#16302B] text-xs font-extrabold shadow-sm animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>SAVRŠENO PORAVNATO PREMA KIBLI (KABI)! 🕋</span>
            </div>
          ) : (
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#FAF9F5] text-[#2C3333] text-xs font-semibold border border-[#E2E1D9]">
              <Compass className="w-3.5 h-3.5 text-[#B58D3D] mr-1" />
              <span>
                {relativeQiblaAngle < 180
                  ? `Okrenite se za ${Math.round(relativeQiblaAngle)}° udesno ➔`
                  : `Okrenite se za ${Math.round(360 - relativeQiblaAngle)}° ulijevo ⬅`}
              </span>
            </div>
          )}
        </div>

        {/* Compass Dial Visual Container */}
        <div className="relative w-64 h-64 mx-auto my-3 flex items-center justify-center">
          {/* Compass outer ring with cardinal markers */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-transform duration-200 ${
              isAligned
                ? 'border-[#234E45] bg-[#0E201C] shadow-inner'
                : 'border-[#E2E1D9] bg-[#FAF9F5] shadow-xs'
            } flex items-center justify-center`}
            style={{ transform: `rotate(${-currentHeading}deg)` }}
          >
            {/* North */}
            <span className="absolute top-2 text-xs font-bold text-rose-500">N</span>
            {/* East */}
            <span className="absolute right-2 text-xs font-bold text-[#636B69]">E</span>
            {/* South */}
            <span className="absolute bottom-2 text-xs font-bold text-[#636B69]">S</span>
            {/* West */}
            <span className="absolute left-2 text-xs font-bold text-[#636B69]">W</span>

            {/* Compass degree ticks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
              <div
                key={deg}
                className="absolute w-full h-full flex justify-center items-start pt-1 pointer-events-none"
                style={{ transform: `rotate(${deg}deg)` }}
              >
                <div className={`w-0.5 ${deg % 90 === 0 ? (isAligned ? 'h-3 bg-[#DDD9CF]' : 'h-3 bg-[#636B69]') : (isAligned ? 'h-1.5 bg-[#234E45]' : 'h-1.5 bg-[#DDD9CF]')}`} />
              </div>
            ))}

            {/* Kaaba Golden Pin indicator fixed on azimuth */}
            <div
              className="absolute w-full h-full flex flex-col items-center justify-start pointer-events-none"
              style={{ transform: `rotate(${qiblaData.bearingDegrees}deg)` }}
            >
              <div className="pt-5 flex flex-col items-center">
                <span className="text-base drop-shadow-md">🕋</span>
                <span className="text-[9px] font-bold text-[#16302B] bg-[#C29B38] px-1 rounded border border-[#B58D3D] mt-0.5">
                  Kibla
                </span>
              </div>
            </div>
          </div>

          {/* Central Target & Dynamic Needle */}
          <div
            className="absolute w-44 h-44 flex items-center justify-center transition-transform duration-200 pointer-events-none"
            style={{ transform: `rotate(${relativeQiblaAngle}deg)` }}
          >
            {/* Pointer Needle */}
            <div className="w-full h-full relative flex items-center justify-center">
              <div className={`w-3 h-20 rounded-full transition-colors ${
                isAligned ? 'bg-[#C29B38] shadow-sm' : 'bg-[#16302B] shadow-xs'
              } absolute top-1`} />
              <div className={`w-3 h-14 ${isAligned ? 'bg-[#234E45]' : 'bg-[#DDD9CF]'} rounded-full absolute bottom-4 opacity-70`} />
            </div>
          </div>

          {/* Center Hub */}
          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
            isAligned
              ? 'bg-[#C29B38] text-[#16302B] border-white shadow-xs font-bold text-xs'
              : 'bg-white text-[#16302B] border-[#E2E1D9] text-[11px] font-mono font-bold shadow-xs'
          }`}>
            {isAligned ? '✓' : `${Math.round(currentHeading)}°`}
          </div>
        </div>

        {/* Info / Calibration instruction */}
        <p className={`text-xs mt-3 leading-relaxed font-medium ${isAligned ? 'text-[#DDD9CF]' : 'text-[#636B69]'}`}>
          {hasOrientationSensor
            ? 'Držite telefon vodoravno i rotirajte ga dok se igla ne poravna sa zlatnom oznakom Kible.'
            : 'Senzor kompasa se simulira. Možete ručno rotirati kompas klizačem ispod ili na mobilnom uređaju omogućiti senzor pokreta.'}
        </p>

        {/* Manual slider for desktop preview or calibration */}
        <div className={`mt-4 pt-3 border-t space-y-1 text-left ${isAligned ? 'border-[#234E45]' : 'border-[#E2E1D9]'}`}>
          <div className="flex justify-between text-[11px] font-medium">
            <span className={isAligned ? 'text-[#DDD9CF]' : 'text-[#636B69]'}>Ručna kalibracija / Rotacija ugla:</span>
            <span className={`font-mono font-bold ${isAligned ? 'text-[#C29B38]' : 'text-[#16302B]'}`}>{currentHeading}°</span>
          </div>
          <input
            id="qibla-manual-slider"
            type="range"
            min="0"
            max="360"
            value={manualOffset}
            onChange={(e) => setManualOffset(Number(e.target.value))}
            className="w-full h-1.5 bg-[#DDD9CF] rounded-lg appearance-none cursor-pointer accent-[#16302B]"
          />
        </div>
      </div>
    </div>
  );
};
