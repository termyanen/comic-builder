import type { BackgroundDef } from '../../types/comic';
import { C } from '../palette';

export const error: BackgroundDef = {
  id: 'error',
  name: 'BSOD / Error',
  nameRu: 'BSOD / Error',
  draw({ p, ctx, S }) {
    p(0, 0, 50, 50, C.blue_err);

    const fs = Math.round(S * 1.5);

    // Sad face
    ctx.fillStyle = C.wh;
    ctx.font = `bold ${fs * 2}px Courier New`;
    ctx.fillText(':(', 20 * S, 14 * S);

    // Error text
    ctx.font = `${fs}px Courier New`;
    ctx.fillStyle = C.wh;
    ctx.fillText('Your PC ran into', 6 * S, 22 * S);
    ctx.fillText('a problem.', 6 * S, 26 * S);

    ctx.fillStyle = '#88aaff';
    ctx.fillText('SCOPE_OVERFLOW', 6 * S, 32 * S);

    ctx.fillStyle = '#aaaaff';
    ctx.fillText('features.exe', 6 * S, 36 * S);

    // Fake QR code
    p(6, 40, 6, 6, C.wh);
    p(7, 41, 1, 1, C.blk); p(10, 41, 1, 1, C.blk);
    p(7, 44, 1, 1, C.blk); p(10, 44, 1, 1, C.blk);
    p(8, 42, 2, 2, C.blk);

    ctx.fillStyle = '#aaaaff';
    ctx.font = `${Math.round(fs * 0.8)}px Courier New`;
    ctx.fillText('press any key...', 14 * S, 44 * S);
  },
};
