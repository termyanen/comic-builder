import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const meeting: BackgroundDef = {
  id: 'meeting',
  name: 'Meeting Room',
  nameRu: 'Переговорка',
  draw({ p, d, t }) {
    // Wall
    p(0, 0, 70, 57, t.wall);
    for (let y = 6; y < 57; y += 12) p(0, y, 70, 1, t.wallMid);

    // Floor tiles
    p(0, 57, 70, 13, t.floor);
    for (let tx = 0; tx < 70; tx += 5) {
      for (let ty = 57; ty < 70; ty += 5) {
        if (((tx / 5) + (ty / 5)) % 2 === 0) p(tx, ty, 5, 5, t.wallMid);
      }
    }
    for (let fx = 0; fx <= 70; fx += 5) p(fx, 57, 1, 13, t.wallDark);
    for (let fy = 57; fy <= 70; fy += 5) p(0, fy, 70, 1, t.wallDark);
    p(0, 56, 70, 2, t.wallDark);

    // Conference table
    p(0, 48, 70, 4, C.blk);
    p(1, 49, 68, 2, t.desk);
    p(1, 49, 4, 2, t.wallMid);
    p(0, 51, 70, 4, C.blk);
    p(1, 52, 68, 2, t.deskDark);
    p(6, 54, 4, 5, C.blk); p(7, 55, 2, 4, t.deskDark);
    p(60, 54, 4, 5, C.blk); p(61, 55, 2, 4, t.deskDark);

    // Big whiteboard — left
    p(2, 4, 32, 38, C.blk);
    p(3, 5, 30, 36, '#c8c4b4');
    p(3, 5, 30, 2, '#b8b4a4'); p(3, 39, 30, 2, '#b8b4a4');
    p(14, 7, 1, 30, '#aaa4'); p(24, 7, 1, 30, '#aaa4');
    p(4, 7, 9, 3, '#b0ac9c'); p(15, 7, 8, 3, '#b0ac9c'); p(25, 7, 7, 3, '#b0ac9c');
    // Sticky cards — muted tones
    p(4, 12, 8, 5, C.blk); p(5, 13, 6, 3, '#706028'); d(5, 13, '#504010');
    p(4, 19, 8, 5, C.blk); p(5, 20, 6, 3, '#583030'); d(5, 20, '#402020');
    p(4, 26, 8, 5, C.blk); p(5, 27, 6, 3, '#2a2840'); d(5, 27, '#1e1e30');
    p(15, 12, 8, 5, C.blk); p(16, 13, 6, 3, '#1e3040'); d(16, 13, '#162030');
    p(15, 19, 8, 5, C.blk); p(16, 20, 6, 3, '#706028'); d(16, 20, '#504010');
    p(25, 12, 8, 5, C.blk); p(26, 13, 6, 3, '#1e4028'); d(26, 13, '#142818');
    p(25, 19, 8, 5, C.blk); p(26, 20, 6, 3, '#5a3818'); d(26, 20, '#3a2410');
    // Marker scribbles
    p(4, 35, 8, 1, '#602020'); p(15, 35, 7, 1, '#162040'); p(25, 35, 6, 1, '#1a3818');

    // Clock
    p(40, 4, 12, 12, C.blk); p(41, 5, 10, 10, '#d0ccbc');
    d(46, 6, t.wallDark); d(46, 13, t.wallDark);
    d(42, 9, t.wallDark); d(49, 9, t.wallDark);
    p(45, 8, 3, 4, C.blk); p(46, 9, 2, 3, t.wallDark);

    // Motivational poster
    p(54, 4, 14, 18, C.blk); p(55, 5, 12, 16, '#1a2030');
    p(56, 6, 10, 6, '#222a38');
    p(56, 13, 10, 1, '#504010'); p(56, 15, 8, 1, '#3a3a4a'); p(56, 17, 6, 1, '#3a3a4a');

    // Ceiling lights
    p(8, 0, 8, 3, C.blk); p(9, 0, 6, 2, '#d8d4b0');
    p(28, 0, 8, 3, C.blk); p(29, 0, 6, 2, '#d8d4b0');
    p(52, 0, 8, 3, C.blk); p(53, 0, 6, 2, '#d8d4b0');

    // Window
    p(68, 10, 2, 30, C.blk); p(68, 11, 2, 28, '#1e3050');
    d(68, 13, '#3a5070'); d(68, 17, '#3a5070'); d(68, 22, '#3a5070');
  },
};
