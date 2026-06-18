import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const designer: CharacterDef = {
  id: 'designer',
  name: 'Designer',
  nameRu: 'Дизайнер',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 14, 12, 16, C.blk); // taller silhouette for long hair
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);
    // Long side hair
    p(x + 1, 28, 2, 4, C.blk); // left hair falls past face
    p(x + 11, 28, 2, 4, C.blk);

    // Hair — dark with purple-dyed tips
    p(x + 2, 15, 10, 6, '#2a1a3a');
    p(x + 2, 14, 8, 2, '#2a1a3a');
    // Purple tips on top spikes
    d(x + 3, 13, '#9b59b6'); d(x + 6, 12, '#9b59b6'); d(x + 9, 13, '#9b59b6');
    d(x + 5, 12, '#c07aee');
    // Left/right long hair fill
    p(x + 2, 28, 1, 3, '#2a1a3a');
    p(x + 12, 28, 1, 3, '#2a1a3a');

    // Face
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);
    // Earring
    d(x + 1, 26, C.yellow); d(x + 12, 26, '#c8a0ff');

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Magenta crop top / tee
    const mg = '#c8186a';
    const mg2 = '#a01050';
    p(x + 1, 32, 12, 7, mg);
    p(x + 1, 32, 2, 7, '#e030a0');
    p(x + 11, 32, 2, 7, mg2);
    // V-neck
    d(x + 6, 32, mg2); d(x + 7, 32, mg2);
    d(x + 5, 33, mg2); d(x + 8, 33, mg2);
    // Star print
    d(x + 6, 35, C.yellow); d(x + 7, 34, C.yellow);
    d(x + 8, 35, C.yellow); d(x + 7, 36, C.yellow);
    d(x + 5, 35, C.yellow);

    // Left arm + hand
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, mg);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm + hand (holding sketchpad)
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, mg);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);
    // Sketchpad
    p(x + 13, 33, 5, 7, C.blk);
    p(x + 14, 34, 3, 5, '#f8f4e8');
    p(x + 14, 35, 2, 1, '#aaa'); // sketch line
    p(x + 14, 37, 3, 1, '#aaa');

    // Legs (white jeans)
    const wj = '#d8d8d8';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, wj);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, wj);
    d(x + 3, 43, '#bbb'); d(x + 10, 43, '#bbb');

    // White sneakers
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#eee');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#eee');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'UX', '#ffffff', 37);
  },
};
