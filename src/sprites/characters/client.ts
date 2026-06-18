import type { CharacterDef, DrawContext, MoodId } from '../../types/comic';
import { C } from '../palette';

function drawFace(dc: DrawContext, x: number, mood: MoodId) {
  const { p, d } = dc;
  if (mood === 'happy') {
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    d(x + 4, 27, C.blk); d(x + 9, 27, C.blk);
    p(x + 5, 28, 4, 1, C.blk);
  } else if (mood === 'surprised') {
    p(x + 4, 23, 2, 3, C.blk); p(x + 8, 23, 2, 3, C.blk);
    p(x + 5, 27, 4, 2, C.blk); d(x + 6, 28, C.skin); d(x + 7, 28, C.skin);
  } else if (mood === 'dead') {
    d(x + 4, 23, C.red); d(x + 5, 24, C.red); d(x + 5, 23, C.red); d(x + 4, 24, C.red);
    d(x + 8, 23, C.red); d(x + 9, 24, C.red); d(x + 9, 23, C.red); d(x + 8, 24, C.red);
    p(x + 4, 28, 5, 1, C.blk);
  } else if (mood === 'angry') {
    d(x + 3, 22, C.blk); d(x + 4, 23, C.blk); d(x + 5, 23, C.blk);
    d(x + 10, 22, C.blk); d(x + 9, 23, C.blk); d(x + 8, 23, C.blk);
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    d(x + 6, 27, C.blk); d(x + 7, 27, C.blk);
    d(x + 5, 28, C.blk); d(x + 8, 28, C.blk);
    d(x + 4, 29, C.blk); d(x + 9, 29, C.blk);
  } else if (mood === 'smug') {
    p(x + 4, 24, 2, 1, C.blk); p(x + 8, 24, 2, 1, C.blk);
    p(x + 5, 27, 4, 1, C.blk); d(x + 9, 28, C.blk);
  } else {
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    p(x + 5, 27, 4, 1, C.blk);
  }
}

export const client: CharacterDef = {
  id: 'client',
  name: 'Client',
  nameRu: 'Клиент',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair — neat, combed, medium brown
    p(x + 2, 19, 10, 3, '#5a3a20');
    p(x + 3, 18, 8, 2, '#5a3a20');
    p(x + 3, 19, 4, 1, '#7a5030'); // parting highlight

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Business casual — light blue shirt
    p(x + 2, 31, 10, 8, '#4a7aaa');
    // Collar
    p(x + 4, 31, 2, 2, '#5a8aba');
    p(x + 8, 31, 2, 2, '#5a8aba');
    // Buttons
    d(x + 6, 32, C.wh); d(x + 6, 34, C.wh); d(x + 6, 36, C.wh);

    // Arms
    p(x, 31, 2, 6, '#4a7aaa');
    p(x + 12, 31, 2, 6, '#4a7aaa');
    p(x, 37, 2, 2, C.skin);
    // Phone in right hand
    p(x + 12, 35, 3, 5, '#111');
    p(x + 12, 36, 3, 3, '#1a3a6e');
    d(x + 13, 37, '#4a8aee');

    // Pants (gray chinos)
    p(x + 3, 39, 3, 5, '#8a8a9a');
    p(x + 8, 39, 3, 5, '#8a8a9a');

    // Loafers
    p(x + 2, 44, 4, 2, '#5a3a20');
    p(x + 8, 44, 4, 2, '#5a3a20');

    drawFace(dc, x, mood);
  },
};
