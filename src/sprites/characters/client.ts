import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const client: CharacterDef = {
  id: 'client',
  name: 'Client',
  nameRu: 'Клиент',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — medium brown, neat side part
    const hr = '#5a3820';
    p(x + 2, 17, 10, 4, hr);
    p(x + 2, 16, 9, 2, hr);
    p(x + 3, 17, 5, 1, '#7a5030'); // part shine

    // Face
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Business casual — light blue shirt
    const sh = '#4a7aaa';
    const sh2 = '#3a6090';
    p(x + 1, 32, 12, 7, sh);
    p(x + 1, 32, 2, 7, '#6a9acc');
    p(x + 11, 32, 2, 7, sh2);
    // Open collar
    p(x + 4, 32, 2, 2, '#6a9acc');
    p(x + 8, 32, 2, 2, '#6a9acc');
    // Buttons
    d(x + 6, 33, C.wh); d(x + 6, 35, C.wh); d(x + 6, 37, C.wh);

    // Left arm
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, sh);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm (holding smartphone)
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, sh);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);
    // Phone
    p(x + 13, 34, 4, 7, C.blk);
    p(x + 14, 35, 2, 5, '#1a3a6e');
    d(x + 14, 36, '#4a8aee'); d(x + 15, 37, '#4a8aee');
    d(x + 14, 38, '#4a8aee');

    // Legs (grey chinos)
    const ch = '#8a8a9a';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, ch);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, ch);

    // Brown loafers
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#7a4828');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#7a4828');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'CLIENT');
  },
};
