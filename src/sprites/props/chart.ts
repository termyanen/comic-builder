import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const chart: PropDef = {
  id: 'chart',
  name: 'Chart (Down)',
  nameRu: 'График (вниз)',
  draw({ p, d }) {
    // Board / background
    p(12, 14, 26, 22, '#0a1a10');
    p(13, 15, 24, 20, '#0d2010');

    // Axes
    p(16, 16, 1, 16, '#2a6a2a');
    p(16, 31, 18, 1, '#2a6a2a');

    // Bars going down (doom)
    p(18, 19, 3, 12, C.green);
    p(22, 22, 3, 9, C.green);
    p(26, 25, 3, 6, C.red);
    p(30, 28, 3, 3, C.red);

    // Trend line going down (red)
    d(18, 19, C.red); d(20, 21, C.red); d(22, 23, C.red);
    d(24, 25, C.red); d(26, 27, C.red); d(28, 28, C.red); d(30, 30, C.red);

    // Arrow down
    d(33, 26, C.red); d(34, 27, C.red); d(33, 28, C.red);
    d(32, 27, C.red); d(35, 27, C.red);

    // Title
    p(14, 33, 22, 2, '#0a1a10');
    d(15, 34, C.red); d(16, 34, C.red); d(17, 34, C.red);

    // Stand
    p(22, 36, 6, 2, '#2a2a2a');
    p(20, 38, 10, 1, '#2a2a2a');
  },
};
