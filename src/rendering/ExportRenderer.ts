import type { ComicStrip } from '../types/comic';
import { EXPORT_SIZE, CANVAS_SIZE } from '../types/comic';
import { renderPanel } from './PanelRenderer';

export function exportComic(strip: ComicStrip): void {
  const exp = document.createElement('canvas');
  exp.width = EXPORT_SIZE;
  exp.height = EXPORT_SIZE;
  const ctx = exp.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, EXPORT_SIZE, EXPORT_SIZE);

  const gap = 6;
  const size = Math.floor((EXPORT_SIZE - gap * 3) / 2);
  const scale = size / CANVAS_SIZE;

  // Render each panel at export resolution so text stays crisp
  const positions: [number, number][] = [[0, 0], [1, 0], [0, 1], [1, 1]];

  positions.forEach(([col, row], i) => {
    const tmpCanvas = document.createElement('canvas');
    renderPanel(tmpCanvas, strip.panels[i], scale);
    ctx.drawImage(tmpCanvas, col * (size + gap), row * (size + gap), size, size);
  });

  // Watermark
  if (strip.showWatermark) {
    ctx.fillStyle = '#14ffec';
    ctx.font = 'bold 28px "Russo One", sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`@${strip.seriesName}  ${strip.episodeNumber}`, 16, 1064);
  }

  // Download
  const link = document.createElement('a');
  link.download = `${strip.seriesName}_${strip.episodeNumber}.png`;
  link.href = exp.toDataURL('image/png');
  link.click();
}
