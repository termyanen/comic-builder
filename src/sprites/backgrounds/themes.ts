import type { BgThemeId, BgColors } from '../../types/comic';

export const BG_THEMES: Record<BgThemeId, BgColors> = {
  blue: {
    wall:      '#0f3460',
    wallMid:   '#16213e',
    wallDark:  '#0c1a30',
    floor:     '#1e3a5f',
    desk:      '#2d5a8e',
    deskDark:  '#1e3a5f',
    screen:    '#0a0a1a',
    screenGlow:'#0d7377',
  },
  purple: {
    wall:      '#2d1b69',
    wallMid:   '#1a0e4a',
    wallDark:  '#100830',
    floor:     '#231555',
    desk:      '#4a2e8e',
    deskDark:  '#231555',
    screen:    '#080012',
    screenGlow:'#9b59b6',
  },
  green: {
    wall:      '#0a3020',
    wallMid:   '#061e14',
    wallDark:  '#031208',
    floor:     '#0a2a18',
    desk:      '#1a5a30',
    deskDark:  '#0a2a18',
    screen:    '#000a04',
    screenGlow:'#00e676',
  },
  red: {
    wall:      '#3a0f10',
    wallMid:   '#260a0b',
    wallDark:  '#180508',
    floor:     '#2a0a0b',
    desk:      '#6a1a1c',
    deskDark:  '#2a0a0b',
    screen:    '#0a0002',
    screenGlow:'#ff4444',
  },
  warm: {
    wall:      '#3a2010',
    wallMid:   '#261408',
    wallDark:  '#180d04',
    floor:     '#2a1808',
    desk:      '#6a3a1a',
    deskDark:  '#2a1808',
    screen:    '#0a0400',
    screenGlow:'#ff9500',
  },
};

export const BG_THEME_LABELS: Record<BgThemeId, string> = {
  blue:   'Ночной синий',
  purple: 'Фиолетовый',
  green:  'Хакер зелёный',
  red:    'Красная тревога',
  warm:   'Тёплый янтарь',
};
