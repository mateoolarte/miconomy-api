import { extendType } from 'nexus';

import { checkAuth } from '../../../utils/checkAuth';

export const GetUserCategories = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserCategories', {
      type: 'UserCategories',
      async resolve(_root, _args, { db, req }) {
        const user: any = checkAuth(req);
        const { userId } = user;

        const defaultResponse = {
          status: 500,
          error: null,
          categories: [],
        };

        try {
          const categories = await db.category.findMany({
            where: {
              userId,
              isActive: true,
            },
          });

          return {
            ...defaultResponse,
            status: 200,
            categories,
          };
        } catch (error) {
          return {
            ...defaultResponse,
            error,
          };
        }
      },
    });
  },
});
