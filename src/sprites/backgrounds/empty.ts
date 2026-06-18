import type { BackgroundDef } from '../../types/comic';

export const empty: BackgroundDef = {
  id: 'empty',
  name: 'Empty',
  nameRu: 'Пустой',
  draw({ p, t }) {
    p(0, 0, 70, 42, t.wall);
    p(0, 42, 70, 8, t.wallMid);
    p(0, 50, 70, 7, t.wallDark);
    p(0, 57, 70, 13, t.floor);
    p(0, 57, 70, 1, t.wallDark);
  },
};
