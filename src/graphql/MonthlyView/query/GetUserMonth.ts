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
        const user: any = checkAuth(req);
        const { userId } = user;

        const defaultResponse = {
          id: null,
          status: 500,
          error: null,
          categories: [],
          savingCategories: null,
        };

        try {
          const userMonth = await db.userMonth.findFirst({
            where: {
              month: {
                date: month,
              },
              userId,
            },
            include: {
              userMonthCategories: {
                include: {
                  category: true,
                  items: true,
                },
              },
              userMonthSavingCategory: true,
            },
          });

          if (userMonth) {
            const {
              id,
              userMonthCategories,
              userMonthSavingCategory,
            } = userMonth;

            return {
              ...defaultResponse,
              id,
              status: 200,
              categories: userMonthCategories,
              savingCategories: userMonthSavingCategory,
            };
          }

          if (!userMonth) {
            return {
              ...defaultResponse,
              status: 204,
            };
          }
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
