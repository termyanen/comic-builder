import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const meeting: BackgroundDef = {
  id: 'meeting',
  name: 'Meeting Room',
  nameRu: 'Переговорка',
  draw({ p, d, t }) {
    // Wall
    p(0, 0, 50, 50, t.wall);

    // Floor
    p(0, 42, 50, 8, t.wallDark);
    for (let i = 0; i < 50; i += 6) d(i, 42, t.floor);

    // Big whiteboard on back wall
    p(4, 6, 38, 22, t.wallDark);
    p(5, 7, 36, 20, '#f0f0f0');
    // Sketches on whiteboard
    p(8, 10, 10, 1, '#bbb'); p(8, 12, 7, 1, '#bbb'); p(8, 14, 9, 1, '#bbb');
    // Boxes (flowchart)
    p(22, 9, 6, 4, C.wh); p(23, 10, 4, 2, '#ddd');
    p(22, 16, 6, 4, C.wh); p(23, 17, 4, 2, '#ddd');
    // Arrow between boxes
    d(24, 13, '#999'); d(25, 13, '#999'); d(25, 14, '#999'); d(25, 15, '#999');
    // Red marker note
    p(30, 10, 8, 3, '#fee'); p(31, 11, 6, 1, C.red);

    // Conference table
    p(4, 36, 42, 4, t.desk);
    p(4, 38, 42, 2, t.deskDark);
    // Table legs
    p(6, 40, 2, 4, t.deskDark); p(40, 40, 2, 4, t.deskDark);

    // Chairs (pixel silhouettes above table)
    for (let i = 0; i < 4; i++) {
      const cx = 7 + i * 10;
      p(cx, 33, 5, 3, '#444');
      p(cx + 1, 33, 3, 1, '#555'); // seat back
    }

    // Window on side wall
    p(0, 10, 3, 18, t.wallMid);
    p(0, 11, 3, 16, '#1a3a6e');
    d(1, 12, '#4a8aee'); d(1, 14, '#4a8aee'); // light
  },
};
