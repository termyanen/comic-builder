import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const pm: CharacterDef = {
  id: 'pm',
  name: 'Project Manager',
  nameRu: 'Менеджер',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — light brown, neat side part
    p(x + 2, 17, 10, 4, C.hair_p);
    p(x + 2, 17, 7, 1, '#a07848'); // part highlight
    p(x + 2, 16, 8, 2, C.hair_p);  // top of head
    d(x + 4, 17, '#c09060');        // shine

    // Face skin + highlight
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);

    // Glasses (round wire frames)
    p(x + 2, 22, 4, 3, '#8899bb');
    p(x + 7, 22, 4, 3, '#8899bb');
    p(x + 6, 23, 2, 1, '#8899bb'); // bridge
    p(x + 3, 23, 2, 2, '#ccd8f0'); // left lens tint
    p(x + 8, 23, 2, 2, '#ccd8f0'); // right lens tint

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Polo shirt
    const sh = C.shirt_p;
    const sh2 = '#a02020';
    p(x + 1, 32, 12, 7, sh);
    p(x + 1, 32, 2, 7, '#d04040');  // left highlight
    p(x + 11, 32, 2, 7, sh2);        // right shadow
    // Collar
    p(x + 3, 32, 2, 2, C.wh);
    p(x + 9, 32, 2, 2, C.wh);
    p(x + 5, 32, 4, 1, C.wh);
    // Buttons
    d(x + 6, 33, sh2); d(x + 6, 35, sh2); d(x + 6, 37, sh2);

    // Left arm + hand
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, sh);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm + hand
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, sh);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);

    // Legs (slacks)
    const sl = '#3a4a5e';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, sl);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, sl);

    // Shoes (brown)
    const shoe = '#5a3828';
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#7a5038');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#7a5038');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'PM');
  },
};
