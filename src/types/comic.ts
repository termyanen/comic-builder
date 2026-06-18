/** Pixel unit size — all coordinates are in this grid */
export const PIXEL = 6;
/** Panel canvas size in pixels */
export const CANVAS_SIZE = 420;
/** Grid units per panel side */
export const GRID = 70;
/** Export image size */
export const EXPORT_SIZE = 1080;

export type CharacterId = 'dev' | 'pm' | 'designer' | 'qa' | 'boss' | 'intern' | 'devops' | 'client' | 'both' | 'none';
export type SpeechTail = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right' | 'none';
export type BgThemeId = 'blue' | 'purple' | 'green' | 'red' | 'warm';

export interface BgColors {
  wall: string;
  wallMid: string;
  wallDark: string;
  floor: string;
  desk: string;
  deskDark: string;
  screen: string;
  screenGlow: string;
}
export type MoodId = 'happy' | 'surprised' | 'dead' | 'angry' | 'neutral' | 'smug';
export type BackgroundId = 'office' | 'dark' | 'error' | 'empty' | 'outdoor' | 'meeting' | 'server' | 'home' | 'coffeeshop' | 'bedroom' | 'presentation';
export type PropId = 'none' | 'laptop' | 'coffee' | 'scroll' | 'fire' | 'stars' | 'phone' | 'bug' | 'chart' | 'pizza' | 'beer' | 'trophy' | 'ticket' | 'money';
export type Language = 'ru' | 'en';

export interface PanelData {
  character: CharacterId;
  mood: MoodId;
  background: BackgroundId;
  props: PropId[];
  speech: string;
  caption: string;
  /** Character position offset in grid units (from default position) */
  charX: number;
  charY: number;
  /** Prop position offset in grid units */
  propX: number;
  propY: number;
  /** Speech bubble offset in grid units */
  speechX: number;
  speechY: number;
  /** Speech bubble scale: 0 = auto, positive = wider/taller */
  speechScale: number;
  /** Where the speech tail points from */
  speechTail: SpeechTail;
  /** Background color theme */
  bgTheme: BgThemeId;
}

export interface ComicStrip {
  seriesName: string;
  episodeNumber: string;
  language: Language;
  showWatermark: boolean;
  panels: [PanelData, PanelData, PanelData, PanelData];
}

// --- Registry types ---

export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  /** Draw a filled rect in grid units */
  p: (x: number, y: number, w: number, h: number, color: string) => void;
  /** Draw a single pixel (1x1 grid unit) */
  d: (x: number, y: number, color: string) => void;
  S: number;
  /** Background color theme for backgrounds to use */
  t: BgColors;
}

export interface CharacterDef {
  id: string;
  name: string;
  nameRu: string;
  draw: (dc: DrawContext, xOff: number, mood: MoodId) => void;
}

export interface BackgroundDef {
  id: string;
  name: string;
  nameRu: string;
  draw: (dc: DrawContext) => void;
}

export interface PropDef {
  id: string;
  name: string;
  nameRu: string;
  draw: (dc: DrawContext) => void;
}

export interface MoodDef {
  id: MoodId;
  name: string;
  nameRu: string;
}
