import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const server: BackgroundDef = {
  id: 'server',
  name: 'Server Room',
  nameRu: 'Серверная',
  draw({ p, d, t, ctx, S }) {
    // Floor / ceiling
    p(0, 0, 50, 50, t.wallDark);
    p(0, 0, 50, 2, '#050505');
    p(0, 48, 50, 2, '#050505');

    // Left server rack
    p(0, 2, 14, 46, '#1a1a1a');
    p(1, 3, 12, 44, '#111');
    for (let row = 0; row < 10; row++) {
      const ry = 4 + row * 4;
      p(2, ry, 10, 3, '#222');
      // Status lights
      d(3, ry + 1, row % 3 === 0 ? C.red : C.green);
      d(5, ry + 1, '#14ffec');
      d(7, ry + 1, '#14ffec');
      // Drive slots
      p(9, ry, 2, 3, '#333');
    }

    // Right server rack
    p(36, 2, 14, 46, '#1a1a1a');
    p(37, 3, 12, 44, '#111');
    for (let row = 0; row < 10; row++) {
      const ry = 4 + row * 4;
      p(38, ry, 10, 3, '#222');
      d(39, ry + 1, C.green);
      d(41, ry + 1, row % 4 === 1 ? C.red : '#14ffec');
      d(43, ry + 1, '#14ffec');
      p(45, ry, 2, 3, '#333');
    }

    // Cable management (colorful cables on floor)
    p(14, 44, 22, 2, t.wall);
    for (let i = 0; i < 6; i++) {
      const colors = [C.red, '#14ffec', C.yellow, '#5b8def', '#8f8', C.orange];
      d(16 + i * 3, 44, colors[i]);
      d(16 + i * 3, 45, colors[i]);
    }

    // Center aisle glow
    p(16, 2, 18, 42, t.wallDark);
    // Cold air vents (ceiling)
    p(18, 0, 4, 2, '#333'); p(26, 0, 4, 2, '#333');
    // Ambient glow from racks
    ctx.fillStyle = 'rgba(20,255,236,0.04)';
    ctx.fillRect(14 * S, 0, 22 * S, 50 * S);
  },
};
