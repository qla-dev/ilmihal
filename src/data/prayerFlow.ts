import { SURAHS_AND_DUAS } from './surahsAndDuas';
import { NamazPart, NamazStructure } from './namazPresets';

export const PRAYER_TIMING = {
  normalTransitionMs: 1000,
  movementTransitionMs: 3000,
  sectionTransitionMs: 15000,
  estimatedSpeechWordsPerMinute: 145,
  minimumSpeechMs: 1800,
} as const;

export type PrayerAudioOrigin = 'prayer' | 'quran' | 'dua' | 'tts';
export type PrayerActionKind = 'action' | 'section-transition';

export interface PrayerRecitationRef {
  sourceType: 'catalog' | 'inline';
  sourceId?: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  repeat?: number;
}

export interface PrayerAction {
  id: string;
  kind: PrayerActionKind;
  partIndex: number;
  partId: string;
  partName: string;
  partType: NamazPart['type'];
  rekat: number;
  title: string;
  subtitle: string;
  instruction: string;
  movementDelayMs: number;
  transitionDelayMs: number;
  recitations: PrayerRecitationRef[];
  optional: boolean;
}

export interface ResolvedPrayerRecitation {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  audioUrls: string[];
  origin: PrayerAudioOrigin;
}

const catalog = new Map(SURAHS_AND_DUAS.map(item => [item.id, item]));
const catalogRef = (sourceId: string, repeat = 1): PrayerRecitationRef => ({ sourceType: 'catalog', sourceId, repeat });
const inlineRef = (
  arabicText: string,
  transliteration: string,
  translation: string,
  repeat = 1,
): PrayerRecitationRef => ({ sourceType: 'inline', arabicText, transliteration, translation, repeat });

const EUZA = inlineRef(
  'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
  'Eūzu billāhi mineš-šejtānir-radžīm.',
  'Utječem se Allahu od prokletog šejtana.',
);
const RUKU = inlineRef('سُبْحَانَ رَبِّيَ الْعَظِيمِ', 'Subhāne Rabbijel-azīm.', 'Slavljen neka je moj Gospodar Veličanstveni.', 3);
const RISE = inlineRef('سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا لَكَ الْحَمْدُ', 'Semiʿallāhu limen hamideh. Rabbenā lekel-hamd.', 'Allah čuje onoga ko Ga hvali. Gospodaru naš, Tebi pripada hvala.');
const SUJUD = inlineRef('سُبْحَانَ رَبِّيَ الْأَعْلَى', 'Subhāne Rabbijel-eʿalā.', 'Slavljen neka je moj Gospodar Svevišnji.', 3);
const BETWEEN_SUJUD = inlineRef('رَبِّ اغْفِرْ لِي', 'Rabbigfir lī.', 'Gospodaru moj, oprosti mi.');
const TAKBIR = inlineRef('اللَّهُ أَكْبَرُ', 'Allāhu ekber.', 'Allah je najveći.');
const SALAM = inlineRef('السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', 'Es-selāmu alejkum ve rahmetullāh.', 'Neka su na vas mir i Allahova milost.', 2);

const isOptionalPart = (part: NamazPart) => part.type !== 'farz';

function action(
  part: NamazPart,
  partIndex: number,
  rekat: number,
  id: string,
  title: string,
  subtitle: string,
  instruction: string,
  recitations: PrayerRecitationRef[],
  movement = false,
): PrayerAction {
  return {
    id: `${part.id}-${rekat}-${id}`,
    kind: 'action',
    partIndex,
    partId: part.id,
    partName: part.name,
    partType: part.type,
    rekat,
    title,
    subtitle,
    instruction,
    movementDelayMs: movement ? PRAYER_TIMING.movementTransitionMs : 0,
    transitionDelayMs: PRAYER_TIMING.normalTransitionMs,
    recitations,
    optional: isOptionalPart(part),
  };
}

