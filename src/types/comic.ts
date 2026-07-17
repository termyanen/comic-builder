import type { ReactNode } from 'react';

/** Logical panel size — all sprite coordinates live in this viewBox */
export const VIEW = 420;
/** Legacy grid unit: position sliders move in these units (70 units per panel) */
export const UNIT = VIEW / 70;
/** Export image size */
export const EXPORT_SIZE = 1080;

export type CharacterId = 'hero' | 'robot' | 'pm' | 'boss' | 'qa' | 'designer' | 'devops' | 'intern' | 'client' | 'senior' | 'hr' | 'cat';
export type SpeechKind = 'bubble' | 'terminal' | 'button' | 'sfx' | 'lettering';
export type SpeechTail = 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right' | 'none';
export type BgThemeId = 'peach' | 'sky' | 'aqua' | 'sand' | 'mint' | 'lavender' | 'sunset' | 'slate' | 'rose';
export type MoodId = 'happy' | 'laugh' | 'surprised' | 'dead' | 'angry' | 'neutral' | 'smug' | 'sad';
export type PoseId = 'stand' | 'walk' | 'sit' | 'typing' | 'swing' | 'point' | 'facepalm' | 'celebrate' | 'shrug';
export type BackgroundId = 'plain' | 'hills' | 'desk' | 'office' | 'meeting' | 'server' | 'home' | 'coffeeshop' | 'night' | 'presentation'
  | 'kanban' | 'openspace' | 'bedroom' | 'alert' | 'portal' | 'retro' | 'stadium' | 'tvnight';
export type PropId = 'none' | 'bat' | 'laptop' | 'coffee' | 'phone' | 'wreck'
  | 'scroll' | 'fire' | 'bug' | 'chart' | 'pizza' | 'beer' | 'trophy' | 'money' | 'stars' | 'ticket'
  | 'duck' | 'button' | 'clock' | 'energy' | 'headphones' | 'box' | 'docs' | 'ball' | 'scarf' | 'sofa';
/** Comic-effect overlay: emotion/attention marks floating in the panel */
export type FxId = 'none' | 'idea' | 'question' | 'exclaim' | 'zzz' | 'sweat' | 'anger' | 'hearts' | 'focus'
  | 'impact' | 'hit' | 'boom' | 'dash' | 'dizzy';
/** Voice of the bubble: normal, shouting (spiky), thought (cloud), whisper (dashed), robotic (square) */
export type BubbleStyle = 'normal' | 'shout' | 'think' | 'whisper' | 'robo';
/** Pupil direction — lets characters look at each other */
export type GazeId = 'front' | 'left' | 'right' | 'up';
/** Body orientation: front-facing or a quarter turn into the scene */
export type TurnId = 'front' | 'quarter';
export type Language = 'ru' | 'en';

/** Flat pastel colors a background is drawn with */
export interface BgColors {
  sky: string;
  ground: string;
  groundEdge: string;
  accent: string;
}

/** Character clothing/appearance — overridable per strip, defaults live on the character */
export interface Outfit {
  shirt: string;
  pants: string;
  skin: string;
  /** Accent color: robot body, accessories, etc. */
  accent: string;
}

/** One character slot in a panel — up to two per panel */
export interface CharSlot {
  /** null = empty slot */
  id: CharacterId | null;
  mood: MoodId;
  pose: PoseId;
  /** Prop attached to the pose's hand anchor */
  held: PropId;
  /** Pupil direction */
  gaze: GazeId;
  /** Body orientation — quarter turn faces left, flip mirrors */
  turn: TurnId;
  /** Figure scale around the feet anchor — close-ups (1 = full shot) */
  scale: number;
  /** Mirror horizontally */
  flip: boolean;
  /** Position offset in grid units (from the slot's default position) */
  x: number;
  y: number;
}

export interface PanelData {
  chars: [CharSlot, CharSlot];
  background: BackgroundId;
  props: PropId[];
  speech: string;
  speechKind: SpeechKind;
  speechStyle: BubbleStyle;
  /** Second bubble — in-panel dialogue (always a bubble, anchored right) */
  speech2: string;
  speech2Style: BubbleStyle;
  speech2Tail: SpeechTail;
  speech2X: number;
  speech2Y: number;
  /** Draw the prop in front of the characters */
  propFront: boolean;
  caption: string;
  /** Caption box offset in grid units */
  captionX: number;
  captionY: number;
  /** Prop position offset in grid units + rotation in degrees */
  propX: number;
  propY: number;
  propRot: number;
  /** Comic effect overlay + offset in grid units + rotation in degrees + scale */
  fx: FxId;
  fxX: number;
  fxY: number;
  fxRot: number;
  fxScale: number;
  /** Speech bubble offset in grid units */
  speechX: number;
  speechY: number;
  /** Speech bubble scale: 0 = auto, positive = wider */
  speechScale: number;
  /** Whole-bubble zoom (1 = normal) */
  speechZoom: number;
  speech2Zoom: number;
  /** Lettering (onomatopoeia) fill color and tilt */
  speechColor: string;
  speechRot: number;
  /** Where the speech tail points from */
  speechTail: SpeechTail;
  /** Free tail-tip offset in grid units (dragged in the editor) */
  speechTailX: number;
  speechTailY: number;
  speech2TailX: number;
  speech2TailY: number;
  /** Background color theme */
  bgTheme: BgThemeId;
}

export interface ComicStrip {
  seriesName: string;
  episodeNumber: string;
  /** Account handle for signatures (without @) — independent from the series title */
  authorTag: string;
  language: Language;
  /** Bottom-left watermark on export */
  showWatermark: boolean;
  /** Vertical @authorTag inside panel 4, bottom-right */
  showCornerTag: boolean;
  /** Per-character outfit overrides; merged over each character's defaultOutfit */
  outfits: Partial<Record<CharacterId, Partial<Outfit>>>;
  panels: [PanelData, PanelData, PanelData, PanelData];
}

// --- Registry types ---

export interface CharacterRenderOpts {
  mood: MoodId;
  pose: PoseId;
  outfit: Outfit;
  flip: boolean;
  gaze?: GazeId;
  turn?: TurnId;
  /** Pre-rendered prop node to place at the pose's hand anchor */
  held?: ReactNode;
}

export interface CharacterDef {
  id: CharacterId;
  name: string;
  nameRu: string;
  defaultOutfit: Outfit;
  /** Poses this character supports (drives the pose select in the editor) */
  poses: PoseId[];
  /** Anchor: feet at (0,0), figure grows upward. Placed by PanelContent. */
  render: (opts: CharacterRenderOpts) => ReactNode;
}

export interface PoseDef {
  id: PoseId;
  name: string;
  nameRu: string;
}

export interface FxDef {
  id: FxId;
  name: string;
  nameRu: string;
  /** Anchor: effect center at (0,0). Placed by PanelContent + user offset. */
  render: () => ReactNode;
}

export interface BackgroundDef {
  id: BackgroundId;
  name: string;
  nameRu: string;
  render: (colors: BgColors) => ReactNode;
}

export interface PropDef {
  id: PropId;
  name: string;
  nameRu: string;
  /** Anchor: prop base at (0,0). Placed by PanelContent + user offset. */
  render: () => ReactNode;
}

export interface MoodDef {
  id: MoodId;
  name: string;
  nameRu: string;
}
