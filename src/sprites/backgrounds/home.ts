import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const home: BackgroundDef = {
  id: 'home',
  name: 'Home Office',
  nameRu: 'Дома',
  draw({ p, d, t }) {
    p(0, 0, 70, 57, t.wall);
    for (let y = 6; y < 57; y += 10) p(0, y, 70, 1, t.wallMid);

    // Wooden floor
    p(0, 57, 70, 13, t.floor);
    for (let fy = 57; fy < 70; fy += 4) {
      p(0, fy, 70, 1, t.wallDark);
      for (let fx = 0; fx < 70; fx += 10) d(fx, fy + 1, t.wallMid);
    }
    p(0, 56, 70, 2, t.wallDark);

    // Window — muted
    p(3, 3, 28, 32, C.blk);
    p(4, 4, 26, 30, '#1a2848');
    p(5, 5, 24, 14, '#1e304a'); // sky
    p(5, 5, 24, 5, '#263a58');
    // City buildings — dark, muted
    p(7, 10, 4, 10, '#0a1420'); d(8, 11, '#1e2e42'); d(8, 14, '#1a2838');
    p(13, 8, 4, 12, '#0a1420'); d(14, 9, '#1e2e42'); d(14, 13, '#1a2838');
    p(19, 11, 4, 9, '#0a1420'); d(20, 12, '#1e2e42');
    p(25, 7, 4, 13, '#0a1420'); d(26, 8, '#1e2e42'); d(26, 12, '#1a2838');
    p(5, 19, 24, 4, '#101e10'); // ground outside
    p(4, 18, 26, 1, C.blk);
    p(17, 4, 1, 30, C.blk);
    // Curtains — muted
    p(3, 3, 4, 32, C.blk); p(4, 4, 2, 30, '#602818'); p(5, 4, 1, 30, '#802e20');
    p(27, 3, 4, 32, C.blk); p(28, 4, 2, 30, '#802e20'); p(29, 4, 1, 30, '#602818');
    p(3, 35, 28, 3, C.blk); p(4, 36, 26, 1, t.deskDark);

    // Bookshelf (right)
    p(48, 3, 20, 44, C.blk);
    p(49, 4, 18, 42, t.deskDark);
    p(49, 4, 3, 42, t.wallMid);
    p(49, 15, 18, 1, C.blk); p(49, 26, 18, 1, C.blk); p(49, 37, 18, 1, C.blk);
    // Books — muted tones
    const bk = ['#602838', '#502020', '#504018', '#1e2c50', '#182e18', '#4a3010', '#301840', '#4a2800'];
    for (let b = 0; b < 6; b++) {
      p(50 + b * 3, 5, 3, 9, C.blk); p(51 + b * 3, 6, 2, 8, bk[b % 8]);
    }
    for (let b = 0; b < 6; b++) {
      p(50 + b * 3, 16, 3, 9, C.blk); p(51 + b * 3, 17, 2, 8, bk[(b + 3) % 8]);
    }
    for (let b = 0; b < 6; b++) {
      p(50 + b * 3, 27, 3, 9, C.blk); p(51 + b * 3, 28, 2, 8, bk[(b + 6) % 8]);
    }
    p(50, 38, 6, 7, C.blk); p(51, 39, 4, 5, '#505048');
    p(58, 38, 4, 5, C.blk); p(59, 39, 2, 3, '#9090a0');

    // Plant — muted
    p(0, 38, 8, 20, C.blk);
    p(1, 43, 6, 15, '#3a2010'); p(2, 44, 4, 14, '#4a2818');
    p(0, 28, 10, 18, C.blk);
    p(1, 29, 8, 8, '#1a3820'); p(3, 27, 5, 6, '#224828');
    d(5, 26, '#224828'); d(8, 30, '#1a3820'); d(2, 32, '#1a3820');

    // Desk
    p(0, 47, 50, 4, C.blk);
    p(1, 48, 48, 2, t.desk);
    p(1, 48, 4, 2, t.wallMid);
    p(0, 51, 50, 3, C.blk);
    p(1, 52, 48, 2, t.deskDark);
    p(4, 53, 3, 6, C.blk); p(5, 54, 1, 5, t.deskDark);
    p(42, 53, 3, 6, C.blk); p(43, 54, 1, 5, t.deskDark);

    // Laptop
    p(22, 43, 16, 5, C.blk); p(23, 44, 14, 3, '#1a2038');
    p(24, 45, 12, 1, '#1e3050');
    p(20, 48, 20, 1, C.blk);
  },
};
