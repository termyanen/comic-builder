import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const dark: BackgroundDef = {
  id: 'dark',
  name: 'Dark Screen',
  nameRu: 'Тёмный экран',
  draw({ p, d, t, ctx, S }) {
    p(0, 0, 70, 57, '#0a0a14');
    for (let y = 5; y < 57; y += 8) p(0, y, 70, 1, '#0d0d18');

    // Floor
    p(0, 57, 70, 13, '#080812');
    for (let fx = 0; fx <= 70; fx += 5) p(fx, 57, 1, 13, '#0f0f1c');
    for (let fy = 57; fy <= 70; fy += 5) p(0, fy, 70, 1, '#0f0f1c');
    p(0, 56, 70, 2, '#060610');

    // Desk
    p(0, 48, 70, 4, C.blk);
    p(1, 49, 68, 2, '#1a1a2e');
    p(1, 49, 4, 2, '#202040');
    p(0, 51, 70, 3, C.blk);
    p(1, 52, 68, 2, '#111125');
    p(8, 53, 4, 6, C.blk); p(9, 54, 2, 5, '#1a1a2e');
    p(58, 53, 4, 6, C.blk); p(59, 54, 2, 5, '#1a1a2e');

    // Error monitor — BSOD
    p(12, 3, 46, 42, C.blk);
    p(13, 4, 44, 40, '#0000a0');
    p(14, 5, 42, 38, '#0808c0');
    // Sad face
    p(30, 7, 10, 2, '#a0a0e0');
    p(31, 10, 3, 2, '#a0a0e0');
    p(36, 10, 3, 2, '#a0a0e0');
    p(31, 14, 8, 2, '#a0a0e0');
    p(32, 16, 6, 1, '#a0a0e0');
    // Error text lines — subtle
    p(15, 19, 40, 3, '#a0a0e0'); p(15, 20, 40, 1, '#5050a0');
    p(15, 24, 34, 2, '#8888cc');
    p(15, 28, 28, 2, '#8888cc');
    p(15, 32, 36, 2, '#7070aa');
    p(15, 36, 24, 2, '#8888cc');
    p(15, 40, 16, 2, '#7070aa');

    // Monitor stand
    p(33, 45, 4, 4, C.blk); p(34, 46, 2, 3, '#282840');
    p(27, 48, 16, 2, C.blk); p(28, 49, 14, 1, '#282840');

    // Keyboard
    p(22, 47, 24, 3, C.blk); p(23, 48, 22, 1, '#181830');
    for (let kx = 23; kx < 45; kx += 3) d(kx, 48, '#222248');

    // Energy drink — muted
    p(62, 43, 5, 6, C.blk); p(63, 44, 3, 4, '#5a1a1a');
    d(63, 43, '#606050'); d(64, 43, '#606050');
  },
};
