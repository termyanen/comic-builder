import type { ComicStrip } from '../types/comic';
import { normalizeStrip } from '../store/comicStore';

export function exportStripJson(strip: ComicStrip): void {
  const blob = new Blob([JSON.stringify(strip, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = `${strip.seriesName}_${strip.episodeNumber}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function importStripJson(file: File): Promise<ComicStrip> {
  const text = await file.text();
  return normalizeStrip(JSON.parse(text));
}
