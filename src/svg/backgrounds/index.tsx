import type { BackgroundDef, BackgroundId, BgColors } from '../../types/comic';
import { VIEW } from '../../types/comic';
import { INK, STROKE } from '../../style/tokens';

/** Deterministic pseudo-random for stable scatter patterns */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Little debris scribbles on the ground (reference's scattered paperclips) */
function Scatter({ colors, fromY, seed }: { colors: BgColors; fromY: number; seed: number }) {
  const rnd = seeded(seed);
  const marks = Array.from({ length: 12 }, (_, i) => {
    const x = 14 + rnd() * (VIEW - 28);
    const y = fromY + 14 + rnd() * (VIEW - fromY - 28);
    const r = 4 + rnd() * 4;
    const a = Math.floor(rnd() * 360);
    return { x, y, r, a, key: i };
  });
  return (
    <g stroke={colors.accent} strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.45}>
      {marks.map(m => (
        <path key={m.key} transform={`rotate(${m.a} ${m.x} ${m.y})`}
          d={`M ${m.x - m.r} ${m.y} a ${m.r} ${m.r} 0 1 1 ${m.r} ${m.r}`} />
      ))}
    </g>
  );
}

function GroundEdge({ colors, d }: { colors: BgColors; d: string }) {
  return (
    <g>
      <path d={`${d} L ${VIEW} ${VIEW} L 0 ${VIEW} Z`} fill={colors.ground} />
      <path d={d} fill="none" stroke={colors.groundEdge} strokeWidth={5} strokeLinecap="round" />
    </g>
  );
}

const plain: BackgroundDef = {
  id: 'plain',
  name: 'Plain',
  nameRu: 'Пустой',
  render: colors => <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />,
};

const hills: BackgroundDef = {
  id: 'hills',
  name: 'Hills',
  nameRu: 'Холмы',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors}
        d={`M 0 190 Q 60 165 110 195 Q 150 220 200 250 Q 260 285 320 240 Q 370 205 420 185`} />
      <Scatter colors={colors} fromY={260} seed={42} />
    </g>
  ),
};

const desk: BackgroundDef = {
  id: 'desk',
  name: 'Desk',
  nameRu: 'Рабочий стол',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      {/* floor */}
      <GroundEdge colors={colors} d={`M 0 300 Q 105 292 210 298 Q 315 304 420 296`} />
      {/* desk */}
      <rect x={30} y={252} width={230} height={16} rx={7} fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={58} y1={268} x2={58} y2={352} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <line x1={232} y1={268} x2={232} y2={352} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      {/* monitor */}
      <rect x={72} y={168} width={112} height={76} rx={9} fill="#E8E8E8" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={82} y={178} width={92} height={56} rx={5} fill="#3D4A5C" />
      <path d="M 90 190 h 34 M 90 202 h 52 M 90 214 h 42" stroke="#8FD6A8" strokeWidth={3.5} strokeLinecap="round" />
      <line x1={128} y1={244} x2={128} y2={252} stroke={INK} strokeWidth={6} />
    </g>
  ),
};

const office: BackgroundDef = {
  id: 'office',
  name: 'Office',
  nameRu: 'Офис',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 302 Q 105 296 210 300 Q 315 304 420 298`} />
      {/* window */}
      <rect x={52} y={54} width={132} height={108} rx={10} fill="#EAF4F8" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={118} y1={56} x2={118} y2={160} stroke={INK} strokeWidth={3.5} />
      <line x1={54} y1={108} x2={182} y2={108} stroke={INK} strokeWidth={3.5} />
      <path d="M 74 90 q 10 -12 24 -8 M 140 76 q 12 -8 24 -2" fill="none" stroke="#B9D4DE" strokeWidth={4} strokeLinecap="round" />
      {/* plant */}
      <path d="M 348 302 L 342 266 L 386 266 L 380 302 Z" fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <g fill="#4CAF7D" stroke={INK} strokeWidth={3}>
        <ellipse cx={348} cy={244} rx={11} ry={20} transform="rotate(-24 348 244)" />
        <ellipse cx={380} cy={244} rx={11} ry={20} transform="rotate(24 380 244)" />
        <ellipse cx={364} cy={234} rx={11} ry={24} />
      </g>
    </g>
  ),
};

const meeting: BackgroundDef = {
  id: 'meeting',
  name: 'Meeting room',
  nameRu: 'Переговорка',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 306 Q 105 300 210 304 Q 315 308 420 302`} />
      {/* whiteboard */}
      <rect x={48} y={56} width={158} height={104} rx={8} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 66 84 h 52 M 66 102 h 78 M 66 120 h 40" stroke="#9FB6C4" strokeWidth={4} strokeLinecap="round" />
      <path d="M 152 130 q 14 -18 34 -8" fill="none" stroke="#E03C31" strokeWidth={4} strokeLinecap="round" />
      <line x1={94} y1={160} x2={88} y2={186} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <line x1={162} y1={160} x2={168} y2={186} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      {/* table */}
      <rect x={230} y={268} width={168} height={15} rx={7} fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={252} y1={283} x2={252} y2={340} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <line x1={378} y1={283} x2={378} y2={340} stroke={INK} strokeWidth={7} strokeLinecap="round" />
    </g>
  ),
};

