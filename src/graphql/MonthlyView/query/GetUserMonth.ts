import { nonNull, stringArg, extendType } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const GetUserMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserMonth', {
      type: 'UserMonth',
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
