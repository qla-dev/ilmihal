/**
 * Exact ayah recordings by Mishary Rashid Alafasy.
 * Every card below is assembled only from the ayahs that it displays.
 */
const alafasyAyah = (surah: number, ayah: number) =>
  `https://everyayah.com/data/Alafasy_128kbps/${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`;

const ayahs = (surah: number, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => alafasyAyah(surah, from + index));

const selection = (surah: number, from: number, to = from) => ayahs(surah, from, to);

const shortSurahRanges: Record<string, [number, number]> = {
  fatiha: [1, 7],
  kadr: [97, 5], bejjine: [98, 8], zelzele: [99, 8], adijat: [100, 11],
  karia: [101, 11], tekasur: [102, 8], asr: [103, 3], humeze: [104, 9],
  fil: [105, 5], kurejs: [106, 4], maun: [107, 7], kevser: [108, 3],
  kafirun: [109, 6], nasr: [110, 3], mesed: [111, 5], ihlas: [112, 4],
  felek: [113, 5], nas: [114, 6],
};

export const QURAN_AUDIO_BY_ID: Record<string, string[]> = Object.fromEntries(
  Object.entries(shortSurahRanges).map(([id, [surah, count]]) => [id, ayahs(surah, 1, count)])
);

Object.assign(QURAN_AUDIO_BY_ID, {
  'ajetul-kursi': selection(2, 255),
  'rabbena-atina': [...selection(2, 201), ...selection(14, 41)],
  'poslije-zikra-rabbidzalni': selection(14, 40, 41),
  'asereta-bekare': selection(2, 285, 286),
  'asereta-hasr-imena': selection(59, 22, 24),
  'asereta-kursi': selection(2, 255),
  'asereta-imran': selection(3, 26, 27),
  'asereta-araf': selection(7, 23),
  'asereta-jonus': selection(10, 85, 86),
  'asereta-hud': selection(11, 88),
  'asereta-jusuf': selection(12, 86),
  'asereta-ibrahim': selection(14, 40, 41),
  'asereta-isra': selection(17, 80),
  'asereta-kehf': selection(18, 10),
  'asereta-enbija': selection(21, 87),
  'asereta-muminun': selection(23, 97, 98),
  'asereta-furkan': selection(25, 74),
  'asereta-hasr-vjernici': selection(59, 10),
  'kuranska-rabbena-atina': selection(2, 201),
  'kuranska-rabbena-sabur': selection(2, 250),
  'kuranska-rabbena-srca': selection(3, 8),
  'kuranska-rabbena-oprosti': selection(23, 109),
});

for (const [id, urls] of Object.entries(QURAN_AUDIO_BY_ID)) {
  if (id.startsWith('asereta-')) {
    QURAN_AUDIO_BY_ID[`kuranska-${id}`] = urls;
  }
}
