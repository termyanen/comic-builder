import type { ComicStrip } from '../types/comic';
import { VIEW, EXPORT_SIZE } from '../types/comic';
import { INK, FONT } from '../style/tokens';
import { PanelContent } from './PanelContent';

const MARGIN = 25;
const GUTTER = 30;
const PANEL = (EXPORT_SIZE - MARGIN * 2 - GUTTER) / 2; // 500
const SCALE = PANEL / VIEW;

interface Props {
  strip: ComicStrip;
  /** Extra <style> injected for export (embedded @font-face) */
  fontCss?: string;
}

/** Single panel at full export size — for carousel export (one PNG per panel) */
export function PanelExportSvg({ strip, index, fontCss }: { strip: ComicStrip; index: number; fontCss?: string }) {
  // asymmetric margins: a clear band below the panel keeps the caption off the frame
  const TOP = 14;
  const BOTTOM = 34;
  const size = EXPORT_SIZE - TOP - BOTTOM;
  const left = (EXPORT_SIZE - size) / 2;
  const scale = size / VIEW;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${EXPORT_SIZE} ${EXPORT_SIZE}`}
      width={EXPORT_SIZE} height={EXPORT_SIZE}>
      {fontCss && <style>{fontCss}</style>}
      <rect x={0} y={0} width={EXPORT_SIZE} height={EXPORT_SIZE} fill="#fff" />
      <g transform={`translate(${left}, ${TOP}) scale(${scale})`}>
        {/* carousel panels are standalone images, so every one carries the tag */}
        <PanelContent panel={strip.panels[index]} strip={strip} uid={`exs-${index}`}
          cornerTag={strip.showCornerTag ? `@${(strip.authorTag ?? strip.seriesName).toUpperCase()}` : undefined} />
      </g>
      {strip.showWatermark && (
        // inset keeps the caption clear of rounded-corner crops in feeds
        <text x={left + size - 26} y={EXPORT_SIZE - 10} textAnchor="end" fill={INK} opacity={0.85}
          fontFamily={FONT.hand} fontWeight={700} fontSize={16}>
          {strip.seriesName} · {strip.episodeNumber} · {index + 1}/4
        </text>
      )}
    </svg>
  );
}

const V_WIDTH = 1080;
const V_MARGIN = 24;
const V_GUTTER = 24;
const V_PANEL = V_WIDTH - V_MARGIN * 2; // 1032
export const V_HEIGHT = V_MARGIN + V_PANEL * 4 + V_GUTTER * 3 + 44;

/** Vertical 1x4 strip — full-width panels for Telegram / stories feeds */
export function VerticalStripSvg({ strip, fontCss }: Props) {
  const scale = V_PANEL / VIEW;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${V_WIDTH} ${V_HEIGHT}`}
      width={V_WIDTH} height={V_HEIGHT}>
      {fontCss && <style>{fontCss}</style>}
      <rect x={0} y={0} width={V_WIDTH} height={V_HEIGHT} fill="#fff" />
      {strip.panels.map((panel, i) => (
        <g key={i} transform={`translate(${V_MARGIN}, ${V_MARGIN + i * (V_PANEL + V_GUTTER)}) scale(${scale})`}>
          <PanelContent panel={panel} strip={strip} uid={`exv-${i}`}
            cornerTag={i === 3 && strip.showCornerTag ? `@${(strip.authorTag ?? strip.seriesName).toUpperCase()}` : undefined} />
        </g>
      ))}
      {strip.showWatermark && (
        <text x={V_MARGIN + 2} y={V_HEIGHT - 12} fill={INK} opacity={0.85}
          fontFamily={FONT.hand} fontWeight={700} fontSize={22}>
          {strip.seriesName} · {strip.episodeNumber}
        </text>
      )}
    </svg>
  );
}

/** Full 2x2 strip — white gutters, watermark. Serialized for PNG export. */
export function StripSvg({ strip, fontCss }: Props) {
  const positions: [number, number][] = [[0, 0], [1, 0], [0, 1], [1, 1]];

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${EXPORT_SIZE} ${EXPORT_SIZE}`}
      width={EXPORT_SIZE} height={EXPORT_SIZE}>
      {fontCss && <style>{fontCss}</style>}
      <rect x={0} y={0} width={EXPORT_SIZE} height={EXPORT_SIZE} fill="#fff" />

      {positions.map(([col, row], i) => (
        <g key={i} transform={`translate(${MARGIN + col * (PANEL + GUTTER)}, ${MARGIN + row * (PANEL + GUTTER)}) scale(${SCALE})`}>
          <PanelContent panel={strip.panels[i]} strip={strip} uid={`ex-${i}`}
            cornerTag={i === 3 && strip.showCornerTag ? `@${(strip.authorTag ?? strip.seriesName).toUpperCase()}` : undefined} />
        </g>
      ))}

      {strip.showWatermark && (
        <text x={MARGIN + 2} y={EXPORT_SIZE - 6} fill={INK} opacity={0.85}
          fontFamily={FONT.hand} fontWeight={700} fontSize={19}>
          {strip.seriesName} · {strip.episodeNumber}
        </text>
      )}
    </svg>
  );
}
