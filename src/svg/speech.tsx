import type { ReactNode } from 'react';
import type { BubbleStyle, SpeechKind, SpeechTail } from '../types/comic';
import { VIEW, UNIT } from '../types/comic';
import { INK, STROKE, RADIUS, FONT, UI } from '../style/tokens';
import { wrapText, maxLineWidth, measureText } from './text';

export interface SpeechOpts {
  text: string;
  kind: SpeechKind;
  offsetX: number;
  offsetY: number;
  sizeAdjust: number;
  tail: SpeechTail;
  /** Bubble voice (only for kind='bubble') */
  style?: BubbleStyle;
  /** Anchor bubble to the right edge (second speaker) */
  anchorRight?: boolean;
  /** Default top position override */
  baseY?: number;
  /** Whole-bubble scale around its anchor corner */
  zoom?: number;
  /** Free tail-tip offset in px (dragged in the editor) */
  tailDx?: number;
  tailDy?: number;
  /** data-drag id for the tail tip handle */
  tailDragId?: string;
  /** Lettering fill color and tilt */
  color?: string;
  rotate?: number;
}

/** Scales a speech element around its anchor so position stays put */
function ZoomG({ z, ox, oy, children }: { z: number; ox: number; oy: number; children: ReactNode }) {
  if (z === 1) return <>{children}</>;
  return <g transform={`translate(${ox} ${oy}) scale(${z}) translate(${-ox} ${-oy})`}>{children}</g>;
}

const PAD_X = 18;
const PAD_Y = 14;
const MARGIN = 16;

interface TailGeo {
  side: 'top' | 'bottom';
  baseX: number;
  baseW: number;
  tipX: number;
  tipY: number;
  /** Bubble edge Y the tail grows from */
  edgeY: number;
}

function tailGeometry(tail: SpeechTail, bx: number, by: number, bw: number, bh: number, tailDx = 0, tailDy = 0): TailGeo | null {
  if (tail === 'none') return null;
  const [side, pos] = tail.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right'];
  const baseX = pos === 'center' ? bx + bw / 2 : pos === 'right' ? bx + bw - 46 : bx + 30;
  const baseW = 22;
  const tipDx = pos === 'right' ? 14 : pos === 'left' ? -8 : 4;
  const edgeY = side === 'bottom' ? by + bh : by;
  const tipY = side === 'bottom' ? edgeY + 30 : edgeY - 30;
  return { side, baseX, baseW, tipX: baseX + tipDx + tailDx, tipY: tipY + tailDy, edgeY };
}

/** Invisible drag handle on the tail tip */
function TailHandle({ geo, dragId }: { geo: TailGeo; dragId?: string }) {
  if (!dragId) return null;
  return <circle cx={geo.tipX} cy={geo.tipY} r={15} fill="transparent" data-drag={dragId} />;
}

/**
 * Tail that merges seamlessly with the bubble border:
 * a closed stroked triangle whose base sits deep inside the bubble,
 * then a white patch hides the base stroke — only the legs stay visible,
 * erasing the border segment between them.
 */
function BubbleTail({ geo, dashed }: { geo: TailGeo; dashed?: boolean }) {
  const { side, baseX, baseW, tipX, tipY, edgeY } = geo;
  const inset = side === 'bottom' ? -8 : 8;
  const baseY = edgeY + inset;
  const coverY = side === 'bottom' ? baseY - 6 : edgeY + 2.6;
  const coverH = side === 'bottom' ? edgeY - 2.6 - (baseY - 6) : baseY + 6 - coverY;
  return (
    <g>
      <path d={`M ${baseX} ${baseY} L ${tipX} ${tipY} L ${baseX + baseW} ${baseY} Z`}
        fill="#fff" stroke={INK} strokeWidth={STROKE.bubble} strokeLinejoin="round"
        strokeDasharray={dashed ? '7 6' : undefined} />
      <rect x={baseX - 4} y={coverY} width={baseW + 8} height={coverH} fill="#fff" />
    </g>
  );
}

