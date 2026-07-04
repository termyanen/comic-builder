import type { PropDef, PropId } from '../../types/comic';
import { INK, STROKE } from '../../style/tokens';

/** All props anchor their base at (0,0) and draw upward */

const bat: PropDef = {
  id: 'bat',
  name: 'Baseball bat',
  nameRu: 'Бита',
  render: () => (
    <g transform="rotate(-24)">
      <path d="M -7 0 L -5 -52 Q -12 -70 -10 -96 Q -8 -112 0 -112 Q 8 -112 10 -96 Q 12 -70 5 -52 L 7 0 Q 0 6 -7 0 Z"
        fill="#E8923A" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <ellipse cx={0} cy={-2} rx={8} ry={5} fill="#C9752B" stroke={INK} strokeWidth={3} />
    </g>
  ),
};

const laptop: PropDef = {
  id: 'laptop',
  name: 'Laptop',
  nameRu: 'Ноутбук',
  render: () => (
    <g>
      <path d="M -34 0 L 34 0 L 28 -6 L -28 -6 Z" fill="#B9BDB9" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <rect x={-28} y={-52} width={56} height={46} rx={5} fill="#DDDDDD" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={-22} y={-46} width={44} height={34} rx={3} fill="#3D4A5C" />
      <path d="M -16 -38 h 18 M -16 -30 h 26 M -16 -22 h 12" stroke="#8FD6A8" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
};

const coffee: PropDef = {
  id: 'coffee',
  name: 'Coffee',
  nameRu: 'Кофе',
  render: () => (
    <g>
      <path d="M -14 0 L -16 -32 L 16 -32 L 14 0 Q 0 5 -14 0 Z" fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M 16 -28 q 12 2 10 12 q -2 9 -12 8" fill="none" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -14 -25 h 28" stroke="#C98F5A" strokeWidth={5} />
      <path d="M -5 -40 q -4 -7 0 -13 M 5 -40 q 4 -7 0 -13" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" opacity={0.6} />
    </g>
  ),
};

const phone: PropDef = {
  id: 'phone',
  name: 'Phone',
  nameRu: 'Телефон',
  render: () => (
    <g transform="rotate(-8)">
      <rect x={-14} y={-52} width={28} height={52} rx={7} fill="#2E2E2E" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={-10} y={-46} width={20} height={38} rx={3} fill="#7EC8E3" />
      <circle cx={0} cy={-5} r={2.5} fill="#DDDDDD" />
    </g>
  ),
};

const wreck: PropDef = {
  id: 'wreck',
  name: 'Broken tech',
  nameRu: 'Обломки',
  render: () => (
    <g>
      {/* cracked monitor face-up */}
      <g transform="rotate(9)">
        <rect x={-38} y={-40} width={76} height={40} rx={7} fill="#DDDDDD" stroke={INK} strokeWidth={STROKE.face} />
        <rect x={-31} y={-33} width={62} height={26} rx={3} fill="#F5EFDC" />
        <path d="M -20 -30 L -6 -22 L -14 -14 M -6 -22 L 8 -26 M 8 -26 L 18 -12" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      {/* debris */}
      <path d="M -52 -6 l 10 -8 l 4 9 Z" fill="#B9BDB9" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M 50 -4 l 9 -10 l 6 8 Z" fill="#B9BDB9" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M 44 -28 q 8 -6 4 -14" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
};

const scroll: PropDef = {
  id: 'scroll',
  name: 'Feature list',
  nameRu: 'Список фич',
  render: () => (
    <g>
      <rect x={-20} y={-52} width={40} height={48} fill="#F5EFDC" stroke={INK} strokeWidth={STROKE.face} />
      <ellipse cx={0} cy={-52} rx={22} ry={7} fill="#E8E0C9" stroke={INK} strokeWidth={STROKE.face} />
      <ellipse cx={0} cy={-4} rx={22} ry={7} fill="#E8E0C9" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -12 -40 h 24 M -12 -31 h 18 M -12 -22 h 22" stroke="#9C8F6E" strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
};

const fire: PropDef = {
  id: 'fire',
  name: 'Fire',
  nameRu: 'Огонь',
  render: () => (
    <g>
      <path d="M 0 0 C -22 0 -26 -22 -18 -36 C -14 -28 -10 -26 -8 -30 C -14 -46 -4 -58 6 -64 C 2 -52 10 -46 16 -38 C 22 -28 20 -8 0 0 Z"
        fill="#E8923A" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M 0 -2 C -10 -2 -13 -14 -8 -22 C -6 -17 -2 -16 0 -20 C -2 -28 4 -32 8 -36 C 6 -28 12 -20 12 -14 C 12 -7 8 -2 0 -2 Z"
        fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  ),
};

const bug: PropDef = {
  id: 'bug',
  name: 'Bug',
  nameRu: 'Баг',
  render: () => (
    <g>
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <path d="M -13 -28 L -26 -34 M -14 -20 L -28 -20 M -13 -12 L -26 -6" fill="none" />
        <path d="M 13 -28 L 26 -34 M 14 -20 L 28 -20 M 13 -12 L 26 -6" fill="none" />
        <path d="M -6 -38 Q -10 -46 -16 -48 M 6 -38 Q 10 -46 16 -48" fill="none" />
      </g>
      <ellipse cx={0} cy={-20} rx={15} ry={19} fill="#C0392B" stroke={INK} strokeWidth={STROKE.face} />
      <circle cx={0} cy={-40} r={8} fill="#96281B" stroke={INK} strokeWidth={STROKE.face} />
      <line x1={0} y1={-34} x2={0} y2={-6} stroke={INK} strokeWidth={2.5} />
      <circle cx={-6} cy={-24} r={2.5} fill={INK} />
      <circle cx={6} cy={-16} r={2.5} fill={INK} />
    </g>
  ),
};

const chart: PropDef = {
  id: 'chart',
  name: 'Chart',
  nameRu: 'График',
  render: () => (
    <g>
      <rect x={-30} y={-58} width={60} height={46} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -22 -22 V -50 M -22 -22 H 22" stroke="#9FB6C4" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M -20 -44 L -6 -34 L 6 -40 L 20 -26" fill="none" stroke="#E03C31" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 20 -26 l -8 0 m 8 0 l -2 -8" fill="none" stroke="#E03C31" strokeWidth={3.5} strokeLinecap="round" />
      <line x1={0} y1={-12} x2={0} y2={0} stroke={INK} strokeWidth={4} />
    </g>
  ),
};

const pizza: PropDef = {
  id: 'pizza',
  name: 'Pizza',
  nameRu: 'Пицца',
  render: () => (
    <g>
      <path d="M 0 0 L -22 -48 Q 0 -58 22 -48 Z" fill="#F2C14E" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -22 -48 Q 0 -58 22 -48 L 19 -42 Q 0 -50 -19 -42 Z" fill="#C98F5A" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={-6} cy={-36} r={4.5} fill="#C0392B" stroke={INK} strokeWidth={2} />
      <circle cx={7} cy={-30} r={4} fill="#C0392B" stroke={INK} strokeWidth={2} />
      <circle cx={-1} cy={-18} r={3.5} fill="#C0392B" stroke={INK} strokeWidth={2} />
    </g>
  ),
};

const beer: PropDef = {
  id: 'beer',
  name: 'Beer',
  nameRu: 'Пиво',
  render: () => (
    <g>
      <rect x={-14} y={-38} width={28} height={38} rx={4} fill="#F2C14E" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M 14 -32 q 12 2 10 12 q -2 10 -12 8" fill="none" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -12 -30 v 24 M -4 -30 v 24 M 4 -30 v 24" stroke="#E8AE28" strokeWidth={3} strokeLinecap="round" />
      <g fill="#FFFFFF" stroke={INK} strokeWidth={2.5}>
        <circle cx={-9} cy={-40} r={6} />
        <circle cx={1} cy={-44} r={7} />
        <circle cx={10} cy={-39} r={5.5} />
      </g>
    </g>
  ),
};

const trophy: PropDef = {
  id: 'trophy',
  name: 'Trophy',
  nameRu: 'Кубок',
  render: () => (
    <g>
      <rect x={-16} y={-8} width={32} height={8} rx={3} fill="#C98F5A" stroke={INK} strokeWidth={3} />
      <path d="M -6 -8 L -4 -20 L 4 -20 L 6 -8 Z" fill="#F5C518" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M -16 -52 L 16 -52 Q 15 -24 0 -20 Q -15 -24 -16 -52 Z" fill="#F5C518" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -16 -48 q -12 0 -10 12 q 2 10 12 8 M 16 -48 q 12 0 10 12 q -2 10 -12 8" fill="none" stroke={INK} strokeWidth={3} />
      <path d="M -5 -42 l 3 6 l 6 1 l -4 5 l 1 6 l -6 -3" fill="#FFFFFF" opacity={0.5} />
    </g>
  ),
};

const money: PropDef = {
  id: 'money',
  name: 'Money',
  nameRu: 'Деньги',
  render: () => (
    <g>
      <rect x={-26} y={-16} width={52} height={16} rx={3} fill="#7DCB8A" stroke={INK} strokeWidth={3} transform="rotate(-4)" />
      <rect x={-26} y={-30} width={52} height={16} rx={3} fill="#8FD6A8" stroke={INK} strokeWidth={3} transform="rotate(3)" />
      <circle cx={0} cy={-22} r={7} fill="#7DCB8A" stroke={INK} strokeWidth={2.5} transform="rotate(3)" />
      <text x={-3.5} y={-17.5} fontFamily="sans-serif" fontWeight={700} fontSize={11} fill={INK} transform="rotate(3)">$</text>
    </g>
  ),
};

function starD(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.44;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)} ${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

const stars: PropDef = {
  id: 'stars',
  name: 'Stars',
  nameRu: 'Звёзды',
  render: () => (
    <g fill="#F5C518" stroke={INK} strokeWidth={3} strokeLinejoin="round">
      <path d={starD(-26, -16, 11)} />
      <path d={starD(0, -34, 14)} />
      <path d={starD(26, -16, 11)} />
    </g>
  ),
};

const ticket: PropDef = {
  id: 'ticket',
  name: 'Ticket',
  nameRu: 'Тикет',
  render: () => (
    <g transform="rotate(-5)">
      <rect x={-27} y={-50} width={54} height={44} rx={6} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <rect x={-27} y={-50} width={54} height={11} rx={6} fill="#5B8DEF" stroke={INK} strokeWidth={3} />
      <path d="M -19 -30 h 30 M -19 -21 h 38 M -19 -12 h 24" stroke="#9FB6C4" strokeWidth={3} strokeLinecap="round" />
      <circle cx={20} cy={-12} r={5} fill="#E03C31" stroke={INK} strokeWidth={2} />
    </g>
  ),
};

const duck: PropDef = {
  id: 'duck',
  name: 'Rubber duck',
  nameRu: 'Утка для дебага',
  render: () => (
    <g>
      <path d="M -18 0 Q -26 -8 -22 -18 Q -16 -28 0 -27 Q 12 -27 16 -18 L 22 -22 Q 26 -14 18 -8 Q 14 2 0 2 Q -10 2 -18 0 Z"
        fill="#F5D547" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <circle cx={-8} cy={-34} r={12} fill="#F5D547" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -20 -34 L -32 -31 Q -30 -26 -19 -28 Z" fill="#E8923A" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={-11} cy={-37} r={2.2} fill={INK} />
      <path d="M 2 -14 q 6 -4 8 -10" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  ),
};

const button: PropDef = {
  id: 'button',
  name: 'Deploy button',
  nameRu: 'Кнопка деплоя',
  render: () => (
    <g>
      <path d="M -26 0 L -22 -14 L 22 -14 L 26 0 Z" fill="#8A8A8A" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -18 -14 Q -18 -34 0 -34 Q 18 -34 18 -14 Z" fill="#E03C31" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -10 -24 q 2 -5 8 -6" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" opacity={0.7} />
    </g>
  ),
};

const clock: PropDef = {
  id: 'clock',
  name: 'Deadline clock',
  nameRu: 'Будильник',
  render: () => (
    <g>
      <line x1={-10} y1={-4} x2={-14} y2={0} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={10} y1={-4} x2={14} y2={0} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <circle cx={0} cy={-26} r={20} fill="#FFFFFF" stroke={INK} strokeWidth={STROKE.face} />
      <path d="M -14 -44 a 9 9 0 0 1 10 -6 M 14 -44 a 9 9 0 0 0 -10 -6" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
      <line x1={0} y1={-26} x2={0} y2={-38} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={0} y1={-26} x2={9} y2={-21} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <circle cx={0} cy={-26} r={2} fill={INK} />
      <path d="M 22 -38 q 6 -3 7 -9 M 25 -30 q 7 -1 10 -6" fill="none" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  ),
};

const energy: PropDef = {
  id: 'energy',
  name: 'Energy drink',
  nameRu: 'Энергетик',
  render: () => (
    <g>
      <rect x={-11} y={-44} width={22} height={44} rx={5} fill="#4CAF7D" stroke={INK} strokeWidth={STROKE.face} />
      <ellipse cx={0} cy={-44} rx={11} ry={3.5} fill="#8A8A8A" stroke={INK} strokeWidth={2.5} />
      <path d="M 2 -36 L -6 -22 L 0 -22 L -2 -10 L 7 -26 L 1 -26 Z" fill="#F5D547" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    </g>
  ),
};

const headphones: PropDef = {
  id: 'headphones',
  name: 'Headphones',
  nameRu: 'Наушники',
  render: () => (
    <g>
      <path d="M -20 -18 Q -20 -46 0 -46 Q 20 -46 20 -18" fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <rect x={-27} y={-22} width={13} height={22} rx={6} fill="#E03C31" stroke={INK} strokeWidth={3.5} />
      <rect x={14} y={-22} width={13} height={22} rx={6} fill="#E03C31" stroke={INK} strokeWidth={3.5} />
    </g>
  ),
};

const box: PropDef = {
  id: 'box',
  name: 'Layoff box',
  nameRu: 'Коробка с вещами',
  render: () => (
    <g>
      <path d="M -28 0 L -25 -34 L 25 -34 L 28 0 Z" fill="#C98F5A" stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -25 -34 L -34 -42 M 25 -34 L 34 -42" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M -34 -42 L -30 -34 M 34 -42 L 30 -34" stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      {/* plant + frame sticking out */}
      <g fill="#4CAF7D" stroke={INK} strokeWidth={2.5}>
        <ellipse cx={-12} cy={-44} rx={6} ry={11} transform="rotate(-14 -12 -44)" />
        <ellipse cx={-2} cy={-46} rx={6} ry={12} />
      </g>
      <rect x={8} y={-50} width={14} height={17} rx={2} fill="#E8E8E8" stroke={INK} strokeWidth={2.5} transform="rotate(8 15 -42)" />
    </g>
  ),
};

const docs: PropDef = {
  id: 'docs',
  name: 'Documentation',
  nameRu: 'Документация',
  render: () => (
    <g>
      <rect x={-24} y={-12} width={48} height={12} rx={3} fill="#5B8DEF" stroke={INK} strokeWidth={3} />
      <rect x={-21} y={-24} width={44} height={12} rx={3} fill="#E03C31" stroke={INK} strokeWidth={3} transform="rotate(-2 0 -18)" />
      <rect x={-22} y={-36} width={45} height={12} rx={3} fill="#4CAF7D" stroke={INK} strokeWidth={3} transform="rotate(2 0 -30)" />
      <path d="M -14 -6 h 20 M -12 -18 h 18 M -13 -30 h 19" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" opacity={0.8} />
    </g>
  ),
};

const props: PropDef[] = [bat, laptop, duck, coffee, energy, phone, headphones, clock, button, scroll, fire, bug, chart, ticket, docs, box, pizza, beer, trophy, money, stars, wreck];

export function getProp(id: PropId): PropDef | undefined {
  return props.find(p => p.id === id);
}

export function getAllProps(): PropDef[] {
  return props;
}
