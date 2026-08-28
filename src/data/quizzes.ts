import { QuizCategory } from '../types';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'quiz-all',
    title: 'Sveobuhvatni Ilmihal Kviz',
    description: 'Testiraj cjelokupno znanje iz svih oblasti: Vjerovanje, Namaz, Post, Zekat i Poslanik a.s.',
    difficulty: 'medium',
    badgeColor: 'emerald',
    questions: [
      {
        id: 'q-all-1',
        question: 'Koliko ima imanskih, a koliko islamskih šarta?',
        options: [
          '5 imanskih i 6 islamskih',
          '6 imanskih i 5 islamskih',
          '6 imanskih i 6 islamskih',
          '5 imanskih i 5 islamskih'
        ],
        correctIndex: 1,
        explanation: 'Imanskih šarta (stubova vjerovanja) ima 6 (Amentu billahi), a islamskih šarta (praktičnih dužnosti) ima 5.',
        referenceLessonId: 'imanski-sarti-amentu',
        difficulty: 'easy',
        category: 'Opće'
      },
      {
        id: 'q-all-2',
        question: 'Koji melek je zadužen za dostavljanje Božije objave poslanicima?',
        options: ['Mikail', 'Azrail', 'Džibril', 'Israfil'],
        correctIndex: 2,
        explanation: 'Džibril (Gabriel) a.s. je melek objave koji je prenosio Kur\'an i Božije poruke poslanicima.',
        referenceLessonId: 'imanski-sarti-amentu',
        difficulty: 'easy',
        category: 'Iman'
      },
      {
        id: 'q-all-3',
        question: 'Koliko ima strogih dužnosti (farzova) prilikom uzimanja abdesta?',
        options: ['3 farza', '4 farza', '6 farzova', '8 farzova'],
        correctIndex: 1,
        explanation: 'Abdest ima 4 farza: pranje lica, pranje ruku do iza lakata, potiranje 1/4 glave i pranje nogu do iza članaka.',
        referenceLessonId: 'namaz-uvjeti',
        difficulty: 'easy',
        category: 'Namaz'
      },
      {
        id: 'q-all-4',
        question: 'Koji namaz se klanja samo petkom u džematu i zamjenjuje podne namaz?',
        options: ['Bajram namaz', 'Džuma namaz', 'Vitr namaz', 'Tehedždžud namaz'],
        correctIndex: 1,
        explanation: 'Džuma namaz je stroga obaveza (farz) za odrasle muškarce petkom i zamjenjuje podne namaz.',
        referenceLessonId: 'namaz-dzuma',
        difficulty: 'easy',
        category: 'Namaz'
      },
      {
        id: 'q-all-5',
        question: 'Koliki procenat se izdvaja na novac i zlato u ime Zekata iznad nisaba?',
        options: ['1%', '2.5% (četrdeseti dio)', '5%', '10%'],
        correctIndex: 1,
        explanation: 'Na zlato, srebro, novac i trgovačku robu koja pregodini iznad nisaba daje se 2.5% (1/40).',
        referenceLessonId: 'zekat-vrste-imovine',
        difficulty: 'easy',
        category: 'Zekat'
      }
    ]
  },
  {
    id: 'quiz-iman',
    title: 'Kviz: Šest Temelja Vjerovanja',
    description: 'Provjeri svoje poznavanje šest stubova imana, Allahovih svojstava, meleka i poslanika.',
    difficulty: 'easy',
    badgeColor: 'cyan',
    questions: [
      {
        id: 'q-im-1',
        question: 'Koje Allahovo svojstvo (Sifat) znači da je Allah Jedan i da nema sudruga?',
        options: ['Vudžud', 'Vahdanijjet', 'Kidem', 'Beka'],
        correctIndex: 1,
        explanation: 'Vahdanijjet znači Božija jednoća (Tevhid). Vudžud znači postojanje, a Kidem znači bezpočetnost.',
        referenceLessonId: 'iman-allah-tevhid',
        difficulty: 'medium',
        category: 'Iman'
      },
      {
        id: 'q-im-2',
        question: 'Koja su 4 velika Božija kitaba (knjige)?',
        options: [
          'Tevrat, Zebur, Indžil i Kur\'an',
          'Suhufi, Hadis, Fikh i Tefsir',
          'Tevrat, Mi\'radž, Bedr i Uhud',
          'Kur\'an, Ezan, Ikamet i Do\'va'
        ],
        correctIndex: 0,
        explanation: 'Četiri velika kitaba su Tevrat (Musa a.s.), Zebur (Davud a.s.), Indžil (Isa a.s.) i Kur\'an (Muhammed a.s.).',
        referenceLessonId: 'imanski-sarti-amentu',
        difficulty: 'easy',
        category: 'Iman'
      },
      {
        id: 'q-im-3',
        question: 'Šta označava vjerovanje u "Kader"?',
        options: [
          'Vjerovanje u meleke pisare',
          'Vjerovanje u Božije određenje da sve biva sa Njegovim znanjem i voljom',
          'Posebnu dovu u namazu',
          'Naziv za dženetsku rijeku'
        ],
        correctIndex: 1,
        explanation: 'Kader je 6. imanski šart – vjerovanje da se sve u kosmosu događa s Božijim sveznanjem, mudrošću i određenjem.',
        referenceLessonId: 'imanski-sarti-amentu',
        difficulty: 'easy',
        category: 'Iman'
      }
    ]
  },
  {
    id: 'quiz-islam',
    title: 'Kviz: Pet Islamskih Dužnosti',
    description: 'Pitanja o Kelime-i Šehadetu, namazu, postu, zekatu i hadžu.',
    difficulty: 'easy',
    badgeColor: 'teal',
    questions: [
      {
        id: 'q-is-1',
        question: 'Šta predstavlja Kelime-i Šehadet?',
        options: [
          'Svjedočenje da nema boga osim Allaha i da je Muhammed Božiji poslanik',
          'Propis o uzimanju abdesta',
          'Dova koja se uči na sedždi',
          'Naziv za post u ševvalu'
        ],
        correctIndex: 0,
        explanation: 'Kelime-i Šehadet je prvo i temeljno očitovanje pripadnosti islamu.',
        referenceLessonId: 'islamski-sarti-pregled',
        difficulty: 'easy',
        category: 'Islam'
      },
      {
        id: 'q-is-2',
        question: 'Koji je treći islamski šart?',
        options: ['Zekat', 'Post mjeseca Ramazana', 'Hadždž', 'Namaz'],
        correctIndex: 1,
        explanation: 'Treći islamski šart je postiti cijeli mubarek mjesec Ramazan.',
        referenceLessonId: 'islamski-sarti-pregled',
        difficulty: 'easy',
        category: 'Islam'
      }
    ]
  },
  {
    id: 'quiz-namaz',
    title: 'Kviz: Namaz, Rek\'ati & Propisi',
    description: 'Koliko dobro poznaješ pet dnevnih namaza, ruknove, dženazu, džumu i nafile?',
    difficulty: 'medium',
    badgeColor: 'indigo',
    questions: [
      {
        id: 'q-nam-1',
        question: 'Koliko ukupno rek\'ata ima Sabah namaz?',
        options: ['2 rek\'ata', '4 rek\'ata (2 sunneta + 2 farza)', '6 rek\'ata', '5 rek\'ata'],
        correctIndex: 1,
        explanation: 'Sabah namaz se sastoji od 2 rek\'ata sunneta i 2 rek\'ata farza.',
        referenceLessonId: 'namaz-dnevni',
        difficulty: 'easy',
        category: 'Namaz'
      },
      {
        id: 'q-nam-2',
        question: 'Koliko ukupno rek\'ata ima Podne namaz?',
        options: ['4 rek\'ata', '8 rek\'ata', '10 rek\'ata (4 sunneta + 4 farza + 2 sun-sunneta)', '12 rek\'ata'],
        correctIndex: 2,
        explanation: 'Podne namaz ima ukupno 10 rek\'ata (4 prvog sunneta, 4 farza i 2 zadnjeg sunneta).',
        referenceLessonId: 'namaz-dnevni',
        difficulty: 'easy',
        category: 'Namaz'
      },
      {
        id: 'q-nam-3',
        question: 'Šta se uči na sedždi u namazu 3 puta?',
        options: [
          'Subhāne Rabbijel-\'Azīm',
          'Subhāne Rabbijel-A\'lā',
          'Semi\'allāhu li men hamideh',
          'Rabbena lekel-hamd'
        ],
        correctIndex: 1,
        explanation: 'Na sedždi se uči "Subhāne Rabbijel-A\'lā" (Slavljen neka je moj Gospodar Svevišnji).',
        referenceLessonId: 'namaz-kako-se-klanja',
        difficulty: 'easy',
        category: 'Namaz'
      },
      {
        id: 'q-nam-4',
        question: 'Šta se čini ako klanjač zaboravi proučiti Fatihu ili prvo sjedenje u namazu?',
        options: [
          'Namaz je odmah pokvaren i mora se ponoviti iz početka',
          'Čini se Sehvi-sedžda na kraju namaza',
          'Daje se sadaka',
          'Uči se dodatna sura'
        ],
        correctIndex: 1,
        explanation: 'Izostavljanje vadžiba iz zaborava ispravlja se činjenjem Sehvi-sedžde na zadnjem sjedenju.',
        referenceLessonId: 'namaz-propisi',
        difficulty: 'medium',
        category: 'Namaz'
      },
      {
        id: 'q-nam-5',
        question: 'Koliko tekbira ima Dženaza namaz i da li ima ruku\'a i sedžde?',
        options: [
          '2 tekbira, ima ruku\' i sedždu',
          '4 tekbira, NEMA ruku\'a ni sedžde (klanja se isključivo stojeći)',
          '6 tekbira sa jednom sedždom',
          '3 tekbira'
        ],
        correctIndex: 1,
        explanation: 'Dženaza namaz se klanja stojeći sa 4 tekbira za imamom.',
        referenceLessonId: 'namaz-dzenaza',
        difficulty: 'easy',
        category: 'Namaz'
      }
    ]
  },
  {
    id: 'quiz-post',
    title: 'Kviz: Ramazanski Post & Sadekatul-fitr',
    description: 'Pitanja o propisima posta, sehuru, iftaru, šta kvari post i vitrama.',
    difficulty: 'easy',
    badgeColor: 'amber',
    questions: [
      {
        id: 'q-po-1',
        question: 'Šta se dešava ako osoba koja posti iz zaborava pojede ili popije nešto?',
        options: [
          'Post je pokvaren i mora napostiti taj dan',
          'Post NIJE pokvaren; čim se sjeti treba prestati i nastaviti postiti',
          'Mora platiti keffaret',
          'Mora odmah uzeti abdest'
        ],
        correctIndex: 1,
        explanation: 'Hrana ili piće iz zaborava ne kvari post jer se to smatra Allahovom čašću prema postaču.',
        referenceLessonId: 'post-propisi',
        difficulty: 'easy',
        category: 'Post'
      },
      {
        id: 'q-po-2',
        question: 'Kada se najkasnije mora dati Sadekatul-fitr (vitre)?',
        options: [
          'Prije klanjanja Bajram-namaza',
          'Do kraja mjeseca ševvala',
          'Prije 27. noći ramazana',
          'Na dan Arefata'
        ],
        correctIndex: 0,
        explanation: 'Sadekatul-fitr se mora dati prije klanjanja bajram-namaza kako bi siromašni mogli dočekati bajram u radosti.',
        referenceLessonId: 'post-sadekatul-fitr',
        difficulty: 'easy',
        category: 'Post'
      }
    ]
  },
  {
    id: 'quiz-zekat',
    title: 'Kviz: Zekat, Nisab & Imovina',
    description: 'Provjeri znanje o propisima zekata, nisabu i kategorijama primalaca.',
    difficulty: 'medium',
    badgeColor: 'emerald',
    questions: [
      {
        id: 'q-ze-1',
        question: 'Šta je to "Nisab"?',
        options: [
          'Posebna posuda za dijeljenje sadake',
          'Zakonom propisana minimalna količina imovine koja podliježe davanju zekata',
          'Dan u godini kada se posti',
          'Mjesto gdje se obavlja hadždž'
        ],
        correctIndex: 1,
        explanation: 'Nisab je granični iznos imovine iznad koga nastaje dužnost izdvajanja zekata ako pregodini.',
        referenceLessonId: 'zekat-kako-se-daje',
        difficulty: 'easy',
        category: 'Zekat'
      },
      {
        id: 'q-ze-2',
        question: 'Prema Kur\'anu, na koliko kategorija primalaca se raspodjeljuje zekat?',
        options: ['3 kategorije', '5 kategorija', '8 kategorija', '12 kategorija'],
        correctIndex: 2,
        explanation: 'U suri Et-Tevbe (60. ajet) navedeno je tačno 8 kategorija primalaca zekata.',
        referenceLessonId: 'zekat-kako-se-daje',
        difficulty: 'medium',
        category: 'Zekat'
      }
    ]
  },
  {
    id: 'quiz-poslanik',
    title: 'Kviz: Poslanik Muhammed a.s.',
    description: 'Pitanja o rođenju, objavi u pećini Hira, Hidžri, bitkama i Oproštajnom hadžu.',
    difficulty: 'easy',
    badgeColor: 'rose',
    questions: [
      {
        id: 'q-pos-1',
        question: 'Koji nadimak su stanovnici Mekke dali Muhammedu a.s. zbog njegovog poštenja još prije poslanstva?',
        options: ['El-Fatih', 'El-Emin (Povjerljivi)', 'Es-Siddik', 'El-Faruk'],
        correctIndex: 1,
        explanation: 'Zbog izuzetnog poštenja i istinoljubivosti nazvan je "El-Emin" (Povjerljivi).',
        referenceLessonId: 'poslanik-prije-poslanstva',
        difficulty: 'easy',
        category: 'Poslanik'
      },
      {
        id: 'q-pos-2',
        question: 'Koja je bila prva riječ objavljena Muhammedu a.s. u pećini Hira?',
        options: ['Selam', 'Ikre! (Čitaj / Uči!)', 'Bismillah', 'Kijam'],
        correctIndex: 1,
        explanation: 'Prva riječ Božije objave bila je "Ikre!" (Čitaj, u ime Gospodara tvoga Koji stvara!).',
        referenceLessonId: 'poslanik-vrijeme-poslanstva',
        difficulty: 'easy',
        category: 'Poslanik'
      },
      {
        id: 'q-pos-3',
        question: 'Koji događaj označava početak islamskog računanja vremena?',
        options: [
          'Rođenje Muhammeda a.s.',
          'Bitka na Bedru',
          'Hidžra – preseljenje muslimana iz Mekke u Medinu 622. godine',
          'Oslobođenje Mekke'
        ],
        correctIndex: 2,
        explanation: 'Hidžra 622. godine uzeta je za početak hidžretskog kalendara u vrijeme halife Omera r.a.',
        referenceLessonId: 'poslanik-poslije-hidzre',
        difficulty: 'easy',
        category: 'Poslanik'
      }
    ]
  }
];
