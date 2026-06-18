import type { BackgroundDef } from '../../types/comic';

export const empty: BackgroundDef = {
  id: 'empty',
  name: 'Empty',
  nameRu: 'Пустой',
  draw({ p, t }) {
    p(0, 0, 50, 50, t.wall);
  },
};
