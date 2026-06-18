import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const fire: PropDef = {
  id: 'fire',
  name: 'Fire',
  nameRu: 'Огонь',
  draw({ p, d }) {
    const fx = 20, fy = 24;

    // Outer flames (red)
    p(fx + 2, fy + 10, 8, 6, C.red);
    p(fx + 3, fy + 6, 6, 4, C.red);
    p(fx + 4, fy + 4, 4, 2, C.red);
    // Side licks
    p(fx, fy + 12, 2, 4, C.red);
    p(fx + 10, fy + 11, 2, 5, C.red);

    // Middle flames (orange)
    p(fx + 3, fy + 8, 6, 6, C.orange);
    p(fx + 4, fy + 5, 4, 3, C.orange);

    // Inner flames (yellow)
    p(fx + 4, fy + 8, 4, 4, C.yellow);
    p(fx + 5, fy + 6, 2, 2, C.yellow);

    // Core (white hot)
    p(fx + 5, fy + 9, 2, 3, C.wh);

    // Sparks
    d(fx + 1, fy + 2, C.yellow);
    d(fx + 8, fy + 1, C.orange);
    d(fx + 3, fy, C.yellow);
    d(fx + 10, fy + 3, C.yellow);
  },
};
