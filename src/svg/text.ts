import { useEffect, useState } from 'react';

/** Shared offscreen canvas for text measurement */
let measureCtx: CanvasRenderingContext2D | null = null;

export function measureText(text: string, font: string): number {
  if (!measureCtx) {
    measureCtx = document.createElement('canvas').getContext('2d')!;
  }
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
}

/**
 * Wrap text to maxWidth. Explicit newlines are respected,
 * then each paragraph is word-wrapped.
 */
export function wrapText(text: string, font: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split('\n')) {
    const words = para.split(' ').filter(Boolean);
    if (words.length === 0) {
      lines.push('');
      continue;
    }
    let cur = '';
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (measureText(test, font) > maxWidth && cur) {
        lines.push(cur);
        cur = w;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

export function maxLineWidth(lines: string[], font: string): number {
  return lines.reduce((a, l) => Math.max(a, measureText(l, font)), 0);
}

/**
 * Re-render once webfonts load, so bubble measurements use real metrics
 * instead of the fallback font's.
 */
export function useFontsLoaded(): boolean {
  const [loaded, setLoaded] = useState(document.fonts.status === 'loaded');
  useEffect(() => {
    if (loaded) return;
    let alive = true;
    document.fonts.ready.then(() => { if (alive) setLoaded(true); });
    return () => { alive = false; };
  }, [loaded]);
  return loaded;
}
