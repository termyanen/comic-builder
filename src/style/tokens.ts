import type { BgColors, BgThemeId } from '../types/comic';

/**
 * Style tokens for the hand-drawn cartoon look.
 * Everything visual funnels through here so the strip stays coherent.
 */

export const INK = '#141414';

/** Stroke widths (in 420-viewBox units) */
export const STROKE = {
  panel: 9,
  outline: 5,
  face: 4,
  bubble: 5,
  /** Arms — thinner than legs so the figure carries its weight low */
  limb: 13,
  limbFill: 7,
  leg: 17,
  legFill: 10,
};

export const RADIUS = {
  panel: 26,
  bubble: 18,
  terminal: 16,
  chip: 10,
  button: 20,
};

export const FONT = {
  hand: '"Balsamiq Sans", "Comic Sans MS", cursive',
  mono: 'ui-monospace, Menlo, Consolas, monospace',
};

/** Default hero outfit — brand blue (@termyanen), user-overridable via strip.outfits */
export const HERO_OUTFIT = {
  shirt: '#3D8EB9',
  pants: '#3D4455',
  skin: '#FFFFFF',
  accent: '#F2A03D',
};

export const ROBOT_OUTFIT = {
  shirt: '#B9BDB9',
  pants: '#8F948F',
  skin: '#F5EFDC',
  accent: '#F5D547',
};

export const BG_THEMES: Record<BgThemeId, BgColors> = {
  peach:    { sky: '#FAE8CF', ground: '#C6D6DE', groundEdge: '#F5D9A8', accent: '#E8C48A' },
  sky:      { sky: '#DEEDF7', ground: '#B6CEDD', groundEdge: '#C9DEED', accent: '#9FBFD4' },
  aqua:     { sky: '#E0F2F0', ground: '#B5D8D3', groundEdge: '#CBE6E1', accent: '#8FC4BC' },
  sand:     { sky: '#F6EBD9', ground: '#E0D0B2', groundEdge: '#EEE0C4', accent: '#C9B58C' },
  mint:     { sky: '#E9F3DD', ground: '#BFD8C2', groundEdge: '#D7E8B8', accent: '#A8C79A' },
  lavender: { sky: '#EFE4F2', ground: '#C9C6DE', groundEdge: '#E0CBE8', accent: '#B9A8D0' },
  sunset:   { sky: '#FAD9C4', ground: '#C4B0C8', groundEdge: '#EFC3AE', accent: '#D9A38F' },
  slate:    { sky: '#E3E8EC', ground: '#B7C3CC', groundEdge: '#CFD8DE', accent: '#9FAFBA' },
  rose:     { sky: '#FBE3DC', ground: '#D6C2C6', groundEdge: '#F2CFC4', accent: '#DBA8A8' },
};

export const BG_THEME_LABELS: Record<BgThemeId, { ru: string; en: string }> = {
  peach: { ru: '🍑 Персик', en: '🍑 Peach' },
  sky: { ru: '🌤 Небо', en: '🌤 Sky' },
  aqua: { ru: '🌊 Аква', en: '🌊 Aqua' },
  sand: { ru: '🏖 Песок', en: '🏖 Sand' },
  mint: { ru: '🌿 Мята', en: '🌿 Mint' },
  lavender: { ru: '💜 Лаванда', en: '💜 Lavender' },
  sunset: { ru: '🌅 Закат', en: '🌅 Sunset' },
  slate: { ru: '🌫 Серый', en: '🌫 Slate' },
  rose: { ru: '🌸 Роза', en: '🌸 Rose' },
};

/** UI-inset (terminal / button) colors */
export const UI = {
  terminalBg: '#181818',
  terminalTitle: '#9A9A9A',
  terminalText: '#F2F2F2',
  chipBg: '#2E2E2E',
  chipBorder: '#8A8A8A',
  buttonBg: '#F5C518',
  buttonText: '#141414',
};