const server: BackgroundDef = {
  id: 'server',
  name: 'Server room',
  nameRu: 'Серверная',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 308 Q 105 302 210 306 Q 315 310 420 304`} />
      {[46, 130].map((x, i) => (
        <g key={x}>
          <rect x={x} y={92} width={70} height={216} rx={8} fill="#3D4A5C" stroke={INK} strokeWidth={STROKE.face} />
          {[0, 1, 2, 3].map(r => (
            <g key={r}>
              <rect x={x + 9} y={106 + r * 50} width={52} height={34} rx={4} fill="#2E3947" stroke={INK} strokeWidth={2} />
              <circle cx={x + 19} cy={116 + r * 50} r={3.5} fill={r === (i ? 2 : 1) ? '#E03C31' : '#8FD6A8'} />
              <circle cx={x + 31} cy={116 + r * 50} r={3.5} fill="#F5D547" />
              <path d={`M ${x + 13} ${128 + r * 50} h 44 M ${x + 13} ${133 + r * 50} h 44`} stroke="#4E5D70" strokeWidth={2.5} />
            </g>
          ))}
        </g>
      ))}
    </g>
  ),
};

const home: BackgroundDef = {
  id: 'home',
  name: 'Home',
  nameRu: 'Дом',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 304 Q 105 298 210 302 Q 315 306 420 300`} />
      {/* window with night curtains */}
      <rect x={262} y={58} width={110} height={92} rx={9} fill="#EAF4F8" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={317} y1={60} x2={317} y2={148} stroke={INK} strokeWidth={3.5} />
      {/* sofa */}
      <g>
        <rect x={40} y={222} width={172} height={38} rx={12} fill="#C98F8F" stroke={INK} strokeWidth={STROKE.face} />
        <rect x={40} y={252} width={172} height={40} rx={10} fill="#B57F7F" stroke={INK} strokeWidth={STROKE.face} />
        <rect x={28} y={238} width={26} height={54} rx={11} fill="#C98F8F" stroke={INK} strokeWidth={STROKE.face} />
        <rect x={198} y={238} width={26} height={54} rx={11} fill="#C98F8F" stroke={INK} strokeWidth={STROKE.face} />
      </g>
      {/* floor lamp */}
      <path d="M 250 292 h 36 M 268 292 V 210" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d="M 250 210 L 286 210 L 278 184 L 258 184 Z" fill="#F5D547" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
    </g>
  ),
};

