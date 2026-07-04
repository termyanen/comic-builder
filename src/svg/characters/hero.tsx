import type { CharacterDef } from '../../types/comic';
import { HERO_OUTFIT } from '../../style/tokens';
import { HumanBody, ALL_POSES } from './humanoid';

export const hero: CharacterDef = {
  id: 'hero',
  name: 'Hero',
  nameRu: 'Герой',
  defaultOutfit: HERO_OUTFIT,
  poses: ALL_POSES,
  render: opts => <HumanBody {...opts} acc={{ tag: 'DEV' }} />,
};
