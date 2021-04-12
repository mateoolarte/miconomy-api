import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';

import { checkAuth } from '../../../utils/checkAuth';

const { APP_SECRET } = process.env;

export const OverviewMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('overviewMonth', {
      type: 'OverviewMonthPayload',
      args: {
        month: nonNull(stringArg()),
        userToken: nonNull(stringArg()),
      },
      async resolve(_root, { month, userToken }, { db, req }) {
        const user: any = checkAuth(req);

        const defaultResponse = {
          error: null,
          status: 500,
          incomes: [],
          available: 0,
          lastExpense: '',
          notInBudget: 0,
          savings: 0,
        };

        try {
          const currentUser: any = jwt.verify(userToken, APP_SECRET);
          const { userId } = currentUser;

          if (user?.userId !== userId) {
            return {
              ...defaultResponse,
              status: 401,
              error: 'No tienes permisos para ingresar a esta sección',
            };
          }

          const userMonth = await db.userMonth.findFirst({
            where: {
              month: {
                date: month,
              },
              userId,
            },
            include: {
              incomes: true,
              userMonthCategories: {
                include: {
                  items: {
                    select: {
                      expense: true,
                    },
                  },
                },
              },
            },
          });
          const categories = userMonth?.userMonthCategories;

          return {
            ...defaultResponse,
            status: 200,
            incomes: userMonth?.incomes,
            available: 0,
            lastExpense: '',
            notInBudget: 0,
            savings: 0,
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