const coffeeshop: BackgroundDef = {
  id: 'coffeeshop',
  name: 'Coffee shop',
  nameRu: 'Кофейня',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 308 Q 105 302 210 306 Q 315 310 420 304`} />
      {/* menu board */}
      <line x1={80} y1={0} x2={80} y2={52} stroke={INK} strokeWidth={4} />
      <line x1={168} y1={0} x2={168} y2={52} stroke={INK} strokeWidth={4} />
      <rect x={54} y={52} width={140} height={86} rx={8} fill="#3B3B4A" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 70 78 h 46 M 70 96 h 62 M 70 114 h 38" stroke="#E8E0C9" strokeWidth={4} strokeLinecap="round" />
      <path d="M 158 108 q 12 2 10 12 M 148 96 q -4 -8 0 -14 M 158 96 q -4 -8 0 -14" fill="none" stroke="#E8E0C9" strokeWidth={3} strokeLinecap="round" />
      <rect x={146} y={96} width={24} height={24} rx={4} fill="none" stroke="#E8E0C9" strokeWidth={3} />
      {/* counter */}
      <rect x={252} y={216} width={168} height={16} rx={7} fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={262} y={232} width={148} height={76} fill="#A9714B" stroke={INK} strokeWidth={STROKE.face} />
      {/* coffee machine */}
      <rect x={286} y={168} width={64} height={48} rx={7} fill="#8A8A8A" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={302} y={196} width={32} height={8} rx={3} fill="#3B3B4A" stroke={INK} strokeWidth={2} />
    </g>
  ),
};

const night: BackgroundDef = {
  id: 'night',
  name: 'Night',
  nameRu: 'Ночь',
  render: () => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill="#313A5C" />
      <path d={`M 0 210 Q 70 185 130 215 Q 200 250 280 225 Q 350 205 420 215 L 420 420 L 0 420 Z`} fill="#3E4668" />
      <path d={`M 0 210 Q 70 185 130 215 Q 200 250 280 225 Q 350 205 420 215`} fill="none" stroke="#565F85" strokeWidth={5} strokeLinecap="round" />
      {/* moon */}
      <circle cx={330} cy={86} r={34} fill="#F5EFDC" stroke={INK} strokeWidth={3} />
      <circle cx={320} cy={78} r={6} fill="#E3DCC2" />
      <circle cx={340} cy={98} r={4.5} fill="#E3DCC2" />
      {/* stars */}
      <g fill="#F5EFDC">
        {[[60, 60], [130, 96], [200, 48], [252, 120], [92, 150], [380, 160]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M ${x} ${y - 5} L ${x + 1.6} ${y - 1.6} L ${x + 5} ${y} L ${x + 1.6} ${y + 1.6} L ${x} ${y + 5} L ${x - 1.6} ${y + 1.6} L ${x - 5} ${y} L ${x - 1.6} ${y - 1.6} Z`} />
        ))}
      </g>
    </g>
  ),
};

const presentation: BackgroundDef = {
  id: 'presentation',
  name: 'Presentation',
  nameRu: 'Презентация',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 306 Q 105 300 210 304 Q 315 308 420 302`} />
      {/* screen on stand */}
      <rect x={44} y={48} width={182} height={122} rx={8} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 66 140 L 106 108 L 140 122 L 196 72" fill="none" stroke="#E03C31" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 196 72 l -14 2 m 14 -2 l -2 14" fill="none" stroke="#E03C31" strokeWidth={5} strokeLinecap="round" />
      <line x1={135} y1={170} x2={135} y2={200} stroke={INK} strokeWidth={6} />
      <path d="M 111 216 L 135 200 L 159 216" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
};

const kanban: BackgroundDef = {
  id: 'kanban',
  name: 'Kanban board',
  nameRu: 'Kanban-доска',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 306 Q 105 300 210 304 Q 315 308 420 302`} />
      <rect x={40} y={48} width={230} height={140} rx={9} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 116 52 V 184 M 193 52 V 184" stroke="#C9D4DC" strokeWidth={3} />
      <path d="M 56 68 h 44 M 132 68 h 44 M 209 68 h 44" stroke="#9FB6C4" strokeWidth={4} strokeLinecap="round" />
      {/* stickies: todo pile, doing, one lonely done */}
      <g stroke={INK} strokeWidth={2}>
        <rect x={54} y={82} width={26} height={22} fill="#F5D547" transform="rotate(-3 67 93)" />
        <rect x={84} y={84} width={26} height={22} fill="#7EC8E3" transform="rotate(2 97 95)" />
        <rect x={56} y={112} width={26} height={22} fill="#8FD6A8" transform="rotate(4 69 123)" />
        <rect x={84} y={114} width={26} height={22} fill="#E38FA8" transform="rotate(-2 97 125)" />
        <rect x={58} y={144} width={26} height={22} fill="#F5D547" transform="rotate(2 71 155)" />
        <rect x={132} y={86} width={26} height={22} fill="#E8923A" transform="rotate(-4 145 97)" />
        <rect x={214} y={92} width={26} height={22} fill="#8FD6A8" transform="rotate(3 227 103)" />
      </g>
      <line x1={92} y1={188} x2={84} y2={216} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <line x1={222} y1={188} x2={230} y2={216} stroke={INK} strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
};

