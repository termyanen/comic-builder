import type { CharacterDef, DrawContext, MoodId } from '../../types/comic';
import { C } from '../palette';

/**
 * Face layout on 8-wide face block (x+3..x+10):
 *   Eyes at y=24, mouth at y=27-28
 *   Left eye: x+4,x+5  |  Right eye: x+8,x+9 (symmetric: 1+2+2+2+2+1)
 *   Screen coords: y increases DOWN, so y=27 is ABOVE y=28
 */
function drawFace(dc: DrawContext, x: number, mood: MoodId) {
  const { p, d } = dc;

  if (mood === 'happy') {
    // Eyes: dots
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    // Smile: corners UP (y=27), center DOWN (y=28) = ∪
    d(x + 4, 27, C.blk); d(x + 9, 27, C.blk);
    p(x + 5, 28, 4, 1, C.blk);
  } else if (mood === 'surprised') {
    // Big round eyes
    p(x + 4, 23, 2, 3, C.blk); p(x + 8, 23, 2, 3, C.blk);
    // O mouth — centered at x+6.5 (face center), 4px wide
    p(x + 5, 27, 4, 2, C.blk); d(x + 6, 28, C.skin); d(x + 7, 28, C.skin);
  } else if (mood === 'dead') {
    // X eyes
    d(x + 4, 23, C.red); d(x + 5, 24, C.red);
    d(x + 5, 23, C.red); d(x + 4, 24, C.red);
    d(x + 8, 23, C.red); d(x + 9, 24, C.red);
    d(x + 9, 23, C.red); d(x + 8, 24, C.red);
    // Flat mouth
    p(x + 4, 28, 5, 1, C.blk);
    // Soul leaving
    d(x + 12, 19, C.cyan); d(x + 13, 18, C.cyan); d(x + 14, 17, C.cyan);
  } else if (mood === 'angry') {
    // Angry brows (angled inward: \  /)
    d(x + 3, 22, C.blk); d(x + 4, 23, C.blk); d(x + 5, 23, C.blk);
    d(x + 10, 22, C.blk); d(x + 9, 23, C.blk); d(x + 8, 23, C.blk);
    // Eyes
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    // Frown: corners DROP DOWN (3 rows), clearly ∩ not ∪
    d(x + 6, 27, C.blk); d(x + 7, 27, C.blk);
    d(x + 5, 28, C.blk); d(x + 8, 28, C.blk);
    d(x + 4, 29, C.blk); d(x + 9, 29, C.blk);
  } else if (mood === 'smug') {
    // Half-closed eyes
    p(x + 4, 24, 2, 1, C.blk); p(x + 8, 24, 2, 1, C.blk);
    // Smirk: flat left, curving down on right
    p(x + 5, 27, 4, 1, C.blk); d(x + 9, 28, C.blk);
  } else {
    // Neutral
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    p(x + 5, 27, 4, 1, C.blk);
  }
}

export const dev: CharacterDef = {
  id: 'dev',
  name: 'Developer',
  nameRu: 'Разраб',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair (messy/spiky)
    p(x + 2, 19, 10, 3, C.hair_d);
    p(x + 3, 18, 3, 1, C.hair_d);
    p(x + 8, 18, 2, 1, C.hair_d);
    d(x + 5, 17, C.hair_d);

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);

    // Ears
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Body (hoodie)
    p(x + 2, 31, 10, 8, C.shirt_d);
    // Hoodie neckline
    p(x + 4, 31, 6, 1, '#4a7cd8');
    // Pocket
    p(x + 4, 35, 6, 2, '#4a7cd8');
    // Hood strings
    d(x + 5, 32, C.wh); d(x + 8, 32, C.wh);

    // Arms
    p(x, 31, 2, 6, C.shirt_d);
    p(x + 12, 31, 2, 6, C.shirt_d);
    // Hands
    p(x, 37, 2, 2, C.skin);
    p(x + 12, 37, 2, 2, C.skin);

    // Legs (jeans)
    p(x + 3, 39, 3, 5, C.pants);
    p(x + 8, 39, 3, 5, C.pants);

    // Shoes
    p(x + 2, 44, 4, 2, C.blk);
    p(x + 8, 44, 4, 2, C.blk);

    drawFace(dc, x, mood);
  },
};
