import type { PropDef } from '../../types/comic';
import { laptop } from './laptop';
import { coffee } from './coffee';
import { scroll } from './scroll';
import { fire } from './fire';
import { stars } from './stars';
import { phone } from './phone';
import { bug } from './bug';
import { chart } from './chart';
import { pizza } from './pizza';
import { beer } from './beer';
import { trophy } from './trophy';
import { ticket } from './ticket';
import { money } from './money';

const props = new Map<string, PropDef>();

function register(prop: PropDef) {
  props.set(prop.id, prop);
}

register(laptop);
register(coffee);
register(scroll);
register(fire);
register(stars);
register(phone);
register(bug);
register(chart);
register(pizza);
register(beer);
register(trophy);
register(ticket);
register(money);

export function getProp(id: string): PropDef | undefined {
  return props.get(id);
}

export function getAllProps(): PropDef[] {
  return Array.from(props.values());
}
