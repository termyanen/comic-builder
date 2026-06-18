import type { DrawContext, MoodId } from '../../types/comic';
import { C } from '../palette';

const CHAR_FONT = '"Russo One", sans-serif';

/** Renders a text label on the shirt with a dark outline for readability. */
export function drawShirtLabel(dc: DrawContext, x: number, label: string, color = '#ffffff', yGrid = 35) {
  const { ctx, S } = dc;
  const fontSize = Math.round(S * 2.6);
  const cx = (x + 7) * S;
  const cy = yGrid * S;
  ctx.save();
  ctx.font = `bold ${fontSize}px ${CHAR_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Dark outline: draw shifted in 4 directions
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillText(label, cx - 1, cy - 1);
  ctx.fillText(label, cx + 1, cy - 1);
  ctx.fillText(label, cx - 1, cy + 1);
  ctx.fillText(label, cx + 1, cy + 1);
  // Main text
  ctx.fillStyle = color;
  ctx.fillText(label, cx, cy);
  ctx.restore();
}

/**
 * Time Fantasy style face renderer.
 * Face skin occupies x+2..x+11 (10 wide), y=21..y=29 (9 tall).
 * Called AFTER head silhouette and skin fill have been drawn.
 *
 * Feature anchors (all relative to character xOff):
 *   Eyes: left p(x+3,23,3,2)  right p(x+8,23,3,2)
 *   Brows (angry): y=21–22 area
 *   Mouth: y=26–28 area
 */
export function drawFace(dc: DrawContext, x: number, mood: MoodId, sk = C.skin) {
  const { p, d } = dc;

  if (mood === 'dead') {
    // X eyes (red, 3×3 area y=22–24)
    d(x + 3, 22, C.red); d(x + 5, 22, C.red); d(x + 4, 23, C.red);
    d(x + 3, 24, C.red); d(x + 5, 24, C.red);
    d(x + 8, 22, C.red); d(x + 10, 22, C.red); d(x + 9, 23, C.red);
    d(x + 8, 24, C.red); d(x + 10, 24, C.red);
    p(x + 4, 27, 6, 1, C.blk);
    // Soul drifting up-right
    d(x + 13, 20, C.cyan); d(x + 14, 19, C.cyan); d(x + 14, 18, C.cyan);
    return;
  }

  if (mood === 'surprised') {
    // Wide-open eyes 4×3
    p(x + 2, 22, 4, 3, C.blk); p(x + 8, 22, 4, 3, C.blk);
    p(x + 3, 23, 2, 2, '#d0e8ff'); p(x + 9, 23, 2, 2, '#d0e8ff');
    // O-mouth (5×3 hollow box)
    p(x + 4, 26, 5, 3, C.blk);
    p(x + 5, 27, 3, 1, sk);
    return;
  }

  // Normal eyes
  if (mood === 'smug') {
    p(x + 3, 24, 3, 1, C.blk);
    p(x + 8, 23, 3, 2, C.blk);
  } else {
    p(x + 3, 23, 3, 2, C.blk); p(x + 8, 23, 3, 2, C.blk);
    // Iris highlight (top pixel of each eye)
    d(x + 4, 23, '#b0ccff'); d(x + 9, 23, '#b0ccff');
  }

  // Angry brows — inner side lower, outer side higher
  if (mood === 'angry') {
    d(x + 3, 21, C.blk); d(x + 4, 21, C.blk); d(x + 5, 22, C.blk);
    d(x + 8, 22, C.blk); d(x + 9, 21, C.blk); d(x + 10, 21, C.blk);
  }

  // Mouth
  if (mood === 'happy') {
    // ∪ smile: corners UP (y=27), bar DOWN (y=28)
    d(x + 3, 27, C.blk); d(x + 10, 27, C.blk);
    p(x + 4, 28, 6, 1, C.blk);
  } else if (mood === 'angry') {
    // 3-row frown: center UP (y=26), corners DOWN (y=28)
    d(x + 6, 26, C.blk); d(x + 7, 26, C.blk);
    d(x + 4, 27, C.blk); d(x + 9, 27, C.blk);
    d(x + 3, 28, C.blk); d(x + 10, 28, C.blk);
  } else if (mood === 'smug') {
    // Smirk: flat left, right corner drops
    p(x + 3, 27, 6, 1, C.blk); d(x + 10, 28, C.blk);
  } else {
    // Neutral flat line
    p(x + 4, 27, 6, 1, C.blk);
  }
}