function buildPartActions(preset: NamazStructure, part: NamazPart, partIndex: number): PrayerAction[] {
  const actions: PrayerAction[] = [];
  const isGajriMuekkede = (preset.id === 'ikindija' || preset.id === 'jacija')
    && part.type === 'sunnet'
    && part.rekats === 4;

  for (let rekat = 1; rekat <= part.rekats; rekat += 1) {
    if (rekat === 1 || (isGajriMuekkede && rekat === 3)) {
      actions.push(action(
        part,
        partIndex,
        rekat,
        rekat === 1 ? 'opening' : 'renewed-opening',
        rekat === 1 ? 'Nijjet, početni tekbir i Subhaneke' : 'Početak trećeg rekata i Subhaneke',
        `${rekat}. rek'at · Kijam`,
        rekat === 1
          ? `Stani prema Kibli, zanijeti ${part.name} u srcu, podigni ruke i izgovori Allāhu ekber. Zatim sveži ruke.`
          : 'Ustani na treći rekat, izgovori Allāhu ekber, sveži ruke i prouči Subhaneke.',
        [catalogRef('subhaneke')],
        true,
      ));
    }

    const hasAdditionalSurah = part.hasZamSuraOnAllRekats || rekat <= 2;
    const startsWithEuza = rekat === 1 || (isGajriMuekkede && rekat === 3);
    actions.push(action(
      part,
      partIndex,
      rekat,
      'qiyam',
      hasAdditionalSurah ? 'Fatiha i kratka sura' : 'Fatiha',
      `${rekat}. rek'at · Kijam`,
      rekat === 1
        ? 'Ostani mirno na kijamu. Prouči Eūzu, Fatihu, a zatim kratku suru.'
        : rekat === 3 && isGajriMuekkede
          ? 'Nakon Subhaneke prouči Eūzu, Fatihu i kratku suru.'
          : hasAdditionalSurah
            ? 'Na kijamu prouči Bismillu, Fatihu i kratku suru.'
            : 'Na kijamu prouči Bismillu i Fatihu bez dodatne sure.',
      [
        ...(startsWithEuza ? [EUZA] : []),
        catalogRef('fatiha'),
        ...(hasAdditionalSurah ? [catalogRef('ihlas')] : []),
      ],
      rekat > 1 && !(isGajriMuekkede && rekat === 3),
    ));

    if (part.type === 'vitr' && rekat === 3) {
      actions.push(action(
        part,
        partIndex,
        rekat,
        'qunut',
        'Vitr tekbir i Kunut-dova',
        "3. rek'at · Vadžib",
        'Podigni ruke, izgovori Allāhu ekber, ponovo sveži ruke i prouči Kunut-dovu.',
        [TAKBIR, catalogRef('kunut-dova')],
        true,
      ));
    }

    actions.push(action(part, partIndex, rekat, 'ruku', 'Rukū', `${rekat}. rek'at · Pregibanje`, 'Izgovori Allāhu ekber i idi na rukū. Smiri se u položaju.', [RUKU], true));
    actions.push(action(part, partIndex, rekat, 'rise', 'Povratak sa rukūa', `${rekat}. rek'at · Stajanje`, 'Vrati se uspravno u stojeći položaj.', [RISE], true));
    actions.push(action(part, partIndex, rekat, 'sujud-1', 'Prva sedžda', `${rekat}. rek'at · Sedžda`, 'Izgovori Allāhu ekber i spusti se na prvu sedždu.', [SUJUD], true));
    actions.push(action(part, partIndex, rekat, 'between-sujud', 'Sjedenje između sedždi', `${rekat}. rek'at · Sjedenje`, 'Izgovori Allāhu ekber i sjedni između dvije sedžde.', [BETWEEN_SUJUD], true));
    actions.push(action(part, partIndex, rekat, 'sujud-2', 'Druga sedžda', `${rekat}. rek'at · Sedžda`, 'Izgovori Allāhu ekber i učini drugu sedždu.', [SUJUD], true));

    const isLast = rekat === part.rekats;
    const isFirstSitting = rekat === 2 && part.rekats > 2;
    if (isFirstSitting) {
      actions.push(action(
        part,
        partIndex,
        rekat,
        'first-sitting',
        'Prvo sjedenje',
        `${rekat}. rek'at · Ka'de`,
        isGajriMuekkede
          ? 'Sjedni i prouči Ettehijjatu i Salavate. Potom ustani na treći rekat.'
          : 'Sjedni i prouči Ettehijjatu. Potom ustani na treći rekat.',
        [catalogRef('ettehijjatu'), ...(isGajriMuekkede ? [catalogRef('salavati')] : [])],
        true,
      ));
    } else if (isLast) {
      actions.push(action(
        part,
        partIndex,
        rekat,
        'final-sitting',
        'Završno sjedenje',
        `${rekat}. rek'at · Ka'de`,
        'Sjedni i prouči Ettehijjatu, Salavate i završnu dovu.',
        [catalogRef('ettehijjatu'), catalogRef('salavati'), catalogRef('rabbena-atina')],
        true,
      ));
      actions.push(action(
        part,
        partIndex,
        rekat,
        'salam',
        'Predaja selama',
        `${rekat}. rek'at · Završetak`,
        'Okreni glavu prvo na desnu, a zatim na lijevu stranu i predaj selam.',
        [SALAM],
        true,
      ));
    }
  }

  return actions;
}

