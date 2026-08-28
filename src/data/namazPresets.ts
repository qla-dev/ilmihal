export interface NamazPart {
  id: string;
  name: string;
  type: 'sunnet' | 'farz' | 'sun-sunnet' | 'vitr';
  rekats: number;
  description: string;
  hasZamSuraOnAllRekats: boolean; // Sunnet and nafile usually recite Surah on all rek'ats; Farz (3/4) only on 1st & 2nd
  hasKunutDua?: boolean; // For Vitr 3rd rekat
}

export interface NamazStructure {
  id: string;
  name: string;
  bosnianName: string;
  arabicName: string;
  totalRekats: number;
  parts: NamazPart[];
  recommendedDescription: string;
  vakatKey: string;
}

export const DAILY_NAMAZ_PRESETS: NamazStructure[] = [
  {
    id: 'sabah',
    name: 'Sabah (Fajr)',
    bosnianName: 'Sabah-namaz',
    arabicName: 'صَلَاةُ الْفَجْرِ',
    totalRekats: 4,
    vakatKey: 'fajr',
    recommendedDescription: 'Sabah-namaz se sastoji od 2 rek\'ata sunneta i 2 rek\'ata farza.',
    parts: [
      {
        id: 'sabah-sunnet',
        name: 'Sabahski sunnet',
        type: 'sunnet',
        rekats: 2,
        description: 'Pritvrđeni sunnet (sunnet-i muekkede). Uči se Fatiha + sura na oba rek\'ata.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'sabah-farz',
        name: 'Sabahski farz',
        type: 'farz',
        rekats: 2,
        description: 'Stroga obaveza (farz). Uči se Fatiha + sura na oba rek\'ata.',
        hasZamSuraOnAllRekats: true
      }
    ]
  },
  {
    id: 'podne',
    name: 'Podne (Dhuhr)',
    bosnianName: 'Podne-namaz',
    arabicName: 'صَلَاةُ الظُّهْرِ',
    totalRekats: 10,
    vakatKey: 'dhuhr',
    recommendedDescription: 'Podne-namaz ima 10 rek\'ata: 4 prvog sunneta, 4 farza i 2 zadnjeg sunneta.',
    parts: [
      {
        id: 'podne-sunnet-1',
        name: 'Prvi sunnet',
        type: 'sunnet',
        rekats: 4,
        description: '4 rek\'ata sunneta. Na svakom rek\'atu se uči Fatiha + sura. Na prvom sjedenju uči se samo Ettehijjatu.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'podne-farz',
        name: 'Podnevski farz',
        type: 'farz',
        rekats: 4,
        description: '4 rek\'ata farza. Fatiha + sura na 1. i 2. rek\'atu; samo Fatiha na 3. i 4. rek\'atu.',
        hasZamSuraOnAllRekats: false
      },
      {
        id: 'podne-sunnet-2',
        name: 'Zadnji sunnet (Sun-sunnet)',
        type: 'sun-sunnet',
        rekats: 2,
        description: '2 rek\'ata sunneta poslije farza. Fatiha + sura na oba rek\'ata.',
        hasZamSuraOnAllRekats: true
      }
    ]
  },
  {
    id: 'ikindija',
    name: 'Ikindija (Asr)',
    bosnianName: 'Ikindija-namaz',
    arabicName: 'صَلَاةُ الْعَصْرِ',
    totalRekats: 8,
    vakatKey: 'asr',
    recommendedDescription: 'Ikindija-namaz ima 8 rek\'ata: 4 sunneta i 4 farza.',
    parts: [
      {
        id: 'ikindija-sunnet',
        name: 'Ikindijski sunnet',
        type: 'sunnet',
        rekats: 4,
        description: 'Sunnet gajri-muekkede. Na prvom sjedenju uče se i Salavati, a na 3. rek\'atu počinje se sa Subhaneke i Euza/Bismilla.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'ikindija-farz',
        name: 'Ikindijski farz',
        type: 'farz',
        rekats: 4,
        description: '4 rek\'ata farza. Fatiha + sura na 1. i 2. rek\'atu; samo Fatiha na 3. i 4. rek\'atu.',
        hasZamSuraOnAllRekats: false
      }
    ]
  },
  {
    id: 'aksam',
    name: 'Akšam (Maghrib)',
    bosnianName: 'Akšam-namaz',
    arabicName: 'صَلَاةُ الْمَغْرِبِ',
    totalRekats: 5,
    vakatKey: 'maghrib',
    recommendedDescription: 'Akšam-namaz ima 5 rek\'ata: prvo 3 rek\'ata farza, zatim 2 rek\'ata sunneta.',
    parts: [
      {
        id: 'aksam-farz',
        name: 'Akšamski farz',
        type: 'farz',
        rekats: 3,
        description: '3 rek\'ata farza (klanja se prije sunneta). Fatiha + sura na 1. i 2. rek\'atu, samo Fatiha na 3. rek\'atu.',
        hasZamSuraOnAllRekats: false
      },
      {
        id: 'aksam-sunnet',
        name: 'Akšamski sunnet',
        type: 'sunnet',
        rekats: 2,
        description: '2 rek\'ata sunneta poslije farza. Fatiha + sura na oba rek\'ata.',
        hasZamSuraOnAllRekats: true
      }
    ]
  },
  {
    id: 'jacija',
    name: 'Jacija (Isha) & Vitr',
    bosnianName: 'Jacija-namaz i Vitr',
    arabicName: 'صَلَاةُ الْعِشَاءِ وَالْوِتْرِ',
    totalRekats: 13,
    vakatKey: 'isha',
    recommendedDescription: 'Jacija-namaz ima 13 rek\'ata: 4 sunneta, 4 farza, 2 zadnjeg sunneta i 3 vitr-namaza.',
    parts: [
      {
        id: 'jacija-sunnet-1',
        name: 'Prvi sunnet',
        type: 'sunnet',
        rekats: 4,
        description: '4 rek\'ata sunneta (gajri-muekkede). Salavati na prvom sjedenju, Subhaneke na 3. rek\'atu.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'jacija-farz',
        name: 'Jacijski farz',
        type: 'farz',
        rekats: 4,
        description: '4 rek\'ata farza. Fatiha + sura na 1. i 2. rek\'atu; samo Fatiha na 3. i 4. rek\'atu.',
        hasZamSuraOnAllRekats: false
      },
      {
        id: 'jacija-sunnet-2',
        name: 'Zadnji sunnet (Sun-sunnet)',
        type: 'sun-sunnet',
        rekats: 2,
        description: '2 rek\'ata sunneta poslije farza. Fatiha + sura na oba rek\'ata.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'jacija-vitr',
        name: 'Vitr-namaz (Vadžib)',
        type: 'vitr',
        rekats: 3,
        description: '3 rek\'ata vitra. Na 3. rek\'atu nakon Fatihe i sure donosi se tekbir (Allāhu Ekber) i uči Kunut-dova.',
        hasZamSuraOnAllRekats: true,
        hasKunutDua: true
      }
    ]
  },
  {
    id: 'dzuma',
    name: 'Džuma (Petkom)',
    bosnianName: 'Džuma-namaz',
    arabicName: 'صَلَاةُ الْجُمُعَةِ',
    totalRekats: 10,
    vakatKey: 'dhuhr',
    recommendedDescription: 'Džuma-namaz petkom: 4 rek\'ata prvog sunneta, Hutba, 2 rek\'ata farza u džematu i 4 rek\'ata zadnjeg sunneta.',
    parts: [
      {
        id: 'dzuma-sunnet-1',
        name: 'Prvi džumanski sunnet',
        type: 'sunnet',
        rekats: 4,
        description: '4 rek\'ata sunneta prije hutbe.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'dzuma-farz',
        name: 'Džumanski farz',
        type: 'farz',
        rekats: 2,
        description: '2 rek\'ata farza u džematu za imamom.',
        hasZamSuraOnAllRekats: true
      },
      {
        id: 'dzuma-sunnet-2',
        name: 'Zadnji džumanski sunnet',
        type: 'sun-sunnet',
        rekats: 4,
        description: '4 rek\'ata sunneta poslije farza.',
        hasZamSuraOnAllRekats: true
      }
    ]
  }
];
