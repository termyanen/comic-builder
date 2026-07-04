/**
 * Central sprite registry — single entry point for all sprite lookups.
 * To add a new character/background/prop:
 * 1. Create a file in the appropriate directory
 * 2. Register it in that directory's index
 * That's it — no core rendering changes needed.
 */

export { getCharacter, getAllCharacters } from './characters';
export { getBackground, getAllBackgrounds } from './backgrounds';
export { getProp, getAllProps } from './props';
export { getFx, getAllFx } from './fx';

import type { CharacterId, MoodDef, MoodId, Outfit, PoseDef } from '../types/comic';
import type { ComicStrip } from '../types/comic';
import { getCharacter } from './characters';

/** Character's default outfit merged with the strip's per-character overrides */
export function resolveOutfit(strip: ComicStrip, charId: CharacterId): Outfit {
  const def = getCharacter(charId)?.defaultOutfit;
  const base: Outfit = def ?? { shirt: '#888', pants: '#555', skin: '#fff', accent: '#f2a03d' };
  return { ...base, ...strip.outfits[charId] };
}

const poses: PoseDef[] = [
  { id: 'stand', name: 'Standing', nameRu: 'Стоит' },
  { id: 'walk', name: 'Walking', nameRu: 'Идёт' },
  { id: 'sit', name: 'Sitting', nameRu: 'Сидит' },
  { id: 'typing', name: 'Typing', nameRu: 'Печатает' },
  { id: 'swing', name: 'Swing', nameRu: 'Замах' },
  { id: 'point', name: 'Pointing', nameRu: 'Указывает' },
  { id: 'facepalm', name: 'Facepalm', nameRu: 'Фейспалм' },
  { id: 'celebrate', name: 'Celebrating', nameRu: 'Радуется' },
  { id: 'shrug', name: 'Shrug', nameRu: 'Пожимает плечами' },
];

export function getAllPoses(): PoseDef[] {
  return poses;
}

const moods: MoodDef[] = [
  { id: 'happy', name: 'Happy', nameRu: 'Счастливый' },
  { id: 'laugh', name: 'Laughing', nameRu: 'Смеётся' },
  { id: 'neutral', name: 'Neutral', nameRu: 'Нейтральный' },
  { id: 'angry', name: 'Angry', nameRu: 'Злой' },
  { id: 'surprised', name: 'Surprised', nameRu: 'Удивлён' },
  { id: 'sad', name: 'Sad', nameRu: 'Грустный' },
  { id: 'smug', name: 'Smug', nameRu: 'Самодовольный' },
  { id: 'dead', name: 'Dead / broken', nameRu: 'Сломан / X_X' },
];

export function getAllMoods(): MoodDef[] {
  return moods;
}

export function getMood(id: MoodId): MoodDef | undefined {
  return moods.find(m => m.id === id);
}
