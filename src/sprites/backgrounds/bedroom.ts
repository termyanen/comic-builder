import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const bedroom: BackgroundDef = {
  id: 'bedroom',
  name: 'Late Night',
  nameRu: 'Поздно ночью',
  draw({ p, d, t, ctx, S }) {
    // Very dark room
    p(0, 0, 50, 50, '#07080f');

    // Floor
    p(0, 42, 50, 8, '#0a0a14');

    // Bed (right side)
    p(28, 28, 22, 14, '#1a1a2e');  // frame
    p(29, 29, 20, 8, '#2a2a4e');   // pillow/sheet area
    p(29, 30, 20, 2, '#e0e0f0');   // pillow
    p(29, 32, 20, 5, '#3a3a6e');   // blanket
    p(28, 26, 22, 3, '#222238');   // headboard

    // Posters on wall
    p(2, 4, 10, 14, '#0a0a1a');
    p(3, 5, 8, 12, '#0f0f22');
    d(4, 7, C.cyan); d(6, 9, C.cyan); d(8, 7, '#5b8def'); // pixel art poster
    p(3, 8, 2, 2, '#5b8def'); p(7, 10, 2, 2, '#c0186a');

    p(16, 6, 10, 10, '#0a0a1a');
    p(17, 7, 8, 8, '#0f0f22');
    d(19, 9, C.red); d(21, 9, C.red); d(23, 9, C.red); // band poster
    p(18, 11, 6, 2, '#cc0000');

    // Desk with glowing monitor
    p(0, 30, 26, 4, '#1a1a28');
    p(0, 34, 26, 2, '#141420');
    p(2, 34, 2, 8, '#141420'); // leg

    // Monitor (bright glow in dark)
    p(4, 18, 20, 13, '#0a0a14');
    p(5, 19, 18, 11, '#1a3a6e');
    p(6, 20, 16, 9, '#0d1a3a');
    // Code on screen
    p(7, 21, 8, 1, C.cyan);
    p(7, 23, 12, 1, '#5b8def');
    p(7, 25, 5, 1, C.cyan);
    p(7, 27, 10, 1, '#5b8def');
    // Cursor blink
    p(7, 21, 1, 1, C.wh);
    // Monitor stand
    p(12, 31, 4, 1, '#333');
    p(10, 32, 8, 1, '#333');

    // Monitor glow on room
    ctx.fillStyle = 'rgba(13,115,119,0.06)';
    ctx.fillRect(0, 18 * S, 26 * S, 14 * S);

    // Energy drink can
    p(22, 27, 3, 5, C.red);
    p(22, 27, 3, 1, '#aaa');
    p(22, 31, 3, 1, '#aaa');
    d(23, 29, C.wh);

    // Phone on bed (glowing)
    p(32, 33, 4, 6, '#111');
    p(33, 34, 2, 4, '#1a3a6e');
    d(33, 35, '#5b8def'); d(34, 36, '#5b8def');

    // Stars through tiny window
    p(40, 2, 8, 10, '#050508');
    p(41, 3, 6, 8, '#08080f');
    d(42, 4, C.wh); d(45, 6, C.wh); d(43, 8, '#aaaaff');
    d(46, 4, C.wh); d(44, 9, '#aaaaff');
  },
};
