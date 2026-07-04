import type { FxDef, FxId } from '../types/comic';
import { INK, FONT } from '../style/tokens';

/**
 * Comic effects — emotion/attention marks floating over the scene.
 * Anchor: effect center at (0,0); the layer is draggable in the editor.
 */

const idea: FxDef = {
  id: 'idea',
  name: 'Idea',
  nameRu: '💡 Идея',
  render: () => (
    <g>
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <line x1={-26} y1={-22} x2={-19} y2={-16} />
        <line x1={26} y1={-22} x2={19} y2={-16} />
        <line x1={0} y1={-32} x2={0} y2={-24} />
        <line x1={-30} y1={4} x2={-21} y2={4} />
        <line x1={30} y1={4} x2={21} y2={4} />
      </g>
      <circle cx={0} cy={0} r={15} fill="#F5D547" stroke={INK} strokeWidth={3.5} />
      <path d="M -5 13 h 10 M -4 18 h 8" stroke={INK} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),
};

const question: FxDef = {
  id: 'question',
  name: 'Question',
  nameRu: '❓ Вопрос',
  render: () => (
    <text x={0} y={18} textAnchor="middle" fontFamily={FONT.hand} fontWeight={700} fontSize={52} fill={INK}>?</text>
  ),
};

const exclaim: FxDef = {
  id: 'exclaim',
  name: 'Exclamation',
  nameRu: '❗ Восклицание',
  render: () => (
    <text x={0} y={18} textAnchor="middle" fontFamily={FONT.hand} fontWeight={700} fontSize={52} fill="#E03C31"
      stroke={INK} strokeWidth={1.5}>!!</text>
  ),
};

const zzz: FxDef = {
  id: 'zzz',
  name: 'Zzz',
  nameRu: '💤 Сон',
  render: () => (
    <g fontFamily={FONT.hand} fontWeight={700} fill={INK}>
      <text x={-18} y={16} fontSize={22}>z</text>
      <text x={-4} y={2} fontSize={30}>z</text>
      <text x={14} y={-14} fontSize={38}>z</text>
    </g>
  ),
};

const sweat: FxDef = {
  id: 'sweat',
  name: 'Sweat',
  nameRu: '💧 Пот',
  render: () => (
    <g fill="#7EC8E3" stroke={INK} strokeWidth={2.5}>
      <path d="M -14 -8 q 7 12 0 17 q -7 -5 0 -17" />
      <path d="M 6 -18 q 9 15 0 21 q -9 -6 0 -21" />
      <path d="M 16 6 q 6 10 0 14 q -6 -4 0 -14" />
    </g>
  ),
};

const anger: FxDef = {
  id: 'anger',
  name: 'Anger mark',
  nameRu: '💢 Злость',
  render: () => (
    <g stroke="#E03C31" strokeWidth={5} strokeLinecap="round" fill="none">
      <path d="M -6 -6 Q -14 -10 -18 -18" />
      <path d="M 6 -6 Q 14 -10 18 -18" />
      <path d="M -6 6 Q -14 10 -18 18" />
      <path d="M 6 6 Q 14 10 18 18" />
    </g>
  ),
};

const hearts: FxDef = {
  id: 'hearts',
  name: 'Hearts',
  nameRu: '❤️ Сердечки',
  render: () => (
    <g fill="#E03C31" stroke={INK} strokeWidth={2.5}>
      <path d="M -14 -4 c -4 -7 -14 -4 -12 4 c 1 6 8 10 12 13 c 4 -3 11 -7 12 -13 c 2 -8 -8 -11 -12 -4 Z" />
      <path d="M 14 -18 c -3 -5 -10 -3 -9 3 c 1 4 6 7 9 9 c 3 -2 8 -5 9 -9 c 1 -6 -6 -8 -9 -3 Z" />
    </g>
  ),
};