const openspace: BackgroundDef = {
  id: 'openspace',
  name: 'Open space',
  nameRu: 'Опенспейс',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 300 Q 105 294 210 298 Q 315 302 420 296`} />
      {[24, 300].map(x => (
        <g key={x}>
          <rect x={x} y={232} width={100} height={12} rx={6} fill="#C98F5A" stroke={INK} strokeWidth={3.5} />
          <line x1={x + 14} y1={244} x2={x + 12} y2={290} stroke={INK} strokeWidth={5} strokeLinecap="round" />
          <line x1={x + 86} y1={244} x2={x + 88} y2={290} stroke={INK} strokeWidth={5} strokeLinecap="round" />
          <rect x={x + 22} y={188} width={56} height={40} rx={6} fill="#E8E8E8" stroke={INK} strokeWidth={3.5} />
          <rect x={x + 28} y={194} width={44} height={28} rx={3} fill="#3D4A5C" />
          <line x1={x + 50} y1={228} x2={x + 50} y2={232} stroke={INK} strokeWidth={4} />
        </g>
      ))}
      {/* ceiling lamps */}
      <g stroke={INK} strokeWidth={3}>
        <line x1={105} y1={0} x2={105} y2={26} />
        <line x1={315} y1={0} x2={315} y2={26} />
      </g>
      <rect x={73} y={26} width={64} height={10} rx={5} fill="#F5D547" stroke={INK} strokeWidth={3} />
      <rect x={283} y={26} width={64} height={10} rx={5} fill="#F5D547" stroke={INK} strokeWidth={3} />
    </g>
  ),
};

const bedroom: BackgroundDef = {
  id: 'bedroom',
  name: 'Bedroom',
  nameRu: 'Спальня',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 306 Q 105 300 210 304 Q 315 308 420 302`} />
      {/* bed */}
      <rect x={30} y={196} width={22} height={92} rx={8} fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={44} y={238} width={186} height={34} rx={9} fill="#EAF4F8" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 96 238 L 230 238 L 230 272 L 88 272 Q 84 252 96 238 Z" fill="#7EC8E3" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <rect x={52} y={228} width={40} height={16} rx={7} fill="#FFFFFF" stroke={INK} strokeWidth={3} transform="rotate(-6 72 236)" />
      <rect x={222} y={272} width={16} height={30} fill="#C98F5A" stroke={INK} strokeWidth={3.5} />
      {/* nightstand with glowing phone */}
      <rect x={286} y={244} width={62} height={14} rx={6} fill="#C98F5A" stroke={INK} strokeWidth={3.5} />
      <line x1={298} y1={258} x2={298} y2={300} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <line x1={336} y1={258} x2={336} y2={300} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <rect x={306} y={228} width={22} height={14} rx={3} fill="#7EC8E3" stroke={INK} strokeWidth={2.5} />
      <g stroke="#F5D547" strokeWidth={2.5} strokeLinecap="round">
        <line x1={303} y1={222} x2={306} y2={226} />
        <line x1={317} y1={218} x2={317} y2={223} />
        <line x1={331} y1={222} x2={328} y2={226} />
      </g>
    </g>
  ),
};

const alert: BackgroundDef = {
  id: 'alert',
  name: 'Prod is down',
  nameRu: 'Авария',
  render: () => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill="#4A2B33" />
      <path d={`M 0 250 Q 105 242 210 248 Q 315 254 420 246 L 420 420 L 0 420 Z`} fill="#5C3540" />
      <path d={`M 0 250 Q 105 242 210 248 Q 315 254 420 246`} fill="none" stroke="#7A4A56" strokeWidth={5} strokeLinecap="round" />
      {/* siren beams */}
      <g fill="#E03C31" opacity={0.28}>
        <path d="M 210 0 L 110 0 L 190 210 L 230 210 Z" />
        <path d="M 210 0 L 310 0 L 230 210 L 190 210 Z" />
      </g>
      {/* warning triangles */}
      {[[80, 96, 1], [330, 80, 0.8], [250, 160, 0.6]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          <path d="M 0 -26 L 26 20 L -26 20 Z" fill="#F5D547" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <line x1={0} y1={-10} x2={0} y2={6} stroke={INK} strokeWidth={5} strokeLinecap="round" />
          <circle cx={0} cy={13} r={2.8} fill={INK} />
        </g>
      ))}
    </g>
  ),
};

