import { Category, Lesson } from '../types';

export const ILMIHAL_CATEGORIES: Category[] = [
  {
    id: 'sta-je-islam',
    title: 'Šta je islam',
    description: 'Upoznaj istinu o porijeklu, suštini i univerzalnim vrijednostima islama.',
    iconName: 'IslamMoon',
    color: 'emerald',
    badge: 'Upoznaj istinu',
  },
  {
    id: 'islamski-sarti',
    title: 'Pet islamskih dužnosti',
    description: 'Islamski šarti - pet temeljnih praktičnih dužnosti svakog muslimana.',
    iconName: 'Pillars',
    color: 'teal',
    badge: 'Islamski šarti',
  },
  {
    id: 'imanski-sarti',
    title: 'Šest temelja vjerovanja',
    description: 'Imanski šarti - temelj islamskog vjerovanja (Amentu billahi).',
    iconName: 'DomeAllah',
    color: 'cyan',
    badge: 'Imanski šarti',
  },
  {
    id: 'namaz',
    title: 'Namaz',
    description: 'Način obavljanja namaza te propisi druge temeljne islamske dužnosti (drugi islamski šart) ovdje su predstavljeni u tekstualnoj, audio i video formi.',
    iconName: 'NamazJug',
    color: 'indigo',
    badge: 'Drugi šart',
  },
  {
    id: 'post',
    title: 'Post',
    description: 'Postiti ramazan je treća temeljna islamska dužnost (treći islamski šart), a ovdje su predstavljeni propisi ramazanskog posta i drugih vrsta ovog ibadeta.',
    iconName: 'PostSun',
    color: 'amber',
    badge: 'Treći šart',
  },
  {
    id: 'zekat',
    title: 'Zekat',
    description: 'Osnovne informacije o četvrtoj temeljnoj islamskoj dužnosti (četvrti islamski šart) u ovom segmentu tiču se propisa i uputstva o načinu davanja zekata. Detaljna objašnjenja mogu se naći na stranici zekat.ba na kojoj se nalazi i zekat-kalkulator.',
    iconName: 'ZekatHand',
    color: 'emerald',
    badge: 'Četvrti šart',
  },
  {
    id: 'poslanik',
    title: 'Poslanik Muhammed',
    description: 'Kratki životopis poslanika Muhammeda, a.s. - od rođenja, poslanstva, Hidžre do preseljenja na Ahiret.',
    iconName: 'ProphetCalligraphy',
    color: 'rose',
    badge: 'Životopis',
  },
  {
    id: 'hadz',
    title: 'Hadž i Kurban',
    description: 'Peta temeljna islamska dužnost, obredi hadža na svetim mjestima i propisi kurbana.',
    iconName: 'KaabaHadz',
    color: 'amber',
    badge: 'Peti šart',
  },
];