const focus: FxDef = {
  id: 'focus',
  name: 'Focus lines',
  nameRu: '⚡ Фокус-линии',
  render: () => (
    <g stroke={INK} strokeWidth={5} strokeLinecap="round" opacity={0.85}>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2 + 0.12;
        const r1 = 130 + (i % 3) * 22;
        const r2 = r1 + 38 + (i % 2) * 26;
        return (
          <line key={i}
            x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
            x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} />
        );
      })}
    </g>
  ),
};

/** N-spike star polygon around (cx,cy) */
function burstD(cx: number, cy: number, spikes: number, rOut: number, rIn: number, jitter = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = (i % 2 === 0 ? rOut : rIn) + (jitter ? ((i * 7) % 5) * jitter : 0);
    const a = -Math.PI / 2 + (i * Math.PI) / spikes;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

const impact: FxDef = {
  id: 'impact',
  name: 'Impact burst',
  nameRu: '💥 Удар',
  render: () => (
    <g>
      <path d={burstD(0, 0, 11, 46, 24, 1.4)} fill="#F5D547" stroke={INK} strokeWidth={4} strokeLinejoin="round" />
      <path d={burstD(0, 0, 8, 22, 11)} fill="#FFFFFF" stroke="#E8923A" strokeWidth={3} strokeLinejoin="round" />
    </g>
  ),
};

const hit: FxDef = {
  id: 'hit',
  name: 'Hit marks',
  nameRu: '✴️ Искры удара',
  render: () => (
    <g>
      <path d={burstD(-18, 6, 4, 12, 5)} fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={burstD(14, -14, 4, 16, 7)} fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={burstD(20, 14, 4, 9, 4)} fill="#FFFFFF" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <g stroke={INK} strokeWidth={3} strokeLinecap="round">
        <line x1={-30} y1={-14} x2={-38} y2={-20} />
        <line x1={2} y1={-28} x2={4} y2={-38} />
        <line x1={32} y1={0} x2={42} y2={0} />
      </g>
    </g>
  ),
};

const dash: FxDef = {
  id: 'dash',
  name: 'Speed dashes',
  nameRu: '💨 Рывок',
  render: () => (
    <g stroke={INK} strokeWidth={5} strokeLinecap="round" opacity={0.85}>
      <line x1={-44} y1={-16} x2={-4} y2={-16} />
      <line x1={-52} y1={0} x2={4} y2={0} />
      <line x1={-40} y1={16} x2={-8} y2={16} />
    </g>
  ),
};

const boom: FxDef = {
  id: 'boom',
  name: 'Smoke puff',
  nameRu: '☁️ Клуб дыма',
  render: () => (
    <g fill="#E8E8E8" stroke={INK} strokeWidth={3}>
      <circle cx={-18} cy={4} r={14} />
      <circle cx={16} cy={6} r={12} />
      <circle cx={0} cy={-10} r={17} />
      <circle cx={-30} cy={-8} r={9} />
      <circle cx={28} cy={-8} r={8} />
      <circle cx={44} cy={2} r={4} fill="#FFFFFF" />
      <circle cx={-44} cy={0} r={3.5} fill="#FFFFFF" />
    </g>
  ),
};

const dizzy: FxDef = {
  id: 'dizzy',
  name: 'Dizzy stars',
  nameRu: '😵 Звёзды из глаз',
  render: () => (
    <g>
      <path d="M -30 6 Q 0 -26 30 6" fill="none" stroke={INK} strokeWidth={2.5} strokeDasharray="5 6" strokeLinecap="round" />
      <path d={burstD(-30, 4, 5, 10, 4.5)} fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={burstD(0, -18, 5, 12, 5.5)} fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d={burstD(30, 4, 5, 10, 4.5)} fill="#F5D547" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
    </g>
  ),
};

const fxList: FxDef[] = [impact, hit, boom, dash, dizzy, idea, question, exclaim, zzz, sweat, anger, hearts, focus];

export function getFx(id: FxId): FxDef | undefined {
  return fxList.find(f => f.id === id);
}

export function getAllFx(): FxDef[] {
  return fxList;
}
