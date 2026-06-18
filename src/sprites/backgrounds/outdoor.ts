import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const outdoor: BackgroundDef = {
  id: 'outdoor',
  name: 'Outdoor',
  nameRu: 'На улице',
  draw({ p, d, t }) {
    // Sky — uses theme wall color as the sky tone
    p(0, 0, 50, 28, t.wall);
    p(0, 4, 50, 4, t.wallMid);

    // Clouds
    p(6, 6, 8, 3, t.wallDark);
    p(8, 5, 4, 1, t.wallDark);
    p(30, 9, 10, 3, t.wallDark);
    p(32, 8, 6, 1, t.wallDark);

    // Stars/dots
    d(3, 3, C.yellow); d(14, 2, C.yellow);
    d(24, 5, C.yellow); d(44, 3, C.yellow);
    d(38, 1, C.yellow); d(8, 10, C.yellow);

    // Ground (always green — it's outdoor)
    p(0, 28, 50, 22, '#2d5a2d');
    for (let i = 0; i < 10; i++) {
      const gx = i * 5 + (i % 2);
      d(gx, 28, '#3a7a3a'); d(gx + 1, 28, '#3a7a3a');
    }

    // Path
    p(18, 30, 14, 20, '#3a6a3a');
    p(20, 30, 10, 20, '#4a7a4a');

    // Trees
    for (let i = 0; i < 4; i++) {
      const tx = i * 13 + 2;
      const th = 10 + (i % 2) * 4;
      p(tx + 3, 50 - th, 3, th, '#4a3020');
      p(tx, 50 - th - 4, 9, 5, '#2a5a2a');
      p(tx + 1, 50 - th - 6, 7, 3, '#3a6a3a');
      p(tx + 2, 50 - th - 8, 5, 3, '#2a5a2a');
    }
  },
};
