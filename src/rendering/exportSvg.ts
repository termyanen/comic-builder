import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ComicStrip } from '../types/comic';
import { EXPORT_SIZE } from '../types/comic';
import { StripSvg, PanelExportSvg, VerticalStripSvg, V_HEIGHT } from '../svg/StripSvg';
import { FONT_FACES } from '../fontMeta';

let cachedFontCss: string | null = null;

/**
 * SVG rasterized via <img> can't fetch resources at all, so the self-hosted
 * webfont must be inlined as base64 data URIs inside the SVG itself.
 */
async function getEmbeddedFontCss(): Promise<string> {
  if (cachedFontCss) return cachedFontCss;
  let result = '';
  for (const face of FONT_FACES) {
    const ab: ArrayBuffer = await (await fetch(face.url)).arrayBuffer();
    const buf = new Uint8Array(ab);
    let bin = '';
    for (let i = 0; i < buf.length; i += 0x8000) {
      bin += String.fromCharCode.apply(null, Array.from(buf.subarray(i, i + 0x8000)));
    }
    result += `@font-face{font-family:'Balsamiq Sans';font-style:normal;font-weight:${face.weight};`
      + `src:url(data:font/woff2;base64,${btoa(bin)}) format('woff2');unicode-range:${face.range};}\n`;
  }
  cachedFontCss = result;
  return result;
}

async function rasterizeSvg(markup: string, width = EXPORT_SIZE, height = EXPORT_SIZE): Promise<string> {
  const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = 'sync';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('SVG rasterization failed'));
      img.src = url;
    });
    // Give the rasterizer a tick to register the embedded font
    await new Promise(r => setTimeout(r, 50));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadPng(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function exportComic(strip: ComicStrip): Promise<void> {
  // Real font metrics must be in before bubbles are measured
  await document.fonts.load('700 21px "Balsamiq Sans"');
  const fontCss = await getEmbeddedFontCss();

  const markup = renderToStaticMarkup(createElement(StripSvg, { strip, fontCss }));
  downloadPng(await rasterizeSvg(markup), `${strip.seriesName}_${strip.episodeNumber}.png`);
}

/** Vertical 1x4 strip — Telegram / stories format */
export async function exportVertical(strip: ComicStrip): Promise<void> {
  await document.fonts.load('700 21px "Balsamiq Sans"');
  const fontCss = await getEmbeddedFontCss();

  const markup = renderToStaticMarkup(createElement(VerticalStripSvg, { strip, fontCss }));
  downloadPng(await rasterizeSvg(markup, 1080, V_HEIGHT), `${strip.seriesName}_${strip.episodeNumber}_vertical.png`);
}

/** Warm the font cache so the first real export doesn't stall on the network */
export function preloadExportAssets(): void {
  getEmbeddedFontCss().catch(() => { /* offline is fine — export will retry */ });
}

/** Square + vertical + carousel in one go */
export async function exportAll(strip: ComicStrip): Promise<void> {
  await exportComic(strip);
  await new Promise(r => setTimeout(r, 400));
  await exportVertical(strip);
  await new Promise(r => setTimeout(r, 400));
  await exportCarousel(strip);
}

/** One PNG per panel — Instagram carousel format */
export async function exportCarousel(strip: ComicStrip): Promise<void> {
  await document.fonts.load('700 21px "Balsamiq Sans"');
  const fontCss = await getEmbeddedFontCss();

  for (let i = 0; i < 4; i++) {
    const markup = renderToStaticMarkup(createElement(PanelExportSvg, { strip, index: i, fontCss }));
    downloadPng(await rasterizeSvg(markup), `${strip.seriesName}_${strip.episodeNumber}_p${i + 1}.png`);
    // Browsers may drop rapid successive downloads
    await new Promise(r => setTimeout(r, 350));
  }
}