const portal: BackgroundDef = {
  id: 'portal',
  name: 'Time portal',
  nameRu: 'Портал',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 304 Q 105 298 210 302 Q 315 306 420 300`} />
      {/* glow halo */}
      <ellipse cx={210} cy={174} rx={120} ry={146} fill="#B7A8E0" opacity={0.35} />
      {/* ring and vortex */}
      <ellipse cx={210} cy={174} rx={97} ry={126} fill="#5C4E86" stroke={INK} strokeWidth={STROKE.face} />
      <ellipse cx={210} cy={174} rx={64} ry={90} fill="#8E7CC3" />
      <ellipse cx={210} cy={174} rx={31} ry={47} fill="#CFC4EE" />
      {/* swirl arcs */}
      <g fill="none" stroke="#B7A8E0" strokeWidth={5} strokeLinecap="round">
        <path d="M 150 122 q 40 -26 86 -6" />
        <path d="M 134 198 q 22 44 68 46" />
        <path d="M 262 232 q 22 -34 12 -76" />
      </g>
      {/* sparks */}
      <g fill="#F5D547">
        {[[84, 90], [332, 74], [116, 272], [320, 250], [210, 22]].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M ${x} ${y - 6} L ${x + 2} ${y - 2} L ${x + 6} ${y} L ${x + 2} ${y + 2} L ${x} ${y + 6} L ${x - 2} ${y + 2} L ${x - 6} ${y} L ${x - 2} ${y - 2} Z`} />
        ))}
      </g>
      {/* crackle bolts off the rim */}
      <g fill="none" stroke="#8E7CC3" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 98 158 l -16 6 l 10 9" />
        <path d="M 322 190 l 16 -6 l -10 -9" />
      </g>
    </g>
  ),
};

const retro: BackgroundDef = {
  id: 'retro',
  name: 'Year 2000',
  nameRu: '2000-е',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      <GroundEdge colors={colors} d={`M 0 302 Q 105 296 210 300 Q 315 304 420 298`} />
      {/* desk */}
      <rect x={26} y={252} width={200} height={16} rx={7} fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={52} y1={268} x2={52} y2={348} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <line x1={202} y1={268} x2={202} y2={348} stroke={INK} strokeWidth={7} strokeLinecap="round" />
      {/* bulky CRT monitor */}
      <rect x={72} y={156} width={104} height={88} rx={8} fill="#E8E0C9" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={84} y={166} width={80} height={54} rx={4} fill="#7EC8E3" stroke={INK} strokeWidth={2.5} />
      {/* win-98 style window */}
      <rect x={92} y={174} width={60} height={38} fill="#FFFFFF" stroke={INK} strokeWidth={2} />
      <rect x={92} y={174} width={60} height={9} fill="#3D8EB9" stroke={INK} strokeWidth={2} />
      <path d="M 98 192 h 28 M 98 200 h 42" stroke="#9FB6C4" strokeWidth={3} strokeLinecap="round" />
      {/* vents + power led + wedge stand */}
      <path d="M 80 232 h 20" stroke="#B8AE93" strokeWidth={3} strokeLinecap="round" />
      <circle cx={164} cy={233} r={3} fill="#8FD6A8" />
      <path d="M 106 244 L 102 252 H 146 L 142 244 Z" fill="#E8E0C9" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      {/* floppy on the desk */}
      <g transform="rotate(-8 46 241)">
        <rect x={35} y={230} width={22} height={22} rx={2} fill="#3B3B4A" stroke={INK} strokeWidth={2.5} />
        <rect x={40} y={232} width={12} height={7} fill="#8A8A8A" />
        <rect x={39} y={242} width={14} height={9} fill="#FFFFFF" />
      </g>
      {/* tower on the floor, modem with lights on top */}
      <rect x={252} y={176} width={46} height={124} rx={6} fill="#E8E0C9" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 260 192 h 30 M 260 204 h 30" stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={275} cy={274} r={6} fill="none" stroke={INK} strokeWidth={3} />
      <circle cx={275} cy={252} r={2.8} fill="#8FD6A8" />
      <rect x={256} y={158} width={38} height={18} rx={4} fill="#8A8A8A" stroke={INK} strokeWidth={3} />
      <circle cx={266} cy={167} r={2.8} fill="#8FD6A8" />
      <circle cx={276} cy={167} r={2.8} fill="#E03C31" />
      {/* wall calendar: the year 2000 */}
      <line x1={352} y1={38} x2={352} y2={52} stroke={INK} strokeWidth={3} />
      <rect x={310} y={52} width={84} height={80} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 310 70 h 84" stroke={INK} strokeWidth={3} />
      <rect x={310} y={52} width={84} height={18} rx={6} fill="#E03C31" stroke={INK} strokeWidth={3} />
      {/* "2000" */}
      <g fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M 318 86 Q 318 79 325 79 Q 332 79 332 86 Q 332 92 317 102 H 333" />
        <ellipse cx={346} cy={91} rx={7} ry={11} />
        <ellipse cx={362} cy={91} rx={7} ry={11} />
        <ellipse cx={378} cy={91} rx={7} ry={11} />
      </g>
      <path d="M 320 114 h 18 M 346 114 h 24 M 320 123 h 30 M 358 123 h 16" stroke="#9FB6C4" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
};

