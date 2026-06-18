import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const bug: PropDef = {
  id: 'bug',
  name: 'Bug',
  nameRu: 'Баг',
  draw({ p, d }) {
    // Bug body (red)
    p(20, 22, 10, 8, C.red);
    p(21, 21, 8, 10, C.red);
    p(22, 20, 6, 12, C.red);
    // Bug head
    p(22, 18, 6, 4, C.red);
    // Eyes
    d(23, 19, C.blk); d(24, 19, C.blk);
    d(26, 19, C.blk); d(27, 19, C.blk);
    // Antennae
    d(23, 17, C.blk); d(22, 16, C.blk); d(21, 15, C.blk);
    d(26, 17, C.blk); d(27, 16, C.blk); d(28, 15, C.blk);
    // Legs (3 per side)
    d(20, 23, C.blk); d(19, 22, C.blk);
    d(20, 26, C.blk); d(19, 25, C.blk);
    d(20, 29, C.blk); d(19, 28, C.blk);
    d(29, 23, C.blk); d(30, 22, C.blk);
    d(29, 26, C.blk); d(30, 25, C.blk);
    d(29, 29, C.blk); d(30, 28, C.blk);
    // Spots
    d(24, 24, '#cc0000'); d(26, 24, '#cc0000');
    d(23, 27, '#cc0000'); d(27, 27, '#cc0000');
    // ERROR text in red
    p(16, 34, 18, 4, '#1a0000');
    d(17, 35, C.red); d(18, 35, C.red); d(19, 35, C.red);
    d(17, 36, C.red); d(18, 36, C.red);
    d(17, 37, C.red); d(18, 37, C.red); d(19, 37, C.red);
  },
};
