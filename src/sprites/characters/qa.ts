import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const qa: CharacterDef = {
  id: 'qa',
  name: 'QA Tester',
  nameRu: 'Тестировщик',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — short black
    p(x + 2, 17, 10, 4, '#111111');
    p(x + 3, 16, 8, 1, '#111111');
    d(x + 4, 17, '#2a2a2a'); // subtle highlight

    // Face
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);

    // Round glasses (green frames)
    p(x + 2, 22, 4, 3, '#2a6a2a');
    p(x + 7, 22, 4, 3, '#2a6a2a');
    p(x + 6, 23, 2, 1, '#2a6a2a');
    p(x + 3, 23, 2, 2, '#b0d8b0'); // lens tint
    p(x + 8, 23, 2, 2, '#b0d8b0');

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Dark green QA polo
    const gr = '#1e5c1e';
    const gr2 = '#154a15';
    p(x + 1, 32, 12, 7, gr);
    p(x + 1, 32, 2, 7, '#2e7c2e');
    p(x + 11, 32, 2, 7, gr2);
    p(x + 5, 32, 4, 1, '#174a17'); // collar
    // Checkmark on chest
    d(x + 5, 34, C.wh); d(x + 6, 35, C.wh);
    d(x + 7, 34, C.wh); d(x + 8, 33, C.wh);

    // Left arm + hand
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, gr);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm (holding clipboard)
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, gr);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);
    // Clipboard
    p(x + 14, 30, 5, 10, C.blk);
    p(x + 15, 31, 3, 8, '#e0dccc');
    p(x + 15, 33, 2, 1, '#888'); p(x + 15, 35, 2, 1, '#888');
    p(x + 15, 37, 3, 1, '#888');
    d(x + 15, 33, '#2a6a2a'); d(x + 15, 35, '#2a6a2a');
    // Clipboard clip
    p(x + 16, 30, 2, 2, C.gray);

    // Legs (khaki)
    const kh = '#8a7a5a';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, kh);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, kh);

    // Brown shoes
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#6a4a28');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#6a4a28');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'QA', '#ffffff', 37);
  },
};
