import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const dark: BackgroundDef = {
  id: 'dark',
  name: 'Dark Screen',
  nameRu: 'Тёмный экран',
  draw({ p, d, t }) {
    p(0, 0, 50, 50, t.wall);

    // Large monitor
    p(6, 20, 38, 22, t.screen);
    p(8, 22, 34, 18, t.wallDark);

    // Error lines on screen
    p(10, 24, 16, 1, '#ff2222');
    p(10, 26, 12, 1, '#660000');
    p(10, 28, 18, 1, '#ff2222');
    p(10, 30, 10, 1, '#660000');
    p(10, 32, 14, 1, '#ff2222');
    p(10, 34, 8, 1, '#440000');

    // Error icon
    p(32, 24, 6, 6, '#ff2222');
    p(33, 25, 4, 4, t.wallDark);
    d(35, 26, '#ff2222'); d(35, 28, '#ff2222');

    // Glow at top of screen
    d(12, 22, t.wallMid); d(14, 22, t.wallMid); d(16, 22, t.wallMid);

    // Monitor stand
    p(6, 42, 38, 2, C.gray);
    p(18, 44, 14, 2, C.gray);

    // Desk surface
    p(0, 46, 50, 4, t.wallDark);
  },
};
