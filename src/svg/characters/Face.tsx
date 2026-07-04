import type { GazeId, MoodId } from '../../types/comic';
import { INK, STROKE } from '../../style/tokens';

interface FaceProps {
  mood: MoodId;
  /** Face center (between the eyes) */
  cx: number;
  cy: number;
  /** Pupil direction — shifts the dot eyes */
  gaze?: GazeId;
}

const GAZE_SHIFT: Record<GazeId, [number, number]> = {
  front: [0, 0],
  left: [-4.5, 1],
  right: [4.5, 1],
  up: [0, -4],
};

/**
 * Shared blob-face: dot eyes + brows + mouth. Emotions live entirely here,
 * so every humanoid character gets the full mood set for free.
 */
export function Face({ mood, cx, cy, gaze = 'front' }: FaceProps) {
  const eyeDX = 13;
  const sw = STROKE.face;
  const [gx, gy] = GAZE_SHIFT[gaze] ?? GAZE_SHIFT.front;
  const eyes = { lx: cx - eyeDX + gx, rx: cx + eyeDX + gx, y: cy + gy };
  const mouthY = cy + 22;

  switch (mood) {
    case 'happy':
      return (
        <g>
          <circle cx={eyes.lx} cy={eyes.y} r={4.5} fill={INK} />
          <circle cx={eyes.rx} cy={eyes.y} r={4.5} fill={INK} />
          <path d={`M ${cx - 12} ${mouthY - 3} Q ${cx} ${mouthY + 10} ${cx + 12} ${mouthY - 3}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case 'laugh':
      return (
        <g>
          {/* closed laughing eyes ^ ^ */}
          <path d={`M ${cx - 19} ${cy + 2} Q ${cx - 13} ${cy - 6} ${cx - 7} ${cy + 2}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${cx + 7} ${cy + 2} Q ${cx + 13} ${cy - 6} ${cx + 19} ${cy + 2}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          {/* wide open mouth with tongue */}
          <path d={`M ${cx - 14} ${mouthY - 4} A 14 13 0 0 0 ${cx + 14} ${mouthY - 4} Z`} fill={INK} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <path d={`M ${cx - 7} ${mouthY + 6} Q ${cx} ${mouthY + 1} ${cx + 7} ${mouthY + 6} Q ${cx} ${mouthY + 11} ${cx - 7} ${mouthY + 6} Z`} fill="#E38FA8" />
        </g>
      );
    case 'angry':
      return (
        <g>
          <path d={`M ${eyes.lx - 8} ${eyes.y - 13} L ${eyes.lx + 6} ${eyes.y - 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${eyes.rx + 8} ${eyes.y - 13} L ${eyes.rx - 6} ${eyes.y - 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <circle cx={eyes.lx} cy={eyes.y} r={4.5} fill={INK} />
          <circle cx={eyes.rx} cy={eyes.y} r={4.5} fill={INK} />
          <path d={`M ${cx - 11} ${mouthY + 4} Q ${cx} ${mouthY - 6} ${cx + 11} ${mouthY + 4}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case 'surprised':
      return (
        <g>
          <circle cx={eyes.lx} cy={eyes.y} r={6.5} fill={INK} />
          <circle cx={eyes.rx} cy={eyes.y} r={6.5} fill={INK} />
          <path d={`M ${eyes.lx - 7} ${eyes.y - 12} L ${eyes.lx + 7} ${eyes.y - 12}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${eyes.rx - 7} ${eyes.y - 12} L ${eyes.rx + 7} ${eyes.y - 12}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <ellipse cx={cx} cy={mouthY + 2} rx={7} ry={9} fill={INK} />
        </g>
      );
    case 'dead':
      return (
        <g>
          {[eyes.lx, eyes.rx].map(x => (
            <g key={x}>
              <path d={`M ${x - 6} ${eyes.y - 6} L ${x + 6} ${eyes.y + 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
              <path d={`M ${x + 6} ${eyes.y - 6} L ${x - 6} ${eyes.y + 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
            </g>
          ))}
          <path d={`M ${cx - 12} ${mouthY} q 4 -6 8 0 q 4 6 8 0 q 4 -6 8 0`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case 'smug':
      return (
        <g>
          <path d={`M ${eyes.lx - 7} ${eyes.y - 12} L ${eyes.lx + 7} ${eyes.y - 14}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${eyes.rx - 7} ${eyes.y - 18} L ${eyes.rx + 7} ${eyes.y - 12}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <circle cx={eyes.lx} cy={eyes.y} r={4.5} fill={INK} />
          <circle cx={eyes.rx} cy={eyes.y} r={4.5} fill={INK} />
          <path d={`M ${cx - 4} ${mouthY + 2} Q ${cx + 8} ${mouthY + 2} ${cx + 13} ${mouthY - 6}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case 'sad':
      return (
        <g>
          <path d={`M ${eyes.lx - 6} ${eyes.y} Q ${eyes.lx} ${eyes.y - 6} ${eyes.lx + 6} ${eyes.y}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${eyes.rx - 6} ${eyes.y} Q ${eyes.rx} ${eyes.y - 6} ${eyes.rx + 6} ${eyes.y}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${cx - 10} ${mouthY + 5} Q ${cx} ${mouthY - 4} ${cx + 10} ${mouthY + 5}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          {/* tear */}
          <path d={`M ${eyes.rx + 12} ${eyes.y + 6} q 5 8 0 12 q -5 -4 0 -12`} fill="#7EC8E3" stroke={INK} strokeWidth={2} />
        </g>
      );
    default: // neutral
      return (
        <g>
          <circle cx={eyes.lx} cy={eyes.y} r={4.5} fill={INK} />
          <circle cx={eyes.rx} cy={eyes.y} r={4.5} fill={INK} />
          <path d={`M ${cx - 9} ${mouthY} L ${cx + 9} ${mouthY}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
  }
}
