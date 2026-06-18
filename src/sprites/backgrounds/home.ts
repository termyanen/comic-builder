import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const home: BackgroundDef = {
  id: 'home',
  name: 'Home Office',
  nameRu: 'Дома',
  draw({ p, d, t }) {
    // Walls and floor
    p(0, 0, 50, 50, t.wall);
    p(0, 38, 50, 12, t.wallDark);
    // Baseboard
    p(0, 38, 50, 1, t.floor);

    // Window with curtains
    p(4, 4, 18, 20, t.wallMid);
    p(5, 5, 16, 18, '#1a3a6e');
    // Sky outside
    p(6, 6, 14, 10, '#1e4080');
    // Buildings outside
    p(7, 10, 3, 6, '#0a1a30');
    p(12, 12, 4, 4, '#0a1a30');
    p(17, 9, 2, 7, '#0a1a30');
    // Window light
    d(8, 7, '#4a8aee'); d(10, 8, '#4a8aee');
    // Curtains
    p(4, 4, 2, 20, '#8a3a2a');
    p(20, 4, 2, 20, '#8a3a2a');

    // Plant in corner
    p(30, 28, 4, 10, '#4a3020'); // pot
    p(29, 24, 6, 5, '#2d7a2d');  // leaves
    p(28, 22, 8, 4, '#3a8a3a');  // upper leaves
    p(30, 20, 4, 3, '#2d7a2d');

    // Bookshelf on right
    p(38, 8, 12, 30, t.deskDark);
    p(39, 9, 10, 28, t.wallMid);
    // Books
    for (let shelf = 0; shelf < 3; shelf++) {
      const sy = 10 + shelf * 9;
      const bookColors = ['#c0186a', C.red, C.yellow, '#5b8def', '#2d9e2d', C.orange];
      for (let b = 0; b < 5; b++) {
        p(40 + b * 2, sy, 1, 7, bookColors[(shelf * 5 + b) % 6]);
      }
    }

    // Desk
    p(2, 32, 32, 3, t.desk);
    p(2, 35, 32, 2, t.deskDark);
    // Desk leg
    p(4, 35, 2, 5, t.deskDark);
    p(28, 35, 2, 5, t.deskDark);
  },
};
