/**
 * Central sprite registry — single entry point for all sprite lookups.
 * To add a new character/background/prop:
 * 1. Create a file in the appropriate directory
 * 2. Register it in that directory's index.ts
 * That's it — no core rendering changes needed.
 */

export { getCharacter, getAllCharacters } from './characters';
export { getBackground, getAllBackgrounds } from './backgrounds';
export { getProp, getAllProps } from './props';
export { C } from './palette';

export type { CharacterDef, BackgroundDef, PropDef } from '../types/comic';

import type { MoodDef, MoodId } from '../types/comic';

const moods: MoodDef[] = [
  { id: 'happy', name: 'Happy', nameRu: 'Счастливый' },
  { id: 'surprised', name: 'Surprised', nameRu: 'Удивлён' },
  { id: 'dead', name: 'Dead / X_X', nameRu: 'Сломан / X_X' },
  { id: 'angry', name: 'Angry', nameRu: 'Злой' },
  { id: 'neutral', name: 'Neutral', nameRu: 'Нейтральный' },
  { id: 'smug', name: 'Smug', nameRu: 'Самодовольный' },
];

export function getAllMoods(): MoodDef[] {
  return moods;
}

export function getMood(id: MoodId): MoodDef | undefined {
  return moods.find(m => m.id === id);
}
