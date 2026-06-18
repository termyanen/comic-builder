import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const pizza: PropDef = {
  id: 'pizza',
  name: 'Pizza',
  nameRu: 'Пицца',
  draw({ p, d }) {
    // Box open
    p(12, 28, 26, 16, '#c8a060');
    p(13, 29, 24, 14, '#d4aa70');
    // Box lid (slightly open above)
    p(12, 22, 26, 8, '#c8a060');
    p(13, 23, 24, 7, '#d4aa70');

    // Pizza in box
    // Crust
    p(14, 30, 22, 12, '#c87a30');
    // Cheese
    p(15, 31, 20, 10, '#f0c040');
    // Sauce showing through
    p(16, 32, 18, 8, '#e05020');
    // Cheese back on top
    p(17, 33, 16, 6, '#f0c040');

    // Toppings
    d(18, 33, C.red); d(22, 34, C.red); d(26, 33, C.red); // pepperoni
    d(20, 35, C.red); d(24, 36, C.red); d(28, 35, C.red);
    d(19, 37, C.red); d(25, 38, C.red);

    // Pepperoni details
    p(18, 33, 2, 2, '#cc2a00');
    p(22, 34, 2, 2, '#cc2a00');
    p(26, 33, 2, 2, '#cc2a00');

    // Mushrooms
    d(21, 34, '#8a6a4a'); d(27, 36, '#8a6a4a');

    // Slice lines
    d(25, 30, C.orange); d(25, 31, C.orange); d(25, 32, C.orange);
    d(26, 33, C.orange); d(27, 34, C.orange);

    // Steam
    d(20, 20, C.wh); d(21, 19, C.wh); d(22, 20, C.wh);
    d(26, 19, C.wh); d(27, 18, C.wh); d(28, 19, C.wh);
  },
};
