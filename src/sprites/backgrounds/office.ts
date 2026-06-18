import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const office: BackgroundDef = {
  id: 'office',
  name: 'Office',
  nameRu: 'Офис',
  draw({ p, d, t }) {
    // Wall
    p(0, 0, 50, 50, t.wall);

    // Floor
    p(0, 42, 50, 8, t.wallDark);
    for (let i = 0; i < 50; i += 4) { d(i, 42, t.floor); d(i + 1, 42, t.floor); }

    // Desk
    p(4, 38, 42, 2, t.desk);
    p(4, 40, 42, 2, t.deskDark);
    // Desk legs
    p(6, 40, 2, 4, t.deskDark); p(42, 40, 2, 4, t.deskDark);

    // Monitor on back wall
    p(6, 14, 20, 18, t.wallDark);
    p(8, 16, 16, 14, t.wallMid);
    // Code lines on screen
    p(10, 18, 8, 1, t.wallDark);
    p(10, 20, 11, 1, t.wallDark);
    p(10, 22, 6, 1, t.wallDark);
    p(10, 24, 10, 1, t.wallDark);
    p(10, 26, 4, 1, t.wallDark);
    // Monitor stand
    p(14, 32, 4, 6, C.gray);
    p(12, 37, 8, 1, C.gray);

    // Whiteboard / kanban on right wall
    p(32, 8, 14, 18, t.wallDark);
    p(33, 9, 12, 16, t.wallMid);
    // Sticky notes
    p(34, 10, 3, 3, C.yellow);
    p(38, 10, 3, 3, '#ff6b6b');
    p(42, 10, 2, 3, C.cyan);
    p(34, 14, 3, 3, '#8f8');
    p(38, 14, 3, 3, C.yellow);
    // Lines on notes
    d(35, 11, '#c0a030'); d(39, 11, '#c04040');
  },
};
