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
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    p(x + 5, 27, 4, 1, C.blk);
  }
}

export const qa: CharacterDef = {
  id: 'qa',
  name: 'QA Tester',
  nameRu: 'Тестировщик',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair — short, neat, dark
    p(x + 2, 19, 10, 3, '#1a1a1a');
    p(x + 3, 18, 8, 2, '#1a1a1a');

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);

    // Glasses (round)
    p(x + 3, 23, 3, 2, '#2a6a2a');
    p(x + 8, 23, 3, 2, '#2a6a2a');
    p(x + 6, 23, 2, 1, '#2a6a2a');
    d(x + 4, 23, '#adc'); d(x + 9, 23, '#adc');

    // Ears
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Body — dark green shirt
    p(x + 2, 31, 10, 8, '#1e5c1e');
    // Collar
    p(x + 5, 31, 4, 1, '#174a17');
    // Checkmark on shirt (QA style)
    d(x + 5, 34, C.wh); d(x + 6, 35, C.wh); d(x + 7, 34, C.wh); d(x + 8, 33, C.wh);

    // Arms
    p(x, 31, 2, 6, '#1e5c1e');
    p(x + 12, 31, 2, 6, '#1e5c1e');
    // Hands — one holds clipboard
    p(x, 37, 2, 2, C.skin);
    p(x + 12, 37, 2, 2, C.skin);

    // Clipboard in right hand
    p(x + 13, 33, 4, 6, '#ddd');
    p(x + 14, 34, 2, 4, C.wh);
    d(x + 14, 35, '#2a6a2a'); d(x + 14, 36, '#2a6a2a'); d(x + 15, 36, '#2a6a2a');
    d(x + 14, 37, '#ccc');

    // Legs (khaki)
    p(x + 3, 39, 3, 5, '#8a7a5a');
    p(x + 8, 39, 3, 5, '#8a7a5a');

    // Shoes
    p(x + 2, 44, 4, 2, '#3a2a1a');
    p(x + 8, 44, 4, 2, '#3a2a1a');

    drawFace(dc, x, mood);
  },
};
