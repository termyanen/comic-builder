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
    d(x + 12, 19, C.cyan); d(x + 13, 18, C.cyan); d(x + 14, 17, C.cyan);
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

export const devops: CharacterDef = {
  id: 'devops',
  name: 'DevOps',
  nameRu: 'DevOps',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Headphones ON head (over hair)
    p(x + 2, 17, 10, 2, '#222'); // band
    p(x + 2, 19, 2, 4, '#333'); // left cup
    p(x + 10, 19, 2, 4, '#333'); // right cup
    d(x + 2, 20, '#14ffec'); d(x + 11, 20, '#14ffec'); // LED lights

    // Hair (dark, short, under headphones)
    p(x + 4, 19, 6, 3, '#1a1010');

    // Beard / stubble
    p(x + 4, 28, 6, 2, '#2a1a10');
    d(x + 3, 28, '#2a1a10'); d(x + 10, 28, '#2a1a10');

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Black turtleneck / ops shirt
    p(x + 2, 31, 10, 8, '#111');
    p(x + 4, 31, 6, 2, '#222'); // collar
    // Infrared/terminal glow on chest
    p(x + 5, 34, 4, 2, '#001a00');
    d(x + 6, 35, '#00ff41'); d(x + 7, 34, '#00ff41');
    d(x + 5, 34, '#00cc33');

    // Arms
    p(x, 31, 2, 6, '#111');
    p(x + 12, 31, 2, 6, '#111');
    p(x, 37, 2, 2, C.skin);
    p(x + 12, 37, 2, 2, C.skin);

    // Cargo pants (dark)
    p(x + 3, 39, 3, 5, '#2a2a3a');
    p(x + 8, 39, 3, 5, '#2a2a3a');
    // Cargo pocket
    p(x + 3, 40, 2, 2, '#333');

    // Boots
    p(x + 2, 44, 4, 2, '#1a1a1a');
    p(x + 8, 44, 4, 2, '#1a1a1a');
    d(x + 2, 45, '#333'); d(x + 8, 45, '#333');

    drawFace(dc, x, mood);
  },
};
