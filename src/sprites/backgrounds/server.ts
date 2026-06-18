import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const server: BackgroundDef = {
  id: 'server',
  name: 'Server Room',
  nameRu: 'Серверная',
  draw({ p, d, t, ctx, S }) {
    p(0, 0, 70, 70, '#0a0c10');
    p(0, 0, 70, 2, C.blk);
    p(8, 0, 10, 2, '#161820'); p(30, 0, 10, 2, '#161820'); p(52, 0, 10, 2, '#161820');

    // Floor
    p(0, 57, 70, 13, '#0c0e14');
    for (let fx = 0; fx < 70; fx += 7) p(fx, 57, 1, 13, '#141620');
    for (let fy = 57; fy < 70; fy += 7) p(0, fy, 70, 1, '#141620');
    p(0, 56, 70, 2, '#070810');

    // Left rack
    p(0, 2, 18, 54, C.blk);
    p(1, 3, 16, 52, '#101010');
    p(1, 3, 3, 52, '#181818');
    for (let row = 0; row < 13; row++) {
      const ry = 4 + row * 4;
      p(2, ry, 14, 3, C.blk);
      p(3, ry + 1, 12, 1, '#1c1c1c');
      // Muted status lights
      d(4, ry + 1, row % 4 === 0 ? '#5a1818' : '#1a4a28');
      d(6, ry + 1, '#0a3030'); d(8, ry + 1, '#0a3030');
      d(11, ry + 1, row % 3 === 0 ? '#504010' : '#0a3030');
      p(13, ry, 3, 3, '#1a1a1a');
    }

    // Right rack
    p(52, 2, 18, 54, C.blk);
    p(53, 3, 16, 52, '#101010');
    p(65, 3, 3, 52, '#181818');
    for (let row = 0; row < 13; row++) {
      const ry = 4 + row * 4;
      p(54, ry, 14, 3, C.blk);
      p(55, ry + 1, 12, 1, '#1c1c1c');
      d(56, ry + 1, '#1a4a28');
      d(58, ry + 1, row % 5 === 1 ? '#5a1818' : '#0a3030');
      d(60, ry + 1, '#0a3030');
      d(63, ry + 1, row % 3 === 2 ? '#504010' : '#1a4a28');
      p(65, ry, 3, 3, '#1a1a1a');
    }

    // Center aisle
    p(18, 2, 34, 55, '#080a0e');

    // Cable trays — muted
    p(18, 3, 34, 3, '#0a0a14');
    const cableColors = ['#3a1010', '#0a2828', '#3a3010', '#1a2040', '#182818', '#382010'];
    for (let i = 0; i < 6; i++) {
      p(20 + i * 5, 3, 2, 3, cableColors[i]);
    }

    // Floor cables
    p(18, 53, 34, 4, '#0d0d18');
    for (let i = 0; i < 6; i++) {
      p(20 + i * 5, 54, 2, 3, cableColors[i]);
    }

    // Patch panel
    p(22, 20, 26, 8, C.blk);
    p(23, 21, 24, 6, '#141414');
    for (let port = 0; port < 10; port++) {
      const px = 24 + port * 2;
      p(px, 22, 2, 2, '#0a0a0a');
      d(px, 23, port % 3 === 0 ? '#504010' : '#0a3030');
    }
    p(23, 26, 6, 1, '#1a4a28');

    // Ambient glow — very subtle
    ctx.fillStyle = 'rgba(20,80,80,0.04)';
    ctx.fillRect(18 * S, 2 * S, 34 * S, 55 * S);

    // Temperature gauge
    p(55, 3, 4, 12, C.blk);
    p(56, 4, 2, 10, '#0d0d0d');
    p(56, 8, 2, 6, '#5a1818');
    p(56, 4, 2, 4, '#1a4a28');
  },
};
