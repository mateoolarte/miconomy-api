import { nonNull, extendType, stringArg } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const AddCategory = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addCategory', {
      type: 'Category',
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_root, { name }, { db, req }) {
        // checkAuth(req);
      },
    });
  },
});
