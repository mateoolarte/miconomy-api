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
        const user: any = checkAuth(req);
        const { userId } = user;

        const defaultResponse = {
          id: null,
          value: null,
          date: null,
          description: null,
        };

        try {
          const addedIncome = await db.income.create({
            data: {
              value,
              description,
              userId,
              userMonthId,
              date: new Date(),
            },
          });

          return {
            ...defaultResponse,
            id: addedIncome.id,
            value: addedIncome.value,
            date: addedIncome.date,
            description: addedIncome.description,
          };
        } catch (error) {
          return defaultResponse;
        }
      },
    });
  },
});
