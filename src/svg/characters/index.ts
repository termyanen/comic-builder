import type { CharacterDef, CharacterId } from '../../types/comic';
import { hero } from './hero';
import { robot } from './robot';
import { pm, boss, qa, designer, devops, intern, client, senior, hr } from './cast';
import { cat } from './cat';

/** To add a character: create the file, add it here. Nothing else changes. */
const characters: CharacterDef[] = [hero, robot, senior, pm, boss, qa, designer, devops, intern, client, hr, cat];

export function getCharacter(id: CharacterId): CharacterDef | undefined {
  return characters.find(c => c.id === id);
}

export function getAllCharacters(): CharacterDef[] {
  return characters;
}