export const ILMIHAL_LESSONS: Lesson[] = [
  // =============================================================
  // 1. ŠTA JE ISLAM
  // =============================================================
  {
    id: 'islam-definicija',
    categoryId: 'sta-je-islam',
    categoryTitle: 'Šta je islam',
    title: 'Šta je islam: Definicija i suština',
    subtitle: 'Upoznaj istinu o vjeri mira i predanosti',
    order: 1,
    readTimeMinutes: 4,
    summary: 'Riječ "Islam" potiče od arapskog korijena \'selam\' što znači mir, spas i potpuna predanost Jednom Bogu, Allahu dž.š.',
    arabicSnippet: 'إِنَّ الدِّينَ عِندَ اللَّهِ الْإِسْلَامُ',
    arabicMeaning: 'Zaista je jedina prava vjera kod Allaha - Islam! (Ali \'Imran, 19)',
    contentSections: [
      {
        title: 'Suština i univerzalna poruka islama',
        body: [
          'Islam je posljednja Božija objava poslana cijelom čovječanstvu preko poslanika Muhammeda, a.s.',
          'Islam nije nova religija, već ista ona vjera koju su naučavali svi raniji Božiji poslanici od Adema, Nuha, Ibrahima, Musaa i Isaa a.s.',
          'Biti musliman znači dobrovoljno uskladiti svoj život sa Božijim zakonima, živjeti pravedno, činiti dobro i kloniti se zla.'
        ]
      },
      {
        title: 'Tri dimenzije vjere: Islam, Iman i Ihsan',
        body: [
          'Prema čuvenom Hadisu Džibrila, naša vjera ima tri međusobno povezane razine:',
          '1. Islam – praktično izvršavanje 5 islamskih dužnosti.',
          '2. Iman – unutrašnje čvrsto vjerovanje u 6 imanskih šarta.',
          '3. Ihsan – svjesnost o Allahovoj prisutnosti: "Da robuješ Allahu kao da Ga vidiš, jer iako ti Njega ne vidiš, On tebe uistinu vidi."'
        ]
      }
    ],
    keyPoints: [
      'Islam označava mir sa Stvoriteljem, sa sobom i sa svim ljudima.',
      'Svi poslanici su pozivali u monoteizam (vjerovanje u Jednog Boga).',
      'Ihsan je vrhunac duhovnosti – svjesnost da nas Allah uvijek vidi.'
    ],
    illustrationType: 'list',
    relatedQuizId: 'quiz-all'
  },
  {
    id: 'islam-izvori',
    categoryId: 'sta-je-islam',
    categoryTitle: 'Šta je islam',
    title: 'Izvori islama: Kur\'an i Sunnet',
    subtitle: 'Dva temeljna izvora islamskog učenja i života',
    order: 2,
    readTimeMinutes: 5,
    summary: 'Kur\'an kao neposredna Božija riječ i Sunnet kao praktični primjer poslanika Muhammeda a.s. čine nepogrješivu uputu muslimana.',
    contentSections: [
      {
        title: '1. Kur\'an-i Kerim',
        body: [
          'Kur\'an je posljednja Božija knjiga objavljena Muhammedu a.s. preko meleka Džibrila tokom 23 godine.',
          'Kur\'an ima 114 sura (poglavlja) i 6.236 ajeta.',
          'Kur\'an je sačuvan u originalnom arapskom tekstu bez i najmanje izmjene od trenutka objave do danas.'
        ]
      },
      {
        title: '2. Sunnet i Hadis Poslanika a.s.',
        body: [
          'Sunnet predstavlja sve ono što je Poslanik a.s. rekao (kavli-sunnet), radio (fi\'li-sunnet) ili svojim prećutnim odobrenjem potvrdio (takriri-sunnet).',
          'Hadis je pisani zapis Poslanikovih izreka i postupaka koji nam detaljno pojašnjava kako klanjati, postiti i primjenjivati Kur\'an u praksi.'
        ]
      }
    ],
    keyPoints: [
      'Kur\'an je vječna i nepromjenjiva riječ Uzvišenog Allaha.',
      'Sunnet je životno tumačenje i primjena kur\'anskih poruka.',
      'Čuvanjem Kur\'ana i Sunneta vjernik nikada neće zalutati.'
    ],
    relatedQuizId: 'quiz-sure'
  },

  // =============================================================
  // 2. PET ISLAMSKIH DUŽNOSTI (ISLAMSKI ŠARTI)
  // =============================================================
  {
    id: 'islamski-sarti-pregled',
    categoryId: 'islamski-sarti',
    categoryTitle: 'Pet islamskih dužnosti',
    title: 'Pet islamskih dužnosti (Islamski šarti)',
    subtitle: 'Stubovi na kojima počiva islam',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Pet stubova islama su Kelime-i Šehadet, Namaz, Post, Zekat i Hadž.',
    arabicSnippet: 'بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ',
    arabicMeaning: 'Islam se temelji na pet stvari: svjedočenju da nema boga osim Allaha i da je Muhammed Njegov poslanik, obavljanju namaza, davanju zekata, hodočašću Kabe i postu ramazana.',
    contentSections: [
      {
        title: '1. Kelime-i Šehadet (Očitovanje vjere)',
        body: [
          'Ešhedu en lā ilāhe illallāh, ve ešhedu enne Muhammeden \'abduhū ve resūluh.',
          'To je izjava kojom čovjek ulazi u islam, potvrđujući da obožava samo Allaha i slijedi Muhammeda a.s.'
        ]
      },
      {
        title: '2. Namaz (Salat)',
        body: ['Svakodnevna molitva 5 puta dnevno kao direktna veza između čovjeka i Stvoritelja.']
      },
      {
        title: '3. Post (Savm)',
        body: ['Suzdržavanje od jela, pića i tjelesnih užitaka od zore do zalaska sunca u mjesecu Ramazanu.']
      },
      {
        title: '4. Zekat',
        body: ['Godišnje materijalno izdvajanje 2.5% viška imetka za siromašne i potrebe zajednice.']
      },
      {
        title: '5. Hadž',
        body: ['Hodočašće Kabi u Meki jednom u životu za onoga ko je materijalno i fizički u mogućnosti.']
      }
    ],
    keyPoints: [
      'Svih pet dužnosti čine cjelinu praktičnog islamskog života.',
      'Šehadet je ulaz, namaz je stub, post je štit, zekat čisti imetak, a hadž ujedinjuje ummet.'
    ],
    relatedQuizId: 'quiz-islam'
  },

  // =============================================================
  // 3. ŠEST TEMELJA VJEROVANJA (IMANSKI ŠARTI)
  // =============================================================
  {
    id: 'imanski-sarti-amentu',
    categoryId: 'imanski-sarti',
    categoryTitle: 'Šest temelja vjerovanja',
    title: 'Šest temelja vjerovanja (Imanski šarti)',
    subtitle: 'Amentu billahi - stubovi islamske akide',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Imanski šarti su šest osnovnih istina vjere u koje svaki musliman mora nepokolebljivo vjerovati srcem i očitovati riječima.',
    arabicSnippet: 'آمَنْتُ بِاللهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَبِالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللهِ تَعَالَى',
    arabicMeaning: 'Vjerujem u Allaha, u Njegove meleke, u Njegove kitabe, u Njegove poslanike, u Sudnji dan i da sve što biva biva Božijim određenjem.',
    contentSections: [
      {
        title: 'Pregled šest temelja vjerovanja',
        body: [
          '1. Amentu billāhi – Vjerovanje u Allaha dž.š. (Tevhid)',
          '2. Ve melā\'iketihī – Vjerovanje u meleke (svjetlosna bića)',
          '3. Ve kutubihī – Vjerovanje u Božije objave (Tevrat, Zebur, Indžil i Kur\'an)',
          '4. Ve rusulihī – Vjerovanje u Božije poslanike od Adema a.s. do Muhammeda a.s.',
          '5. Vel-jevmil-āhiri – Vjerovanje u Sudnji dan i vječni život na Ahiretu',
          '6. Ve bil-kaderi hajrihī ve šerrihī – Vjerovanje u Božije sveznanje i određenje (Kader)'
        ]
      }
    ],
    keyPoints: [
      'Iman je temelj na kojem se grade sva dobra djela.',
      'Sumnja u bilo koji od 6 šarta narušava cjelinu vjerovanja.'
    ],
    relatedQuizId: 'quiz-iman'
  },
  {
    id: 'iman-allah-tevhid',
    categoryId: 'imanski-sarti',
    categoryTitle: 'Šest temelja vjerovanja',
    title: '1. Vjerovanje u Allaha (Tevhid i Sifati)',
    subtitle: 'Spoznaja Stvoritelja i Njegovih savršenih svojstava',
    order: 2,
    readTimeMinutes: 5,
    summary: 'Tevhid je čisto monoteističko vjerovanje da je samo Allah Bog, Koji nema druga, roditelja ni djeteta.',
    arabicSnippet: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ',
    arabicMeaning: 'Reci: "On je Allah - Jedan je! Allah je Utočište svakom!"',
    contentSections: [
      {
        title: 'Tevhid – Čisto monoteističko vjerovanje',
        body: [
          'Vjerovanje u Allaha podrazumijeva spoznaju da je On jedini Stvoritelj (Rububijjet) i jedini Koji zaslužuje obožavanje (Uluhijjet).',
          'Sura El-Ihlas najpreciznije definiše Božije biće.'
        ]
      },
      {
        title: '14 Božijih Svojstava (Sifata)',
        body: [
          'Svojstva Božijeg bića (Sifati zatijje): Vudžud (Ima Ga), Kidem (Nema početka), Beka (Nema kraja), Vahdanijjet (Jedan je), Muhalefetun lil-havadisi (Ne liči stvorenjima), Kijamun bi nefsihi (Sam o Sebi opstoji).',
          'Svojstva savršenstva (Sifati subutijje): Hajat (Živ je), \'Ilm (Sve zna), Sem\' (Sve čuje), Besar (Sve vidi), Iradet (Ima volju), Kudret (Svemoćan je), Kelam (Govori), Tekvin (Sve stvara).'
        ]
      }
    ],
    keyPoints: [
      'Allah je Jedan i Njemu niko i ništa nije ravno.',
      'Znamo 6 ličnih i 8 trajnih Božijih svojstava.'
    ],
    relatedQuizId: 'quiz-iman'
  },

  // =============================================================
  // 4. NAMAZ (SLIKA 2 SA ISLAM.BA)
  // =============================================================
  {
    id: 'namaz-uvjeti',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Uvjeti za namaz',
    subtitle: 'Pripreme za namaz',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Šest vanjskih šartova koje je neophodno ispuniti prije stupanja u namaz (čistoća, abdest, odjeća, vakat, kibla i nijjet).',
    contentSections: [
      {
        title: 'Šest pripremnih šartova za namaz',
        body: [
          '1. Čistoća tijela, odijela i mjesta klanjanja (Taharet od nedžaseta).',
          '2. Uzeti abdest ili po potrebi gusul (ili tejemmum u nuždi).',
          '3. Biti propisno obučen (Pokrivanje avreta - muškarci od pupka do koljena, žene cijelo tijelo osim lica, šaka i stopala).',
          '4. Klanjati u tačno namasko vrijeme (Vakat).',
          '5. Okrenuti se licem prema Kibli (Kaba u Meki).',
          '6. Odlučiti srcem koji se namaz klanja (Nijjet).'
        ]
      }
    ],
    keyPoints: [
      'Bez ispunjenja ovih 6 uslova namaz nije ispravan.',
      'Abdest je ključ namaza, a čistoća pola vjere.'
    ],
    relatedQuizId: 'quiz-taharet'
  },
  {
    id: 'namaz-kako-se-klanja',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Kako se klanja',
    subtitle: 'Sastavni dijelovi namaza',
    order: 2,
    readTimeMinutes: 6,
    summary: 'Šest unutrašnjih sastavnih dijelova (ruknova) namaza bez kojih namaz nije valjan.',
    contentSections: [
      {
        title: 'Šest ruknova namaza',
        body: [
          '1. Početni tekbir (Iftitahi-tekbir - izgovor Allāhu Ekber sa podizanjem ruku).',
          '2. Stajanje u namazu (Kijam).',
          '3. Učenje Kur\'ana (Kiraet - učenje Fatihe i sure).',
          '4. Pregibanje u namazu (Ruku\' - Subhane Rabbijel-Azim 3x).',
          '5. Padanje licem na tle (Sedžda - 2x na svakom rek\'atu, Subhane Rabbijel-A\'la 3x).',
          '6. Posljednje sjedenje (Ka\'de-i ehire - učenje Ettehijjatu, salavata i dova).'
        ]
      }
    ],
    keyPoints: [
      'Svaki rek\'at se sastoji od Kijama, Kiraeta, Ruku\'a i dvije Sedžde.',
      'Smirenost i skrušenost (hušu\') u pokretima su duša namaza.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-propisi',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Propisi o namazu',
    subtitle: 'Fikhska pravila',
    order: 3,
    readTimeMinutes: 5,
    summary: 'Šta kvari namaz, šta je pokuđeno (mekruh), te pravila sehvi-sedžde pri zaboravu.',
    contentSections: [
      {
        title: 'Šta kvari namaz?',
        body: [
          '• Govor ili glasan smijeh u namazu.',
          '• Okretanje prsa od Kible.',
          '• Jedenje, pijenje ili činjenje većih radnji koje ne pripadaju namazu.',
          '• Gubljenje abdesta tokom namaza.',
          '• Otkrivanje avreta.'
        ]
      },
      {
        title: 'Sehvi-sedžda (Sedžda zbog zaborava)',
        body: [
          'Ako klanjač nenamjerno izostavi vadžib (npr. učenje Fatihe, prvo sjedenje ili Kunut-dovu), dužan je na zadnjem sjedenju predati selam na desnu stranu, učiniti još dvije sedžde, sjesti, proučiti ponovo Ettehijjatu, salavate i dove, te predati selam na obje strane.'
        ]
      }
    ],
    keyPoints: [
      'Namaz se kvari namjernim govorom ili radnjama koje odvraćaju od ibadeta.',
      'Sehvi-sedžda popravlja nenamjerne propuste u vadžibima.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-dnevni',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Dnevni namazi',
    subtitle: 'Način obavljanja',
    order: 4,
    readTimeMinutes: 6,
    summary: 'Detaljan opis pet dnevnih namaza: Sabah (4), Podne (10), Ikindija (8), Akšam (5) i Jacija sa Vitrom (13 rek\'ata).',
    contentSections: [
      {
        title: 'Pregled 5 dnevnih namaza',
        body: [
          '• Sabah: 2 sunneta + 2 farza',
          '• Podne: 4 sunneta + 4 farza + 2 sun-sunneta',
          '• Ikindija: 4 sunneta + 4 farza',
          '• Akšam: 3 farza + 2 sunneta',
          '• Jacija: 4 sunneta + 4 farza + 2 sun-sunneta + 3 vitr-namaza'
        ]
      }
    ],
    keyPoints: [
      'Ukupno dnevno klanjamo 40 rek\'ata (17 farza, 20 sunneta i 3 vitra).',
      'Vitr namaz se klanja na kraju jacije i na 3. rek\'atu se uči Kunut-dova.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-dzemat',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Džemat',
    subtitle: 'O džematu',
    order: 5,
    readTimeMinutes: 4,
    summary: 'Zajedničko obavljanje namaza za imamom u džamiji ili kod kuće, vrijedno 27 puta više od pojedinačnog namaza.',
    contentSections: [
      {
        title: 'Vrijednost i pravila džemata',
        body: [
          'Poslanik a.s. je rekao: "Namaz u džematu je vredniji od namaza pojedinca za dvadeset i sedam stepeni."',
          'Muktedija (klanjač za imamom) donosi nijjet da klanja za imamom i prati imama u tekbirima i pregibima ne pretičući ga.',
          'Ravnanje saffova (redova) ramena uz rame simbolizira jedinstvo i jednakost vjernika.'
        ]
      }
    ],
    keyPoints: [
      'Džemat jača bratske veze i nosi višestruku nagradu.',
      'Zabranjeno je preteći imama u namaskim radnjama.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-dzuma',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Džuma',
    subtitle: 'Namaz i hutba',
    order: 6,
    readTimeMinutes: 5,
    summary: 'Sedmični zajednički namaz petkom u vrijeme podne-namaza koji je stroga dužnost (farz) odraslim muškarcima.',
    contentSections: [
      {
        title: 'Propisi Džume namaza',
        body: [
          'Džuma se sastoji od 4 rek\'ata prvog sunneta, Hutbe (vaz i opomena imama), 2 rek\'ata farza u džematu i 4 rek\'ata zadnjeg sunneta.',
          'Za vrijeme hutbe strogo je zabranjeno pričati ili ometati druge; dužnost je pažljivo slušati poruke imama.'
        ]
      }
    ],
    keyPoints: [
      'Petak je najodabraniji dan u sedmici.',
      'Džuma zamjenjuje podne namaz za onoga ko je obavi.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-dzenaza',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Dženaza',
    subtitle: 'O dženazi',
    order: 7,
    readTimeMinutes: 5,
    summary: 'Kolektivna dužnost (farz-i kifaje) ispraćaja umrlog muslimana i dova za oprost njegovih grijeha.',
    contentSections: [
      {
        title: 'Kako se klanja dženaza namaz',
        body: [
          'Dženaza se klanja stojeći (bez ruku\'a i sedžde) uz 4 tekbira za imamom:',
          '1. Prvi tekbir – Uči se Subhaneke (sa dodatkom: ve dželle senā\'uk).',
          '2. Drugi tekbir – Uče se Salavati.',
          '3. Treći tekbir – Uči se dženazetska dova za umrlog (ili Rabbena atina).',
          '4. Četvrti tekbir – Predaje se selam na desnu i lijevu stranu.'
        ]
      }
    ],
    keyPoints: [
      'Dženaza je posljednje pravo umrlog muslimana prema braći i sestrama.',
      'Sastoji se isključivo od stajanja i dova uz 4 tekbira.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-nafile',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Nafile',
    subtitle: 'Teravija, duha i drugi namazi',
    order: 8,
    readTimeMinutes: 5,
    summary: 'Dobrovoljni namazi kojima se vjernik dodatno približava Allahu: Teravih, Noćni namaz (Tehedždžud), Duha, Tehijjetul-mesdžid i Istihara.',
    contentSections: [
      {
        title: 'Odabrani nafile namazi',
        body: [
          '• Teravih-namaz: Pritvrđeni sunnet koji se klanja svake ramazanske noći poslije jacije (20 rek\'ata po 2 ili 4 rek\'ata).',
          '• Tehedždžud: Noćni namaz u posljednjoj trećini noći prije zore.',
          '• Duha-namaz: Jutarnji namaz poslije izlaska sunca do pred podne.',
          '• Tehijjetul-mesdžid: 2 rek\'ata pozdrava džamiji prilikom ulaska.',
          '• Istihara-namaz: Molitva za Božiju uputu i blagoslov pri donošenju važnih životnih odluka.'
        ]
      }
    ],
    keyPoints: [
      'Nafile namazi popunjavaju eventualne manjkavosti u farzovima na Sudnjem danu.',
      'Noćni namaz pruža posebnu duhovnu snagu i mir.'
    ],
    relatedQuizId: 'quiz-namaz'
  },
  {
    id: 'namaz-bajram',
    categoryId: 'namaz',
    categoryTitle: 'Namaz',
    title: 'Kako se klanja bajram',
    subtitle: 'Namaz i hutba',
    order: 9,
    readTimeMinutes: 4,
    summary: 'Ramazanski i Kurban bajram namaz sa po 3 dodatna tekbira na oba rek\'ata i bajramskom hutbom.',
    contentSections: [
      {
        title: 'Opis Bajram namaza (2 Rek\'ata)',
        body: [
          'Klanja se 45 minuta poslije izlaska sunca u džematu.',
          '1. Na prvom rek\'atu poslije Subhaneke izgovaraju se 3 dodatna tekbira sa podizanjem ruku.',
          '2. Na drugom rek\'atu poslije učenja Fatihe i sure izgovaraju se 3 dodatna tekbira, a sa 4. tekbirom ide se na ruku\'.',
          'Nakon predaje selama imam drži bajramsku hutbu.'
        ]
      }
    ],
    keyPoints: [
      'Bajram je dan radosti, posjete rodbini i međusobnog mirenja.',
      'Bajram namaz je vadžib (obavezan) muškarcima.'
    ],
    relatedQuizId: 'quiz-namaz'
  },

  // =============================================================
  // 5. POST (SLIKA 3 SA ISLAM.BA)
  // =============================================================
  {
    id: 'post-sta-je',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Šta je post',
    subtitle: 'Definicija i vrijednost',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Ramazanski post (Savm) je treći islamski šart: suzdržavanje od jela, pića, tjelesnih prohtjeva i ružnog ponašanja od zore do zalaska sunca.',
    arabicSnippet: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    arabicMeaning: 'O vjernici! Propisuje vam se post, kao što je propisan onima prije vas, da biste bili bogobojazni! (El-Bekare, 183)',
    contentSections: [
      {
        title: 'Cilj i vrijednosti posta',
        body: [
          'Glavni cilj posta je postizanje takvaluka (bogobojaznosti i svjesnosti o Bogu).',
          'Post razvija samokontrolu, jača volju, pročišćava tijelo i budi duboko suosjećanje sa gladnima i siromašnima.',
          'Hadis-i kudsi: "Post je Moj i Ja za njega posebno nagrađujem!"'
        ]
      },
      {
        title: 'Sehur i Iftar',
        body: [
          'Sehur je ranojutarnji obrok prije zore (imsaka). Sunnet je ustati na sehur jer u njemu leži poseban bereket.',
          'Iftar je obrok prilikom zalaska sunca (oglašavanja akšamskog ezana). Sunnet je iftariti se hurmom ili vodom i proučiti iftarsku dovu.'
        ]
      }
    ],
    keyPoints: [
      'Post je duhovna škola strpljenja i zahvalnosti.',
      'Dova postača pred iftar se ne odbija.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'post-propisi',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Propisi o postu',
    subtitle: 'Opća pravila',
    order: 2,
    readTimeMinutes: 5,
    summary: 'Šta kvari post (uz obavezu napostanja ili keffareta), a šta ne kvari post.',
    contentSections: [
      {
        title: 'Šta kvari post?',
        body: [
          '• Namjerno jedenje, pijenje ili uzimanje lijekova/hranljivih infuzija.',
          '• Spolni odnos tokom dana posta.',
          '• Namjerno izazivanje povraćanja punim ustima.',
          '• Pojava hajza ili nifasa kod žena.'
        ]
      },
      {
        title: 'Šta NE kvari post?',
        body: [
          '• Jedenje ili pijenje iz zaborava (čim se sjeti, dužan je prestati i post je ispravan).',
          '• Kupanje, tuširanje ili ispiranje usta/nosa bez gutanja vode.',
          '• Korištenje misvaka ili paste za zube (pazeći da se ne proguta).',
          '• Vađenje krvi ili primanje nehranljivih injekcija.',
          '• Kapi za oči ili uši.'
        ]
      }
    ],
    keyPoints: [
      'Zaborav ne kvari post – to je Allahova gozba postaču.',
      'Namjerno prekidanje posta zahtijeva iskreno pokajanje i propisano nadoknađivanje.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'post-sadekatul-fitr',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Sadekatul-fitr',
    subtitle: 'Neodložna obaveza',
    order: 3,
    readTimeMinutes: 4,
    summary: 'Materijalna obaveza svakog muslimana pred kraj ramazana radi čišćenja posta od propusta i pomoći siromašnima za bajram.',
    contentSections: [
      {
        title: 'Svrha i propis vitre (Sadekatul-fitra)',
        body: [
          'Sadekatul-fitr je vadžib svakom slobodnom muslimanu koji posjeduje više od svojih osnovnih potreba na dan Bajrama.',
          'Glava porodice daje sadekatul-fitr za sebe i sve članove porodice koje izdržava.',
          'Mora se izdvojiti prije klanjanja bajram-namaza kako bi siromašni mogli osjetiti radost praznika.'
        ]
      }
    ],
    keyPoints: [
      'Vitre čiste post od nehotičnih ružnih riječi i nedostataka.',
      'Daje se u fond Bejtul-mal ili direktno onima koji su u potrebi.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'post-zena',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Žena i post',
    subtitle: 'Dileme i specifične situacije',
    order: 4,
    readTimeMinutes: 4,
    summary: 'Propisi i olakšice za žene tokom hajza, nifasa, trudnoće i dojenja.',
    contentSections: [
      {
        title: 'Olakšice i nadoknađivanje',
        body: [
          '• Žena u stanju hajza (menstruacije) i nifasa (nakon poroda) ne posti i ne klanja, već propuštene dane posta nadoknađuje poslije ramazana (dan za dan).',
          '• Trudnica i dojilja, ako se opravdano boje za svoje zdravlje ili zdravlje djeteta, imaju pravo prekinuti post i nadoknaditi dane kada budu u mogućnosti.'
        ]
      }
    ],
    keyPoints: [
      'Islam je vjera olakšice i brige o zdravlju majke i djeteta.',
      'Namaz se u tim stanjima ne nadoknađuje, ali post se nadoknađuje.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'post-dobrovoljni',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Dobrovoljni post',
    subtitle: 'Nafile',
    order: 5,
    readTimeMinutes: 4,
    summary: 'Post izvan ramazana koji nosi ogromnu nagradu: 6 dana Ševvala, Dan Arefata, Dan Ašure i post ponedjeljkom i četvrtkom.',
    contentSections: [
      {
        title: 'Najodabraniji dobrovoljni dani posta',
        body: [
          '• 6 dana Ševvala: "Ko isposti ramazan, a zatim ga poprati sa šest dana ševvala, kao da je cijelu godinu postio."',
          '• Dan Arefata (9. zul-hidždže): Briše grijehe za proteklu i narednu godinu za one koji nisu na hadžu.',
          '• Dan Ašure (10. muharrem): Briše grijehe za proteklu godinu.',
          '• Ponedjeljak i četvrtak: Dani kada se djela izlažu pred Gospodara svjetova.',
          '• Bijeli dani (13, 14. i 15. lunarnog mjeseca).'
        ]
      }
    ],
    keyPoints: [
      'Dobrovoljni post čuva duhovnu kondiciju tokom cijele godine.',
      'Zabranjeno je postiti samo na dane Bajrama.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'post-preporuke',
    categoryId: 'post',
    categoryTitle: 'Post',
    title: 'Preporuke za ramazan',
    subtitle: 'Ibadeti i praktični savjeti',
    order: 6,
    readTimeMinutes: 5,
    summary: 'Kako najbolje iskoristiti mubarek mjesec Ramazan: učenje Kur\'ana (mukabela), noćni namaz, itikaf i traženje Noći Kadr.',
    contentSections: [
      {
        title: 'Ibadeti u Ramazanu',
        body: [
          '• Redovno prisustvovanje mukabelama i lično učenje Kur\'ana.',
          '• Činjenje dove, dijeljenje sadake i hranjenje postača (priređivanje iftara).',
          '• Posljednja trećina ramazana: intenzivno traženje Lejletul-kadra, noći koja je vrednija od 1.000 mjeseci.',
          '• Dova u noći Kadr: "Allāhumme inneke \'Afuvvun tuhibbul-\'afve fa\'fu \'annī" (Allahu moj, Ti si Onaj Koji prašta i voliš oprost, pa mi oprosti!).'
        ]
      }
    ],
    keyPoints: [
      'Ramazan je mjesec Kur\'ana i oprosta grijeha.',
      'Lejletul-kadr donosi nagradu veću od 83 godine ibadeta.'
    ],
    relatedQuizId: 'quiz-islam'
  },

  // =============================================================
  // 6. ZEKAT (SLIKA 4 SA ISLAM.BA)
  // =============================================================
  {
    id: 'zekat-kako-se-daje',
    categoryId: 'zekat',
    categoryTitle: 'Zekat',
    title: 'Kako se daje zekat',
    subtitle: 'Način davanja',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Zekat je četvrta temeljna islamska dužnost: izdvajanje 2.5% iz viška imovine koja dostiže nisab i pregodini u posjedu.',
    arabicSnippet: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا',
    arabicMeaning: 'Uzmi od imetaka njihovih zekat, da ih njime očistiš i blagoslovljenim učiniš! (Et-Tevbe, 103)',
    contentSections: [
      {
        title: 'Uslovi za obaveznost zekata',
        body: [
          '1. Biti musliman, punoljetan i pametan.',
          '2. Posjedovati nisab – minimalni propisani iznos imovine koji prelazi osnovne životne potrebe i dugove.',
          '3. Da ta imovina pregodini (bude u vlasništvu punu lunarnu godinu).'
        ]
      },
      {
        title: 'Kome se daje zekat (8 kategorija)',
        body: [
          'Prema Kur\'anu (sura Et-Tevbe, 60), zekat pripada:',
          '1. Siromasima (fukara)',
          '2. Nevoljnicima (mesakin)',
          '3. Sakupljačima zekata',
          '4. Za pridobijanje srca za islam',
          '5. Za oslobađanje od ropstva i dugova',
          '6. Prezaduženima',
          '7. Na Allahovom putu (Fi sebilillah - obrazovanje, medrese, fakulteti)',
          '8. Putnicima namjernicima'
        ]
      }
    ],
    keyPoints: [
      'Zekat je pravo siromašnih u imetku bogatih, a ne dobrovoljna milostinja.',
      'Izdvaja se u Bejtul-mal za sistemsku podršku zajednici i potrebnima.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'zekat-vrste-imovine',
    categoryId: 'zekat',
    categoryTitle: 'Zekat',
    title: 'Vrste zekatske imovine',
    subtitle: 'Na što se daje zekat',
    order: 2,
    readTimeMinutes: 5,
    summary: 'Propisi o davanju zekata na zlato, srebro, novac, trgovačku robu, stoku i poljoprivredne plodove.',
    contentSections: [
      {
        title: 'Pregled kategorija imovine i stopa',
        body: [
          '• Zlato, srebro, novac i trgovačka roba: Daje se 2.5% (četrdeseti dio) na ukupnu vrijednost iznad nisaba.',
          '• Poljoprivredni proizvodi (Ušur): Daje se 10% na prirodno navodnjavane usjeve, a 5% na usjeve koji zahtijevaju troškove navodnjavanja (daje se odmah pri žetvi/berbi).',
          '• Domaća stoka: Zasebne skale za ovce, koze, goveda i deve prema broju grla.',
          '• Rudno blago i dragocjenosti (Rikaz): Daje se 20% (petina).'
        ]
      }
    ],
    keyPoints: [
      'Nisab za novac se utvrđuje prema vrijednosti 85 grama zlata.',
      'Na imovinu za lične potrebe (kuća, auto, osnovni alat) se ne daje zekat.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'zekat-blagodati',
    categoryId: 'zekat',
    categoryTitle: 'Zekat',
    title: 'Blagodati zekata',
    subtitle: 'Ibadet i obaveza',
    order: 3,
    readTimeMinutes: 4,
    summary: 'Duhovne, moralne i društvene koristi davanja zekata: čišćenje duše od škrtosti i smanjenje socijalnih razlika.',
    contentSections: [
      {
        title: 'Zašto je zekat blagoslov?',
        body: [
          'Riječ "Zekat" znači čišćenje, rast i uvećanje bereketa.',
          'Davanjem zekata imetak se ne umanjuje, već biva zaštićen od propasti.',
          'Zekat uklanja zavist među ljudima, gradi solidarnost i sprječava gomilanje bogatstva u rukama nekolicine.'
        ]
      }
    ],
    keyPoints: [
      'Zekat je stub socijalne pravde u islamu.',
      'Čisti srce davaoca od pohlepe i škrtosti.'
    ],
    relatedQuizId: 'quiz-islam'
  },

  // =============================================================
  // 7. POSLANIK MUHAMMED (SLIKA 5 SA ISLAM.BA)
  // =============================================================
  {
    id: 'poslanik-prije-poslanstva',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Period prije poslanstva',
    subtitle: 'Rođenje i porodica',
    order: 1,
    readTimeMinutes: 5,
    summary: 'Rođenje u Mekki 571. godine (Godina slona), djetinjstvo kao jetime, odgoj, nadimak El-Emin (Povjerljivi) i brak sa Hatidžom r.a.',
    contentSections: [
      {
        title: 'Mladost i plemenit karakter',
        body: [
          'Muhammed a.s. je rođen u uglednom plemenu Kurejš, u porodici Benu Hašim. Otac Abdullah mu je umro prije rođenja, a majka Amina kada je imao 6 godina.',
          'O njemu su se brinuli djed Abdul-Muttalib, a potom amidža Ebu Talib.',
          'Zbog svoje izuzetne iskrenosti, poštenja i pravičnosti, sugrađani su ga prozvali "El-Emin" (Povjerljivi).',
          'U 25. godini ženi se plemenitom Hatidžom r.a., koja mu je bila najveća podrška i prva povjerovala u poslanstvo.'
        ]
      }
    ],
    keyPoints: [
      'Odrastao je kao siroče sačuvan od svih paganskih poroka.',
      'Njegov nadimak El-Emin svjedoči o neprikosnovenom moralu.'
    ],
    relatedQuizId: 'quiz-poslanici'
  },
  {
    id: 'poslanik-vrijeme-poslanstva',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Vrijeme poslanstva',
    subtitle: 'Do medinskog perioda poslanstva',
    order: 2,
    readTimeMinutes: 6,
    summary: 'Prva objava u pećini Hira u 40. godini života ("Ikre!"), tajni i javni dawah u Mekki, bojkot, progoni vjernika te Isra i Mi\'radž.',
    arabicSnippet: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    arabicMeaning: 'Čitaj, u ime Gospodara tvoga, Koji stvara! (El-\'Alek, 1)',
    contentSections: [
      {
        title: 'Početak Objave i Mekanski period',
        body: [
          'U noći Lejletul-kadr, u pećini Hira na brdu Nur, melek Džibril donosi prve ajete sure El-\'Alek: "Ikre! Čitaj!"',
          'Nakon 3 godine tajnog pozivanja, naređeno je javno širenje islama.',
          'Mekanski mnogobošci su žestoko mučili prve muslimane (poput Bilala, Ammara i Sumejje r.a.).',
          'Nakon "Godine tuge" (smrt Hatidže r.a. i Ebu Taliba), Allah časti Poslanika a.s. noćnim putovanjem u Kuds (Isra) i uzdignućem na najviše nebo (Mi\'radž), gdje je propisan petovakatni namaz.'
        ]
      }
    ],
    keyPoints: [
      'Prva zapovijed islama je učenje i sticanje znanja u ime Allaha.',
      'Namaz je dar donesen direktno sa Mi\'radža.'
    ],
    relatedQuizId: 'quiz-poslanici'
  },
  {
    id: 'poslanik-poslije-hidzre',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Vrijeme poslije Hidžre',
    subtitle: 'Medina, život i odbrana',
    order: 3,
    readTimeMinutes: 6,
    summary: 'Hidžra 622. godine u Jesrib (Medinu), uspostava prve islamske države, bratimljenje muhadžira i ensarija, te bitke na Bedru, Uhudu i Hendeku.',
    contentSections: [
      {
        title: 'Gradnja zajednice u Medini',
        body: [
          'Hidžra (preseljenje) iz Mekke u Medinu 622. godine označava početak islamskog računanja vremena.',
          'Prvo što je Poslanik a.s. uradio bilo je: gradnja Poslanikove džamije (Mesdžidun-Nebevi), bratimljenje doseljenika (muhadžira) i domaćina (ensarija), te Medinska povelja (prvi pisani ustav o suživotu i vjerskim slobodama).',
          'Odbrana zajednice: Bitka na Bedru (pobjeda istine nad zabludom), Uhud (lekcija o poslušnosti vođi) i Bitka na Hendeku (opsada Medine).'
        ]
      }
    ],
    keyPoints: [
      'Hidžra je prekretnica u historiji islama i simbol spremnosti na žrtvu.',
      'Medinski ustav je temelj pravednog i inkluzivnog društva.'
    ],
    relatedQuizId: 'quiz-poslanici'
  },
  {
    id: 'poslanik-povratak-kuci',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Povratak kući',
    subtitle: 'Oslobođenje Mekke',
    order: 4,
    readTimeMinutes: 5,
    summary: 'Ugovor na Hudejbiji i mirno, pobjedonosno oslobođenje Mekke 630. godine uz veličanstveni oprost nekadašnjim progoniteljima.',
    contentSections: [
      {
        title: 'Trijumf oprosta i čišćenje Kabe',
        body: [
          'Muslimanska vojska od 10.000 ashaba ulazi u Mekku bez prolijevanja krvi.',
          'Poslanik a.s. ulazi ponizno, pognute glave, zahvaljujući Allahu, i čisti Kabu od 360 kumira (kipova) učeći ajet: "Došla je istina, a nestalo je laži!"',
          'Svojim nekadašnjim krvnicima i progoniteljima poručio je: "Idite, svi ste slobodni!" Oprostio je svima, što je navelo čitava plemena da dobrovoljno prime islam.'
        ]
      }
    ],
    keyPoints: [
      'Oslobođenje Mekke je najveći historijski primjer opraštanja u pobjedi.',
      'Kaba je ponovo postala kuća čistog monoteizma.'
    ],
    relatedQuizId: 'quiz-poslanici'
  },
  {
    id: 'poslanik-oprostajni-hadz',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Oproštajni hadž',
    subtitle: 'Oporuka muslimanima',
    order: 5,
    readTimeMinutes: 5,
    summary: 'Govor Poslanika a.s. na Arefatu pred više od 100.000 ashaba – univerzalna deklaracija o ljudskim pravima, jednakosti rasa i pravima žena.',
    contentSections: [
      {
        title: 'Ključne poruke Oproštajnog govora',
        body: [
          '• Jednakost ljudi: "Nema prednosti Arap nad Ne-Arapom, niti bijelac nad crncem, osim po bogobojaznosti (takvaluku)."',
          '• Svetost života i imetka: "Vaši životi, vaši imeci i vaša čast su vam sveti kao što je svet ovaj vaš dan u ovom vašem mjesecu."',
          '• Prava žena: "Oporučujem vam da lijepo postupate prema ženama; one su vaši životni saputnici."',
          '• Zabrana kamate i krvne osvete.',
          '• Ostavština: "Ostavljam vam dvije stvari, ako ih se budete držali nećete zalutati: Allahovu Knjigu (Kur\'an) i moj Sunnet."'
        ]
      }
    ],
    keyPoints: [
      'Oproštajni govor je temelj jednakosti, pravde i ljudskog dostojanstva.',
      'Rasizam je strogo iskorijenjen u islamu.'
    ],
    relatedQuizId: 'quiz-poslanici'
  },
  {
    id: 'poslanik-preseljenje',
    categoryId: 'poslanik',
    categoryTitle: 'Poslanik Muhammed',
    title: 'Preseljenje na Ahiret',
    subtitle: 'Smrt i biranje vođe muslimana',
    order: 6,
    readTimeMinutes: 5,
    summary: 'Posljednji dani poslanika Muhammeda a.s. u Medini u 63. godini života, njegov odlazak u najviše društvo (Er-Refikul-E\'la) i izbor Ebu Bekra r.a.',
    contentSections: [
      {
        title: 'Dovršenje poslanstva i vječni trag',
        body: [
          'Nakon što je dostavio cijeli emanet, objavljen je ajet: "Danas sam vam usavršio vašu vjeru i upotpunio Svoju blagodat prema vama..."',
          'Poslanik a.s. preseljava na Ahiret 12. rebiul-evvela 11. hidžretske godine (632. g.) u sobi svoje supruge Aiše r.a. u Medini.',
          'Njegove posljednje riječi bile su: "Belir-Refīkal-E\'lā" (Već želim Najuzvišenije društvo!).',
          'Ebu Bekr r.a. se obratio potresenim ashabima riječima: "Ko je obožavao Muhammeda – Muhammed je umro, a ko obožava Allaha – Allah je Živi i nikada ne umire!"'
        ]
      }
    ],
    keyPoints: [
      'Poslanik a.s. je ostavio savršenu vjeru i primjer za sva vremena.',
      'Ebu Bekr r.a. je izabran za prvog pravednog halifu (vođu muslimana).'
    ],
    relatedQuizId: 'quiz-poslanici'
  },

  // =============================================================
  // 8. HADŽ I KURBAN
  // =============================================================
  {
    id: 'hadz-propisi',
    categoryId: 'hadz',
    categoryTitle: 'Hadž i Kurban',
    title: 'Propisi i obredi Hadža',
    subtitle: 'Ihram, tavaf, sa\'j i stajanje na Arefatu',
    order: 1,
    readTimeMinutes: 6,
    summary: 'Hadž je peta temeljna islamska dužnost: hodočašće Kabi i svetim mjestima u danima Kurban-bajrama za svakoga ko ima mogućnost.',
    contentSections: [
      {
        title: 'Glavni ruknovi Hadža',
        body: [
          '1. Ihram: Stupanje u posebni obred čistoće i nošenje bijelih nešivenih tkanina (za muškarce) uz nijjet i učenje Telbije: "Lebbejkel-lāhumme lebbejk..."',
          '2. Vukuf na Arefatu: Boravak na brdu Arefat uoči Kurban-bajrama (9. zul-hidždže) kao vrhunac hadža: "Hadž je Arefat!"',
          '3. Tavafuz-zijare: Sedam obilazaka oko Kabe nakon povratka s Arefata i bacanja kamenčića na Mini.',
          '4. Sa\'j: Sedam puta ubrzanog hoda između brežuljaka Safe i Merve u spomen na Hadžeru r.a. i izvor Zemzem.'
        ]
      }
    ],
    keyPoints: [
      'Hadž ujedinjuje milione muslimana svih rasa i jezika u istoj bijeloj odjeći.',
      'Iskreno obavljen hadž briše sve prijašnje grijehe.'
    ],
    relatedQuizId: 'quiz-islam'
  },
  {
    id: 'hadz-kurban',
    categoryId: 'hadz',
    categoryTitle: 'Hadž i Kurban',
    title: 'Kurban i Kurban-bajram',
    subtitle: 'Približavanje Allahu i prinošenje žrtve',
    order: 2,
    readTimeMinutes: 4,
    summary: 'Kurban je žrtvovanje propisane domaće životinje u danima Kurban-bajrama radi približavanja Allahu i pomoći siromašnima.',
    contentSections: [
      {
        title: 'Smisao kurbana',
        body: [
          'Kurban vuče korijene iz spremnosti Ibrahima a.s. da žrtvuje sina Ismaila a.s. radi poslušnosti Allahu.',
          'Do Allaha ne dopire meso ni krv kurbana, već iskrena bogobojaznost (takvaluk) Njegovih robova.',
          'Meso se dijeli na 3 dijela: trećina siromasima, trećina komšijama i prijateljima, a trećina porodici.'
        ]
      }
    ],
    keyPoints: [
      'Kurban simbolizira spremnost na žrtvu za Božije zadovoljstvo.',
      'Podstiče solidarnost i dijeljenje hrane sa onima u oskudici.'
    ],
    relatedQuizId: 'quiz-islam'
  }
];
