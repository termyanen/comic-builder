import type { CharacterDef, CharacterRenderOpts } from '../../types/comic';
import { INK, STROKE } from '../../style/tokens';
import { Face } from './Face';

/**
 * The programmer's cat. Sitting, judging your code.
 * outfit.shirt = fur, outfit.skin = muzzle/chest, outfit.accent = collar.
 */
function CatBody({ mood, outfit, flip, gaze, held }: CharacterRenderOpts) {
  const fur = outfit.shirt;
  return (
    <g transform={flip ? 'scale(-1,1)' : undefined}>
      {held && <g transform="translate(22, -4) scale(0.75)">{held}</g>}
      {/* tail */}
      <path d="M 30 -18 Q 58 -14 56 -44 Q 55 -58 46 -62" fill="none" stroke={INK} strokeWidth={11} strokeLinecap="round" />
      <path d="M 30 -18 Q 58 -14 56 -44 Q 55 -58 46 -62" fill="none" stroke={fur} strokeWidth={6} strokeLinecap="round" />
      {/* body */}
      <path d="M -30 0 Q -34 -52 0 -54 Q 34 -52 30 0 Q 0 6 -30 0 Z" fill={fur} stroke={INK} strokeWidth={STROKE.outline} strokeLinejoin="round" />
      {/* chest */}
      <ellipse cx={0} cy={-16} rx={13} ry={17} fill={outfit.skin} stroke={INK} strokeWidth={2.5} />
      {/* front paws */}
      <ellipse cx={-14} cy={-3} rx={8} ry={5} fill={fur} stroke={INK} strokeWidth={2.5} />
      <ellipse cx={14} cy={-3} rx={8} ry={5} fill={fur} stroke={INK} strokeWidth={2.5} />
      {/* collar */}
      <path d="M -19 -66 Q 0 -58 19 -66" fill="none" stroke={outfit.accent} strokeWidth={6} />
      <circle cx={0} cy={-59} r={4} fill="#F5D547" stroke={INK} strokeWidth={2} />
      {/* ears */}
      <path d="M -26 -92 L -24 -114 L -8 -100 Z" fill={fur} stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M 26 -92 L 24 -114 L 8 -100 Z" fill={fur} stroke={INK} strokeWidth={STROKE.face} strokeLinejoin="round" />
      <path d="M -21 -100 L -20 -108 L -13 -102 Z" fill="#E38FA8" stroke="none" />
      <path d="M 21 -100 L 20 -108 L 13 -102 Z" fill="#E38FA8" stroke="none" />
      {/* head */}
      <ellipse cx={0} cy={-80} rx={28} ry={25} fill={fur} stroke={INK} strokeWidth={STROKE.outline} />
      {/* whiskers */}
      <g stroke={INK} strokeWidth={2} strokeLinecap="round">
        <line x1={-26} y1={-72} x2={-42} y2={-74} />
        <line x1={-25} y1={-67} x2={-41} y2={-65} />
        <line x1={26} y1={-72} x2={42} y2={-74} />
        <line x1={25} y1={-67} x2={41} y2={-65} />
      </g>
      {/* nose + face (shared face gives the cat the full mood set) */}
      <g transform="scale(0.72) translate(0, 6)">
        <Face mood={mood} cx={0} cy={-118} gaze={gaze} />
      </g>
      <path d="M -3 -74 L 3 -74 L 0 -70 Z" fill="#E38FA8" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
    </g>
  );
}

export const cat: CharacterDef = {
  id: 'cat',
  name: 'Cat',
  nameRu: 'Кот',
  defaultOutfit: { shirt: '#F2A03D', pants: '#C97F2B', skin: '#FFF6E8', accent: '#E03C31' },
  poses: ['stand'],
  render: opts => <CatBody {...opts} />,
};
