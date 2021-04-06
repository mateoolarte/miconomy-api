import { nonNull, stringArg, extendType } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const OverviewMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('overviewMonth', {
      type: 'OverviewMonthPayload',
      args: {
        month: nonNull(stringArg()),
      },
      async resolve(_root, { month }, { db, req }) {
        checkAuth(req);

        return {
          incomes: [],
          available: 0,
          notInBudget: 0,
          savings: 0,
        };
      },
    });
  },
});