/**
 * Shout tail: open path — white fill erases the jagged border between
 * the legs, stroke draws only the two legs. Sits at the spike baseline.
 */
function ShoutTail({ geo }: { geo: TailGeo }) {
  const { side, baseX, baseW, tipX, tipY, edgeY } = geo;
  const dir = side === 'bottom' ? 1 : -1;
  const tip = tipY + dir * 10;
  return (
    <g>
      {/* fill reaches into the bubble to erase the jagged border stroke fully */}
      <path d={`M ${baseX - 1} ${edgeY - dir * 5} L ${tipX} ${tip} L ${baseX + baseW + 1} ${edgeY - dir * 5} Z`}
        fill="#fff" stroke="none" />
      {/* legs start at the spike baseline */}
      <path d={`M ${baseX} ${edgeY} L ${tipX} ${tip} M ${baseX + baseW} ${edgeY} L ${tipX} ${tip}`}
        fill="none" stroke={INK} strokeWidth={STROKE.bubble} strokeLinecap="round" />
    </g>
  );
}

/** Thought tail: descending circles along the base→tip vector */
function ThinkTail({ geo }: { geo: TailGeo }) {
  const { side, baseX, edgeY, tipX, tipY } = geo;
  const dir = side === 'bottom' ? 1 : -1;
  const sx = baseX + 10;
  const sy = edgeY + dir * 8;
  const steps: [number, number][] = [[0.15, 7], [0.55, 5], [0.9, 3]];
  return (
    <g fill="#fff" stroke={INK} strokeWidth={3.5}>
      {steps.map(([t, r]) => (
        <circle key={t} cx={sx + (tipX - sx) * t} cy={sy + (tipY - sy) * t} r={r} />
      ))}
    </g>
  );
}

/** Jagged shout-bubble outline around the text box */
function spikyRectD(bx: number, by: number, bw: number, bh: number, sp = 8): string {
  const pts: [number, number][] = [];
  const step = 26;
  for (let x = bx; x < bx + bw; x += step) {
    pts.push([x, by], [Math.min(x + step / 2, bx + bw), by - sp]);
  }
  for (let y = by; y < by + bh; y += step) {
    pts.push([bx + bw, y], [bx + bw + sp, Math.min(y + step / 2, by + bh)]);
  }
  for (let x = bx + bw; x > bx; x -= step) {
    pts.push([x, by + bh], [Math.max(x - step / 2, bx), by + bh + sp]);
  }
  for (let y = by + bh; y > by; y -= step) {
    pts.push([bx, y], [bx - sp, Math.max(y - step / 2, by)]);
  }
  return `M ${pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ')} Z`;
}

function Bubble({ text, offsetX, offsetY, sizeAdjust, tail, style = 'normal', anchorRight, baseY, zoom = 1, tailDx = 0, tailDy = 0, tailDragId }: SpeechOpts) {
  const robo = style === 'robo';
  const fontSize = robo ? 18 : 21;
  const lineH = robo ? 25 : 27;
  const fontFamily = robo ? FONT.mono : FONT.hand;
  const font = `700 ${fontSize}px ${fontFamily}`;

  const maxW = Math.min(VIEW - MARGIN * 2 - PAD_X * 2, 250 + sizeAdjust * UNIT * 2);
  const lines = wrapText(text, font, maxW);
  const bw = Math.max(90, maxLineWidth(lines, font) + PAD_X * 2);
  const bh = lines.length * lineH + PAD_Y * 2;

  const bx = (anchorRight ? VIEW - MARGIN - bw : MARGIN) + offsetX;
  const by = (baseY ?? MARGIN) + offsetY;
  const tailGeo = tailGeometry(tail, bx, by, bw, bh, tailDx, tailDy);

  const body = style === 'shout'
    ? <path d={spikyRectD(bx, by, bw, bh)} fill="#fff" stroke={INK} strokeWidth={STROKE.bubble} strokeLinejoin="round" />
    : (
      <rect x={bx} y={by} width={bw} height={bh}
        rx={style === 'think' ? Math.min(30, bh / 2) : robo ? 3 : RADIUS.bubble}
        fill="#fff" stroke={INK} strokeWidth={STROKE.bubble}
        strokeDasharray={style === 'whisper' ? '7 6' : undefined} />
    );

  return (
    <ZoomG z={zoom} ox={anchorRight ? bx + bw : bx} oy={by}>
      {body}
      {tailGeo && (style === 'think'
        ? <ThinkTail geo={tailGeo} />
        : style === 'shout'
        ? <ShoutTail geo={tailGeo} />
        : <BubbleTail geo={tailGeo} dashed={style === 'whisper'} />)}
      {tailGeo && <TailHandle geo={tailGeo} dragId={tailDragId} />}
      <text fontFamily={fontFamily} fontWeight={700} fontSize={fontSize} fill={INK}
        fontStyle={style === 'whisper' ? 'italic' : undefined}>
        {lines.map((l, i) => (
          // baseline centered within each line box: line center + ~0.35em
          <tspan key={i} x={bx + bw / 2} y={by + PAD_Y + (i + 0.5) * lineH + fontSize * 0.35} textAnchor="middle">{l}</tspan>
        ))}
      </text>
    </ZoomG>
  );
}

