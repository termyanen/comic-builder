import type { CharacterRenderOpts, PoseId } from '../../types/comic';
import { INK, STROKE, FONT } from '../../style/tokens';
import { Face } from './Face';

/** Pick a readable text color for the shirt tag */
export function contrastColor(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum > 150 ? INK : '#FFFFFF';
}

/** Outlined capsule limb along a path: ink underlay + colored overlay */
function Capsule({ d, color, sleeve, w = STROKE.limb, wf = STROKE.limbFill }:
  { d: string; color: string; sleeve?: string; w?: number; wf?: number }) {
  const common = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={w} {...common} />
      <path d={d} stroke={color} strokeWidth={wf} {...common} />
      {sleeve && (
        // short sleeve: shirt-colored stroke over the top of the arm; no own outline —
        // the arm's ink underlay shows as a thin edge at the sides
        <path d={d} pathLength={100} strokeDasharray="22 200" stroke={sleeve}
          strokeWidth={w - 2} {...common} />
      )}
    </g>
  );
}

type Pt = [number, number];

interface PoseGeo {
  /** Vertical shift of torso+head (sitting lowers the body) */
  dy: number;
  legs: [string, string];
  arms: [string, string];
  /** Foot positions — dark shoes ground the figure */
  feet: [Pt, Pt];
  /** Hand positions — small palms at the arm ends */
  hands: [Pt, Pt];
  /** Where a held prop's base attaches */
  held: Pt;
}

const STAND_LEGS: [string, string] = ['M -13 -54 L -15 -6', 'M 13 -54 L 16 -6'];
const STAND_FEET: [Pt, Pt] = [[-15, -6], [16, -6]];
const HANG_ARM_L = 'M -26 -110 Q -34 -86 -31 -60';
const HANG_ARM_R = 'M 26 -110 Q 34 -86 31 -60';

/**
 * Pose geometry. Anchor: feet at (0,0). Shoulders at (±26, -110+dy),
 * hips at (±13, -54+dy). "Forward" is -x; flip mirrors the whole figure.
 */
const POSE_GEO: Record<PoseId, PoseGeo> = {
  stand: {
    dy: 0,
    legs: STAND_LEGS,
    arms: [HANG_ARM_L, HANG_ARM_R],
    feet: STAND_FEET,
    hands: [[-31, -60], [31, -60]],
    held: [31, -60],
  },
  walk: {
    dy: 0,
    legs: ['M -13 -54 L -31 -8', 'M 13 -54 L 29 -10'],
    arms: ['M -26 -110 Q -42 -94 -46 -74', 'M 26 -110 Q 34 -88 26 -66'],
    feet: [[-31, -8], [29, -10]],
    hands: [[-46, -74], [26, -66]],
    held: [-46, -74],
  },
  sit: {
    dy: 34,
    legs: ['M -12 -20 L -34 -17 L -35 2', 'M 4 -18 L -25 -14 L -26 3'],
    arms: ['M -26 -76 Q -32 -56 -24 -44', 'M 26 -76 Q 30 -52 10 -42'],
    feet: [[-35, 2], [-26, 3]],
    hands: [[-24, -44], [10, -42]],
    held: [10, -42],
  },
  typing: {
    dy: 34,
    legs: ['M -12 -20 L -34 -17 L -35 2', 'M 4 -18 L -25 -14 L -26 3'],
    // bent elbows reaching to the keyboard
    arms: ['M -26 -76 L -31 -60 L -15 -47', 'M 26 -76 L 31 -58 L 13 -46'],
    feet: [[-35, 2], [-26, 3]],
    hands: [[-15, -47], [13, -46]],
    held: [-1, -42],
  },
  swing: {
    dy: 0,
    legs: ['M -13 -54 L -26 -6', 'M 13 -54 L 27 -6'],
    // hands reach past the head silhouette so the grip stays visible
    arms: ['M -26 -110 Q 2 -134 36 -150', 'M 26 -110 Q 36 -138 46 -154'],
    feet: [[-26, -6], [27, -6]],
    hands: [[36, -150], [46, -154]],
    held: [42, -152],
  },
  point: {
    dy: 0,
    legs: STAND_LEGS,
    arms: ['M -26 -108 Q -46 -108 -64 -105', HANG_ARM_R],
    feet: STAND_FEET,
    hands: [[-64, -105], [31, -60]],
    held: [-64, -105],
  },
  facepalm: {
    dy: 0,
    legs: STAND_LEGS,
    arms: ['M -26 -110 Q -42 -138 -16 -152', HANG_ARM_R],
    feet: STAND_FEET,
    hands: [[-16, -152], [31, -60]],
    held: [31, -60],
  },
  celebrate: {
    dy: 0,
    legs: STAND_LEGS,
    arms: ['M -26 -110 Q -44 -140 -44 -172', 'M 26 -110 Q 44 -140 44 -172'],
    feet: STAND_FEET,
    hands: [[-44, -172], [44, -172]],
    held: [44, -172],
  },
  shrug: {
    dy: 0,
    legs: STAND_LEGS,
    arms: ['M -26 -110 Q -44 -116 -54 -102', 'M 26 -110 Q 44 -116 54 -102'],
    feet: STAND_FEET,
    hands: [[-54, -102], [54, -102]],
    held: [54, -102],
  },
};

