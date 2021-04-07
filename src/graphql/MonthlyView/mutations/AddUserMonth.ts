import { nonNull, extendType, intArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const AddUserMonth = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addUserMonth', {
      type: 'UserMonth',
      args: {
        userId: nonNull(intArg()),
        monthId: nonNull(intArg()),
      },
      async resolve(_root, { userId, monthId }, { db, req }) {
        checkAuth(req);
      },
    });
  },
});
