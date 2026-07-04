import w400latin from './assets/fonts/balsamiq-400-latin.woff2';
import w400cyr from './assets/fonts/balsamiq-400-cyrillic.woff2';
import w700latin from './assets/fonts/balsamiq-700-latin.woff2';
import w700cyr from './assets/fonts/balsamiq-700-cyrillic.woff2';

/**
 * Self-hosted Balsamiq Sans (OFL) — no external font requests.
 * Same subsets + unicode-ranges Google Fonts serves for latin/cyrillic.
 */
export interface AppFontFace {
  url: string;
  weight: number;
  range: string;
}

const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const CYRILLIC = 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116';

export const FONT_FACES: AppFontFace[] = [
  { url: w400cyr, weight: 400, range: CYRILLIC },
  { url: w400latin, weight: 400, range: LATIN },
  { url: w700cyr, weight: 700, range: CYRILLIC },
  { url: w700latin, weight: 700, range: LATIN },
];
