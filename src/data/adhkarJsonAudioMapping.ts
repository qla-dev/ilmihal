/**
 * Audio from rn0x/Adhkar-json. Files remain hosted by the source repository;
 * they are not bundled in this application.
 */
const AUDIO_BASE_URL = 'https://raw.githubusercontent.com/rn0x/Adhkar-json/main/audio';

type DatasetEntry = { order: number; type: 0 | 1 | 2; filename: string };

const entries: DatasetEntry[] = [
  { order: 2, type: 0, filename: '75' },
  { order: 3, type: 2, filename: '101' },
  { order: 4, type: 0, filename: '76' },
  { order: 7, type: 1, filename: '77' },
  { order: 8, type: 2, filename: '77' },
  { order: 9, type: 1, filename: '78' },
  { order: 10, type: 2, filename: '78' },
  { order: 11, type: 0, filename: '79' },
  { order: 12, type: 1, filename: '80' },
  { order: 13, type: 2, filename: '80' },
  { order: 14, type: 1, filename: '81' },
  { order: 15, type: 2, filename: '81' },
  { order: 16, type: 0, filename: '82' },
  { order: 17, type: 0, filename: '83' },
  { order: 18, type: 0, filename: '84' },
  { order: 19, type: 0, filename: '85' },
  { order: 20, type: 0, filename: '86' },
  { order: 21, type: 0, filename: '87' },
  { order: 22, type: 0, filename: '88' },
  { order: 23, type: 1, filename: '89' },
  { order: 24, type: 2, filename: '89' },
  { order: 25, type: 1, filename: '90' },
  { order: 26, type: 2, filename: '90' },
  { order: 27, type: 1, filename: '95' },
  { order: 28, type: 0, filename: '92' },
  { order: 29, type: 0, filename: '98' },
  { order: 30, type: 2, filename: '97' },
  { order: 31, type: 1, filename: '94' },
  { order: 32, type: 1, filename: '93' },
  { order: 33, type: 1, filename: '96' },
  { order: 34, type: 0, filename: '91' }
];

export const ADHKAR_JSON_AUDIO_BY_DATASET_ENTRY = new Map(
  entries.map(entry => [
    `${entry.order}-${entry.type}`,
    `${AUDIO_BASE_URL}/${entry.filename}.mp3`
  ])
);
