import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const intern: CharacterDef = {
  id: 'intern',
  name: 'Intern',
  nameRu: 'Стажёр',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Hair — light brown, unkempt tufts
    const hr = '#7a5830';
    p(x + 2, 17, 10, 4, hr);
    p(x + 3, 16, 8, 2, hr);
    d(x + 4, 15, '#9a7040'); d(x + 7, 15, hr); d(x + 9, 16, hr);
    d(x + 5, 17, '#9a7040'); // shine

    // Face (young, slightly round)
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 4, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);
    // Sweat drop (nervous)
    d(x + 12, 22, '#88ccff');
    d(x + 12, 23, '#88ccff');

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Oversized grey hoodie
    const gh = '#7a7a8a';
    const gh2 = '#5a5a6a';
    p(x + 1, 32, 12, 7, gh);
    p(x + 1, 32, 2, 7, '#9a9aaa');
    p(x + 11, 32, 2, 7, gh2);
    p(x + 4, 32, 6, 1, gh2); // neckline
    p(x + 4, 35, 6, 2, gh2); // pocket
    d(x + 5, 32, C.wh); d(x + 8, 32, C.wh); // strings
    // Coffee stain
    d(x + 7, 34, '#a07040'); d(x + 8, 35, '#a07040');

    // Left arm (slightly too long)
    p(x - 2, 31, 5, 8, C.blk);
    p(x - 1, 32, 3, 6, gh);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm
    p(x + 11, 31, 5, 8, C.blk);
    p(x + 12, 32, 3, 6, gh);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);

    // Legs (joggers)
    const jg = '#5a5a6a';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, jg);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, jg);

    // Sneakers (beat-up white)
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#d0d0d0');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#d0d0d0');
    d(x + 1, 45, '#bbb'); d(x + 8, 45, '#bbb');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'INTERN', '#ffffff', 33);
  },
};
