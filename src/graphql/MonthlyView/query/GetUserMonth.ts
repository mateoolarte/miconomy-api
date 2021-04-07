import { nonNull, stringArg, extendType } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const GetUserMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserMonth', {
      type: 'UserMonth',
      args: {
        month: nonNull(stringArg()),
        userToken: nonNull(stringArg()),
      },
      async resolve(_root, { month }, { db, req }) {
        checkAuth(req);

        const getMonth = await db.month.findFirst({
          where: {
            date: month,
          },
        });
        const monthId = getMonth?.id;

        return {
          id: monthId,
          value: 0,
          categories: [],
          savingCategories: [],
        };
      },
    });
  },
});
