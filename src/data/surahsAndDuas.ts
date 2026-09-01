import { SurahOrDua } from '../types';
import { ADDITIONAL_SHORT_SURAHS, ASERETA_SELECTIONS } from './quranSelections';
import { KORKUT_TRANSLATIONS } from './korkutTranslations';
import { FULL_QURAN_TRANSLITERATIONS, toBosnianPronunciation } from './quranTransliterations';
import { POST_SALAH_ADHKAR } from './postSalahAdhkar';
import { ADDITIONAL_NAMAZ_DUAS } from './additionalNamazDuas';
import { QURAN_DUAS } from './quranDuas';
import { DZENAZA_DUAS } from './dzenazaDuas';
import { QURAN_AUDIO_BY_ID } from './quranAudio';

const createExtendedMorningEveningAdhkar = (
  category: 'jutarnji-zikr' | 'vecernji-zikr',
  timeLabel: 'ujutro' | 'navečer',
  timePrefix: 'jutarnji' | 'vecernji'
): SurahOrDua[] => {
  const isMorning = category === 'jutarnji-zikr';
  const enteredTime = isMorning ? 'أَصْبَحْتُ' : 'أَمْسَيْتُ';
  const enteredTimeTransliteration = isMorning ? 'asbahtu' : 'emsajtu';
  const blessingTime = isMorning ? 'أَصْبَحَ' : 'أَمْسَى';
  const blessingTimeTransliteration = isMorning ? 'asbaha' : 'emsā';

  return [
    {
      id: `${timePrefix}-muavvizetejn`,
      title: 'El-Ihlās, El-Felek i En-Nās (3x)',
      subtitle: `Zaštitne sure — ${timeLabel}`,
      category,
      order: 200,
      audioUrls: [
        'https://server8.mp3quran.net/afs/112.mp3',
        'https://server8.mp3quran.net/afs/113.mp3',
        'https://server8.mp3quran.net/afs/114.mp3'
      ],
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
      transliteration: 'Kul huvallāhu ehad… Kul e’ūzu bi Rabbil-felek… Kul e’ūzu bi Rabbin-nās. (Proučiti svaku suru 3x.)',
      translation: 'Sura El-Ihlās, El-Felek i En-Nās — uče se kao zaštita.',
      benefits: `Uče se 3x ${timeLabel}. Izvor: Rijadus-salihin 1456 (Ebu Davud i Tirmizi).`
    },
    {
      id: `${timePrefix}-svjedocenje`,
      title: 'Svjedočenje tevhida (4x)',
      subtitle: `Uči se četiri puta ${timeLabel}`,
      category,
      order: 80,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/80.mp3',
      arabic: `اللَّهُمَّ إِنِّي ${enteredTime} أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لَا إِلٰهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ`,
      transliteration: `Allāhumme innī ${enteredTimeTransliteration} ušhiduke, ve ušhidu hamelete aršike, ve melā’ikete-ke, ve džemīa halkike, enneke entallāhu lā ilāhe illā ente vahdeke lā šerīke lek, ve enne Muhammeden abduke ve resūluke.`,
      translation: 'Allahu moj, pozivam Tebe, nosioce Tvoga Prijestolja, meleke i sva Tvoja stvorenja za svjedoke da si Ti Allah, Jedini, bez sudruga, i da je Muhammed Tvoj rob i poslanik.',
      benefits: `Uči se 4x ${timeLabel}. Izvor: Hisnul-muslim 80 (hasen lanac).`
    },
    {
      id: `${timePrefix}-zahvalnost`,
      title: 'Zahvalnost na blagodatima',
      subtitle: `Zikr zahvalnosti — ${timeLabel}`,
      category,
      order: 81,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/81.mp3',
      arabic: `اللَّهُمَّ مَا ${blessingTime} بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ`,
      transliteration: `Allāhumme mā ${blessingTimeTransliteration} bī min ni’metin ev bi ehadin min halkike, feminke vahdeke lā šerīke lek, fe lekel-hamdu ve lekeš-šukr.`,
      translation: 'Allahu moj, svaka blagodat koja je došla meni ili bilo kome od Tvojih stvorenja dolazi samo od Tebe, Koji nemaš sudruga. Tebi pripada hvala i zahvala.',
      benefits: `Uči se ${timeLabel}. Izvor: Hisnul-muslim 81 (hasen lanac).`
    },
    {
      id: `${timePrefix}-afija`,
      title: 'Dova za zdravlje i zaštitu (3x)',
      subtitle: `Uči se tri puta ${timeLabel}`,
      category,
      order: 82,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/82.mp3',
      arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلٰهَ إِلَّا أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلٰهَ إِلَّا أَنْتَ',
      transliteration: 'Allāhumme āfinī fī bedenī, Allāhumme āfinī fī sem’ī, Allāhumme āfinī fī basarī, lā ilāhe illā ente. Allāhumme innī eūzu bike minel-kufri vel-fakri, ve eūzu bike min azābil-kabr, lā ilāhe illā ente.',
      translation: 'Allahu moj, podari zdravlje mome tijelu, sluhu i vidu. Utječem Ti se od nevjerstva, siromaštva i kazne u kaburu.',
      benefits: `Uči se 3x ${timeLabel}. Izvor: Hisnul-muslim 82 (hasen lanac).`
    },
    {
      id: `${timePrefix}-hasbijallah`,
      title: 'Hasbijallāh (7x)',
      subtitle: `Oslonac na Allaha — ${timeLabel}`,
      category,
      order: 83,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/83.mp3',
      arabic: 'حَسْبِيَ اللَّهُ لَا إِلٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
      transliteration: 'Hasbijallāhu lā ilāhe illā huve, alejhi tevekkeltu, ve huve Rabbul-aršil-azīm.',
      translation: 'Dovoljan mi je Allah; nema boga osim Njega. Na Njega se oslanjam i On je Gospodar veličanstvenog Prijestolja.',
      benefits: `Uči se 7x ${timeLabel}. Izvor: Hisnul-muslim 83 (sahih lanac).`
    },
    {
      id: `${timePrefix}-afw-afija`,
      title: 'Dova za oprost i sigurnost',
      subtitle: `Zaštita na oba svijeta — ${timeLabel}`,
      category,
      order: 84,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/84.mp3',
      arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي',
      transliteration: 'Allāhumme innī es’elukel-afve vel-āfijete fid-dunjā vel-āhire. Allāhumme innī es’elukel-afve vel-āfijete fī dīnī ve dunjāje ve ehlī ve mālī. Allāhummestur avrātī ve āmin rev’ātī. Allāhummahfaznī min bejni jedejje ve min halfī ve an jemīnī ve an šimālī ve min fevkī, ve eūzu bi azametike en ugtāle min tahtī.',
      translation: 'Allahu moj, molim Te za oprost i sigurnost na ovom i budućem svijetu, u vjeri, dunjaluku, porodici i imetku. Sakrij moje mahane, sačuvaj me straha i zaštiti me sa svih strana.',
      benefits: `Uči se ${timeLabel}. Izvor: Hisnul-muslim 84 (Sahih Ibn Madže i Ebu Davud).`
    },
    {
      id: `${timePrefix}-raditu`,
      title: 'Zadovoljstvo Allahom (3x)',
      subtitle: `Uči se tri puta ${timeLabel}`,
      category,
      order: 87,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/87.mp3',
      arabic: 'رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا',
      transliteration: 'Radītu billāhi Rabben, ve bil-islāmi dīnen, ve bi Muhammedin nebijjen.',
      translation: 'Zadovoljan sam Allahom kao Gospodarom, islamom kao vjerom i Muhammedom kao vjerovjesnikom.',
      benefits: `Uči se 3x ${timeLabel}. Izvor: Džami’ et-Tirmizi 3389 (hasen).`
    },
    {
      id: `${timePrefix}-alimul-gajb`,
      title: 'Dova protiv zla duše i šejtana',
      subtitle: `Jutarnja/večernja zaštita — ${timeLabel}`,
      category,
      order: 85,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/85.mp3',
      arabic: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَىٰ نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَىٰ مُسْلِمٍ',
      transliteration: 'Allāhumme ālimel-gajbi veš-šehāde, fātiras-semāvāti vel-erdi, Rabbe kulli šej’in ve melīkehu, ešhedu en lā ilāhe illā ente. Eūzu bike min šerri nefsī ve min šer-riš-šejtāni ve širkihi, ve en ekterife alā nefsī sū’en ev edžurrehu ilā muslim.',
      translation: 'Allahu moj, Znalče nevidljivog i vidljivog, Stvoritelju nebesa i Zemlje, Gospodaru i Vladaru svega, utječem Ti se od zla svoje duše, šejtana i njegovog širka te od toga da sebi ili bilo kojem muslimanu učinim zlo.',
      benefits: `Uči se ${timeLabel}. Izvor: Hisnul-muslim 85 (Sahih Tirmizi i Ebu Davud).`
    },
    {
      id: `${timePrefix}-ja-hajju`,
      title: 'Jā Hajju, jā Kajjūm',
      subtitle: `Dova za popravljanje stanja — ${timeLabel}`,
      category,
      order: 88,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/88.mp3',
      arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
      transliteration: 'Jā Hajju, jā Kajjūm, bi rahmetike estegīs. Aslih lī še’nī kullehu, ve lā tekilnī ilā nefsī tarfete ajn.',
      translation: 'O Živi, o Vječni, Tvojom milošću pomoć tražim. Popravi mi sve moje stanje i ne prepusti me meni samom ni koliko je treptaj oka.',
      benefits: `Uči se ${timeLabel}. Izvor: Hisnul-muslim 88 (sahih lanac).`
    },
    ...(isMorning ? [] : [{
      id: 'vecernji-kelimatullah',
      title: 'Zaštita Allahovim savršenim riječima (3x)',
      subtitle: 'Posebni večernji zikr',
      category: 'vecernji-zikr' as const,
      order: 97,
      audioUrl: 'https://www.hisnmuslim.com/audio/ar/97.mp3',
      arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'Eūzu bi kelimātillāhit-tāmmāti min šerri mā halek.',
      translation: 'Utječem se savršenim Allahovim riječima od zla onoga što je stvorio.',
      benefits: 'Uči se 3x navečer. Izvor: Hisnul-muslim 97 (sahih/hasen).'
    }])
  ];
};

