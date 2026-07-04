import type { CharacterDef, CharacterRenderOpts, MoodId } from '../../types/comic';
import { INK, STROKE, FONT, ROBOT_OUTFIT } from '../../style/tokens';
import { contrastColor } from './humanoid';

function RobotFace({ mood, cx, cy }: { mood: MoodId; cx: number; cy: number }) {
  const eyeDX = 14;
  const sw = STROKE.face;
  if (mood === 'dead') {
    return (
      <g>
        {[cx - eyeDX, cx + eyeDX].map(x => (
          <g key={x}>
            <path d={`M ${x - 5} ${cy - 5} L ${x + 5} ${cy + 5}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
            <path d={`M ${x + 5} ${cy - 5} L ${x - 5} ${cy + 5}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          </g>
        ))}
        <rect x={cx - 16} y={cy + 12} width={32} height={10} rx={3} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <path d={`M ${cx - 16} ${cy + 17} h 32`} stroke={INK} strokeWidth={1.5} strokeDasharray="3 3" />
      </g>
    );
  }
  const mouth =
    mood === 'laugh'
      // wide open laughing mouth with a tooth line
      ? (
        <g>
          <rect x={cx - 14} y={cy + 8} width={28} height={16} rx={7} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <line x1={cx - 12} y1={cy + 13} x2={cx + 12} y2={cy + 13} stroke={INK} strokeWidth={2} />
        </g>
      )
    : mood === 'happy'
      ? <path d={`M ${cx - 12} ${cy + 12} Q ${cx} ${cy + 22} ${cx + 12} ${cy + 12}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
    : mood === 'sad'
      ? <path d={`M ${cx - 12} ${cy + 18} Q ${cx} ${cy + 10} ${cx + 12} ${cy + 18}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinecap="round" />
    : mood === 'surprised'
      ? <circle cx={cx} cy={cy + 15} r={6} fill="#fff" stroke={INK} strokeWidth={2.5} />
    : mood === 'smug'
      ? <rect x={cx - 15} y={cy + 11} width={30} height={9} rx={3} fill="#fff" stroke={INK} strokeWidth={2.5} transform={`rotate(-7 ${cx} ${cy + 15})`} />
      : <rect x={cx - 15} y={cy + 11} width={30} height={9} rx={3} fill="#fff" stroke={INK} strokeWidth={2.5} />;

  const eyes =
    mood === 'laugh'
      // screen-eyes squint into happy arcs
      ? (
        <g stroke={INK} strokeWidth={sw} strokeLinecap="round" fill="none">
          <path d={`M ${cx - eyeDX - 6} ${cy + 2} Q ${cx - eyeDX} ${cy - 6} ${cx - eyeDX + 6} ${cy + 2}`} />
          <path d={`M ${cx + eyeDX - 6} ${cy + 2} Q ${cx + eyeDX} ${cy - 6} ${cx + eyeDX + 6} ${cy + 2}`} />
        </g>
      )
    : mood === 'smug'
      // one eye winking flat
      ? (
        <g>
          <circle cx={cx - eyeDX} cy={cy} r={5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <line x1={cx + eyeDX - 6} y1={cy} x2={cx + eyeDX + 6} y2={cy} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      )
      : (
        <g>
          <circle cx={cx - eyeDX} cy={cy} r={mood === 'surprised' ? 7 : 5} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <circle cx={cx + eyeDX} cy={cy} r={mood === 'surprised' ? 7 : 5} fill="#fff" stroke={INK} strokeWidth={2.5} />
        </g>
      );

  return (
    <g>
      {mood === 'angry' && (
        <g>
          <path d={`M ${cx - eyeDX - 7} ${cy - 12} L ${cx - eyeDX + 5} ${cy - 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
          <path d={`M ${cx + eyeDX + 7} ${cy - 12} L ${cx + eyeDX - 5} ${cy - 6}`} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        </g>
      )}
      {eyes}
      {mouth}
      {mood === 'sad' && (
        <path d={`M ${cx + eyeDX + 10} ${cy + 4} q 5 8 0 12 q -5 -4 0 -12`} fill="#7EC8E3" stroke={INK} strokeWidth={2} />
      )}
    </g>
  );
}

/** Wrecked robot: head and torso on the ground, loose springs — the "dead" mood */
function RobotWreck({ outfit }: CharacterRenderOpts) {
  return (
    <g>
      {/* springs / wires */}
      <path d="M 10 -18 q 8 -10 2 -16 q -6 -6 2 -14" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <path d="M 58 -30 q 10 -4 8 -14 q -2 -8 8 -10" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={76} cy={-56} r={4} fill={outfit.accent} stroke={INK} strokeWidth={2.5} />
      {/* torso lying tilted */}
      <g transform="translate(48,-16) rotate(14)">
        <rect x={-34} y={-22} width={68} height={40} rx={8} fill={outfit.shirt} stroke={INK} strokeWidth={STROKE.outline} />
        <rect x={-24} y={-12} width={48} height={20} rx={4} fill="none" stroke={INK} strokeWidth={2.5} />
        <path d="M -24 -2 h 48 M -8 -12 v 20 M 8 -12 v 20" stroke={INK} strokeWidth={2} />
      </g>
      {/* head fallen beside, face up-tilted */}
      <g transform="translate(-38,-24) rotate(-18)">
        <rect x={-32} y={-26} width={64} height={52} rx={10} fill={outfit.shirt} stroke={INK} strokeWidth={STROKE.outline} />
        <RobotFace mood="dead" cx={0} cy={-4} />
        <path d="M 24 -26 q 6 -12 -2 -18" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      </g>
    </g>
  );
}

function RobotBody(opts: CharacterRenderOpts) {
  const { mood, outfit, flip, held } = opts;
  if (mood === 'dead') return <RobotWreck {...opts} />;
  return (
    <g transform={flip ? 'scale(-1,1)' : undefined}>
      {held && <g transform="translate(56, -46)">{held}</g>}
      {/* legs */}
      <rect x={-24} y={-32} width={16} height={30} rx={6} fill={outfit.pants} stroke={INK} strokeWidth={STROKE.face} />
      <rect x={8} y={-32} width={16} height={30} rx={6} fill={outfit.pants} stroke={INK} strokeWidth={STROKE.face} />
      {/* arms */}
      <rect x={-52} y={-88} width={14} height={44} rx={6} fill={outfit.pants} stroke={INK} strokeWidth={STROKE.face} />
      <rect x={38} y={-88} width={14} height={44} rx={6} fill={outfit.pants} stroke={INK} strokeWidth={STROKE.face} />
      {/* torso with panel */}
      <rect x={-38} y={-96} width={76} height={66} rx={9} fill={outfit.shirt} stroke={INK} strokeWidth={STROKE.outline} />
      <circle cx={-18} cy={-76} r={5} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <rect x={2} y={-80} width={26} height={9} rx={3} fill="#fff" stroke={INK} strokeWidth={2.5} />
      <g transform={flip ? 'scale(-1,1)' : undefined}>
        <text x={0} y={-42} textAnchor="middle" fontFamily={FONT.hand} fontWeight={700} fontSize={15}
          opacity={0.55} fill={contrastColor(outfit.shirt)}>AI</text>
      </g>
      {/* head */}
      <rect x={-32} y={-158} width={64} height={54} rx={10} fill={outfit.shirt} stroke={INK} strokeWidth={STROKE.outline} />
      <RobotFace mood={mood} cx={0} cy={-136} />
      {/* antenna */}
      <path d="M 20 -158 q 6 -14 -2 -22" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={17} cy={-183} r={5} fill={outfit.accent} stroke={INK} strokeWidth={2.5} />
    </g>
  );
}

export const robot: CharacterDef = {
  id: 'robot',
  name: 'Robot / AI',
  nameRu: 'Робот / ИИ',
  defaultOutfit: ROBOT_OUTFIT,
  poses: ['stand'],
  render: opts => <RobotBody {...opts} />,
};
