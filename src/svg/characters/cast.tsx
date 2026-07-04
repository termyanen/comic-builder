import type { CharacterDef } from '../../types/comic';
import { HumanBody, ALL_POSES } from './humanoid';
import type { Accessories } from './humanoid';

/**
 * The supporting cast — all share the humanoid body, differing only in
 * default outfit colors and accessories. Outfits stay user-overridable.
 */
function makeHuman(
  def: Pick<CharacterDef, 'id' | 'name' | 'nameRu' | 'defaultOutfit'>,
  acc: Accessories
): CharacterDef {
  return {
    ...def,
    poses: ALL_POSES,
    render: opts => <HumanBody {...opts} acc={acc} />,
  };
}

export const pm = makeHuman(
  {
    id: 'pm', name: 'PM', nameRu: 'Менеджер',
    defaultOutfit: { shirt: '#5B8DEF', pants: '#4A4E69', skin: '#FFFFFF', accent: '#E03C31' },
  },
  { tag: 'PM', tie: true }
);

export const boss = makeHuman(
  {
    id: 'boss', name: 'Boss', nameRu: 'Босс',
    defaultOutfit: { shirt: '#3B3B4A', pants: '#2E2E3A', skin: '#FFFFFF', accent: '#C0392B' },
  },
  { tag: 'BOSS', tie: true, hairTufts: true, torsoW: 67 }
);

export const qa = makeHuman(
  {
    id: 'qa', name: 'QA', nameRu: 'Тестировщик',
    defaultOutfit: { shirt: '#4CAF7D', pants: '#4A4E69', skin: '#FFFFFF', accent: '#2C6E49' },
  },
  { tag: 'QA', glasses: true }
);

export const designer = makeHuman(
  {
    id: 'designer', name: 'Designer', nameRu: 'Дизайнер',
    defaultOutfit: { shirt: '#9B59B6', pants: '#3A6BC4', skin: '#FFFFFF', accent: '#6C3483' },
  },
  { tag: 'UX', hat: 'beret', torsoW: 56 }
);

export const devops = makeHuman(
  {
    id: 'devops', name: 'DevOps', nameRu: 'Девопс',
    defaultOutfit: { shirt: '#556270', pants: '#3A3F44', skin: '#FFFFFF', accent: '#F2A03D' },
  },
  { tag: 'OPS', hat: 'cap' }
);

export const intern = makeHuman(
  {
    id: 'intern', name: 'Intern', nameRu: 'Стажёр',
    defaultOutfit: { shirt: '#F2C14E', pants: '#3A6BC4', skin: '#FFFFFF', accent: '#E03C31' },
  },
  { tag: 'INT', hat: 'propeller', scale: 0.9 }
);

export const client = makeHuman(
  {
    id: 'client', name: 'Client', nameRu: 'Клиент',
    defaultOutfit: { shirt: '#6D6875', pants: '#4A4E69', skin: '#FFFFFF', accent: '#B5838D' },
  },
  { tag: 'CLIENT', tie: true, glasses: true }
);

export const senior = makeHuman(
  {
    id: 'senior', name: 'Senior', nameRu: 'Сеньор',
    defaultOutfit: { shirt: '#3E4C5E', pants: '#2E2E3A', skin: '#FFFFFF', accent: '#F2A03D' },
  },
  { tag: 'SR', beard: true }
);

export const hr = makeHuman(
  {
    id: 'hr', name: 'HR', nameRu: 'HR',
    defaultOutfit: { shirt: '#E38FA8', pants: '#4A4E69', skin: '#FFFFFF', accent: '#C06C84' },
  },
  { tag: 'HR', hat: 'bun', torsoW: 56 }
);