export const SURAHS_AND_DUAS: SurahOrDua[] = ([
  {
    id: 'subhaneke',
    title: 'Subhāneke',
    subtitle: 'Početna dova na prvom rek\'atu',
    category: 'namaska-dova',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ',
    transliteration: 'Subhānekellāhumme ve bi hamdike, ve tebārekesmuke, ve te\'ālā džedduke, ve lā ilāhe gajruke.',
    translation: 'Tebi slava pripada, Allahu moj, i Tebi hvala. Blagoslovljeno je Tvoje Ime, uzvišena je Tvoja Veličina i nema drugog boga osim Tebe.',
    benefits: 'Uči se na prvom rek\'atu svakog namaza odmah poslije početnog tekbira prije Eūze i Bismille.'
  },
  {
    id: 'fatiha',
    title: 'Sura El-Fātiha (Otvaranje)',
    subtitle: 'Majka Knjige (1. sura Kur\'ana)',
    category: 'kratka-sura',
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Bismillāhir-Rahmānir-Rahīm. El-hamdu lillāhi Rabbil-\'ālemīn. Er-Rahmānir-Rahīm. Māliki jevmid-dīn. Ijjāke na\'budu ve ijjāke neste\'īn. Ihdinas-sirātal-mustekīm. Sirātallezīne en\'amte \'alejhim, gajril-magdūbi \'alejhim veled-dāllīn. Āmīn.',
    translation: 'U ime Allaha, Milostivog, Samilosnog! Hvala Allahu, Gospodaru svjetova, Milostivom, Samilosnom, Vladaru Sudnjega dana! Samo Tebi robujemo i samo od Tebe pomoć tražimo! Uputi nas na Pravi put, na Put onih kojima si milost Svoju darovao, a ne onih koji su protiv sebe srdžbu izazvali, niti onih koji su zalutali! (Usliši Bože!)',
    benefits: 'Uči se na svakom rek\'atu svakog namaza.'
  },
  {
    id: 'ajetul-kursi',
    title: 'Ājetul-Kursijja (Ajet Prijestolja)',
    subtitle: 'Sura El-Bekare, 255. ajet',
    category: 'namaska-dova',
    arabic: 'اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۚ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    transliteration: 'Allāhu lā ilāhe illā huvel-Hajjul-Kajjūm. Lā te\'huzuhū sinetun ve lā nevm. Lehū mā fis-semāvāti ve mā fil-erd. Men zellezī ješfe\'u \'indehū illā bi iznih. Ja\'lemu mā bejne ejdīhim ve mā halfehum, ve lā juhītūne bi šej\'in min \'ilmihī illā bi mā šā\'. Vesi\'a kursijjuhus-semāvāti vel-erd, ve lā je\'ūduhū hifzuhumā, ve Huvel-\'Alijjul-\'Azīm.',
    translation: 'Allah je - nema boga osim Njega - Živi i Vječni! Ne obuzima Ga ni drijemež ni san! Njegovo je ono što je na nebesima i ono što je na Zemlji! Ko se može pred Njim zauzimati bez Njegova dopuštenja?! On zna šta je bilo prije njih i šta će biti poslije njih, a od onoga što On zna - drugi znaju samo onoliko koliko On želi. Njegov Prijesto obuhvata i nebesa i Zemlju i Njemu ne dojadi održavanje njihovo; On je Svevišnji, Veličanstveni!',
    benefits: 'Ko prouči Ajetul-Kursijju poslije svakog propisanog namaza, samo ga smrt dijeli od ulaska u Džennet.'
  },
  {
    id: 'ihlas',
    title: 'Sura El-Ihlās (Iskrenost)',
    subtitle: '112. sura Kur\'ana',
    category: 'kratka-sura',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: 'Kul huvallāhu ehad. Allāhus-samed. Lem jelid ve lem jūled. Ve lem jekul-lehū kufuven ehad.',
    translation: 'Reci: "On je Allah - Jedan je! Allah je Utočište svakom! Nije rodio i rođen nije, i niko Mu ravan nije!"',
    benefits: 'Vrijednost učenja odgovara trećini Kur\'ana.'
  },
  {
    id: 'felek',
    title: 'Sura El-Felek (Svitanje)',
    subtitle: '113. sura Kur\'ana',
    category: 'kratka-sura',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    transliteration: 'Kul e\'ūzu bi Rabbil-felek. Min šerri mā halek. Ve min šerri gāsikin izā vekab. Ve min šerrin-neffāsāti fil-\'ukad. Ve min šerri hāsidin izā hased.',
    translation: 'Reci: "Utječem se Gospodaru svitanja od zla onoga što On stvara, i od zla mrkle noći kada razastre tmine, i od zla onih koji u čvorove pušu, i od zla zavidljivca kad zavidnost ne krije!"',
    benefits: 'Zaštita od uroka, zla i zavisti.'
  },
  {
    id: 'nas',
    title: 'Sura En-Nās (Ljudi)',
    subtitle: '114. sura Kur\'ana',
    category: 'kratka-sura',
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    transliteration: 'Kul e\'ūzu bi Rabbin-nās. Melikin-nās. Ilāhin-nās. Min šerril-vesvāsil-hannās. Ellezī juvesvisu fī sudūrin-nās. Minel-džinneti ven-nās.',
    translation: 'Reci: "Tražim zaštitu kod Gospodara ljudi, Vladara ljudi, Boga ljudi, od zla šejtana napasnika, koji zle misli unosi u srca ljudi - od džina i od ljudi!"',
    benefits: 'Zaštita od zlih misli i šejtanskih došaptavanja.'
  },
  {
    id: 'kevser',
    title: 'Sura El-Kevser (Obilje)',
    subtitle: '108. sura Kur\'ana (najkraća sura)',
    category: 'kratka-sura',
    arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
    transliteration: 'Innā e\'tajnākel-kevser. Fe salli li Rabbike venhar. Inne šāni\'eke huvel-ebter.',
    translation: 'Mi smo ti, uistinu, Kevser (mnogo dobro i izvor u Džennetu) darovali, pa klanjaj se Gospodaru svome i kurban kolji, onaj koji tebe mrzi sigurno će bez spomena ostati!',
    benefits: 'Uteha i nagrada za vjernike.'
  },
  {
    id: 'asr',
    title: 'Sura El-\'Asr (Vrijeme)',
    subtitle: '103. sura Kur\'ana',
    category: 'kratka-sura',
    arabic: 'وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    transliteration: 'Vel-\'asr. Innel-insāne le fī husr. Illellezīne āmenū ve \'amilus-sālihāti ve tevāsav bil-hakki ve tevāsav bis-sabr.',
    translation: 'Tako mi vremena - čovjek je na gubitku, doista, osim onih koji vjeruju i dobra djela čine, i koji jedni drugima istinu preporučuju i koji jedni drugima preporučuju strpljenje.',
    benefits: 'Imam Šafija je rekao: "Da ljudi razmisle samo o ovoj suri, bila bi im dovoljna."'
  },
  {
    id: 'ettehijjatu',
    title: 'Et-Tehijjātu',
    subtitle: 'Učenje na sjedenju (Kā\'de)',
    category: 'namaska-dova',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Et-tehijjātu lillāhi ves-salavātu vet-tajjibāt. Es-selāmu \'alejke ejjuhen-nebijju ve rahmetullāhi ve berekātuh. Es-selāmu \'alejnā ve \'alā \'ibādillāhis-sālihīn. Ešhedu en lā ilāhe illallāh, ve ešhedu enne Muhammeden \'abduhū ve resūluh.',
    translation: 'Najljepši pozdravi pripadaju Allahu, i sve molitve i dobra djela. Neka je mir na tebe, o Vjerovjesniče, i Allahova milost i Njegovi blagoslovi. Neka je mir na nas i na sve dobre Allahove robove. Svjedočim da nema boga osim Allaha i svjedočim da je Muhammed Njegov rob i Njegov poslanik.',
    benefits: 'Obavezno se uči na svakom sjedenju u namazu.'
  },
  {
    id: 'salavati',
    title: 'Salavati (Allāhumme salli & Allāhumme bārik)',
    subtitle: 'Blagoslovi na Poslanika a.s.',
    category: 'namaska-dova',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: 'Allāhumme salli \'alā Muhammedin ve \'alā āli Muhammed, kemā sallejte \'alā Ibrāhīme ve \'alā āli Ibrāhīm, inneke Hamīdun Medžīd. Allāhumme bārik \'alā Muhammedin ve \'alā āli Muhammed, kemā bārakte \'alā Ibrāhīme ve \'alā āli Ibrāhīm, inneke Hamīdun Medžīd.',
    translation: 'Allahu moj, blagoslovi Muhammeda i rod Muhammedov, kao što si blagoslovio Ibrahima i rod Ibrahimov, Ti si uistinu Hvaljen i Slavljen! Allahu moj, podari bereket Muhammedu i rodu Muhammedovu, kao što si podario bereket Ibrahimu i rodu Ibrahimovu, Ti si uistinu Hvaljen i Slavljen!',
    benefits: 'Uče se na posljednjem sjedenju svakog namaza.'
  },
  {
    id: 'rabbena-atina',
    title: 'Rabbenā ātinā',
    subtitle: 'Sveobuhvatna kur\'anska dova za dobro oba svijeta',
    category: 'namaska-dova',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
    transliteration: 'Rabbenā ātinā fid-dunjā haseneten ve fil-āhireti haseneten ve kinā \'azāben-nār. Rabbenagfir lī ve li vālidejje ve lil-mu\'minīne jevme jekūmul-hisāb.',
    translation: 'Gospodaru naš, podaj nam dobro na ovome svijetu i dobro na onome svijetu, i sačuvaj nas patnje u ognju! Gospodaru naš, oprosti meni, i roditeljima mojim, i svim vjernicima na Dan kad se račun bude polagao!',
    benefits: 'Najčešća dova koju je Poslanik a.s. učio.'
  },
  {
    id: 'kunut-dova',
    title: 'Kunut-dova',
    subtitle: 'Uči se na 3. rek\'atu Vitr-namaza',
    category: 'namaska-dova',
    arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ، وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ. اللَّهُمَّ إِيَّاكَ نَعْبُدُ، وَلَكَ نُصَلِّي وَنَسْجُدُ، وَإِلَيْكَ نَسْعَىٰ وَنَحْفِدُ، نَرْجُو رَحْمَتَكَ وَنَخْشَىٰ عَذَابَكَ، إِنَّ عَذَابَكَ بِالْكَافِرِينَ مُلْحَقٌ',
    transliteration: 'Allāhumme innā neste\'īnuke ve nestagfiruke ve nestehdīke ve nu\'minu bike ve netūbu ilejke ve netevekkelu \'alejke, ve nusnī \'alejkel-hajre kullehū, neškuruke ve lā nekfuruke, ve nahle\'u ve netruku men jefdžuruk. Allāhumme ijjāke na\'budu, ve leke nusallī ve nesdžudu, ve ilejke nes\'ā ve nahfidu, nerdžū rahmeteke ve nahšā \'azābeke, inne \'azābeke bil-kāfirīne mulhak.',
    translation: 'Allahu naš, mi samo od Tebe pomoć tražimo, od Tebe oprost molimo i od Tebe uputu tražimo! U Tebe vjerujemo, Tebi se kajemo i na Tebe se oslanjamo. Tebe svakim dobrom hvalimo, Tebi zahvaljujemo i nezahvalni nismo, i odričemo se i napuštamo onoga ko Tebi griješi. Allahu naš, samo Tebi ibadet činimo, Tebi namaz klanjamo i na sedždu Ti padamo, Tebi hitamo i Tebi služimo. Nadamo se Tvojoj milosti i strahujemo od Tvoje kazne; doista će Tvoja kazna nevjernike stići.',
    benefits: 'Uči se na 3. rek\'atu Vitr-namaza nakon dodatnog tekbira.'
  },
  {
    id: 'zikr-tesbih',
    title: 'Tesbih poslije Namaza (33x)',
    subtitle: 'Subhānallāh, El-hamdullillāh, Allāhu Ekber',
    category: 'svakodnevni-zikr',
    arabic: 'سُبْحَانَ اللَّهِ (٣٣) ۝ الْحَمْدُ لِلَّهِ (٣٣) ۝ اللَّهُ أَكْبَرُ (٣٣)',
    transliteration: 'Subhānallāh (33x), El-hamdulillāh (33x), Allāhu Ekber (33x). Zatim: Lā ilāhe illallāhu vahdehū lā šerīke leh, lehul-mulku ve lehul-hamdu ve huve \'alā kulli šej\'in kadīr.',
    translation: 'Slavljen neka je Allah (33x), Hvala Allahu (33x), Allah je Najveći (33x). Nema boga osim Allaha Jedinoga, Koji nema sudruga; Njemu pripada sva vlast i Njemu svaka hvala i On nad svime ima moć.',
    benefits: 'Ko ovo prouči poslije svakog namaza, oproste mu se grijesi makar ih bilo koliko morske pjene.'
  },
  {
    id: 'jutarnji-bika-asbahna',
    title: 'Dova pri svitanju',
    subtitle: 'Jutarnji zikr',
    category: 'jutarnji-zikr',
    order: 78,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/78.mp3',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allāhumme bike asbahnā, ve bike emsejnā, ve bike nahjā, ve bike nemūtu, ve ilejken-nušūr.',
    translation: 'Allahu moj, Tvojom moći smo dočekali jutro i Tvojom moći dočekujemo večer; Tvojom moći živimo i umiremo, i Tebi je proživljenje.',
    benefits: 'Uči se ujutro. Izvor: Sahih al-Buhari 6320.'
  },
  {
    id: 'jutarnji-sejjidul-istigfar',
    title: 'Sejjidul-istigfār',
    subtitle: 'Najpotpuniji istigfar — jutro',
    category: 'jutarnji-zikr',
    order: 79,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/79.mp3',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumme ente Rabbī, lā ilāhe illā ente. Halaktenī ve ene abduke, ve ene alā ahdike ve va’dike mesteta’tu. Eūzu bike min šerri mā sana’tu. Ebūu leke bi ni’metike alejje, ve ebūu bi zenbī, fagfir lī, fe innehu lā jagfiruz-zunūbe illā ente.',
    translation: 'Allahu moj, Ti si moj Gospodar; nema boga osim Tebe. Ti si me stvorio i ja sam Tvoj rob. Koliko mogu, držim se Tvoga zavjeta i obećanja. Utječem Ti se od zla koje sam počinio. Priznajem Tvoju blagodat prema meni i priznajem svoj grijeh, pa mi oprosti, jer grijehe niko ne oprašta osim Tebe.',
    benefits: 'Uči se s čvrstim uvjerenjem ujutro. Izvor: Sahih al-Buhari 6306.'
  },
  {
    id: 'jutarnji-zastita-bismillah',
    title: 'Zikr zaštite (3x)',
    subtitle: 'Uči se tri puta ujutro',
    category: 'jutarnji-zikr',
    order: 86,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/86.mp3',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhillezī lā jedurru me’asmihi šej’un fil-erdi ve lā fis-semā’i, ve huves-Semī’ul-Alīm.',
    translation: 'U ime Allaha, uz čije ime ništa ne može nauditi ni na Zemlji ni na nebesima; On sve čuje i sve zna.',
    benefits: 'Uči se 3x ujutro. Izvor: Džami’ et-Tirmizi 3388 (hasen).'
  },
  {
    id: 'jutarnji-subhanallah',
    title: 'Subhānallāhi ve bihamdihī (100x)',
    subtitle: 'Jutarnji tesbih',
    category: 'jutarnji-zikr',
    order: 94,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/91.mp3',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subhānallāhi ve bihamdihī.',
    translation: 'Slavljen neka je Allah i Njemu pripada hvala.',
    benefits: 'Uči se 100x ujutro. Izvor: Sahih Muslim, Rijadus-salihin 1451.'
  },
  {
    id: 'vecernji-bika-amsajna',
    title: 'Dova pri večeri',
    subtitle: 'Večernji zikr',
    category: 'vecernji-zikr',
    order: 78,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/78.mp3',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    transliteration: 'Allāhumme bike emsejnā, ve bike asbahnā, ve bike nahjā, ve bike nemūtu, ve ilejkel-mesīr.',
    translation: 'Allahu moj, Tvojom moći smo dočekali večer i Tvojom moći dočekujemo jutro; Tvojom moći živimo i umiremo, i Tebi je povratak.',
    benefits: 'Uči se navečer. Izvor: Sahih al-Buhari 6320.'
  },
  {
    id: 'vecernji-sejjidul-istigfar',
    title: 'Sejjidul-istigfār',
    subtitle: 'Najpotpuniji istigfar — večer',
    category: 'vecernji-zikr',
    order: 79,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/79.mp3',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumme ente Rabbī, lā ilāhe illā ente. Halaktenī ve ene abduke, ve ene alā ahdike ve va’dike mesteta’tu. Eūzu bike min šerri mā sana’tu. Ebūu leke bi ni’metike alejje, ve ebūu bi zenbī, fagfir lī, fe innehu lā jagfiruz-zunūbe illā ente.',
    translation: 'Allahu moj, Ti si moj Gospodar; nema boga osim Tebe. Ti si me stvorio i ja sam Tvoj rob. Koliko mogu, držim se Tvoga zavjeta i obećanja. Utječem Ti se od zla koje sam počinio. Priznajem Tvoju blagodat prema meni i priznajem svoj grijeh, pa mi oprosti, jer grijehe niko ne oprašta osim Tebe.',
    benefits: 'Uči se s čvrstim uvjerenjem navečer. Izvor: Sahih al-Buhari 6306.'
  },
  {
    id: 'vecernji-zastita-bismillah',
    title: 'Zikr zaštite (3x)',
    subtitle: 'Uči se tri puta navečer',
    category: 'vecernji-zikr',
    order: 86,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/86.mp3',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhillezī lā jedurru me’asmihi šej’un fil-erdi ve lā fis-semā’i, ve huves-Semī’ul-Alīm.',
    translation: 'U ime Allaha, uz čije ime ništa ne može nauditi ni na Zemlji ni na nebesima; On sve čuje i sve zna.',
    benefits: 'Uči se 3x navečer. Izvor: Džami’ et-Tirmizi 3388 (hasen).'
  },
  {
    id: 'vecernji-subhanallah',
    title: 'Subhānallāhi ve bihamdihī (100x)',
    subtitle: 'Večernji tesbih',
    category: 'vecernji-zikr',
    order: 94,
    audioUrl: 'https://www.hisnmuslim.com/audio/ar/91.mp3',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subhānallāhi ve bihamdihī.',
    translation: 'Slavljen neka je Allah i Njemu pripada hvala.',
    benefits: 'Uči se 100x navečer. Izvor: Sahih Muslim, Rijadus-salihin 1451.'
  },
  ...ADDITIONAL_SHORT_SURAHS,
  ...ASERETA_SELECTIONS,
  ...POST_SALAH_ADHKAR,
  ...ADDITIONAL_NAMAZ_DUAS,
  ...DZENAZA_DUAS,
  ...QURAN_DUAS,
  ...createExtendedMorningEveningAdhkar('jutarnji-zikr', 'ujutro', 'jutarnji'),
  ...createExtendedMorningEveningAdhkar('vecernji-zikr', 'navečer', 'vecernji')
 ] as SurahOrDua[])
  .filter(item => item.id !== 'dzenazetska-dova')
  .map(item => ({
    ...item,
    audioUrls: QURAN_AUDIO_BY_ID[item.id] ?? item.audioUrls,
    audioUrl: QURAN_AUDIO_BY_ID[item.id] ? undefined : item.audioUrl,
    translation: KORKUT_TRANSLATIONS[item.id] ?? item.translation,
    transliteration: KORKUT_TRANSLATIONS[item.id]
      ? toBosnianPronunciation(FULL_QURAN_TRANSLITERATIONS[item.id] ?? item.transliteration)
      : item.transliteration
  }));
