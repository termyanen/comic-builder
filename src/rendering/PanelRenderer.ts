import type { PanelData, DrawContext, SpeechTail, BgColors } from '../types/comic';
import { PIXEL, CANVAS_SIZE, GRID } from '../types/comic';
import { getCharacter, getBackground, getProp } from '../sprites/registry';
import { C } from '../sprites/palette';
import { BG_THEMES } from '../sprites/backgrounds/themes';

function createDrawContext(ctx: CanvasRenderingContext2D, scale: number, t: BgColors): DrawContext {
  const S = PIXEL * scale;
  return {
    ctx,
    S,
    t,
    p(x, y, w, h, color) {
      const px = Math.round(x * S);
      const py = Math.round(y * S);
      ctx.fillStyle = color;
      ctx.fillRect(px, py, Math.round((x + w) * S) - px, Math.round((y + h) * S) - py);
    },
    d(x, y, color) {
      const px = Math.round(x * S);
      const py = Math.round(y * S);
      ctx.fillStyle = color;
      ctx.fillRect(px, py, Math.round((x + 1) * S) - px, Math.round((y + 1) * S) - py);
    },
  };
}

function wrapTextPx(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

const COMIC_FONT = '"Russo One", sans-serif';

interface SpeechOpts {
  offsetX: number;
  offsetY: number;
  sizeAdjust: number;
  tail: SpeechTail;
}

function drawSpeech(dc: DrawContext, text: string, fromRight: boolean, opts: SpeechOpts) {
  if (!text) return;
  const { ctx, S, p } = dc;
  const fontSize = Math.round(S * 1.8);

  ctx.font = `bold ${fontSize}px ${COMIC_FONT}`;
  ctx.textBaseline = 'top';

  const maxBw = Math.min(GRID - 8, 30 + opts.sizeAdjust);
  const lines = wrapTextPx(ctx, text, (maxBw - 4) * S);
  const maxLinePx = lines.reduce((a, l) => Math.max(a, ctx.measureText(l).width), 0);

  const bw = Math.max(12, Math.ceil(maxLinePx / S) + 4);
  const bh = lines.length * 4 + 4;
  const defaultBx = fromRight ? Math.max(2, GRID - 2 - bw) : 2;
  const bx = defaultBx + opts.offsetX;
  const by = 2 + opts.offsetY;

  const [tailSide, tailPos] = opts.tail === 'none' ? ['none', 'left'] : opts.tail.split('-') as [string, 'left' | 'center' | 'right'];
  const tailW = 3;
  const tailX = tailPos === 'center' ? bx + Math.floor(bw / 2) - 1
              : tailPos === 'right'  ? bx + bw - tailW - 1
              : bx + 1;

  if (tailSide === 'top') {
    p(tailX, by - 2, tailW, 3, C.wh);
    p(bx, by, bw, bh, C.wh);
  } else if (tailSide === 'bottom') {
    p(bx, by, bw, bh, C.wh);
    p(tailX, by + bh - 1, tailW, 3, C.wh);
  } else {
    p(bx, by, bw, bh, C.wh);
  }

  ctx.fillStyle = C.blk;
  lines.forEach((l, i) => ctx.fillText(l, (bx + 2) * S, (by + 2 + i * 4) * S));
}

function drawCaption(dc: DrawContext, text: string) {
  if (!text) return;
  const { ctx, S, p } = dc;
  const fontSize = Math.round(S * 1.6);
  p(0, GRID - 4, GRID, 4, '#050510');
  ctx.fillStyle = C.cyan;
  ctx.font = `bold ${fontSize}px ${COMIC_FONT}`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text.substring(0, 36), 2 * S, (GRID - 1) * S);
}

function drawBorder(dc: DrawContext) {
  const { p } = dc;
  const c = '#080808';
  p(0, 0, GRID, 2, c);
  p(0, 0, 2, GRID, c);
  p(0, GRID - 2, GRID, 2, c);
  p(GRID - 2, 0, 2, GRID, c);
}

/** Character X positions for 70-unit grid */
const CHAR_X: Record<string, number> = {
  dev: 18,
  pm: 36,
  designer: 18,
  qa: 18,
  boss: 36,
  intern: 19,
  devops: 18,
  client: 36,
  both_dev: 8,
  both_pm: 44,
};

export function renderPanel(canvas: HTMLCanvasElement, panel: PanelData, scale = 1) {
  const size = CANVAS_SIZE * scale;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, size, size);

  const dc = createDrawContext(ctx, scale, BG_THEMES[panel.bgTheme] ?? BG_THEMES.blue);
  const S = PIXEL * scale;

  // 1. Background
  const bg = getBackground(panel.background);
  if (bg) bg.draw(dc);

  // Atmospheric dim
  ctx.fillStyle = 'rgba(84, 84, 84, 0.45)';
  ctx.fillRect(0, 0, size, size);

  // 2. Props with offset
  for (const propId of panel.props) {
    if (propId === 'none') continue;
    const prop = getProp(propId);
    if (prop) {
      ctx.save();
      ctx.translate(panel.propX * S, panel.propY * S);
      prop.draw(dc);
      ctx.restore();
    }
  }

  // 3. Characters with offset
  if (panel.character !== 'none') {
    ctx.save();
    ctx.translate(panel.charX * S, panel.charY * S);
    if (panel.character === 'both') {
      getCharacter('dev')?.draw(dc, CHAR_X.both_dev, panel.mood);
      getCharacter('pm')?.draw(dc, CHAR_X.both_pm, 'smug');
    } else {
      const charX = CHAR_X[panel.character] ?? 18;
      getCharacter(panel.character)?.draw(dc, charX, panel.mood);
    }
    ctx.restore();
  }

  // 4. Speech bubble
  drawSpeech(dc, panel.speech, panel.character === 'pm', {
    offsetX: panel.speechX,
    offsetY: panel.speechY,
    sizeAdjust: panel.speechScale,
    tail: panel.speechTail,
  });

  // 5. Border, then caption on top
  drawBorder(dc);
  drawCaption(dc, panel.caption);
}
