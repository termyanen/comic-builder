import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const laptop: PropDef = {
  id: 'laptop',
  name: 'Laptop',
  nameRu: 'Ноутбук',
  draw({ p, d }) {
    const lx = 10, ly = 26;

    // Screen (back)
    p(lx, ly, 20, 12, '#222');
    p(lx + 1, ly + 1, 18, 10, C.scrn_on);

    // Code on screen
    p(lx + 2, ly + 2, 6, 1, C.cyan);
    p(lx + 2, ly + 4, 10, 1, '#0fa');
    p(lx + 4, ly + 6, 8, 1, C.cyan);
    p(lx + 2, ly + 8, 12, 1, '#0fa');
    // Cursor
    d(lx + 14, ly + 8, C.wh);

    // Keyboard base
    p(lx - 2, ly + 12, 24, 2, C.gray);
    // Keyboard keys
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 10; c++) {
        d(lx - 1 + c * 2, ly + 12 + r, '#555');
      }
    }
    // Trackpad
    p(lx + 6, ly + 13, 6, 1, '#555');
  },
};
