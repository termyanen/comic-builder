import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const coffeeshop: BackgroundDef = {
  id: 'coffeeshop',
  name: 'Coffee Shop',
  nameRu: 'Кофейня',
  draw({ p, d, t }) {
    // Warm wall
    p(0, 0, 50, 50, '#2a1a0e');

    // Floor (wooden planks)
    p(0, 40, 50, 10, '#3a2010');
    for (let i = 0; i < 50; i += 8) {
      p(i, 40, 7, 10, '#3a2212');
      d(i, 40, '#2a1808'); d(i, 44, '#2a1808');
    }

    // Big window back wall
    p(8, 4, 34, 24, '#1a1208');
    p(9, 5, 32, 22, '#1a2a3a');
    // Daylight outside
    p(10, 6, 30, 10, '#2a4a6a');
    p(10, 6, 30, 4, '#3a5a7a'); // sky brighter at top
    // Buildings
    p(11, 10, 6, 6, '#0a1a2a');
    p(20, 8, 5, 8, '#0a1a2a');
    p(30, 11, 7, 5, '#0a1a2a');
    // Window panes
    d(25, 5, '#6a8aaa'); d(25, 14, '#1a3a5a');
    p(9, 14, 32, 1, '#2a1808'); // divider
    p(25, 5, 1, 22, '#2a1808'); // vertical divider
    // Rain on window
    d(14, 8, '#4a7aaa'); d(18, 10, '#4a7aaa'); d(28, 7, '#4a7aaa');
    d(35, 9, '#4a7aaa'); d(22, 12, '#4a7aaa');

    // Counter
    p(0, 26, 18, 14, '#5a3015');
    p(0, 26, 18, 3, '#7a4a20'); // counter top
    // Coffee machine on counter
    p(2, 16, 10, 10, '#222');
    p(3, 17, 8, 8, '#333');
    p(4, 18, 6, 3, '#1a1a1a');
    d(5, 19, '#ff9500'); d(8, 19, C.red); // buttons
    p(5, 21, 4, 1, '#444');
    // Steam pipe
    p(10, 14, 1, 4, '#555');
    d(10, 13, C.wh); d(11, 12, C.wh); // steam

    // Chalkboard menu
    p(22, 4, 12, 14, '#1a2a1a');
    p(23, 5, 10, 12, '#0a1a0a');
    d(24, 7, C.wh); d(25, 7, C.wh); d(26, 7, C.wh); // menu text
    d(24, 9, C.wh); d(26, 9, C.wh);
    d(24, 11, '#f5c542'); d(25, 11, '#f5c542'); // price highlight
    d(24, 13, C.wh); d(25, 13, C.wh); d(27, 13, C.wh);

    // Small table in foreground
    p(32, 32, 14, 2, '#7a4a20');
    p(38, 34, 2, 8, '#5a3010');
    // Cup on table
    p(34, 29, 4, 4, C.wh);
    p(35, 30, 2, 2, C.orange);
    d(38, 31, '#7a5030'); // handle
    // Saucer
    p(33, 33, 6, 1, '#ccc');
  },
};
