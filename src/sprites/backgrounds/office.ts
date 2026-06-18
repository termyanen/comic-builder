import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const office: BackgroundDef = {
  id: 'office',
  name: 'Office',
  nameRu: 'Офис',
  draw({ p, d, t }) {
    // Wall
    p(0, 0, 70, 57, t.wall);
    for (let y = 8; y < 57; y += 10) p(0, y, 70, 1, t.wallMid);

    // Floor — tiled checkerboard
    p(0, 57, 70, 13, t.floor);
    for (let tx = 0; tx < 70; tx += 5) {
      for (let ty = 57; ty < 70; ty += 5) {
        if (((tx / 5) + (ty / 5)) % 2 === 0) p(tx, ty, 5, 5, t.wallMid);
      }
    }
    for (let fx = 0; fx <= 70; fx += 5) p(fx, 57, 1, 13, t.wallDark);
    for (let fy = 57; fy <= 70; fy += 5) p(0, fy, 70, 1, t.wallDark);
    p(0, 56, 70, 2, t.wallDark);

    // Desk
    p(0, 48, 70, 4, C.blk);
    p(1, 49, 68, 2, t.desk);
    p(1, 49, 4, 2, t.wallMid);
    p(0, 51, 70, 3, C.blk);
    p(1, 52, 68, 2, t.deskDark);
    p(5, 53, 4, 6, C.blk); p(6, 54, 2, 5, t.deskDark);
    p(60, 53, 4, 6, C.blk); p(61, 54, 2, 5, t.deskDark);

    // Big monitor — outlined
    p(5, 8, 28, 32, C.blk);
    p(6, 9, 26, 30, t.screen);
    p(7, 10, 24, 28, t.screenGlow);
    // Muted code lines on screen
    p(8, 12, 10, 2, '#2a5038'); p(9, 16, 14, 2, '#2a5038');
    p(8, 20, 7, 2, '#1e3a2a'); p(11, 24, 12, 2, '#2a5038');
    p(8, 28, 6, 2, '#1e3a2a'); p(10, 32, 9, 2, '#243a30');
    p(7, 10, 24, 4, t.wallMid); // screen top glow
    // Monitor stand
    p(17, 40, 6, 8, C.blk); p(18, 41, 4, 7, C.gray);
    p(13, 47, 14, 3, C.blk); p(14, 48, 12, 2, C.gray);

    // Kanban board (right) — outlined
    p(40, 5, 24, 36, C.blk);
    p(41, 6, 22, 34, '#ccc8bc');
    p(48, 7, 1, 32, '#aaa'); p(55, 7, 1, 32, '#aaa');
    p(42, 7, 5, 3, '#b8b4a8'); p(49, 7, 5, 3, '#b8b4a8'); p(56, 7, 5, 3, '#b8b4a8');
    // Sticky notes — muted
    p(42, 12, 5, 4, C.blk); p(43, 13, 3, 2, '#706028');
    p(42, 18, 5, 4, C.blk); p(43, 19, 3, 2, '#583030');
    p(49, 12, 5, 4, C.blk); p(50, 13, 3, 2, '#2a3a52');
    p(49, 19, 5, 4, C.blk); p(50, 20, 3, 2, '#2a4830');
    p(56, 12, 5, 4, C.blk); p(57, 13, 3, 2, '#382848');
    p(56, 19, 5, 4, C.blk); p(57, 20, 3, 2, '#706028');

    // Office plant (left corner)
    p(0, 36, 6, 21, C.blk);
    p(1, 43, 4, 14, '#4a2e14'); p(2, 44, 2, 13, '#5a3820');
    p(0, 28, 8, 18, C.blk);
    p(1, 29, 6, 8, '#1e4028'); p(2, 28, 4, 4, '#2a5030');
    d(3, 26, '#2a5030'); d(6, 28, '#1e4028');
  },
};