export const ALL_POSES: PoseId[] = ['stand', 'walk', 'sit', 'typing', 'swing', 'point', 'facepalm', 'celebrate', 'shrug'];

/** Poses where the far arm is raised and must not be tucked on a quarter turn */
const RAISED_ARM_POSES = new Set<PoseId>(['swing', 'celebrate', 'shrug']);

/** Character-distinguishing add-ons drawn on the shared body */
export interface Accessories {
  /** Role tag printed on the shirt (DEV, PM, BOSS…) */
  tag?: string;
  /** Tie in the accent color */
  tie?: boolean;
  glasses?: boolean;
  hat?: 'beret' | 'cap' | 'propeller' | 'bun';
  /** Bald with side tufts (boss) */
  hairTufts?: boolean;
  beard?: boolean;
  /** Whole-figure scale (intern is smaller) */
  scale?: number;
  /** Torso width — silhouette variety across the cast (default 60) */
  torsoW?: number;
}

function Hat({ kind, dy, accent }: { kind: NonNullable<Accessories['hat']>; dy: number; accent: string }) {
  const topY = -190 + dy;
  switch (kind) {
    case 'beret':
      return (
        <g transform={`rotate(-8 0 ${topY})`}>
          <ellipse cx={-4} cy={topY} rx={26} ry={10} fill={accent} stroke={INK} strokeWidth={3} />
          <circle cx={-4} cy={topY - 10} r={3.5} fill={accent} stroke={INK} strokeWidth={2.5} />
        </g>
      );
    case 'cap':
      return (
        <g>
          <path d={`M -26 ${topY + 4} Q 0 ${topY - 22} 26 ${topY + 4} Z`} fill={accent} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <path d={`M -26 ${topY + 4} Q -38 ${topY + 2} -46 ${topY + 8} Q -36 ${topY + 12} -24 ${topY + 9} Z`} fill={accent} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        </g>
      );
    case 'propeller':
      return (
        <g>
          <path d={`M -24 ${topY + 4} Q 0 ${topY - 20} 24 ${topY + 4} Z`} fill={accent} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          <line x1={0} y1={topY - 8} x2={0} y2={topY - 16} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={-11} cy={topY - 17} rx={10} ry={4} fill="#7EC8E3" stroke={INK} strokeWidth={2.5} />
          <ellipse cx={11} cy={topY - 17} rx={10} ry={4} fill="#E8923A" stroke={INK} strokeWidth={2.5} />
          <circle cx={0} cy={topY - 17} r={3} fill={INK} />
        </g>
      );
    case 'bun':
      return (
        <g fill="#6B4F3A" stroke={INK} strokeWidth={3}>
          <path d={`M -35 ${topY + 18} Q 0 ${topY - 14} 35 ${topY + 18} Q 20 ${topY + 4} 0 ${topY + 4} Q -20 ${topY + 4} -35 ${topY + 18} Z`} strokeLinejoin="round" />
          <circle cx={0} cy={topY - 8} r={11} />
        </g>
      );
  }
}

