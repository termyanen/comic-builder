import type { CharacterDef } from '../../types/comic';
import { dev } from './dev';
import { pm } from './pm';
import { designer } from './designer';
import { qa } from './qa';
import { boss } from './boss';
import { intern } from './intern';
import { devops } from './devops';
import { client } from './client';

const characters = new Map<string, CharacterDef>();

function register(char: CharacterDef) {
  characters.set(char.id, char);
}

register(dev);
register(pm);
register(designer);
register(qa);
register(boss);
register(intern);
register(devops);
register(client);

export function getCharacter(id: string): CharacterDef | undefined {
  return characters.get(id);
}

export function getAllCharacters(): CharacterDef[] {
  return Array.from(characters.values());
}

export { dev, pm };
