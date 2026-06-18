import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const scroll: PropDef = {
  id: 'scroll',
  name: 'Task List',
  nameRu: 'Список задач',
  draw({ p, d }) {
    const sx = 34, sy = 14;

    // Paper
    p(sx, sy, 12, 26, C.paper);
    // Top/bottom roll
    p(sx, sy, 12, 2, C.lgray);
    p(sx, sy + 24, 12, 2, C.lgray);

    // Checkbox lines
    for (let i = 0; i < 5; i++) {
      const ly = sy + 4 + i * 4;
      // Checkbox
      p(sx + 1, ly, 2, 2, '#bbb');
      // Line
      p(sx + 4, ly, 6, 1, '#bbb');
      // Checkmarks on first 2
      if (i < 2) {
        d(sx + 1, ly, C.green);
        d(sx + 2, ly + 1, C.green);
      }
    }
    // Priority marker
    p(sx + 1, sy + 4 + 4 * 4, 2, 2, C.red);
    p(sx + 4, sy + 4 + 4 * 4, 6, 1, C.red);
  },
};