function ArmWithHand({ d, hand, outfit }: { d: string; hand: [number, number]; outfit: { skin: string; shirt: string } }) {
  return (
    <g>
      <Capsule d={d} color={outfit.skin} sleeve={outfit.shirt} />
      <circle cx={hand[0]} cy={hand[1]} r={7} fill={outfit.skin} stroke={INK} strokeWidth={2.5} />
    </g>
  );
}

const dist2 = (a: Pt, b: Pt) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

/** Poses with a free hanging hand that bends outward to hold an item */
const HANG_HOLD_POSES = new Set<PoseId>(['stand', 'walk', 'facepalm']);

export function HumanBody({ mood, pose, outfit, flip, gaze, turn, held, acc = {} }: CharacterRenderOpts & { acc?: Accessories }) {
  const geo = POSE_GEO[pose] ?? POSE_GEO.stand;
  const { dy } = geo;
  const headCy = -160 + dy;
  /** Quarter turn: head leads left, far arm tucks behind the torso */
  const q = turn === 'quarter';

  // With an item in a hanging hand, bend that arm outward so the item is visible
  const arms: [string, string] = [geo.arms[0], geo.arms[1]];
  const hands: [Pt, Pt] = [geo.hands[0], geo.hands[1]];
  let heldPt: Pt = geo.held;
  if (held && !q && HANG_HOLD_POSES.has(pose)) {
    arms[1] = 'M 26 -110 Q 44 -98 47 -74';
    hands[1] = [47, -74];
    heldPt = hands[1];
  } else if (held && q && HANG_HOLD_POSES.has(pose) && pose !== 'facepalm') {
    arms[0] = 'M -26 -110 Q -44 -98 -47 -74';
    hands[0] = [-47, -74];
    heldPt = hands[0];
  }
  const holdIdx = held ? (dist2(hands[0], heldPt) <= dist2(hands[1], heldPt) ? 0 : 1) : -1;

  const transforms = [
    flip ? 'scale(-1,1)' : '',
    acc.scale && acc.scale !== 1 ? `scale(${acc.scale})` : '',
  ].filter(Boolean).join(' ');

  return (
    <g transform={transforms || undefined}>
      {/* hips follow the torso on a quarter turn so the pelvis stays under the body */}
      <g transform={q ? 'translate(-4 0)' : undefined}>
        <Capsule d={geo.legs[0]} color={outfit.pants} w={STROKE.leg} wf={STROKE.legFill} />
        <g transform={q ? 'translate(3 0)' : undefined}>
          <Capsule d={geo.legs[1]} color={outfit.pants} w={STROKE.leg} wf={STROKE.legFill} />
        </g>
        {/* shoes — toe leads slightly toward the facing direction */}
        {geo.feet.map(([fx, fy], i) => (
          <ellipse key={i} cx={fx - 3 + (q && i === 1 ? 3 : 0)} cy={fy + 3} rx={11} ry={6} fill="#2E2E3A" stroke={INK} strokeWidth={2.5} />
        ))}
      </g>

      {/* far arm tucks along the torso on a quarter turn (raised-arm poses keep their shape) */}
      {q && (RAISED_ARM_POSES.has(pose)
        ? <ArmWithHand d={arms[1]} hand={hands[1]} outfit={outfit} />
        : <ArmWithHand
            d={`M 20 ${-110 + dy} Q 29 ${-88 + dy} 25 ${-62 + dy}`}
            hand={[25, -62 + dy]} outfit={outfit} />
      )}

      <rect x={-((acc.torsoW ?? 60) / 2) + (q ? -2 : 0)} y={-128 + dy}
        width={(acc.torsoW ?? 60) + (q ? -3 : 0)} rx={16} height={78}
        fill={outfit.shirt} stroke={INK} strokeWidth={STROKE.outline} />
      {acc.tie && (
        <g transform={q ? 'translate(-3 0)' : undefined}>
          <rect x={-5} y={-127 + dy} width={10} height={8} rx={2} fill={outfit.accent} stroke={INK} strokeWidth={2.5} />
          <path d={`M -6 ${-119 + dy} L 6 ${-119 + dy} L 0 ${-96 + dy} Z`} fill={outfit.accent} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
        </g>
      )}
      {acc.tag && (
        // counter-mirror so the tag stays readable when the body is flipped
        <g transform={flip ? 'scale(-1,1)' : undefined}>
          <text x={q ? -3 : 0} y={(acc.tie ? -74 : -84) + dy} textAnchor="middle" opacity={0.55}
            fontFamily={FONT.hand} fontWeight={700} fontSize={acc.tag.length > 4 ? 11 : 14} letterSpacing={0.5}
            fill={contrastColor(outfit.shirt)}>
            {acc.tag}
          </text>
        </g>
      )}

      {/* head group — shifts toward the turn */}
      <g transform={q ? 'translate(-9 0)' : undefined}>
        <ellipse cx={0} cy={headCy} rx={37} ry={38} fill={outfit.skin} stroke={INK} strokeWidth={STROKE.outline} />
        {acc.hairTufts && (
          <g fill="#8A8A8A" stroke={INK} strokeWidth={2.5}>
            <ellipse cx={-35} cy={headCy - 10} rx={5} ry={9} />
            <ellipse cx={35} cy={headCy - 10} rx={5} ry={9} />
          </g>
        )}
        {/* face features shift further than the skull */}
        <g transform={q ? 'translate(-5 0)' : undefined}>
          {acc.beard && (
            <path d={`M -27 ${headCy + 14} Q 0 ${headCy + 28} 27 ${headCy + 14} Q 31 ${headCy + 44} 0 ${headCy + 52} Q -31 ${headCy + 44} -27 ${headCy + 14} Z`}
              fill="#6B4F3A" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          )}
          <Face mood={mood} cx={0} cy={-168 + dy} gaze={gaze} />
          {acc.glasses && (
            <g stroke={INK} strokeWidth={3} fill="none">
              <circle cx={-13} cy={-168 + dy} r={9.5} />
              <circle cx={13} cy={-168 + dy} r={9.5} />
              <line x1={-3.5} y1={-170 + dy} x2={3.5} y2={-170 + dy} />
            </g>
          )}
        </g>
        {acc.hat && <Hat kind={acc.hat} dy={dy} accent={outfit.accent} />}
      </g>

      {/* arms over the body; the held item sits over the arm, the palm over the item */}
      <g transform={q ? 'translate(-2 0)' : undefined}>
        <Capsule d={arms[0]} color={outfit.skin} sleeve={outfit.shirt} />
        {!(held && holdIdx === 0) && (
          <circle cx={hands[0][0]} cy={hands[0][1]} r={7} fill={outfit.skin} stroke={INK} strokeWidth={2.5} />
        )}
      </g>
      {!q && (
        <g>
          <Capsule d={arms[1]} color={outfit.skin} sleeve={outfit.shirt} />
          {!(held && holdIdx === 1) && (
            <circle cx={hands[1][0]} cy={hands[1][1]} r={7} fill={outfit.skin} stroke={INK} strokeWidth={2.5} />
          )}
        </g>
      )}

      {held && <g transform={`translate(${heldPt[0]}, ${heldPt[1]})`}>{held}</g>}
      {held && holdIdx !== -1 && (!q || holdIdx === 0) && (
        <circle cx={hands[holdIdx === 0 ? 0 : 1][0]} cy={hands[holdIdx === 0 ? 0 : 1][1]} r={7}
          fill={outfit.skin} stroke={INK} strokeWidth={2.5}
          transform={q ? 'translate(-2 0)' : undefined} />
      )}
    </g>
  );
}
