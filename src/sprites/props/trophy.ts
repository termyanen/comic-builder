import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const trophy: PropDef = {
  id: 'trophy',
  name: 'Trophy',
  nameRu: 'Трофей',
  draw({ p, d }) {
    // Cup body
    p(19, 18, 12, 14, C.yellow);
    p(20, 17, 10, 16, '#f5c542');
    p(21, 16, 8, 17, C.yellow);
    // Cup rim
    p(18, 18, 14, 2, '#d4a020');
    // Shine
    p(22, 18, 2, 6, '#ffe080');
    // Cup inner shadow
    p(22, 20, 6, 10, '#c8a010');
    // Star on cup
    d(25, 22, C.wh); d(24, 23, C.wh); d(26, 23, C.wh);
    d(23, 24, C.wh); d(27, 24, C.wh);
    d(25, 25, C.wh); d(24, 25, C.wh); d(26, 25, C.wh);
    // Handles
    p(16, 20, 4, 6, '#c8a010');
    p(17, 21, 2, 4, '#d4a020');
    p(30, 20, 4, 6, '#c8a010');
    p(31, 21, 2, 4, '#d4a020');
    // Stem
    p(23, 32, 4, 4, '#c8a010');
    // Base
    p(19, 36, 12, 3, '#d4a020');
    p(17, 38, 16, 2, C.yellow);
    p(18, 40, 14, 2, '#c8a010');
    // Glow
    d(22, 14, C.yellow); d(24, 13, C.yellow); d(28, 14, C.yellow);
  },
};
