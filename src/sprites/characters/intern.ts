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
    d(x + 12, 19, C.cyan); d(x + 13, 18, C.cyan);
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
    // Neutral with slight nervousness — smaller eyes
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    // Nervous sweat drop
    d(x + 10, 23, '#88ccff');
    p(x + 5, 27, 4, 1, C.blk);
  }
}

export const intern: CharacterDef = {
  id: 'intern',
  name: 'Intern',
  nameRu: 'Стажёр',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair — messy, light brown, unkempt
    p(x + 2, 19, 10, 4, '#6b4a28');
    p(x + 3, 18, 8, 2, '#6b4a28');
    d(x + 4, 17, '#6b4a28'); d(x + 7, 17, '#6b4a28'); d(x + 9, 18, '#6b4a28');

    // Face (slightly rounder — young)
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);
    p(x + 2, 24, 1, 2, C.skin); p(x + 11, 24, 1, 2, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Oversized hoodie (gray, too big)
    p(x + 1, 31, 12, 8, '#7a7a8a');
    p(x + 4, 31, 6, 1, '#6a6a7a'); // neckline
    p(x + 4, 35, 6, 2, '#6a6a7a'); // pocket
    // Hood strings
    d(x + 5, 32, C.wh); d(x + 8, 32, C.wh);
    // Sleeves hang low (oversized)
    p(x - 1, 31, 3, 7, '#7a7a8a');
    p(x + 12, 31, 3, 7, '#7a7a8a');
    // Hands
    p(x - 1, 38, 3, 2, C.skin);
    p(x + 12, 38, 3, 2, C.skin);

    // Legs (joggers, loose)
    p(x + 3, 39, 3, 5, '#5a5a6a');
    p(x + 8, 39, 3, 5, '#5a5a6a');

    // Shoes (sneakers, scuffed)
    p(x + 2, 44, 4, 2, '#ccc');
    p(x + 8, 44, 4, 2, '#ccc');
    d(x + 2, 44, '#aaa'); d(x + 8, 44, '#aaa');

    drawFace(dc, x, mood);
  },
};
