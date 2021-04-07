import { nonNull, extendType, intArg, stringArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const AddIncome = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addIncome', {
      type: 'Income',
      args: {
        value: nonNull(intArg()),
        description: nonNull(stringArg()),
        userMonthId: nonNull(intArg()),
      },
      async resolve(_root, { value, description, userMonthId }, { db, req }) {
        checkAuth(req);
      },
    });
  },
});
