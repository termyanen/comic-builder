import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const dev: CharacterDef = {
  id: 'dev',
  name: 'Developer',
  nameRu: 'Разраб',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette (hair + face as one black block)
    p(x + 1, 16, 12, 14, C.blk);
    // Left/right ear bumps
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — messy dark brown
    p(x + 2, 17, 10, 4, C.hair_d);
    p(x + 3, 16, 4, 2, C.hair_d);   // left tuft
    p(x + 9, 16, 3, 1, C.hair_d);   // right spike
    d(x + 6, 15, C.hair_d);          // center spike
    // Hair highlight
    d(x + 4, 17, '#5a3d2a');

    // Face skin + highlight
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);   // top-left highlight
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin); // left ear skin
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin); // right ear skin

    // Neck + body silhouette
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin); // neck skin

    // Hoodie
    const hd = C.shirt_d;
    const hd2 = '#3868c8';
    p(x + 1, 32, 12, 7, hd);
    p(x + 1, 32, 2, 7, '#5a8eef');   // left highlight
    p(x + 11, 32, 2, 7, hd2);        // right shadow
    // Kangaroo pocket
    p(x + 3, 35, 8, 3, hd2);
    p(x + 4, 36, 6, 1, hd);
    // Collar strings
    d(x + 5, 32, C.wh); d(x + 8, 32, C.wh);

    // Left arm + hand
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, hd);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm + hand
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, hd);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);

    // Legs (jeans)
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, C.pants);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, C.pants);
    // Jeans highlight
    d(x + 2, 41, '#3a5070'); d(x + 9, 41, '#3a5070');

    // Shoes (dark)
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#444');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#444');

    drawFace(dc, x, mood);

    // Thick-frame glasses (drawn over face)
    p(x + 2, 22, 5, 1, C.blk); p(x + 2, 25, 5, 1, C.blk);
    p(x + 2, 22, 1, 4, C.blk); p(x + 6, 22, 1, 4, C.blk);
    p(x + 7, 22, 5, 1, C.blk); p(x + 7, 25, 5, 1, C.blk);
    p(x + 7, 22, 1, 4, C.blk); p(x + 11, 22, 1, 4, C.blk);

    drawShirtLabel(dc, x, 'DEV');
  },
};
