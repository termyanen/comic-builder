import type { BackgroundDef } from '../../types/comic';
import { office } from './office';
import { dark } from './dark';
import { error } from './error';
import { empty } from './empty';
import { outdoor } from './outdoor';
import { meeting } from './meeting';
import { server } from './server';
import { home } from './home';
import { coffeeshop } from './coffeeshop';
import { bedroom } from './bedroom';
import { presentation } from './presentation';

const backgrounds = new Map<string, BackgroundDef>();

function register(bg: BackgroundDef) {
  backgrounds.set(bg.id, bg);
}

register(office);
register(dark);
register(error);
register(empty);
register(outdoor);
register(meeting);
register(server);
register(home);
register(coffeeshop);
register(bedroom);
register(presentation);

export function getBackground(id: string): BackgroundDef | undefined {
  return backgrounds.get(id);
}

export function getAllBackgrounds(): BackgroundDef[] {
  return Array.from(backgrounds.values());
}
