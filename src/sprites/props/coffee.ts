import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const coffee: PropDef = {
  id: 'coffee',
  name: 'Coffee',
  nameRu: 'Кофе',
  draw({ p, d }) {
    const cx = 36, cy = 30;

    // Steam
    d(cx + 2, cy - 4, '#666'); d(cx + 4, cy - 5, '#666');
    d(cx + 3, cy - 3, '#555'); d(cx + 5, cy - 3, '#555');
    d(cx + 1, cy - 2, '#444');

    // Cup
    p(cx, cy, 8, 10, C.amber);
    p(cx + 1, cy + 1, 6, 8, '#3d1c00');
    // Coffee surface
    p(cx + 1, cy + 1, 6, 2, '#5a3010');

    // Handle
    p(cx + 8, cy + 2, 2, 2, C.amber);
    p(cx + 8, cy + 6, 2, 2, C.amber);
    p(cx + 9, cy + 3, 1, 4, C.amber);

    // Saucer
    p(cx - 1, cy + 10, 10, 2, C.lgray);
  },
};
