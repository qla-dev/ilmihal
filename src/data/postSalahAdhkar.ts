import { SurahOrDua } from '../types';

export const POST_SALAH_ADHKAR: SurahOrDua[] = [
  {
    id: 'poslije-namaza-istigfar',
    title: 'Istigfar poslije namaza (3x)',
    subtitle: 'Početak zikra nakon farz-namaza',
    category: 'svakodnevni-zikr',
    order: 10,
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Estagfirullāh. (3x)',
    translation: 'Allaha molim za oprost.',
    benefits: 'Uči se tri puta nakon predavanja selama.'
  },
  {
    id: 'poslije-namaza-entes-selam',
    title: 'Allāhumme entes-selām',
    subtitle: 'Dova mira poslije namaza',
    category: 'svakodnevni-zikr',
    order: 11,
    arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    transliteration: 'Allāhumme entes-selāmu ve minkes-selām, tebārekte jā zel-dželāli vel-ikrām.',
    translation: 'Allahu moj, Ti si Mir i od Tebe je mir. Blagoslovljen si Ti, Posjedniče veličanstva i plemenitosti.',
    benefits: 'Uči se nakon selama, prije ostalog zikra.'
  },
  {
    id: 'poslije-namaza-salavat',
    title: 'Ala Resulillahi salavat',
    subtitle: 'Kratki salavat nakon namaza',
    category: 'svakodnevni-zikr',
    order: 12,
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ وَسَلِّمْ',
    transliteration: 'Allāhumme salli alā sejjidinā Muhammedin ve alā āli sejjidinā Muhammedin ve sellim.',
    translation: 'Allahu moj, donesi salavat na našeg prvaka Muhammeda i na porodicu našeg prvaka Muhammeda, i podari mu mir.',
    benefits: 'U našoj tradiciji često se uči nakon riječi: “Ala Resulillahi salavat.”'
  },
  {
    id: 'poslije-namaza-zajednicki-zikr',
    title: 'Tesbih, tahmid, tehlil i tekbir',
    subtitle: 'Česti zajednički zikr poslije namaza',
    category: 'svakodnevni-zikr',
    order: 13,
    arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
    transliteration: 'Subhānallāhi vel-hamdu lillāhi ve lā ilāhe illallāhu vallāhu ekber.',
    translation: 'Slavljen neka je Allah, hvala Allahu, nema boga osim Allaha i Allah je najveći.',
    benefits: 'Uči se kao dio uobičajenog zikra nakon namaza.'
  },
  {
    id: 'poslije-namaza-tehlil',
    title: 'Tehlil poslije tesbiha',
    subtitle: 'Završni zikr nakon farz-namaza',
    category: 'svakodnevni-zikr',
    order: 31,
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: "Lā ilāhe illallāhu vahdehū lā šerīke leh. Lehul-mulku ve lehul-hamdu ve huve alā kulli šej'in kadīr.",
    translation: 'Nema boga osim Allaha, Jedinoga, Koji nema sudruga. Njemu pripada vlast i hvala i On je svemoćan.',
    benefits: 'Uči se nakon tesbiha od 33 puta.'
  },
  {
    id: 'poslije-zikra-rabbidzalni',
    title: 'Dova nakon zikra',
    subtitle: "Rabbidž'alni mukīmes-salāti",
    category: 'svakodnevni-zikr',
    order: 32,
    arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbi-dž’alnī mukīmes-salāti ve min zurrijjetī, rabbenā ve tekabbel duā’. Rabbenagfir lī ve li vālidejje ve lil-mu’minīne jevme jekūmul-hisāb.',
    translation: 'Gospodaru moj, učini da ja i potomci moji namaz obavljamo; primi dovu moju. Gospodaru naš, oprosti meni, roditeljima mojim i svim vjernicima na Dan obračuna.',
    benefits: 'Kur’anska dova koja se često uči kao završetak zikra poslije namaza.'
  }
];