/** Keeps post-salah zikr tied to the existing adhkar catalogue. */
function buildPostSalahZikrActions(lastPart: NamazPart, partIndex: number): PrayerAction[] {
  const zikrPart: NamazPart = {
    ...lastPart,
    id: `${lastPart.id}-post-salah-zikr`,
    name: 'Zikr poslije namaza',
  };
  const zikrAction = (id: string, title: string, instruction: string, recitations: PrayerRecitationRef[]) => ({
    ...action(zikrPart, partIndex, 0, id, title, 'Nakon selama', instruction, recitations),
    optional: true,
  });

  return [
    zikrAction('post-salah-istigfar', 'Istigfar poslije namaza', 'Nakon selama prouči Estagfirullah tri puta.', [catalogRef('poslije-namaza-istigfar', 3)]),
    zikrAction('post-salah-selam', 'Dova mira poslije namaza', 'Ostani sjediti i prouči dovu: Allāhumme entes-selām.', [catalogRef('poslije-namaza-entes-selam')]),
    zikrAction('post-salah-tesbih', 'Tesbih poslije namaza', 'Prouči Subhānallāh 33 puta, El-hamdulillāh 33 puta i Allāhu ekber 33 puta. Za brojanje možeš koristiti digitalni tesbih nakon vodiča.', [catalogRef('zikr-tesbih')]),
    zikrAction('post-salah-tehlil', 'Završni tehlil', 'Završi zikr tehlilom.', [catalogRef('poslije-namaza-tehlil')]),
    zikrAction('post-salah-dua', 'Dova nakon zikra', 'Nakon tehlila prouči završnu dovu poslije zikra.', [catalogRef('poslije-zikra-rabbidzalni')]),
  ];
}

export function buildPrayerFlow(preset: NamazStructure): PrayerAction[] {
  const prayerActions = preset.parts.flatMap((part, partIndex) => {
    const partActions = buildPartActions(preset, part, partIndex);
    if (partIndex === preset.parts.length - 1) return partActions;
    const nextPart = preset.parts[partIndex + 1];
    return [
      ...partActions,
      {
        id: `${part.id}-to-${nextPart.id}`,
        kind: 'section-transition' as const,
        partIndex,
        partId: part.id,
        partName: part.name,
        partType: part.type,
        rekat: part.rekats,
        title: `Prijelaz na ${nextPart.name}`,
        subtitle: 'Priprema za sljedeći dio namaza',
        instruction: `${part.name} je završen. Odmori se i pripremi za ${nextPart.name}. Vodič će automatski nastaviti.`,
        movementDelayMs: PRAYER_TIMING.sectionTransitionMs,
        transitionDelayMs: 0,
        recitations: [],
        optional: isOptionalPart(part),
      },
    ];
  });
  const lastPart = preset.parts[preset.parts.length - 1];
  return lastPart
    ? [...prayerActions, ...buildPostSalahZikrActions(lastPart, preset.parts.length - 1)]
    : prayerActions;
}

export function resolvePrayerRecitation(ref: PrayerRecitationRef): ResolvedPrayerRecitation {
  const item = ref.sourceType === 'catalog' && ref.sourceId ? catalog.get(ref.sourceId) : undefined;
  const repeat = Math.max(1, ref.repeat ?? 1);
  const repeatArabic = (text = '') => Array.from({ length: repeat }, () => text).filter(Boolean).join('، ');
  const audioUrls = item?.audioUrls ?? (item?.audioUrl ? [item.audioUrl] : []);
  const origin: PrayerAudioOrigin = audioUrls.length
    ? item?.category === 'kratka-sura' ? 'quran' : item?.category === 'namaska-dova' ? 'prayer' : 'dua'
    : 'tts';
  return {
    id: item?.id ?? `inline-${ref.arabicText?.slice(0, 12) ?? 'recitation'}`,
    // Catalogue entries may already communicate repetition in their label
    // (for example “Estagfirullāh. (3x)”). Repeat the Arabic TTS source, but
    // show that Bosnian transliteration only once.
    arabic: repeatArabic(item?.arabic ?? ref.arabicText),
    transliteration: item?.transliteration ?? ref.transliteration ?? '',
    translation: item?.translation ?? ref.translation ?? '',
    audioUrls,
    origin,
  };
}

export function resolvePrayerActionContent(actionItem: PrayerAction) {
  const resolved = actionItem.recitations.map(resolvePrayerRecitation);
  return {
    recitations: resolved,
    arabic: resolved.map(item => item.arabic).filter(Boolean).join('\n\n'),
    transliteration: resolved.map(item => item.transliteration).filter(Boolean).join('\n\n'),
    translation: resolved.map(item => item.translation).filter(Boolean).join('\n\n'),
    hasRealAudio: resolved.some(item => item.audioUrls.length > 0),
  };
}

export function firstActionIndexForPart(flow: PrayerAction[], partIndex: number) {
  return flow.findIndex(item => item.kind === 'action' && item.partIndex === partIndex);
}

export function firstFardIndex(flow: PrayerAction[]) {
  return flow.findIndex(item => item.kind === 'action' && item.partType === 'farz');
}

export function estimatedSpeechDurationMs(text: string, language: 'ar' | 'bs' = 'ar') {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const rate = language === 'ar' ? 120 : PRAYER_TIMING.estimatedSpeechWordsPerMinute;
  return Math.max(PRAYER_TIMING.minimumSpeechMs, Math.ceil((wordCount / rate) * 60_000));
}
