import { SurahOrDua } from '../types';
import { ASERETA_SELECTIONS } from './quranSelections';

const selectedIds = new Set(['asereta-araf', 'asereta-jonus', 'asereta-hud', 'asereta-jusuf', 'asereta-ibrahim', 'asereta-isra', 'asereta-kehf', 'asereta-enbija', 'asereta-muminun', 'asereta-furkan', 'asereta-hasr-vjernici']);

const selectedDuas = ASERETA_SELECTIONS.filter(item => selectedIds.has(item.id)).map((item, index) => ({ ...item, id: `kuranska-${item.id}`, category: 'kuranske-dove' as const, order: index + 1 }));

export const QURAN_DUAS: SurahOrDua[] = [
  ...selectedDuas,
  { id: 'kuranska-rabbena-atina', title: 'Rabbena atina', subtitle: 'El-Bekare, 201', category: 'kuranske-dove', order: 12, arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', transliteration: 'Rabbenā ātinā fid-dunjā haseneten ve fil-āhireti haseneten ve kinā azāben-nār.', translation: 'Gospodaru naš, podaj nam dobro na ovom svijetu i dobro na onom svijetu, i sačuvaj nas patnje u ognju.' },
  { id: 'kuranska-rabbena-sabur', title: 'Dova za strpljenje', subtitle: 'El-Bekare, 250', category: 'kuranske-dove', order: 13, arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', transliteration: 'Rabbenā efrig alejnā sabren ve sebbit akdāmenā vensurnā alel-kavmil-kāfirīn.', translation: 'Gospodaru naš, nadahni nas izdržljivošću, učvrsti korake naše i pomozi nas protiv naroda nevjerničkog.' },
  { id: 'kuranska-rabbena-srca', title: 'Dova za postojanost srca', subtitle: 'Ali Imran, 8', category: 'kuranske-dove', order: 14, arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ', transliteration: "Rabbenā lā tuzig kulūbenā ba'de iz hedejtenā ve heb lenā min ledunke rahmeh. Inneke entel-vehhāb.", translation: 'Gospodaru naš, ne dopusti da srca naša skrenu nakon što si nas uputio i podari nam milost od Sebe; Ti si Onaj Koji mnogo daruje.' },
  { id: 'kuranska-rabbena-oprosti', title: 'Dova za oprost i milost', subtitle: "El-Mu'minun, 109", category: 'kuranske-dove', order: 15, arabic: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ', transliteration: 'Rabbenā āmennā fagfir lenā verhamnā ve ente hajrur-rāhimīn.', translation: 'Gospodaru naš, mi vjerujemo, pa nam oprosti i smiluj nam se; Ti si od milostivih najmilostiviji.' }
];
