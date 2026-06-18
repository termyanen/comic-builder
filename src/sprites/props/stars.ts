import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const stars: PropDef = {
  id: 'stars',
  name: 'Stars',
  nameRu: 'Звёздочки',
  draw({ p, d }) {
    // 4-point star shapes at various positions
    const drawStar = (cx: number, cy: number, big: boolean) => {
      d(cx, cy, C.yellow);
      d(cx - 1, cy, C.yellow); d(cx + 1, cy, C.yellow);
      d(cx, cy - 1, C.yellow); d(cx, cy + 1, C.yellow);
      if (big) {
        d(cx - 2, cy, C.yellow); d(cx + 2, cy, C.yellow);
        d(cx, cy - 2, C.yellow); d(cx, cy + 2, C.yellow);
        // Diagonal sparkle
        d(cx - 1, cy - 1, '#f5e060'); d(cx + 1, cy + 1, '#f5e060');
      }
    };

    drawStar(8, 10, true);
    drawStar(18, 8, false);
    drawStar(6, 22, false);
    drawStar(14, 18, true);
    drawStar(22, 14, false);
    drawStar(10, 28, false);

    // Small single-pixel sparkles
    d(4, 16, C.wh);
    d(20, 22, C.wh);
    d(12, 6, C.wh);
  },
};
