import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const boss: CharacterDef = {
  id: 'boss',
  name: 'Boss / CTO',
  nameRu: 'Босс / CTO',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — grey, thinning on top
    p(x + 2, 20, 10, 1, '#909090'); // sides
    p(x + 3, 19, 3, 2, '#909090'); // thin top left
    p(x + 9, 19, 2, 2, '#909090'); // thin top right
    d(x + 6, 20, '#b0b0b0');        // highlight

    // Face (slightly wider jaw feel)
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin); d(x + 1, 26, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin); d(x + 12, 26, C.skin);

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Suit jacket (charcoal)
    const sc = '#2c2c2c';
    const sc2 = '#1a1a1a';
    p(x + 1, 32, 12, 7, sc);
    p(x + 1, 32, 2, 7, '#444');     // left highlight
    p(x + 11, 32, 2, 7, sc2);       // right shadow
    // White shirt + tie
    p(x + 5, 32, 4, 7, '#eeeeff');  // shirt
    p(x + 6, 32, 2, 6, C.red);      // red tie
    d(x + 6, 38, C.red); d(x + 7, 38, C.red); // tie bottom point
    // Lapels
    p(x + 3, 32, 2, 4, sc);
    p(x + 9, 32, 2, 4, sc);
    // Pocket square
    d(x + 3, 33, C.wh); d(x + 4, 32, C.wh);

    // Left arm + hand
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, sc);
    // White shirt cuff
    p(x - 2, 37, 4, 2, C.blk); p(x - 1, 38, 2, 1, '#eee');
    p(x - 2, 38, 4, 3, C.blk); p(x - 1, 39, 2, 1, C.skin);

    // Right arm + hand
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, sc);
    p(x + 12, 37, 4, 2, C.blk); p(x + 13, 38, 2, 1, '#eee');
    p(x + 12, 38, 4, 3, C.blk); p(x + 13, 39, 2, 1, C.skin);

    // Legs (dark slacks)
    const sl = '#1c1c1c';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, sl);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, sl);

    // Dress shoes (black, shiny)
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#333');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#333');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'CTO', '#ffffffcc', 38);
  },
};
