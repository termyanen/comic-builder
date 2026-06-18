import type { PropDef } from '../../types/comic';
import { C } from '../palette';

export const ticket: PropDef = {
  id: 'ticket',
  name: 'Jira Ticket',
  nameRu: 'Тикет',
  draw({ p, d }) {
    // Ticket stack (depth effect)
    p(15, 18, 20, 24, '#c0c0d0');
    p(14, 17, 20, 24, '#d0d0e0');
    p(13, 16, 20, 24, '#e0e0f0');

    // Main ticket
    p(12, 15, 20, 24, C.wh);
    p(13, 16, 18, 22, '#f8f8ff');

    // Header bar (blue, Jira style)
    p(12, 15, 20, 4, '#0052cc');
    // Jira-ish icon
    p(13, 16, 3, 3, '#4c9aff');
    d(14, 17, C.wh);
    // Ticket ID
    d(17, 17, C.wh); d(18, 17, C.wh); d(19, 17, C.wh);
    d(17, 18, C.wh);

    // Priority dot (red = critical)
    p(28, 16, 3, 3, C.red);

    // Title line
    p(14, 21, 14, 2, '#333');
    p(14, 21, 10, 1, '#1a1a1a');

    // Description lines
    p(14, 25, 14, 1, '#bbb');
    p(14, 27, 12, 1, '#bbb');
    p(14, 29, 14, 1, '#bbb');
    p(14, 31, 8, 1, '#bbb');

    // Status badge
    p(14, 33, 8, 3, '#36b37e');
    d(15, 34, C.wh); d(16, 34, C.wh); d(17, 34, C.wh);

    // Story points
    p(24, 33, 6, 3, '#0052cc');
    d(26, 34, C.wh); d(27, 34, C.wh);

    // Assignee avatar
    p(26, 24, 4, 4, '#ff5630');
    d(27, 25, C.wh); d(28, 25, C.wh);
  },
};
