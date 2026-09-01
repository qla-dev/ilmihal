/**
 * Research inventory only — intentionally not imported by the UI or player.
 *
 * It maps the 34 records consumed from Seen Arabic's en.json. A null page/audio
 * means that no exact Baynoona match has been verified yet. `page_title_match`
 * confirms a Baynoona page title, not an independent transcription of the MP3.
 */
export type BaynoonaVerification = 'not_found' | 'page_title_match' | 'speech_verified';

export interface BaynoonaAdhkarAudioMapping {
  id: string;
  datasetOrder: number;
  datasetType: 0 | 1 | 2;
  period: 'common' | 'morning' | 'evening';
  textStart: string;
  baynoonaPage: string | null;
  directAudioUrl: string | null;
  verification: BaynoonaVerification;
  separateMorningEveningRecording: boolean | null;
  note?: string;
}

const record = (
  datasetOrder: number,
  datasetType: 0 | 1 | 2,
  textStart: string,
  candidate: Partial<Pick<BaynoonaAdhkarAudioMapping, 'baynoonaPage' | 'directAudioUrl' | 'verification' | 'separateMorningEveningRecording' | 'note'>> = {}
): BaynoonaAdhkarAudioMapping => ({
  id: `seen-arabic-${datasetOrder}`,
  datasetOrder,
  datasetType,
  period: datasetType === 0 ? 'common' : datasetType === 1 ? 'morning' : 'evening',
  textStart,
  baynoonaPage: null,
  directAudioUrl: null,
  verification: 'not_found',
  separateMorningEveningRecording: datasetType === 0 ? false : null,
  ...candidate
});

export const BAYNOONA_ADHKAR_AUDIO_MAPPING: BaynoonaAdhkarAudioMapping[] = [
  record(1, 0, 'الْحَمْدُ لِلَّهِ وَحْدَهُ، وَالصَّلاَةُ وَالسَّلاَمُ'),
  record(2, 0, 'أَعُوذُ بِاللَّهِ مِنَ الشَّيطَانِ الرَّجِيمِ ﴿اللَّهُ'),
  record(3, 2, 'أَعُوذُ بِاللَّهِ مِنَ الشَّيطَانِ الرَّجِيمِ ﴿آمَنَ الرَّسُولُ'),
  record(4, 0, 'قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ'),
  record(5, 0, 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ'),
  record(6, 0, 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ'),
  record(7, 1, 'أَصْبَحْنَا وَأَصْبَحَ الْملْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ'),
  record(8, 2, 'أمسينا وأمسى الملك للَّه، وَالْحَمْدُ لِلَّهِ', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/17517',
    directAudioUrl: 'https://www.baynoona.net/ar/audio/download/26588/mq-adhkar-assabah-wa-almassaa_002.mp3',
    verification: 'page_title_match',
    separateMorningEveningRecording: null,
    note: 'Baynoona page title matches the evening wording; MP3 has not been independently transcribed.'
  }),
  record(9, 1, 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/17520',
    verification: 'page_title_match',
    separateMorningEveningRecording: null,
    note: 'User-supplied Baynoona page title matches the morning wording; direct MP3 still needs extraction and speech verification.'
  }),
  record(10, 2, 'اللَّهمَّ بِكَ أمسَينا وبِكَ أصبَحنا وبِكَ نَحيا'),
  record(11, 0, 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلاَّ أَنْتَ، خَلَقْتَنِي'),
  record(12, 1, 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ'),
  record(13, 2, 'اللَّهم إني أمسيت أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ'),
  record(14, 1, 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ'),
  record(15, 2, 'اللَّهم ما أمسى بي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ'),
  record(16, 0, 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي'),
  record(17, 0, 'حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ عَلَيهِ تَوَكَّلتُ'),
  record(18, 0, 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا'),
  record(19, 0, 'اللَّهُمَّ عَالِمَ الغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ'),
  record(20, 0, 'بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/17522',
    directAudioUrl: 'https://www.baynoona.net/ar/audio/download/26593/mq-adhkar-assabah-wa-almassaa_007.mp3',
    verification: 'page_title_match',
    separateMorningEveningRecording: false,
    note: 'The text is identical in both periods; Baynoona page title matches, but the MP3 is not independently transcribed.'
  }),
  record(21, 0, 'رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلاَمِ دِيناً، وَبِمُحَمَّدٍ نَبِيّاً', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/20677',
    directAudioUrl: 'https://www.baynoona.net/ar/audio/download/31056/sh-ibrahem-almazrou3i-mqk20052021_021.mp3',
    verification: 'page_title_match',
    separateMorningEveningRecording: false,
    note: 'The text is identical in both periods; page title matches, but the MP3 is not independently transcribed.'
  }),
  record(22, 0, 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ، أَصْلِحْ لِي', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/17526',
    directAudioUrl: 'https://www.baynoona.net/ar/audio/download/26597/mq-adhkar-assabah-wa-almassaa_011.mp3',
    verification: 'page_title_match',
    separateMorningEveningRecording: false,
    note: 'The text is identical in both periods; Baynoona page title matches, but the MP3 is not independently transcribed.'
  }),
  record(23, 1, 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ'),
  record(24, 2, 'أَمْسَيْنا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمِينَ'),
  record(25, 1, 'أَصْبَحْنا عَلَى فِطْرَةِ الْإِسْلاَمِ، وَعَلَى كَلِمَةِ الْإِخْلاَصِ'),
  record(26, 2, 'أمسينا على فطرة الإسلام، وَعَلَى كَلِمَةِ الْإِخْلاَصِ'),
  record(27, 1, 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْماً نَافِعاً، وَرِزْقاً طَيِّباً'),
  record(28, 0, 'لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ'),
  record(29, 0, 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبَيِّنَا مُحَمَّدٍ'),
  record(30, 2, 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ'),
  record(31, 1, 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ'),
  record(32, 1, 'لاَ إِلَهَ إِلاَّ اللَّهُ، وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ'),
  record(33, 1, 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ'),
  record(34, 0, 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', {
    baynoonaPage: 'https://www.baynoona.net/ar/audio/17523',
    verification: 'page_title_match',
    separateMorningEveningRecording: false,
    note: 'The text is identical in both periods; Baynoona page title matches, but the MP3 is not independently transcribed.'
  })
];
