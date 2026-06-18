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

export const designer: CharacterDef = {
  id: 'designer',
  name: 'Designer',
  nameRu: 'Дизайнер',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair — long wavy with dyed tip (purple)
    p(x + 2, 18, 10, 4, '#2a1a3a');
    p(x + 3, 17, 8, 2, '#2a1a3a');
    p(x + 2, 22, 2, 3, '#2a1a3a'); // left side hair
    p(x + 10, 22, 2, 3, '#2a1a3a'); // right side hair
    d(x + 4, 16, '#9b59b6'); d(x + 6, 15, '#9b59b6'); d(x + 8, 16, '#9b59b6'); // dyed tips

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);

    // Ears
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);
    // Earring
    d(x + 2, 26, C.yellow);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Body — colorful t-shirt (magenta/pink)
    p(x + 2, 31, 10, 8, '#c0186a');
    // Collar V-neck
    d(x + 6, 31, '#e01a7a'); d(x + 7, 31, '#e01a7a');
    d(x + 5, 32, '#e01a7a'); d(x + 8, 32, '#e01a7a');
    // Star/design on shirt
    d(x + 6, 35, C.yellow); d(x + 7, 34, C.yellow);
    d(x + 8, 35, C.yellow); d(x + 7, 36, C.yellow);
    d(x + 6, 36, C.yellow);

    // Arms
    p(x, 31, 2, 6, '#c0186a');
    p(x + 12, 31, 2, 6, '#c0186a');
    // Hands
    p(x, 37, 2, 2, C.skin);
    p(x + 12, 37, 2, 2, C.skin);

    // Legs (white jeans)
    p(x + 3, 39, 3, 5, '#d0d0d0');
    p(x + 8, 39, 3, 5, '#d0d0d0');

    // Shoes (white sneakers)
    p(x + 2, 44, 4, 2, C.wh);
    p(x + 8, 44, 4, 2, C.wh);
    d(x + 2, 44, '#aaa'); d(x + 8, 44, '#aaa');

    drawFace(dc, x, mood);
  },
};
