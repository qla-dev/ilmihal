// Accurate Qibla Direction and Distance Calculator
// Kaaba coordinates (Mecca, Saudi Arabia)
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export interface QiblaResult {
  bearingDegrees: number; // 0 - 360 deg from True North
  distanceKm: number;
  compassDirectionText: string;
}

export function calculateQibla(userLat: number, userLng: number): QiblaResult {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const lat1 = toRad(userLat);
  const lat2 = toRad(KAABA_LAT);
  const deltaLng = toRad(KAABA_LNG - userLng);

  // Qibla azimuth calculation
  const y = Math.sin(deltaLng);
  const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(deltaLng);

  let qiblaRad = Math.atan2(y, x);
  let qiblaDeg = toDeg(qiblaRad);
  // Normalize to 0 - 360
  qiblaDeg = (qiblaDeg + 360) % 360;

  // Haversine distance in km
  const R = 6371; // Earth radius in km
  const dLat = lat2 - lat1;
  const dLng = deltaLng;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = Math.round(R * c);

  // Compass cardinal text
  let directionText = 'Jugoistok (SE)';
  if (qiblaDeg >= 337.5 || qiblaDeg < 22.5) directionText = 'Sjever (N)';
  else if (qiblaDeg >= 22.5 && qiblaDeg < 67.5) directionText = 'Sjeveroistok (NE)';
  else if (qiblaDeg >= 67.5 && qiblaDeg < 112.5) directionText = 'Istok (E)';
  else if (qiblaDeg >= 112.5 && qiblaDeg < 157.5) directionText = 'Jugoistok (SE)';
  else if (qiblaDeg >= 157.5 && qiblaDeg < 202.5) directionText = 'Jug (S)';
  else if (qiblaDeg >= 202.5 && qiblaDeg < 247.5) directionText = 'Jugozapad (SW)';
  else if (qiblaDeg >= 247.5 && qiblaDeg < 292.5) directionText = 'Zapad (W)';
  else if (qiblaDeg >= 292.5 && qiblaDeg < 337.5) directionText = 'Sjeverozapad (NW)';

  return {
    bearingDegrees: Math.round(qiblaDeg * 10) / 10,
    distanceKm,
    compassDirectionText: directionText
  };
}
