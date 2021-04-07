import { nonNull, extendType, intArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const GetItems = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('getItems', {
      type: 'Item',
      args: {
        userCategoryId: nonNull(intArg()),
      },
      async resolve(_root, { userCategoryId }, { db, req }) {
        // checkAuth(req);
      },
    });
  },
});
