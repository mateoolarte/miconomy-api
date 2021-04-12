import { nonNull, stringArg, extendType } from 'nexus';
import jwt from 'jsonwebtoken';

import { checkAuth } from '../../../utils/checkAuth';

const { APP_SECRET } = process.env;

export const GetUserMonth = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getUserMonth', {
      type: 'UserMonth',
      args: {
        month: nonNull(stringArg()),
        userToken: nonNull(stringArg()),
      },
      async resolve(_root, { month, userToken }, { db, req }) {
        const user: any = checkAuth(req);

        const defaultResponse = {
          id: null,
          status: 500,
          error: null,
          categories: [],
          savingCategories: null,
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
            return {
              ...defaultResponse,
              id: userMonth?.id,
              status: 200,
              categories: userMonth?.userMonthCategories,
              savingCategories: userMonth?.userMonthSavingCategory,
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