const CROWD = ['#E03C31', '#F5D547', '#7EC8E3', '#E38FA8', '#8FD6A8'];

const stadium: BackgroundDef = {
  id: 'stadium',
  name: 'Stadium',
  nameRu: 'Стадион',
  render: colors => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill={colors.sky} />
      {/* floodlight towers */}
      <g stroke={INK} strokeWidth={5} strokeLinecap="round">
        <line x1={64} y1={140} x2={64} y2={72} />
        <line x1={356} y1={140} x2={356} y2={72} />
      </g>
      <g fill="#F5D547" stroke={INK} strokeWidth={3}>
        <rect x={38} y={48} width={52} height={24} rx={6} />
        <rect x={330} y={48} width={52} height={24} rx={6} />
      </g>
      <g fill="#FFFFFF">
        {[50, 64, 78, 342, 356, 370].map(x => (
          <g key={x}>
            <circle cx={x} cy={55} r={2.6} />
            <circle cx={x} cy={65} r={2.6} />
          </g>
        ))}
      </g>
      {/* stands with crowd */}
      <rect x={0} y={140} width={VIEW} height={56} fill="#C9D4DC" />
      {Array.from({ length: 15 }, (_, i) => (
        <circle key={`c1-${i}`} cx={14 + i * 28} cy={158} r={7} fill={CROWD[i % 5]} stroke={INK} strokeWidth={2} />
      ))}
      {Array.from({ length: 15 }, (_, i) => (
        <circle key={`c2-${i}`} cx={28 + i * 28} cy={180} r={7} fill={CROWD[(i + 2) % 5]} stroke={INK} strokeWidth={2} />
      ))}
      {/* pennant bunting along the stand top */}
      <line x1={0} y1={132} x2={VIEW} y2={132} stroke={INK} strokeWidth={3} />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={`p-${i}`} d={`M ${8 + i * 42} 132 L ${24 + i * 42} 132 L ${16 + i * 42} 147 Z`}
          fill={CROWD[i % 5]} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      ))}
      {/* pitch */}
      <rect x={0} y={196} width={VIEW} height={VIEW - 196} fill="#7DCB8A" />
      <line x1={0} y1={196} x2={VIEW} y2={196} stroke="#4CAF7D" strokeWidth={5} strokeLinecap="round" />
      <g stroke="#FFFFFF" strokeWidth={4} fill="none" opacity={0.9}>
        <line x1={140} y1={196} x2={124} y2={420} />
        <ellipse cx={130} cy={330} rx={64} ry={24} />
      </g>
      {/* goal with net */}
      <g>
        <g stroke="#EAF4F8" strokeWidth={2.5} opacity={0.9}>
          {[334, 348, 362, 376, 390].map(x => <line key={x} x1={x} y1={210} x2={x} y2={266} />)}
          {[224, 238, 252].map(y => <line key={y} x1={322} y1={y} x2={404} y2={y} />)}
        </g>
        <path d="M 322 268 V 208 H 404 V 268" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="round" />
      </g>
    </g>
  ),
};