function Terminal({ text, offsetX, offsetY, sizeAdjust, tail, zoom = 1, tailDx = 0, tailDy = 0, tailDragId }: SpeechOpts) {
  const titleSize = 16;
  const textSize = 20;
  const lineH = 34;
  const handFont = `400 ${textSize}px ${FONT.hand}`;
  const monoFont = `700 ${textSize}px ${FONT.mono}`;

  const rawLines = text.split('\n').filter(l => l.trim() !== '');
  const title = rawLines[0] ?? '';
  const body = rawLines.slice(1);

  const chipPadX = 14;
  const widths = [
    measureText(title, `400 ${titleSize}px ${FONT.hand}`),
    ...body.map(l => l.startsWith('$')
      ? measureText(l.slice(1).trim(), monoFont) + chipPadX * 2 + 30
      : measureText(l, handFont)),
  ];
  const bw = Math.min(VIEW - MARGIN * 2, Math.max(...widths, 160) + PAD_X * 2 + sizeAdjust * UNIT * 2);
  const bh = PAD_Y + 26 + body.length * lineH + PAD_Y;

  const bx = MARGIN + offsetX;
  const by = MARGIN + offsetY;
  const tailGeo = tailGeometry(tail, bx, by, bw, bh, tailDx, tailDy);

  let y = by + PAD_Y + 26;
  const rows = body.map((l, i) => {
    const rowY = y;
    y += lineH;
    if (l.startsWith('$')) {
      const cmd = l.slice(1).trim();
      const chipW = measureText(cmd, monoFont) + chipPadX * 2 + 30;
      return (
        <g key={i}>
          <rect x={bx + PAD_X} y={rowY} width={chipW} height={30} rx={RADIUS.chip}
            fill={UI.chipBg} stroke={UI.chipBorder} strokeWidth={2.5} />
          <text x={bx + PAD_X + chipPadX} y={rowY + 21} fontFamily={FONT.mono} fontSize={14} fill={UI.terminalTitle}>{'>_'}</text>
          <text x={bx + PAD_X + chipPadX + 26} y={rowY + 22} fontFamily={FONT.mono} fontWeight={700} fontSize={textSize} fill={UI.terminalText}>{cmd}</text>
        </g>
      );
    }
    return (
      <text key={i} x={bx + PAD_X} y={rowY + 24} fontFamily={FONT.hand} fontSize={textSize} fill={UI.terminalText}>{l}</text>
    );
  });

  return (
    <ZoomG z={zoom} ox={bx} oy={by}>
      {tailGeo && (
        // base sunk 6px into the box so no antialiasing seam shows
        <path d={`M ${tailGeo.baseX} ${tailGeo.edgeY + (tailGeo.side === 'bottom' ? -6 : 6)} L ${tailGeo.tipX} ${tailGeo.tipY} L ${tailGeo.baseX + tailGeo.baseW} ${tailGeo.edgeY + (tailGeo.side === 'bottom' ? -6 : 6)} Z`}
          fill={UI.terminalBg} stroke="none" />
      )}
      <rect x={bx} y={by} width={bw} height={bh} rx={RADIUS.terminal} fill={UI.terminalBg} />
      <text x={bx + PAD_X} y={by + PAD_Y + 12} fontFamily={FONT.hand} fontSize={titleSize} fill={UI.terminalTitle}>{title}</text>
      {rows}
      {tailGeo && <TailHandle geo={tailGeo} dragId={tailDragId} />}
    </ZoomG>
  );
}

