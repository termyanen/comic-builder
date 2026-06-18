import type { CharacterDef } from '../../types/comic';
import { C } from '../palette';
import { drawFace, drawShirtLabel } from './drawFace';

export const devops: CharacterDef = {
  id: 'devops',
  name: 'DevOps',
  nameRu: 'DevOps',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Headphones band (drawn before head silhouette)
    p(x + 2, 15, 10, 2, '#1a1a1a');

    // Head silhouette
    p(x + 1, 16, 12, 14, C.blk);
    p(x, 23, 3, 3, C.blk);
    p(x + 11, 23, 3, 3, C.blk);

    // Headphone cups over ears
    p(x, 19, 3, 5, '#2a2a2a');
    p(x + 11, 19, 3, 5, '#2a2a2a');
    d(x + 1, 21, '#14ffec'); d(x + 12, 21, '#14ffec'); // LED accent

    // Hair — very short / shaved sides
    p(x + 2, 18, 10, 3, '#181818');
    p(x + 4, 17, 6, 2, '#181818');

    // Stubble / beard on chin
    p(x + 3, 27, 8, 3, '#2a1a10');
    p(x + 4, 29, 6, 1, '#3a2a18'); // lighter bottom

    // Face
    p(x + 2, 21, 10, 9, C.skin);
    p(x + 2, 21, 3, 2, C.skin_hi);
    d(x + 1, 24, C.skin); d(x + 1, 25, C.skin);
    d(x + 12, 24, C.skin); d(x + 12, 25, C.skin);

    // Neck + body
    p(x, 30, 14, 10, C.blk);
    p(x + 5, 30, 4, 1, C.skin);

    // Black ops turtleneck
    const bl = '#0f0f0f';
    const bl2 = '#252525';
    p(x + 1, 32, 12, 7, bl);
    p(x + 1, 32, 2, 7, bl2);
    p(x + 5, 30, 4, 3, bl);         // turtleneck rolls up
    // Terminal glow on chest
    p(x + 4, 34, 6, 3, '#001a00');
    d(x + 5, 35, '#00ff41'); d(x + 6, 34, '#00ff41');
    d(x + 7, 35, '#00cc33'); d(x + 8, 34, '#00ff41');

    // Left arm
    p(x - 2, 32, 4, 7, C.blk);
    p(x - 1, 33, 2, 5, bl);
    p(x - 2, 38, 4, 3, C.blk);
    p(x - 1, 39, 2, 1, C.skin);

    // Right arm
    p(x + 12, 32, 4, 7, C.blk);
    p(x + 13, 33, 2, 5, bl);
    p(x + 12, 38, 4, 3, C.blk);
    p(x + 13, 39, 2, 1, C.skin);

    // Cargo pants (dark grey)
    const cp = '#2a2a3a';
    p(x + 1, 40, 5, 6, C.blk); p(x + 2, 41, 3, 4, cp);
    p(x + 8, 40, 5, 6, C.blk); p(x + 9, 41, 3, 4, cp);
    // Cargo pocket
    p(x + 2, 41, 2, 2, '#333'); p(x + 3, 42, 1, 1, cp);

    // Tactical boots
    p(x, 45, 7, 3, C.blk); p(x + 1, 46, 5, 1, '#1a1a1a');
    d(x + 1, 45, '#333'); d(x + 3, 45, '#333'); d(x + 5, 45, '#333');
    p(x + 7, 45, 7, 3, C.blk); p(x + 8, 46, 5, 1, '#1a1a1a');
    d(x + 8, 45, '#333'); d(x + 10, 45, '#333'); d(x + 12, 45, '#333');

    drawFace(dc, x, mood);
    drawShirtLabel(dc, x, 'OPS', '#2a8a4a', 37);
  },
};
