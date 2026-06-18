import type { CharacterDef, DrawContext, MoodId } from '../../types/comic';
import { C } from '../palette';

function drawFace(dc: DrawContext, x: number, mood: MoodId) {
  const { p, d } = dc;

  if (mood === 'happy') {
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    // Smile: corners UP (y=27), center DOWN (y=28) = ∪
    d(x + 4, 27, C.blk); d(x + 9, 27, C.blk);
    p(x + 5, 28, 4, 1, C.blk);
  } else if (mood === 'surprised') {
    p(x + 4, 23, 2, 3, C.blk); p(x + 8, 23, 2, 3, C.blk);
    // O mouth — centered at x+6.5 (face center), 4px wide
    p(x + 5, 27, 4, 2, C.blk); d(x + 6, 28, C.skin); d(x + 7, 28, C.skin);
  } else if (mood === 'dead') {
    d(x + 4, 23, C.red); d(x + 5, 24, C.red);
    d(x + 5, 23, C.red); d(x + 4, 24, C.red);
    d(x + 8, 23, C.red); d(x + 9, 24, C.red);
    d(x + 9, 23, C.red); d(x + 8, 24, C.red);
    p(x + 4, 28, 5, 1, C.blk);
    d(x + 12, 19, C.cyan); d(x + 13, 18, C.cyan); d(x + 14, 17, C.cyan);
  } else if (mood === 'angry') {
    // Angry brows angled inward
    d(x + 3, 22, C.blk); d(x + 4, 23, C.blk); d(x + 5, 23, C.blk);
    d(x + 10, 22, C.blk); d(x + 9, 23, C.blk); d(x + 8, 23, C.blk);
    d(x + 4, 24, C.blk); d(x + 5, 24, C.blk);
    d(x + 8, 24, C.blk); d(x + 9, 24, C.blk);
    // Frown: corners DROP DOWN (3 rows), clearly ∩ not ∪
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

export const pm: CharacterDef = {
  id: 'pm',
  name: 'Project Manager',
  nameRu: 'Менеджер',
  draw(dc, xOff, mood) {
    const { p, d } = dc;
    const x = xOff;

    // Hair (neat, side-parted)
    p(x + 2, 19, 10, 3, C.hair_p);
    p(x + 2, 19, 5, 1, '#a07850');

    // Face
    p(x + 3, 22, 8, 8, C.skin);
    p(x + 4, 21, 6, 1, C.skin);

    // Glasses
    p(x + 3, 23, 3, 2, '#667');
    p(x + 8, 23, 3, 2, '#667');
    p(x + 6, 23, 2, 1, '#667');
    // Lens shine
    d(x + 4, 23, '#aac');
    d(x + 9, 23, '#aac');

    // Ears
    d(x + 2, 24, C.skin); d(x + 2, 25, C.skin);
    d(x + 11, 24, C.skin); d(x + 11, 25, C.skin);

    // Neck
    p(x + 5, 30, 4, 1, C.skin);

    // Body (polo shirt)
    p(x + 2, 31, 10, 8, C.shirt_p);
    // Collar
    p(x + 3, 31, 2, 2, C.wh);
    p(x + 9, 31, 2, 2, C.wh);
    // Button line
    p(x + 6, 31, 2, 5, C.wh);
    // Buttons
    d(x + 6, 32, C.blk); d(x + 6, 34, C.blk);

    // Arms
    p(x, 31, 2, 6, C.shirt_p);
    p(x + 12, 31, 2, 6, C.shirt_p);
    // Hands
    p(x, 37, 2, 2, C.skin);
    p(x + 12, 37, 2, 2, C.skin);

    // Legs (slacks)
    p(x + 3, 39, 3, 5, C.pants);
    p(x + 8, 39, 3, 5, C.pants);

    // Shoes (brown)
    p(x + 2, 44, 4, 2, '#4a3020');
    p(x + 8, 44, 4, 2, '#4a3020');

    drawFace(dc, x, mood);
  },
};
