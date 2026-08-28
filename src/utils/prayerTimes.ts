import { PrayerTime } from '../types';

// Mathematical & Astronomical calculation of Prayer Times (Salat) based on standard formulas
export function calculatePrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  elevationMeters = 500
): PrayerTime[] {
  // Day of the year
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Solar declination (delta in radians)
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const B = (360 / 365) * (dayOfYear - 81) * rad;
  // Equation of Time (EoT) in minutes
  const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);

  // Solar declination in degrees
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * rad);
  const decRad = declination * rad;
  const latRad = lat * rad;

  // Timezone offset in hours
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  // Solar Noon in local time (hours)
  const solarNoon = 12 + timezoneOffsetHours - (lng / 15) - (EoT / 60);

  // Helper for Hour Angle calculation given sun altitude angle (alpha)
  function getHourAngle(alphaDeg: number): number {
    const alphaRad = alphaDeg * rad;
    const numerator = Math.sin(alphaRad) - Math.sin(latRad) * Math.sin(decRad);
    const denominator = Math.cos(latRad) * Math.cos(decRad);
    const val = numerator / denominator;
    if (val > 1) return 0; // Sun never rises
    if (val < -1) return 180; // Sun never sets
    return Math.acos(val) * deg;
  }

  // Sunrise/Sunset altitude angle with atmospheric refraction & elevation
  const sunriseAlpha = -0.833 - 0.0347 * Math.sqrt(Math.max(0, elevationMeters));
  const sunriseHA = getHourAngle(sunriseAlpha);

  const sunriseHours = solarNoon - (sunriseHA / 15);
  const sunsetHours = solarNoon + (sunriseHA / 15);

  // Fajr/Sabah (Sun angle typically 18.0 deg below horizon)
  const fajrAlpha = -18.0;
  const fajrHA = getHourAngle(fajrAlpha);
  const fajrHours = solarNoon - (fajrHA / 15);

  // Imsak is typically ~15-20 min before Fajr
  const imsakHours = fajrHours - (15 / 60);

  // Asr (Ikindija) - Hanafi/Standard Shadow ratio: Shadow length = Object height + Noon shadow
  const noonSunAltitude = 90 - lat + declination;
  const noonShadow = 1 / Math.tan(noonSunAltitude * rad);
  // Standard (Shafi'i/Hanbali/Maliki & modern standard in BiH calendar): shadow factor = 1
  const asrShadow = 1.0 + Math.abs(noonShadow);
  const asrAltitudeRad = Math.atan(1 / asrShadow);
  const asrAltitudeDeg = asrAltitudeRad * deg;
  const asrHA = getHourAngle(asrAltitudeDeg);
  const asrHours = solarNoon + (asrHA / 15);

  // Maghrib (Akšam) = Sunset + safety margin (usually 2-3 mins)
  const maghribHours = sunsetHours + (2 / 60);

  // Isha (Jacija) - Sun angle 16.5 - 17 deg below horizon (standard in European region)
  const ishaAlpha = -17.0;
  const ishaHA = getHourAngle(ishaAlpha);
  const ishaHours = solarNoon + (ishaHA / 15);

  // Format decimal hours to HH:mm string and Date object
  function toTimeObj(decHours: number): { timeStr: string; dateObj: Date } {
    let normalized = decHours;
    while (normalized < 0) normalized += 24;
    while (normalized >= 24) normalized -= 24;

    const hours = Math.floor(normalized);
    const minutes = Math.floor((normalized - hours) * 60);
    const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const pDate = new Date(date);
    pDate.setHours(hours, minutes, 0, 0);

    return { timeStr, dateObj: pDate };
  }

  const imsakObj = toTimeObj(imsakHours);
  const fajrObj = toTimeObj(fajrHours);
  const sunriseObj = toTimeObj(sunriseHours);
  const dhuhrObj = toTimeObj(solarNoon + (3 / 60)); // Podne usually 2-3 mins after exact noon
  const asrObj = toTimeObj(asrHours);
  const maghribObj = toTimeObj(maghribHours);
  const ishaObj = toTimeObj(ishaHours);

  const now = new Date();

  const rawPrayers: Omit<PrayerTime, 'isNext' | 'isPast' | 'isCurrent'>[] = [
    {
      name: 'Zora (Imsak)',
      key: 'imsak',
      time: imsakObj.timeStr,
      dateObj: imsakObj.dateObj,
      rekats: 'Kraj sehara',
      description: 'Prestanak jela i pića za postače.'
    },
    {
      name: 'Sabah (Fajr)',
      key: 'fajr',
      time: fajrObj.timeStr,
      dateObj: fajrObj.dateObj,
      rekats: '2 sunneta + 2 farza',
      description: 'Prvi dnevni namaz, klanja se prije izlaska sunca.'
    },
    {
      name: 'Izlazak sunca',
      key: 'sunrise',
      time: sunriseObj.timeStr,
      dateObj: sunriseObj.dateObj,
      rekats: 'Istek sabaha',
      description: 'Završetak sabahskog namaskog vremena.'
    },
    {
      name: 'Podne (Dhuhr)',
      key: 'dhuhr',
      time: dhuhrObj.timeStr,
      dateObj: dhuhrObj.dateObj,
      rekats: '4 sun + 4 farz + 2 sun',
      description: 'Drugi dnevni namaz, nastupa kada sunce pređe zenit.'
    },
    {
      name: 'Ikindija (Asr)',
      key: 'asr',
      time: asrObj.timeStr,
      dateObj: asrObj.dateObj,
      rekats: '4 sunneta + 4 farza',
      description: 'Popodnevni namaz, učenje se obavlja u tišini.'
    },
    {
      name: 'Akšam (Maghrib)',
      key: 'maghrib',
      time: maghribObj.timeStr,
      dateObj: maghribObj.dateObj,
      rekats: '3 farza + 2 sunneta',
      description: 'Namaz u trenutku zalaska sunca, vrijeme za iftar.'
    },
    {
      name: 'Jacija (Isha)',
      key: 'isha',
      time: ishaObj.timeStr,
      dateObj: ishaObj.dateObj,
      rekats: '4 sun + 4 farz + 2 sun + 3 vitr',
      description: 'Noćni namaz sa obaveznim Vitr-namazom.'
    }
  ];

  // Determine current, past, and next
  let nextFound = false;
  const result: PrayerTime[] = rawPrayers.map((p, idx, arr) => {
    const isPast = p.dateObj.getTime() < now.getTime();
    let isNext = false;
    if (!isPast && !nextFound) {
      isNext = true;
      nextFound = true;
    }

    // Determine isCurrent: between this prayer and next prayer
    const nextPrayer = arr[idx + 1];
    let isCurrent = false;
    if (isPast && nextPrayer && nextPrayer.dateObj.getTime() > now.getTime()) {
      isCurrent = true;
    } else if (idx === arr.length - 1 && isPast) {
      // After Isha: current until next day Fajr
      isCurrent = true;
    }

    return {
      ...p,
      isPast,
      isNext,
      isCurrent
    };
  });

  // If all prayers today are past, next prayer is Fajr tomorrow
  if (!nextFound && result.length > 0) {
    result[1].isNext = true; // Fajr
  }

  return result;
}

// Format seconds into HH:MM:SS
export function formatCountdown(targetDate: Date): { hours: number; minutes: number; seconds: number; totalSeconds: number; formatted: string } {
  const now = new Date().getTime();
  let diff = targetDate.getTime() - now;

  // If target is in the past, assume next day
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return { hours, minutes, seconds, totalSeconds, formatted };
}