function ButtonPill({ text, offsetX, offsetY, zoom = 1 }: SpeechOpts) {
  const fontSize = 26;
  const font = `700 ${fontSize}px ${FONT.hand}`;
  const label = text.split('\n')[0];
  const tw = measureText(label, font);
  const iconW = 34;
  const bw = tw + PAD_X * 2 + iconW + 10;
  const bh = 52;
  const bx = (VIEW - bw) / 2 + offsetX;
  const by = 40 + offsetY;
  const iconX = bx + PAD_X + tw + 10;
  const iconY = by + (bh - 30) / 2;

  return (
    <ZoomG z={zoom} ox={bx + bw / 2} oy={by + bh / 2}>
      <rect x={bx} y={by} width={bw} height={bh} rx={RADIUS.button} fill={UI.buttonBg} stroke={INK} strokeWidth={STROKE.bubble} />
      <text x={bx + PAD_X} y={by + bh / 2 + fontSize * 0.35} fontFamily={FONT.hand} fontWeight={700} fontSize={fontSize} fill={UI.buttonText}>{label}</text>
      {/* Return-key icon */}
      <rect x={iconX} y={iconY} width={30} height={30} rx={8} fill={INK} />
      <path d={`M ${iconX + 22} ${iconY + 9} v 7 h -12`} fill="none" stroke={UI.buttonBg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`M ${iconX + 14} ${iconY + 12} l -5 4 l 5 4`} fill="none" stroke={UI.buttonBg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </ZoomG>
  );
}

/** Big onomatopoeia lettering: colored fill with a thick ink outline, tiltable */
function Lettering({ text, offsetX, offsetY, zoom = 1, color = '#F5D547', rotate = 0 }: SpeechOpts) {
  const fontSize = 58;
  const lineH = 62;
  const cx = VIEW / 2 + offsetX;
  const cy = 100 + offsetY;
  const lines = text.split('\n');
  return (
    <ZoomG z={zoom} ox={cx} oy={cy}>
      <text transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}
        fontFamily={FONT.hand} fontWeight={700} fontSize={fontSize}
        fill={color} stroke={INK} strokeWidth={9} strokeLinejoin="round"
        paintOrder="stroke" letterSpacing={2}>
        {lines.map((l, i) => (
          <tspan key={i} x={cx} y={cy + (i - (lines.length - 1) / 2) * lineH + fontSize * 0.35} textAnchor="middle">{l}</tspan>
        ))}
      </text>
    </ZoomG>
  );
}

function SfxText({ text, offsetX, offsetY, zoom = 1 }: SpeechOpts) {
  const fontSize = 24;
  const lines = text.split('\n');
  return (
    <ZoomG z={zoom} ox={VIEW / 2 + offsetX} oy={56 + offsetY}>
      <text fontFamily={FONT.hand} fontWeight={700} fontSize={fontSize} fill={INK}>
        {lines.map((l, i) => (
          <tspan key={i} x={VIEW / 2 + offsetX} y={56 + offsetY + i * 30} textAnchor="middle">{l}</tspan>
        ))}
      </text>
    </ZoomG>
  );
}

export function Speech(opts: SpeechOpts) {
  if (!opts.text) return null;
  switch (opts.kind) {
    case 'terminal': return <Terminal {...opts} />;
    case 'button': return <ButtonPill {...opts} />;
    case 'sfx': return <SfxText {...opts} />;
    case 'lettering': return <Lettering {...opts} />;
    default: return <Bubble {...opts} />;
  }
}
