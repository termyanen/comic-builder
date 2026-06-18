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
    // Half-closed dominant eyes
    p(x + 4, 24, 2, 1, C.blk); p(x + 8, 24, 2, 1, C.blk);
    p(x + 5, 27, 4, 1, C.blk); d(x + 9, 28, C.blk);
  } else {
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    p(x + 5, 27, 4, 1, C.blk);
  }
}

export const boss: CharacterDef = {
  id: 'boss',
  name: 'Boss / CTO',
  nameRu: 'Босс / CTO',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair — thinning on top, gray sides
    p(x + 2, 20, 10, 2, '#888');
    p(x + 3, 19, 3, 1, '#888'); // thin patch on top
    p(x + 8, 19, 2, 1, '#888');

    // Face (wider — authoritative)
    p(x + 3, 22, 8, 9, C.skin);
    p(x + 4, 21, 6, 1, C.skin);

    // Ears (slightly bigger)
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin); d(x + 2, 26, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin); d(x + 11, 26, C.skin);

    // Neck
    p(x + 5, 31, 4, 1, C.skin);

    // Suit jacket (dark gray)
    p(x + 2, 32, 10, 7, '#2a2a2a');
    // White shirt underneath
    p(x + 5, 32, 4, 7, '#eee');
    // Tie (red)
    p(x + 6, 32, 2, 6, C.red);
    d(x + 6, 38, C.red); d(x + 7, 38, C.red); // tie knot
    // Jacket lapels
    p(x + 3, 32, 2, 4, '#2a2a2a');
    p(x + 9, 32, 2, 4, '#2a2a2a');
    // Pocket square
    d(x + 3, 33, C.wh); d(x + 4, 33, C.wh);

    // Arms (suit sleeves)
    p(x, 32, 2, 6, '#2a2a2a');
    p(x + 12, 32, 2, 6, '#2a2a2a');
    // Cuffs white
    p(x, 37, 2, 1, '#eee');
    p(x + 12, 37, 2, 1, '#eee');
    // Hands
    p(x, 38, 2, 2, C.skin);
    p(x + 12, 38, 2, 2, C.skin);

    // Legs (dark slacks)
    p(x + 3, 39, 3, 5, '#1a1a1a');
    p(x + 8, 39, 3, 5, '#1a1a1a');

    // Dress shoes
    p(x + 2, 44, 4, 2, '#111');
    p(x + 8, 44, 4, 2, '#111');

    drawFace(dc, x, mood);
  },
};