const tvnight: BackgroundDef = {
  id: 'tvnight',
  name: 'Night match',
  nameRu: 'Ночной матч',
  render: () => (
    <g>
      <rect x={0} y={0} width={VIEW} height={VIEW} fill="#313A5C" />
      <path d={`M 0 300 Q 105 294 210 298 Q 315 302 420 296 L 420 420 L 0 420 Z`} fill="#3E4668" />
      <path d={`M 0 300 Q 105 294 210 298 Q 315 302 420 296`} fill="none" stroke="#565F85" strokeWidth={5} strokeLinecap="round" />
      {/* window: deep night outside */}
      <rect x={40} y={44} width={92} height={76} rx={8} fill="#26304E" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={86} y1={46} x2={86} y2={118} stroke={INK} strokeWidth={3} />
      <circle cx={66} cy={68} r={11} fill="#F5EFDC" />
      <circle cx={71} cy={64} r={9} fill="#26304E" />
      <path d="M 106 62 l 1.4 3.2 l 3.2 1.4 l -3.2 1.4 l -1.4 3.2 l -1.4 -3.2 l -3.2 -1.4 l 3.2 -1.4 Z" fill="#F5EFDC" />
      <path d="M 116 92 l 1.2 2.6 l 2.6 1.2 l -2.6 1.2 l -1.2 2.6 l -1.2 -2.6 l -2.6 -1.2 l 2.6 -1.2 Z" fill="#F5EFDC" />
      {/* wall clock: three in the morning */}
      <circle cx={206} cy={68} r={21} fill="#F5EFDC" stroke={INK} strokeWidth={3.5} />
      <line x1={206} y1={68} x2={206} y2={54} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={206} y1={68} x2={216} y2={68} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={206} cy={68} r={2} fill={INK} />
      {/* glow spilling from the screen into the room */}
      <path d="M 268 166 L 96 128 L 96 296 L 268 234 Z" fill="#7EC8E3" opacity={0.13} />
      {/* TV on a low stand, broadcasting the match */}
      <rect x={258} y={150} width={144} height={94} rx={8} fill="#2E2E2E" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={266} y={158} width={128} height={78} rx={4} fill="#4CAF7D" />
      <g stroke="#FFFFFF" strokeWidth={2.5} fill="none" opacity={0.85}>
        <line x1={330} y1={158} x2={330} y2={236} />
        <circle cx={330} cy={197} r={13} />
      </g>
      <circle cx={300} cy={206} r={4} fill="#E03C31" />
      <circle cx={356} cy={190} r={4} fill="#7EC8E3" />
      <circle cx={338} cy={214} r={2.8} fill="#FFFFFF" />
      {/* score bug */}
      <rect x={272} y={163} width={36} height={11} rx={2} fill="#1F2937" />
      <circle cx={279} cy={168.5} r={2.2} fill="#E03C31" />
      <rect x={285} y={166} width={4} height={5} fill="#FFFFFF" />
      <rect x={293} y={166} width={4} height={5} fill="#FFFFFF" />
      <circle cx={301} cy={168.5} r={2.2} fill="#7EC8E3" />
      {/* stand */}
      <rect x={272} y={244} width={116} height={11} rx={5} fill="#C98F5A" stroke={INK} strokeWidth={3.5} />
      <line x1={288} y1={255} x2={288} y2={296} stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <line x1={372} y1={255} x2={372} y2={296} stroke={INK} strokeWidth={5} strokeLinecap="round" />
    </g>
  ),
};

const backgrounds: BackgroundDef[] = [plain, hills, desk, office, openspace, meeting, kanban, server, home, bedroom, coffeeshop, night, tvnight, stadium, alert, presentation, portal, retro];

export function getBackground(id: BackgroundId): BackgroundDef | undefined {
  return backgrounds.find(b => b.id === id);
}

export function getAllBackgrounds(): BackgroundDef[] {
  return backgrounds;
}
