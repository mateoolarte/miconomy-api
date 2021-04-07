import { nonNull, extendType, intArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const GetUserMonthCategories = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserMonthCategories', {
      type: 'UserMonthCategories',
      args: {
        userMonthId: nonNull(intArg()),
      },
      async resolve(_root, { userMonthId }, { db, req }) {
        // checkAuth(req);
      },
    });
  },
});
